import Axios, { AxiosRequestConfig } from 'axios';

import { GLOBAL } from '@/constants/global.constants';
import { Authentication } from '@/services';

const authRequestInterceptor = async (
    config: AxiosRequestConfig
): Promise<any> => {
    const access_token = Authentication.fetchAccessToken();

    const headers: any = {
        'u-device-version': GLOBAL.APP_VERSION,
        'Content-Type': 'application/json',
    };

    if (access_token) {
        headers.Authorization = `Bearer ${access_token}`;
    }

    config.headers = { ...headers, ...config.headers };
    return config;
};

const axios = Axios.create({
    baseURL: GLOBAL.ROUTE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // const message = error.response?.data?.message || error.message;
        // useNotificationStore.getState().addNotification({
        //     type: 'error',
        //     title: 'Error',
        //     message,
        // });

        return Promise.reject(error.response);
    }
);

export { axios };
