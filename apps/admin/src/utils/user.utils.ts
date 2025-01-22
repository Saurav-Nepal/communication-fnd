/************************************
 * All user related utility methods
 ***********************************/
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/Constants/storage.constants';
// import { queryClient } from '@/Lib/react-query';
// import { LOGGED_USER } from '../Constants';
// import { ObjectDto } from '../Types';
// import { RemoveItem, SetItem } from './localStorage.utils';
// import { StoreEvent } from './stateManager.utils';

import { ObjectDto } from '@slabs/ds-utils';

import { LOGGED_USER } from '@/constants/state.constants';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/storage.constants';
import { queryClient } from '@/lib/react-query';

import { RemoveItem, SetItem } from './localStorage.utils';
import { StoreEvent } from './stateManager.utils';

let CurrentUser: ObjectDto = {};
// let fireToken = '';

/**
 * Returns firebase token for users
 * first checks in local variable, if its undefined, returns from Asyncstorage
 */
// export const GetFireToken = async () => {
//     if (fireToken) {
//         return fireToken;
//     }
//     fireToken = GetItem('FIRE_TOKEN');
//     return fireToken;
// };

/**
 * Custom Login
 */
// export const CustomLogin = async () => {
//     return Get({
//         urlPrefix: GLOBAL.ROUTE_URL,
//         url: 'loginCheck',
//         hideMessage: true,
//     });
// };

export const UpdateUserData = (data: ObjectDto, isLogin?: boolean) => {
    if (!CurrentUser.id) {
        if (CurrentUser.loginCheckDone && !data.id) {
            return {};
        }
    }

    if (isLogin) {
        // @todo fix this
        // const { id, name, mobile, email } = data;
        // AnalyticsEvent(LOGIN_ANALYTICS, { id, name, mobile, email });
    }

    // maintain userobject in the internal variable
    CurrentUser = { ...data, loginCheckDone: true };

    let loggedUser = {};

    if (data && data.id) {
        loggedUser = GetUserDetail(data);
    }

    // @todo referral
    // const { referral_code } = CurrentUser?.referral || {};
    // this.setUserReferralCode(referral_code);

    // broadcast event about modification in user data in the system
    StoreEvent({
        eventName: LOGGED_USER,
        data: { ...loggedUser, ...{ loginCheckDone: true } },
    });
    return CurrentUser;
};

export const GetUserDetail = (userObject: ObjectDto) => {
    try {
        const currentUser: ObjectDto = {
            ...userObject,
        };

        const hasRole = function (roleName: string) {
            // super user should always get access to all the resources in the system
            return (
                currentUser.roles.indexOf('super-admin') != -1 ||
                currentUser.roles.indexOf(1) != -1 ||
                currentUser.roleIdentifiers.indexOf(roleName) != -1 ||
                currentUser.roleIdentifiers.indexOf(roleName) != -1
            );
        };

        const hasAbsoluteRole = function (roleName: string) {
            return (
                currentUser.roles.indexOf(roleName) != -1 ||
                currentUser.roleIdentifiers.indexOf(roleName) != -1
            );
        };

        const hasPermission = function (permissionName: string) {
            // super user should always get access to all the resources in the system
            return (
                currentUser.permissions.indexOf('super-admin') != -1 ||
                currentUser.roles.indexOf(1) != -1 ||
                currentUser.permissionIdentifiers.indexOf(permissionName) !=
                    -1 ||
                currentUser.permissionIdentifiers.indexOf(permissionName) != -1
            );
        };

        const hasAbsolutePermission = function (permissionName: string) {
            return (
                currentUser.permissions.indexOf(permissionName) != -1 ||
                currentUser.permissionIdentifiers.indexOf(permissionName) != -1
            );
        };

        if (userObject.parent_user && userObject.parent_user.id) {
            currentUser.parent_user = userObject.parent_user;
            currentUser.impersonated = true;
        } else {
            currentUser.parent_user = userObject.parent_user;
            currentUser.impersonated = false;
        }

        currentUser.roles = [];
        currentUser.permissions = [];
        currentUser.roleIdentifiers = [];
        currentUser.permissionIdentifiers = [];
        currentUser.hasRole = hasRole;
        currentUser.hasPermission = hasPermission;
        currentUser.hasAbsoluteRole = hasAbsoluteRole;
        currentUser.hasAbsolutePermission = hasAbsolutePermission;

        for (const i in userObject.roles) {
            currentUser.roles.push(userObject.roles[i]);
        }

        for (const j in userObject.permissions) {
            currentUser.permissions.push(userObject.permissions[j]);
        }

        for (const i in userObject.roleIdentifiers) {
            currentUser.roleIdentifiers.push(userObject.roleIdentifiers[i]);
        }

        for (const j in userObject.permissionIdentifiers) {
            currentUser.permissionIdentifiers.push(
                userObject.permissionIdentifiers[j]
            );
        }

        return currentUser;
    } catch (err: any) {
        console.error(err.message);
        return userObject;
    }
};

export const GetUser = () => {
    return CurrentUser;
};

// export const ImpersonateUser = () => {
//     return CurrentUser;
// };

export function StoreUserToken(data: any) {
    const { refresh_token, access_token } = data || {};
    // store refresh_token in the local storage
    refresh_token && SetItem(REFRESH_TOKEN, refresh_token);
    // store access_token in the local storage
    access_token && SetItem(ACCESS_TOKEN, access_token);
}

export function ClearUserToken() {
    // wipeout the tokens from localstorage
    SetItem(REFRESH_TOKEN, null);
    SetItem(ACCESS_TOKEN, null);
}

export function Logout() {
    // wipeout the tokens from localstorage
    ClearUserToken();

    StoreEvent({ eventName: LOGGED_USER, data: { loginCheckDone: true } });

    // disconnect and reconnect to socket in order to remove current user session
    // ReconnectSocket();

    // update internal user info
    CurrentUser = { loginCheckDone: true };
    UpdateUserData({ loginCheckDone: true });
    RemoveItem({ clearVolatileStorage: true }); // remove all volatile data
    queryClient.clear();
}

// export async function FetchReferralCode() {
//     return GetItemAsync(REFERRAL_CODE, true);
// }
