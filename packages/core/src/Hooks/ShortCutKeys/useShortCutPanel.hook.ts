import { useCallback, useEffect } from 'react';
import { Functions } from '../../Utils/ui.utils';
import { useOperatingSystem } from '../useOperatingSystem.hook';

export const useShortCutPanel = () => {
    const { type: osType } = useOperatingSystem();

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            const isMac = osType === 'mac';

            const hasPressed = isMac ? e.metaKey : e.ctrlKey;

            //ctrl+l or ctrl+shift+l
            if (e?.key === 'u' && hasPressed) {
                Functions.openShortCutKeys();
            }
        },
        [osType]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);
    return {};
};
