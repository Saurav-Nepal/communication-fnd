import { useEffect } from 'react';

import {
    getHotkeyHandler,
    getHotkeyMatcher,
    HotkeyItemOptions,
} from './parse-hotkey';

export { getHotkeyHandler };
export type { HotkeyItemOptions };

export type HotkeyItem = {
    hotKey: string;
    handler: (event: KeyboardEvent) => void;
    options?: HotkeyItemOptions;
};

function shouldFireEvent(
    event: KeyboardEvent,
    tagsToIgnore: string[],
    triggerOnContentEditable = false
) {
    if (event.target instanceof HTMLElement) {
        if (triggerOnContentEditable) {
            return !tagsToIgnore.includes(event.target.tagName);
        }

        return (
            !event.target.isContentEditable &&
            !tagsToIgnore.includes(event.target.tagName)
        );
    }

    return true;
}

export function useHotkeys(
    hotkeys: HotkeyItem[],
    tagsToIgnore: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
    triggerOnContentEditable = false
) {
    useEffect(() => {
        const keydownListener = (event: KeyboardEvent) => {
            hotkeys.forEach(
                ({ hotKey, handler, options = { preventDefault: true } }) => {
                    if (
                        getHotkeyMatcher(hotKey)(event) &&
                        shouldFireEvent(
                            event,
                            tagsToIgnore,
                            triggerOnContentEditable
                        )
                    ) {
                        if (options.preventDefault) {
                            event.preventDefault();
                        }

                        handler(event);
                    }
                }
            );
        };

        document.documentElement.addEventListener('keydown', keydownListener);
        return () =>
            document.documentElement.removeEventListener(
                'keydown',
                keydownListener
            );
    }, [hotkeys]);
}
