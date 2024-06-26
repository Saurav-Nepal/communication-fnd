import { Get, Put, Post, Delete } from '../Utils/http.utils';
import { StoreEvent } from '../Utils/stateManager.utils';

export interface RESPONSE_KEYS_INTERFACE {
    [key: string]: string;
}

export interface BaseModelInterface {
    callback?: Function;
    broadcastEventName?: string;
    url?: string;
    status?: RESPONSE_KEYS_INTERFACE;
}

export interface ReturnFunctionInterface {
    // success: boolean, response: any, type?: string
    [key: string]: any;
}

export default class Base {
    // callback function is supposed to receive from the platform side
    // an alternative way to get the data
    protected callback: Function;

    // every model has a url point for its crud operations
    // through the class initialization, url will be set and subsequent method calls can avoid sending url every time for api call
    url: string;

    // extending the http utils methods
    // get: Function = Get;
    // put: Function = Put;
    // post: Function = Post;
    // delete: Function = Delete;

    // event name is used to broadcast the data to the platform
    // whenever a class' constructor is taken, broadcastEventName can be fetched to subscribe the event for data consumption
    broadcastEventName?: string;

    constructor({
        callback,
        broadcastEventName,
        url,
        status,
    }: BaseModelInterface = {}) {
        if (typeof callback === 'function') {
            this.callback = callback;
        } else {
            this.callback = () => {};
        }
        if (url) {
            this.url = url;
        }
        this.broadcastEventName = broadcastEventName;
    }

    protected async _get({
        url = this.url,
        type,
        data,
        urlSuffice = '',
        hideMessage,
        baseURL,
        headers,
        isMeta,
    }: {
        url?: string;
        type?: string;
        urlSuffice?: string;
        data?: object;
        hideMessage?: boolean;
        baseURL?: string;
        headers?: { [key: string]: string };
        isMeta?: boolean;
    }): Promise<ReturnFunctionInterface> {
        const result: { data?: any; status: number; config; statusText } =
            await Get({
                url: url + urlSuffice,
                baseURL,
                hideMessage,
                headers,
                isMeta,
            });

        return this.processDataAfterApiCall(result, type);
    }

    protected async _put({
        url = this.url,
        type,
        id,
        data,
        hideMessage,
        baseURL,
        headers,
        isMeta,
    }: {
        url?: string;
        type?: string;
        id?: string | number;
        data: object;
        hideMessage?: boolean;
        baseURL?: string;
        headers?: { [key: string]: string };
        isMeta?: boolean;
    }): Promise<ReturnFunctionInterface> {
        let finalUrl = url;
        if (id) {
            finalUrl += '/' + id;
        }
        const result: { data?: any; status: number; config; statusText } =
            await Put({
                url: finalUrl,
                data,
                hideMessage,
                baseURL,
                headers,
                isMeta,
            });
        return this.processDataAfterApiCall(result, type);
    }

    protected async _post({
        url = this.url,
        type,
        data,
        hideMessage,
        baseURL,
        headers,
        isMeta,
    }: {
        url?: string;
        type?: string;
        data: object;
        hideMessage?: boolean;
        baseURL?: string;
        headers?: { [key: string]: string };
        isMeta?: boolean;
    }): Promise<ReturnFunctionInterface> {
        const result: { data?: any; status: number; config; statusText } =
            await Post({ url, data, hideMessage, baseURL, headers, isMeta });

        return this.processDataAfterApiCall(result, type);
    }

    protected async _delete({
        url = this.url,
        type,
        id,
        hideMessage,
        baseURL,
        headers,
        isMeta,
    }: {
        url?: string;
        type?: string;
        id: string | number;
        hideMessage?: boolean;
        baseURL?: string;
        headers?: { [key: string]: string };
        isMeta?: boolean;
    }): Promise<ReturnFunctionInterface> {
        let finalUrl = url;
        if (id) {
            finalUrl += '/' + id;
        }

        const result: { data?: any; status: number; config; statusText } =
            await Delete({
                url: finalUrl,
                hideMessage,
                baseURL,
                headers,
                isMeta,
            });
        return this.processDataAfterApiCall(result, type);
    }

    /**
     * checks if type exists, returns data through the returnCallback
     * @param  {} result
     * @param  {} type
     * @returns ReturnFunctionInterface
     */
    protected processDataAfterApiCall(result, type): ReturnFunctionInterface {
        if (type) {
            return this.returnCallback({ ...result, type });
        }
        return result;
    }

    /*
     * callback implementation to make available the data to the platform
     * // NOTE data is deprecated and will be removed after sometime, use of response is encouraged over data
     */
    protected returnCallback({
        response,
        data,
        success = true,
        type,
    }: {
        response?: any;
        data?: any;
        success?: boolean;
        type?: string;
    }): ReturnFunctionInterface {
        if (!response) {
            response = data;
        }
        const responseObject = { success, response, type };
        this.callback(responseObject);

        if (this.broadcastEventName) {
            StoreEvent({
                eventName: this.broadcastEventName,
                data: responseObject,
                isTemp: true,
            });
        }

        return responseObject;
    }
}
