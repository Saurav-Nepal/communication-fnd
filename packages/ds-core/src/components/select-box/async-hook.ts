import { useCallback, useEffect, useRef, useState } from 'react';

import {
    GroupOptionsType,
    SelectBoxOptionType,
    SelectBoxProps,
} from './select-box.types';

export interface AsyncSelectType extends SelectBoxProps {
    loadOptions: (
        inputValue: string,
        callback: (
            options: Array<SelectBoxOptionType | GroupOptionsType>
        ) => void
    ) => Promise<any>;
    defaultOptions?: Array<SelectBoxOptionType | GroupOptionsType> | boolean;
    cacheOptions?: any;
    isLoading?: boolean;
}

const useAsyncSelect = ({
    loadOptions: propsLoadOptions,
    defaultOptions: propsDefaultOptions,
    cacheOptions,
    isLoading,
    searchValue: inputValue,
    onSearchValue: propsOnInputChange,
    ...restProps
}: AsyncSelectType) => {
    const lastRequest = useRef<any>();
    const mounted = useRef(false);

    const [isDefaultOption, setIsDefaultOptions] = useState<
        Array<SelectBoxOptionType | GroupOptionsType> | boolean | undefined
    >(propsDefaultOptions || []);

    const [stateInput, setStateInput] = useState<string>(
        typeof inputValue === 'string' ? inputValue : ''
    );
    const [loadedInputValue, setLoadedInputValue] = useState<
        string | undefined
    >(undefined);

    const [isLoadingState, setIsLoadingState] = useState<boolean>(
        propsDefaultOptions === true
    );

    const [loadedOptions, setLoadedOptions] = useState<
        Array<SelectBoxOptionType | GroupOptionsType>
    >([]);
    const [isPassEmptyOptions, setPassEmptyOptions] = useState(false);
    const [optionsCache, setOptionsCache] = useState<
        Record<string, Array<SelectBoxOptionType | GroupOptionsType>>
    >({});

    const [prevDefaultOptions, setPrevDefaultOptions] = useState<
        Array<SelectBoxOptionType | GroupOptionsType> | boolean | undefined
    >(undefined);
    const [prevCacheOptions, setPrevCacheOptions] = useState(undefined);

    if (cacheOptions !== prevCacheOptions) {
        setOptionsCache({});
        setPrevCacheOptions(cacheOptions);
    }

    if (propsDefaultOptions !== prevDefaultOptions) {
        setIsDefaultOptions(
            Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined
        );
        setPrevDefaultOptions(propsDefaultOptions);
    }

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const onLoadOptions = useCallback(
        (
            inputValue: string,
            callback: (
                options?: Array<SelectBoxOptionType | GroupOptionsType>
            ) => void
        ) => {
            if (!propsLoadOptions) return callback();
            const loader = propsLoadOptions(inputValue, callback);
            if (loader && typeof loader.then === 'function') {
                loader.then(callback, () => callback());
            }
        },
        [propsLoadOptions]
    );

    useEffect(() => {
        if (propsDefaultOptions === true) {
            onLoadOptions(stateInput, (options) => {
                if (!mounted.current) return;
                setIsDefaultOptions(options || []);
                setIsLoadingState(!!lastRequest.current);
            });
        }
    }, [onLoadOptions, propsDefaultOptions, stateInput]);

    const onInputChange = useCallback(
        (newValue: any) => {
            const inputValue = handleInputChange(newValue, propsOnInputChange);

            if (!inputValue) {
                lastRequest.current = undefined;
                setStateInput('');
                setLoadedInputValue('');
                setLoadedOptions([]);
                setIsLoadingState(false);
                setPassEmptyOptions(false);
                return;
            }
            if (cacheOptions && optionsCache[inputValue]) {
                setStateInput(inputValue);
                setLoadedInputValue(inputValue);
                setLoadedOptions(optionsCache[inputValue]);
                setIsLoadingState(false);
                setPassEmptyOptions(false);
            } else {
                const request = (lastRequest.current = {});

                setStateInput(inputValue);
                setIsLoadingState(true);
                setPassEmptyOptions(!loadedInputValue);
                onLoadOptions(inputValue, (options) => {
                    if (!mounted.current) return;
                    if (request !== lastRequest.current) return;
                    lastRequest.current = undefined;
                    setIsLoadingState(false);
                    setLoadedInputValue(inputValue);
                    setLoadedOptions(options || []);
                    setPassEmptyOptions(false);
                    setOptionsCache(
                        options
                            ? { ...optionsCache, [inputValue]: options }
                            : optionsCache
                    );
                });
            }
        },
        [
            cacheOptions,
            loadedInputValue,
            optionsCache,
            onLoadOptions,
            propsOnInputChange,
        ]
    );

    const options = isPassEmptyOptions
        ? []
        : stateInput && loadedInputValue
          ? loadedOptions
          : ((isDefaultOption || []) as Array<
                SelectBoxOptionType | GroupOptionsType
            >);
    return {
        ...restProps,
        options,
        onSearchValue: onInputChange,
        isLoading: isLoadingState || isLoading,
        searchValue: stateInput,
    };
};

export { useAsyncSelect };
export function handleInputChange(
    inputValue: string,
    onInputChange?: (newValue: string) => string | void
) {
    if (onInputChange) {
        const newValue = onInputChange(inputValue);
        if (typeof newValue === 'string') return newValue;
    }
    return inputValue;
}
