import { useCallback, useState } from 'react';

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);

    const copy: CopyFn = useCallback(async (text) => {
        // eslint-disable-next-line no-undef
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            // eslint-disable-next-line no-undef
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);
            return false;
        }
    }, []);

    return [copiedText, copy];
}
