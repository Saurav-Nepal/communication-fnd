import AceEditor, { ICommand } from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-monokai';

import { useCallback, useMemo, useRef } from 'react';

import { formatSqlQuery } from '../../../Utils/sql.editor.utils';

export const SqlEditorComponent = ({ onChange, value }: any) => {
    const editor = useRef<any>();
    const beautifyText = useCallback(
        (value) => {
            const formatted = formatSqlQuery(value);

            onChange(formatted);
        },
        [onChange]
    );

    const commands = useMemo(() => {
        return [
            {
                bindKey: { mac: 'command-b', win: 'ctrl-b' },
                name: 'beautify',
                exec: () => {
                    beautifyText(editor?.current?.props?.value);
                },
            },
        ] as ICommand[];
    }, [beautifyText]);

    return (
        <AceEditor
            ref={editor}
            placeholder='Add Query Here'
            mode='mysql'
            theme='monokai'
            name='Sql Editor'
            onChange={onChange}
            fontSize={14}
            lineHeight={19}
            scrollMargin={[10, 10]}
            showPrintMargin={true}
            showGutter={true}
            value={value}
            commands={commands}
            style={{ width: '100%' }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: false,
            }}
        />
    );
};
