import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useList, useUpdateEffect } from 'react-use';

import { ChatDataPayload, FileData } from '../../Types';
import { IsEmptyArray, IsValidString } from '../../Utils/common.utils';

export const useChatBox = ({ onSend, data }) => {
    const chatbox = useRef<any>();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [files, { set: setFiles, removeAt, reset: resetFiles }] =
        useList<FileData>([]);
    const [filterState, setFilterState] = useState('fullchat');

    const isValidInputs = useMemo(
        () => IsValidString(message) || !IsEmptyArray(files),
        [message, files]
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isValidInputs || !onSend) return;

        setLoading(true);
        onSend({ message, attachments: files }, resetForm);
    };

    const resetForm = useCallback(() => {
        setMessage('');
        resetFiles();
        setLoading(false);
    }, [resetFiles]);

    useUpdateEffect(() => {
        if (chatbox?.current) {
            chatbox.current.scroll({
                top: chatbox.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [data]);

    const filteredData = useMemo(() => {
        if (IsEmptyArray(data)) return [];
        if (filterState === 'fullchat') return data;

        const newData: ChatDataPayload[] = [];

        data.map((value) => {
            if (filterState === 'document') {
                if (!IsEmptyArray(value.attachments))
                    return newData.push(value);
                return null;
            }

            if (!IsEmptyArray(value.attachments)) return null;

            newData.push(value);
            return null;
        });

        return newData;
    }, [data, filterState]);
    return {
        filterState,
        setFilterState,
        filteredData,
        removeAt,
        isValidInputs,
        loading,
        files,
        handleSubmit,
        chatbox,
        message,
        setMessage,
        setFiles,
    };
};
