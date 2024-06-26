let storeEngine: unknown = null;

export const InitializeSessionStorageUtils = ({
    engine,
}: {
    engine: unknown;
}) => {
    storeEngine = engine;
};

export const GetItem = (key: string) => {
    if (!isSessionStorage(storeEngine)) return null;

    return storeEngine.getItem(key);
};

export const SetItem = (key: string, value: string) => {
    if (!isSessionStorage(storeEngine)) return;

    storeEngine.setItem(key, value);
};

export const RemoveItem = (key: string) => {
    if (!isSessionStorage(storeEngine)) return;

    storeEngine.removeItem(key);
};

const isSessionStorage = (storage: unknown): storage is Storage => {
    if (typeof window !== 'undefined' && storage instanceof window.Storage)
        return true;
    return false;
};
