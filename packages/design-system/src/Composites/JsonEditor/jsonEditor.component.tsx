'use client';

import 'jsoneditor/dist/jsoneditor.css';
import { useEffect, useMemo, useRef } from 'react';
import { JSONEditorProps } from './jsonEditor.types';

export const JSONEditor = ({
    value,
    defaultValue = {},
    onChange = () => {},
    mode = 'code',
    statusBar = false,
    mainMenuBar = false,
    debug = false,
}: JSONEditorProps) => {
    const jsonEditorRef = useRef<any>(null);
    const editor = useRef<any>(null);

    const options = useMemo(
        () => ({
            mode,
            mainMenuBar,
            statusBar,
            onChange: () => {
                try {
                    onChange(editor.current.get());
                } catch {
                    if (!debug) return;
                    console.error('invalid json', editor.current.getText());
                }
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [mode, statusBar, mainMenuBar, debug]
    );

    useEffect(() => {
        if (!jsonEditorRef.current) return null;

        const initJsonEditor = async () => {
            const { default: Editor } = await import('jsoneditor');
            editor.current = new Editor(jsonEditorRef.current, options);
            setValue(value || defaultValue);
        };

        initJsonEditor();

        return () => {
            if (editor.current) {
                editor?.current?.destroy();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jsonEditorRef, options]);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const setValue = (value: any) => {
        if (!editor.current || value === undefined) return;

        if (typeof value === 'string') {
            editor.current.set(JSON.parse(value));
            return;
        }

        editor.current.set(value);
    };

    return <div className='json-editor-wrapper' ref={jsonEditorRef} />;
};
