import { createStorage, readValue } from '../use-local-storage/create-storage';
import { StorageProperties } from '../use-local-storage/use-local-storage.types';

export function useSessionStorage<T = string>(props: StorageProperties<T>) {
    return createStorage<T>('sessionStorage', 'use-session-storage')(props);
}

export const readSessionStorageValue = readValue('sessionStorage');
