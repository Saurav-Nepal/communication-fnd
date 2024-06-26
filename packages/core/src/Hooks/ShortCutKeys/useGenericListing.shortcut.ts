import { useCallback, useEffect, useRef } from 'react';

import { Modal } from '@finnoto/design-system';

import { useOperatingSystem } from '../useOperatingSystem.hook';

export const useGenericListingShortCut = () => {
    const { type: osType } = useOperatingSystem();
    const searchRef = useRef<any>(null);

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            const isMac = osType === 'mac';

            const hasPressed = isMac ? e.metaKey : e.ctrlKey;

            //ctrl+l or ctrl+shift+l
            if (e?.key === '/' && hasPressed) {
                e.preventDefault();
                searchRef?.current?.focus();
                Modal.close();
            }
        },
        [osType]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return {
        searchRef,
    };
};
