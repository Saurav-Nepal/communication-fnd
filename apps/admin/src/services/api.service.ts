import { AxiosRequestConfig } from 'axios';

import { GLOBAL } from '@/constants/global.constants';
import { axios } from '@/lib/axios';

export interface RequestParams extends Omit<AxiosRequestConfig, 'url'> {
    url: string;
    urlPrefix?: string;
    callback?: (...arg: any) => void;
    extraParams?: any;
    payloadType?: string;
}

/**
 * Get call implementation
 * All get calls are made through this method
 * @param  {object} obj - contains url, params(optional){proccessed and attached to url},
 * headers(optional)
 */
export async function Get(obj: RequestParams) {
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

/**
 * Post call implementation
 * All get calls are made through this method
 * @param  {object} obj - contains url, params(optional){proccessed and attached to url},
 * headers(optional), body(optional)
 */
export async function Post(obj: RequestParams) {
    obj.method = 'POST';

    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

/**
 * Put call implementation
 * All get calls are made through this method
 * @param  {object} obj - contains url, params(optional){proccessed and attached to url},
 * headers(optional), body(optional)
 */
export async function Put(obj: RequestParams) {
    obj.method = 'PUT';

    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

/**
 * Delete call implementation
 * All get calls are made through this method
 * @param  {object} obj - contains url, params(optional){proccessed and attached to url},
 * headers(optional)
 */
export async function Delete(obj: RequestParams) {
    obj.method = 'DELETE';

    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

/**
 * final level method to make api call
 * used for all kind of methods(get, put, post), except delete
 * @param  {string} {url
 * @param  {function} method
 * @param  {object} headers
 * @param  {function} resolve
 * @param  {function} reject}
 */
function ApiCall({
    url,
    method,
    headers,
    params,
    data,
    extraParams,
    callback,
}: RequestParams) {
    return axios(url, {
        headers,
        data,
        method,
        params,
    })
        .then((response) => {
            const result = ProcessDataAfterApiCall(response);

            if (typeof callback == 'function') {
                callback(result, { eventName: url, extraParams });
            }

            return result;
        })
        .catch(ProcessDataAfterApiCall);
}

/**
 * prepares params for making api calls
 * including headers, url, params, resolve, reject
 * @param  {object} obj
 */
async function getNecessaryParams(obj: RequestParams): Promise<RequestParams> {
    const url = createFinalUrl(obj);
    const method = obj.method || 'GET';

    const responseObj = {
        ...obj,
        url,
        method,
        // hideMessage: obj.hideMessage || false,
        // persist: obj.persist || false,
        callback: obj.callback,
        extraParams: obj.extraParams,
        // signal,
    };

    // obj.form
    // if (obj.data) {
    //     if (obj.payloadType != 'FormData') {
    //         responseObj.data = JSON.stringify(obj.data);
    //     } else {
    //         responseObj.data = obj.data;
    //     }
    // }
    return responseObj;
}

function ProcessDataAfterApiCall(result: any): {
    success: boolean;
    message: string;
    response: any;
    status: number | string;
} {
    const { data, status, statusText, response } = result || {};

    if (!(status || data || response)) {
        return {
            success: false,
            message: "Seems your're offline",
            response: "Seems your're offline",
            status: 600,
        }; // no internet
    }

    if (!ErrorStatus.includes(status) && IsValidResponse(result)) {
        return {
            message: statusText,
            response: data,
            success: true,
            status,
        };
    }

    return {
        message: statusText,
        response: data?.message ?? 'Something went wrong',
        success: false,
        status: data?.statusCode ?? status,
    };
}

/**
 * takes params along with end point, adds with prefix url and return final url
 * @param  {object} obj
 */
function createFinalUrl(obj: RequestParams) {
    return (obj.urlPrefix || GLOBAL.API_HOST) + obj.url;
}

function IsValidResponse(response: any) {
    return response && response.status > 199 && response.status < 300;
}

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

export const ErrorStatus = Object.keys(ErrorResponses);

export const apitest = () => {};
