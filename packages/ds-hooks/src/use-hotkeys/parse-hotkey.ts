export type KeyboardModifiers = {
    alt: boolean;
    ctrl: boolean;
    meta: boolean;
    mod: boolean;
    shift: boolean;
};

export type Hotkey = KeyboardModifiers & {
    key?: string;
};

type CheckHotkeyMatch = (event: KeyboardEvent) => boolean;

export function parseHotkey(hotkey: string): Hotkey {
    const keys = hotkey
        .toLowerCase()
        .split('+')
        .map((part) => part.trim());

    const modifiers: KeyboardModifiers = {
        alt: keys.includes('alt'),
        ctrl: keys.includes('ctrl'),
        meta: keys.includes('meta'),
        mod: keys.includes('mod'),
        shift: keys.includes('shift'),
    };

    const reservedKeys = ['alt', 'ctrl', 'meta', 'shift', 'mod'];

    const freeKey = keys.find((key) => !reservedKeys.includes(key));

    return {
        ...modifiers,
        key: freeKey,
    };
}

function isExactHotkey(hotkey: Hotkey, event: KeyboardEvent): boolean {
    const {
        alt: isAltHotKey,
        ctrl: isCtrlHotKey,
        meta: isMetaHotKey,
        mod: isModHotKey,
        shift: isShiftHotKey,
        key,
    } = hotkey;
    const {
        altKey: isAltPressed,
        ctrlKey: isCtrlPressed,
        metaKey: isMetaPressed,
        shiftKey: isShiftPressed,
        key: pressedKey,
    } = event;

    if (isAltHotKey !== isAltPressed) {
        return false;
    }

    if (isModHotKey) {
        if (!isCtrlPressed && !isMetaPressed) {
            return false;
        }
    } else {
        if (isCtrlHotKey !== isCtrlPressed) {
            return false;
        }
        if (isMetaHotKey !== isMetaPressed) {
            return false;
        }
    }
    if (isShiftHotKey !== isShiftPressed) {
        return false;
    }

    if (
        key &&
        (pressedKey.toLowerCase() === key.toLowerCase() ||
            event.code.replace('Key', '').toLowerCase() === key.toLowerCase())
    ) {
        return true;
    }

    return false;
}

export function getHotkeyMatcher(hotkey: string): CheckHotkeyMatch {
    return (event) => isExactHotkey(parseHotkey(hotkey), event);
}

export interface HotkeyItemOptions {
    preventDefault?: boolean;
}

type HotkeyItem = [string, (event: any) => void, HotkeyItemOptions?];

export function getHotkeyHandler(hotkeys: HotkeyItem[]) {
    return (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
        const _event = 'nativeEvent' in event ? event.nativeEvent : event;
        hotkeys.forEach(
            ([hotkey, handler, options = { preventDefault: true }]) => {
                if (getHotkeyMatcher(hotkey)(_event)) {
                    if (options.preventDefault) {
                        event.preventDefault();
                    }

                    handler(_event);
                }
            }
        );
    };
}
