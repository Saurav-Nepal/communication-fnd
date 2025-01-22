'use client';

import { useEffect, useState } from 'react';

import {
    accessNestedObject,
    isEmptyObject,
    isFunction,
    ObjectDto,
} from '@slabs/ds-utils';

import { MethodDto } from '../types/common.types';

interface ParamDto {
    method: MethodDto;
    params?: unknown;
    dependencyParams?: unknown;
    activeCheck?: boolean;
    onUnmount?: MethodDto;
}

const useCustomFocusEffect = ({
    method,
    params,
    dependencyParams,
    activeCheck = true,
    onUnmount,
}: ParamDto) => {
    useEffect(() => {
        let isActive = true;
        if (!activeCheck || (activeCheck && isActive)) {
            if (isFunction(method)) {
                method(params);
            }
        }
        return () => {
            if (typeof onUnmount === 'function') {
                onUnmount();
            }
            isActive = false;
        };
    }, [dependencyParams]);
};

let originalResponse: any;

const useFetchData = ({ className }: { className: any }) => {
    const [dataObject, setDataObject] = useState<{
        classInstance: any;
        loading: boolean;
        success: boolean;
        message: string;
        response: any;
        actions: any[];
    }>({
        classInstance: {},
        loading: true,
        success: false,
        message: '',
        response: [] as any,
        actions: [],
    });

    const Process = async ({
        classParams,
        methodParams,
        method,
        attachSessionId = false,
        refreshing,
    }: ProcessInterface = {}) => {
        // if refeshing is true or data is not empty then set loading true
        if (refreshing) {
            setDataObject((prevState: any) => ({
                ...prevState,
                loading: true,
            }));
        }

        const result = await FetchData({
            className,
            classParams,
            methodParams,
            method,
            attachSessionId,
        });
        setDataObject((prevState: any) => ({
            ...prevState,
            ...result,
            loading: false,
        }));
    };

    /**
     * search filter on header search bar callback
     * @param  {} string - typed search string
     */
    const Search = async ({ searchText, key }: SearchDTO) => {
        let orginalResponseCopy: any;
        try {
            orginalResponseCopy = originalResponse
                ? JSON.parse(originalResponse)
                : {};
        } catch (e) {
            return;
        }

        if (!searchText) {
            setDataObject((obj: any) => ({
                ...obj,
                response: orginalResponseCopy,
            }));
        }

        let method;
        if (dataObject.classInstance && dataObject.classInstance['search']) {
            method = dataObject.classInstance['search'];
        }

        if (!isFunction(method)) {
            return;
        }

        const filteredData = await method(
            key
                ? accessNestedObject(orginalResponseCopy, key)
                : orginalResponseCopy,
            searchText
        );

        const response = key
            ? { ...dataObject.response, [key]: filteredData }
            : filteredData;

        setDataObject((obj: any) => ({ ...obj, response: response }));
    };

    return { ...dataObject, Process, setDataObject, Search };
};

/**
 * Creating class instance and get set data
 */
const FetchData = async ({
    attachSessionId = false,
    ...props
}: FetchDataFunctionInterface) => {
    return await _GetData(props);
};

interface SearchMethodDTO extends SearchDTO {
    originalResponse: any[];
    classInstance: ObjectDto;
}

/**
 * search filter on header search bar callback
 * @param  {} string - typed search string
 */
export const OnSearch = async ({
    searchText,
    key,
    originalResponse,
    classInstance,
}: SearchMethodDTO) => {
    let orginalResponseCopy = [...originalResponse];
    if (!searchText) {
        return originalResponse;
    }

    let method;
    if (classInstance && classInstance['search']) {
        method = classInstance['search'];
    }

    if (!isFunction(method)) {
        return;
    }

    const filteredData = await method(
        key
            ? accessNestedObject(orginalResponseCopy, key)
            : orginalResponseCopy,
        searchText
    );

    return key ? { ...originalResponse, [key]: filteredData } : filteredData;
};

/**
 * Set user id and  make class params with user id
 */
const _SetUserIdObject = async ({
    classParams = {},
    ...props
}: FetchDataInterface) => {
    return _GetData({ classParams, ...props });
};

/**
 * Make class instance and default process method call
 */
const _GetData = async ({
    classInstance: _classInstance,
    classParams = {},
    className,
    methodParams,
    method = 'process',
}: FetchDataInterface): Promise<{
    success: boolean;
    response: any;
    message: string;
    loading: boolean;
}> => {
    if (isEmptyObject(_classInstance)) {
        _classInstance =
            typeof classParams == null
                ? new className()
                : new className(classParams);
    }

    if (!isEmptyObject(_classInstance)) {
        if (!method || !(method in _classInstance)) {
            console.error(
                `TypeError: ${_classInstance.constructor.name}: '${method}' is not function`
            );
            return _SetFalseObject();
        }

        try {
            const result = methodParams
                ? await _classInstance[method](methodParams)
                : await _classInstance[method]();

            // because of bullshit mutation issue, keeping data in string format
            // and parsing whenever needed
            originalResponse = JSON.stringify(result?.response);

            return {
                classInstance: _classInstance,
                ...result,
                originalResponse: JSON.stringify(result?.response),
            };
        } catch (e: any) {
            console.error(e.stack);
        }
    }

    return _SetFalseObject();
};

/**
 * Return false condition
 */
const _SetFalseObject = () => {
    return { success: false, response: [], message: '', loading: false };
};

export { FetchData, useCustomFocusEffect, useFetchData };

interface FetchDataInterface {
    className: any;
    classParams?: any;
    methodParams?: any;
    method?: string;
    classInstance?: any;
}

interface FetchDataFunctionInterface extends FetchDataInterface {
    attachSessionId?: boolean;
}

interface ProcessInterface {
    classParams?: any;
    methodParams?: any;
    method?: string;
    attachSessionId?: boolean;
    refreshing?: boolean;
}

interface SearchDTO {
    searchText: string | null;
    key?: string;
}
