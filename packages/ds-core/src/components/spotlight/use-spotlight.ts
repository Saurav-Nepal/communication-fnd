import { useCallback, useMemo } from 'react';

import { HotkeyItem, useHotkeys, useUncontrolled } from '@slabs/ds-hooks';

type SpotlightSearchProps = {
    onOpen?: (e: KeyboardEvent) => void;
    onClose?: () => void;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    keys: string[];
};

const useSpotlight = ({
    onOpen,
    onClose,
    isOpen: isOpenProps,
    setIsOpen: setIsOpenProps,
    keys,
}: SpotlightSearchProps) => {
    const [isOpen, setIsOpen] = useUncontrolled({
        value: isOpenProps,
        defaultValue: false,
        onChange: setIsOpenProps,
    });

    const openSpotlight = useCallback(
        (e: KeyboardEvent) => {
            setIsOpen(true);
            onOpen?.(e);
        },
        [onOpen, setIsOpen]
    );

    const closeSpotlight = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose, setIsOpen]);

    const hotKeys = useMemo(() => {
        return keys.map(
            (hotKey): HotkeyItem => ({
                hotKey,
                handler: (e) => {
                    openSpotlight(e);
                },
            })
        );
    }, [openSpotlight, keys]);

    useHotkeys(hotKeys);

    return {
        isOpen,
        setIsOpen,
        openSpotlight,
        closeSpotlight,
    };
};

export { useSpotlight };
