import { useEffect } from 'react';

export function useWindowEvent<TEvent extends string>(
    type: TEvent,
    listener: TEvent extends keyof WindowEventMap
        ? (this: Window, ev: WindowEventMap[TEvent]) => void
        : (this: Window, ev: CustomEvent) => void,
    options?: boolean | AddEventListenerOptions
) {
    useEffect(() => {
        // eslint-disable-next-line no-undef
        window.addEventListener(type as any, listener, options);
        // eslint-disable-next-line no-undef
        return () => window.removeEventListener(type as any, listener, options);
    }, [type, listener]);
}
