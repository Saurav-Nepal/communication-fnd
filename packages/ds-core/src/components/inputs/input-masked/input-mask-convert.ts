import { useCallback, useEffect, useState } from 'react';

export type DateFormat =
    | 'MM/DD/YYYY'
    | 'DD/MM/YYYY'
    | 'YYYY-MM-DD'
    | 'YY-MM-DD'
    | 'YY/MM/DD'
    | 'HH:MM';

export const useDateMask = (
    format: DateFormat = 'MM/DD/YYYY',
    initialValue: string = ''
) => {
    const [value, setValue] = useState(initialValue);
    const [formattedValue, setFormattedValue] = useState('');

    const formatDate = useCallback(
        (input: string) => {
            const cleanInput = input.replace(/\D/g, '');
            const formatParts = format.split(/[/-]/);
            let formatted = '';
            let inputIndex = 0;

            for (let i = 0; i < formatParts?.length; i++) {
                const partLength = formatParts[i]?.length;
                const part = cleanInput.substr(inputIndex, partLength);

                if (part) {
                    formatted += part;
                    inputIndex += part.length;

                    if (
                        part.length === partLength &&
                        i < formatParts.length - 1 &&
                        cleanInput.length > inputIndex
                    ) {
                        formatted += format[formatted.length];
                    }
                } else {
                    break;
                }
            }

            return formatted;
        },
        [format]
    );

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value.replace(/\D/g, '');
            setValue(newValue);
            setFormattedValue(formatDate(newValue));
        },
        [formatDate]
    );

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
            setFormattedValue(formatDate(initialValue));
        }
    }, [initialValue, formatDate]);

    const getPlaceholder = useCallback(() => format, [format]);

    return {
        value,
        onChange,
        formattedValue,
        placeholder: getPlaceholder(),
    };
};
