import axios from 'axios';

import {
    DEVELOPER_MODE_KEY,
    LOGIN_ROUTE,
    NET_CONNECTION,
    SHOW_OFFLINE_VIEW,
    SOMETHING_WENT_WRONG,
} from '../Constants';
import { API_CONSTANTS } from '../Constants/env.constant';
import { UserBusiness } from '../Models/Business/user.business';
import { Authentication } from './authentication';
import { IsEmptyObject } from './common.utils';
import { GetItem } from './localStorage.utils';
import { Navigation } from './navigation.utils';
import { StoreEvent, SubscribeToEvent } from './stateManager.utils';
import { Toast } from './toast.utils';
import { GetPlatformId, GetVersion } from './version.utils';

interface API_PARAMS {
    baseURL?: string;
    headers?: { [key: string]: string };
    // allowDuplicateCall?: boolean;
    // credentials?: string;
    data?: any; // body of api to be passed to api server
    url?: string; // api endpoint
    loginRequired?: boolean; // if true, on authentication fail, will redirect to login page
    resetHeader?: boolean;
    hideMessage?: boolean;
    isMeta?: boolean;
    onProgressComplete?: (progress: number) => void;
    signal?: any;
}

let netInfo = { isConnected: true };
let version;
let platform;

export function RegisterNetInfoListener() {
    SubscribeToEvent({ eventName: NET_CONNECTION, callback: StoreNetInfo });
}

async function createHeader(obj: API_PARAMS) {
    if (!netInfo.isConnected) {
        StoreEvent({
            eventName: SHOW_OFFLINE_VIEW,
            data: { showOffline: true },
        });
    }

    // attach access token and device uuid to each call
    // const access_token = await Authentication.fetchAccessToken(loginRequired);
    const access_token = await Authentication.fetchAccessToken(obj.isMeta);
    const device_uuid = await Authentication.fetchDeviceToken();
    const api_url = await UserBusiness.getBusinessAPIUrl(obj.isMeta);
    // const api_url = 'http://10.190.209.230:4000/'; // For local test server
    // const api_url = 'https://eapi.finnoto.dev/'; // For debug server
    // const api_url = 'http://192.168.0.118:4000/'; // For debug server

    if (!version) {
        version = await GetVersion();
    }

    if (!platform) {
        platform = await GetPlatformId();
    }

    const headers = {
        Authorization: `Bearer ${access_token}`,
        'u-device-version': version,
        'u-platform-id': platform,
    };

    if (device_uuid) {
        headers['u-device-identifier'] = device_uuid;
    }

    const isDebugMode = GetItem(DEVELOPER_MODE_KEY, false);
    if (isDebugMode) obj.data = { ...obj.data, isDebugMode };

    return {
        ...obj,
        baseURL: obj.baseURL || api_url || API_CONSTANTS.ROUTE_URL,
        headers: { ...headers, ...(obj.headers || {}) },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            obj?.onProgressComplete?.(percentCompleted);
        },
    };
}

/**
 * Get call implementation
 * All get calls are made through this method
 */
export async function Get(obj: API_PARAMS) {
    const requestParams = await createHeader(obj);

    try {
        const result = await axios({ method: 'get', ...requestParams });
        return ProcessDataAfterApiCall(result);
    } catch (error) {
        return ProcessDataAfterApiCall(error.response);
    }
}

/**
 * Post call implementation
 * All post calls are made through this method
 */
export async function Post(obj: API_PARAMS) {
    const requestParams = await createHeader(obj);

    try {
        const result = await axios({
            method: 'post',
            ...requestParams,
        });
        return ProcessDataAfterApiCall(result);
    } catch (error) {
        if (error.code === 'ERR_CANCELED')
            return Toast.error({
                description: 'Canceled Request',
            });

        return ProcessDataAfterApiCall(error.response);
    }
}

/**
 * Put call implementation
 * All put calls are made through this method
 */
export async function Put(obj: API_PARAMS) {
    const requestParams = await createHeader(obj);

    try {
        const result = await axios({ method: 'put', ...requestParams });
        return ProcessDataAfterApiCall(result);
    } catch (error) {
        return ProcessDataAfterApiCall(error.response);
    }
}

/**
 * Delete call implementation
 * All delete calls are made through this method
 */
export async function Delete(obj: API_PARAMS) {
    const requestParams = await createHeader(obj);

    try {
        const result = await axios({ method: 'delete', ...requestParams });
        return ProcessDataAfterApiCall(result);
    } catch (error) {
        return ProcessDataAfterApiCall(error.response);
    }
}

/**
 * returns if response status is within 200-300 range
 * @param  {} response object
 */
export function IsValidResponse(response: { [key: string]: any }) {
    return response && response.status > 199 && response.status < 300;
}

function StoreNetInfo(state) {
    if (!netInfo.isConnected && state.isConnected) {
        StoreEvent({
            eventName: SHOW_OFFLINE_VIEW,
            data: { showOffline: true },
        });
    }
    netInfo = state;
}

/**
 * PostForm call implementation
 * All PostForm calls are made through this method
 */
export const logout = async () => {
    await Authentication.logout();
    Navigation.navigate({ url: LOGIN_ROUTE });
};
let alreadyServerDead = false;
function ProcessDataAfterApiCall(result): any {
    const { data, status, response } = result || {};
    // if (status === 401) return logout();

    if (!(status || data || response)) {
        return {
            status: 600,
            data: { success: false, message: "Seems your're offline" },
        }; // no internet
    }
    if (ErrorStatus.includes(status || response?.status)) {
        if (!alreadyServerDead) {
            let responseData = ErrorResponses[status];
            if (!IsEmptyObject(data)) {
                responseData = { ...responseData, ...data };
            }

            StoreEvent({ eventName: SOMETHING_WENT_WRONG, data: responseData });
        }
        alreadyServerDead = true;
    } else if (alreadyServerDead) {
        StoreEvent({ eventName: SOMETHING_WENT_WRONG, data: null });
        alreadyServerDead = false;
    }

    // check if access token was expired
    // if so,
    // const accessToken=FetchAccessToken(null, true);
    // if(accessToken)
    // return method(obj);
    // else
    if (status < 200 || status > 299) {
        console.warn('something is wrong, status is ' + result.status);
    }
    return result;
}

export const ErrorStatus = [503, 504];

const ErrorResponses = {
    503: {
        title: 'We are under maintenance',
        description:
            'Please hold tightly, currently we are going through maintenance',
        type: 503,
    },
    504: {
        title: 'Something went wrong',
        description:
            'We are experiencing some issue at the moment, why dont you come back after sometime',
        type: 504,
    },
};
