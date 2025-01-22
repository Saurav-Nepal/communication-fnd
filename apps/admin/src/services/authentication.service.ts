import { isValidString } from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import {
    ACCESS_TOKEN,
    U_DEVICE_IDENTIFIER,
} from '@/constants/storage.constants';
import { GetItem } from '@/utils/localStorage.utils';
import { UpdateUserData } from '@/utils/user.utils';

import { Get } from './api.service';

export class Authentication {
    private static LOGIN_CHECK = 'user-auth';

    /**
     * try to resolves access token in following order
     * if found in local memory, return
     * else if found in local storage, return
     * else retrieve from api server and return
     */
    static fetchAccessToken() {
        // if in local storage
        const access_token = GetItem(ACCESS_TOKEN);
        if (isValidString(access_token)) return access_token;

        // fetch access token from server
        // return this.fetchFreshAccessToken(redirectToLoginWhenFailToFetch);
        return null;
    }

    public static async loginCheck() {
        if (!isValidString(GLOBAL.ROUTE_URL)) {
            return Promise.reject({ response: null });
        }

        const { success, response } = await Get({
            urlPrefix: GLOBAL.ROUTE_URL,
            url: Authentication.LOGIN_CHECK,
        });

        if (success) {
            UpdateUserData(response);
            return response;
        }

        return Promise.reject({ response });
    }

    /**
     * returns device uuid token stored in the localstorage
     */
    static fetchDeviceToken() {
        return GetItem(U_DEVICE_IDENTIFIER, true);
    }
}
