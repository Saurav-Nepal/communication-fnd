import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { Editor } from 'slate';

export const useRichText = ({ editor, state }: any) => {
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ]);

    const handleEditorChange = (newValue) => {
        setValue(newValue);
    };

    const handleStatus = (status, key: string, update: boolean = false) => {
        if (!status) return Editor.removeMark(editor, key);
        return Editor.addMark(editor, key, true);
    };

    useUpdateEffect(() => {
        handleStatus(state.bold, 'bold');
        handleStatus(state.italic, 'italic');
        handleStatus(state.underline, 'underline');
    }, [state]);

    return {
        value,
        handleEditorChange,
        handleStatus,
    };
};
