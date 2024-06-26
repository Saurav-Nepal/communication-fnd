import React, { createContext, useContext } from 'react';

const createSafeContext = <TContextValue,>(errorMessage: string) => {
    const Context = createContext<TContextValue | null>(null);

    const useSafeContext = () => {
        const ctx = useContext(Context);

        if (ctx === null) {
            throw new Error(errorMessage);
        }

        return ctx;
    };

    const Provider = ({
        children,
        value,
    }: {
        value: TContextValue;
        children: React.ReactNode;
    }) => <Context.Provider value={value}>{children}</Context.Provider>;

    return [Provider, useSafeContext] as const;
};

const ctx = createSafeContext<any>(
    'ArcCard must be used within ArcCardProvider'
);

export { createSafeContext, ctx };
