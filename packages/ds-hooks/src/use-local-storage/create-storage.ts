import { useCallback, useEffect, useState } from 'react';

import { useWindowEvent } from '../use-window-event/use-window-event';
import { StorageProperties, StorageType } from './use-local-storage.types';

function serializeJSON<T>(value: T, hookName: string = 'use-local-storage') {
    try {
        return JSON.stringify(value);
    } catch (error) {
        throw new Error(
            `@slabs/hooks ${hookName}: Failed to serialize the value`
        );
    }
}

function deserializeJSON(value: string | undefined) {
    try {
        return value && JSON.parse(value);
    } catch {
        return value;
    }
}

const CreateStorageHandler = (
    type: StorageType,
    hookName: string = 'use-local-storage'
) => {
    const getItem = (key: string) => {
        try {
            // eslint-disable-next-line no-undef
            return window[type].getItem(key);
        } catch (error) {
            console.warn(
                `@slabs/hooks ${hookName}: Failed to get item from ${type}`
            );
            return null;
        }
    };

    const setItem = (key: string, value: string) => {
        try {
            // eslint-disable-next-line no-undef
            window[type].setItem(key, value);
        } catch (error) {
            console.warn(
                `@slabs/hooks ${hookName}: Failed to set item in ${type}`
            );
        }
    };

    const removeItem = (key: string) => {
        try {
            // eslint-disable-next-line no-undef
            window[type].removeItem(key);
        } catch (error) {
            console.warn(
                `@slabs/hooks ${hookName}: Failed to remove item from ${type}`
            );
        }
    };

    return {
        getItem,
        setItem,
        removeItem,
    };
};

export function createStorage<T>(type: StorageType, hookName: string) {
    const eventName =
        type === 'localStorage' ? 'slab-local-storage' : 'slab-session-storage';

    const { getItem, setItem, removeItem } = CreateStorageHandler(
        type,
        hookName
    );

    return function useStorage({
        key,
        defaultValue,
        getInitialValueInEffect = true,
        deserialize = deserializeJSON,
        serialize = (value: T) => serializeJSON(value, hookName),
    }: StorageProperties<T>) {
        const readStorageValue = useCallback(
            (skipStorage?: boolean) => {
                let storageBlockedOrSkipped;
                try {
                    storageBlockedOrSkipped =
                        typeof window === 'undefined' ||
                        // eslint-disable-next-line no-undef
                        !(type in window) ||
                        // eslint-disable-next-line no-undef
                        window[type] === null ||
                        !!skipStorage;
                } catch (_e) {
                    storageBlockedOrSkipped = true;
                }

                if (storageBlockedOrSkipped) {
                    return defaultValue as T;
                }

                const storageValue = getItem(key);
                return storageValue !== null
                    ? deserialize(storageValue)
                    : (defaultValue as T);
            },
            [key, defaultValue, getItem, deserialize]
        );

        const [value, setValue] = useState<T>(
            readStorageValue(getInitialValueInEffect)
        );

        const setStorageValue = useCallback(
            (val: T | ((prevState: T) => T)) => {
                if (val instanceof Function) {
                    setValue((current) => {
                        const result = val(current);
                        setItem(key, serialize(result));
                        // eslint-disable-next-line no-undef
                        window.dispatchEvent(
                            new CustomEvent(eventName, {
                                detail: { key, value: val(current) },
                            })
                        );
                        return result;
                    });
                } else {
                    setItem(key, serialize(val));
                    // eslint-disable-next-line no-undef
                    window.dispatchEvent(
                        new CustomEvent(eventName, {
                            detail: { key, value: val },
                        })
                    );
                    setValue(val);
                }
            },
            [key]
        );

        const removeStorageValue = useCallback(() => {
            removeItem(key);
            // eslint-disable-next-line no-undef
            window.dispatchEvent(
                new CustomEvent(eventName, {
                    detail: { key, value: defaultValue },
                })
            );
        }, []);

        useWindowEvent('storage', (event) => {
            // eslint-disable-next-line no-undef
            if (event.storageArea === window[type] && event.key === key) {
                setValue(deserialize(event.newValue ?? undefined));
            }
        });

        useWindowEvent(eventName, (event) => {
            if (event.detail.key === key) {
                setValue(event.detail.value);
            }
        });

        useEffect(() => {
            if (defaultValue !== undefined && value === undefined) {
                setStorageValue(defaultValue);
            }
        }, [defaultValue, value, setStorageValue]);

        useEffect(() => {
            const val = readStorageValue();
            val !== undefined && setStorageValue(val);
        }, []);

        return [value ?? defaultValue, setStorageValue, removeStorageValue] as [
            T,
            (val: T | ((prevState: T) => T)) => void,
            () => void,
        ];
    };
}

export function readValue(type: StorageType) {
    const { getItem } = CreateStorageHandler(type);

    return function read<T>({
        key,
        defaultValue,
        deserialize = deserializeJSON,
    }: StorageProperties<T>) {
        let storageBlockedOrSkipped;

        try {
            storageBlockedOrSkipped =
                typeof window === 'undefined' ||
                // eslint-disable-next-line no-undef
                !(type in window) ||
                // eslint-disable-next-line no-undef
                window[type] === null;
        } catch (_e) {
            storageBlockedOrSkipped = true;
        }

        if (storageBlockedOrSkipped) {
            return defaultValue as T;
        }

        const storageValue = getItem(key);
        return storageValue !== null
            ? deserialize(storageValue)
            : (defaultValue as T);
    };
}
