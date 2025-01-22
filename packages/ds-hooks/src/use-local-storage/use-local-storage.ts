import { createStorage, readValue } from './create-storage';
import { StorageProperties } from './use-local-storage.types';

export function useLocalStorage<T = string>(props: StorageProperties<T>) {
    return createStorage<T>('localStorage', 'use-local-storage')(props);
}

export const readLocalStorageValue = readValue('localStorage');
