import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Ace } from 'ace-builds';
import AceEditor from 'react-ace';
import { HotKeys } from 'react-hotkeys';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'js-beautify';

import { Button, ParseToSelectBoxOption, SelectBox } from '@slabs/ds-core';

import { GLOBAL } from '@/constants/global.constants';
import { Get } from '@/services';
import { SelectFromOptions } from '@/utils/common.utils';
import { GetItem, SetItem } from '@/utils/localStorage.utils';

type PROPS = {
    toolBar?: boolean;
    onSubmit?: any;
    modes?: any[];
    disabled?: boolean;
    value?: string;
    onChange?: any;
    onModeChange?: any;
    modeType: number;
    onInput?: (editor: Ace.Editor) => void;
    height?: string;
};

const maxFontSize = 16;
const minFontSize = 10;
const SCRIPT_FONT_SIZE = 'SCRIPT_FONT_SIZE';
const DEFAULT_FONT_SIZE = 14;

export const Editor = forwardRef(
    (
        {
            toolBar,
            onSubmit,
            modes: propModes,
            disabled,
            value: propValue,
            onChange,
            modeType,
            onModeChange,
            height,
            onInput = () => {},
        }: PROPS,
        ref: any
    ) => {
        const editorRef = useRef<any>(null);

        const beautifyOptions = {
            indent_size: 2,
            space_in_empty_paren: true,
            space_in_paren: true,
            max_preserve_newlines: 1,
        };

        const [value, setValue] = useState<string>(propValue ?? '');
        const [MODES, setMODES] = useState<any[]>(propModes ? propModes : []);
        const [mode, setMode] = useState<any>({});
        const [fontSize, setFontSize] = useState<number>(
            GetItem(SCRIPT_FONT_SIZE) || DEFAULT_FONT_SIZE
        );

        useEffect(() => {
            if (propModes) {
                setMode(SelectFromOptions(propModes, modeType, 'id'));
            } else {
                setModeData();
            }
        }, [propModes]);

        useEffect(() => {
            if (onModeChange) {
                onModeChange(mode);
            }
        }, [mode]);

        /* This method is retrieving array of MODES{javascript,html,php ..etc}
         * And setting current mode which is used in SelectBox */
        const setModeData = async () => {
            const newModes = await getScript();
            setMODES(newModes);
            setMode(SelectFromOptions(newModes, modeType, 'id'));
        };

        /* This method will return an array of objects used to show {php,sql,javascript ..etc} options in Script  */
        const getScript = async () => {
            const url =
                'api/data/ca12043141c4bbc3b08a13bd8dfa9bc8?query=lookup_type_id=2';
            const result = await Get({ url, urlPrefix: GLOBAL.ROUTE_URL });
            if (result.success) {
                return result.response;
            }
        };

        //Introducing Command + E buttons
        const keyMap = {
            beautify: 'meta+e',
        };

        // beautify  function contains the function to be beautify the script in code editor
        const handlers = {
            beautify: () => getBeautifyScript(),
        };

        // use for beautyfy the script code in code editor
        const getBeautifyScript = useCallback(() => {
            const beautify = require('js-beautify').js;
            const newVal = beautify(value, beautifyOptions);
            // this.props.onChange(value, true)
            setValue(newVal);
        }, [value, setValue]);

        const formatMode = (modeVal) => {
            switch (modeVal) {
                case 'js language':
                    return 'javascript';
                case 'ts':
                    return 'typescript';
                case 'sql language':
                    return 'sql';
                case 'php language':
                    return 'php';
                case 'html language':
                    return 'html';
                default:
                    return modeVal;
            }
        };

        // useImperativeHandle(
        //     ref,
        //     () => ({
        //         editor: editorRef.current,
        //     }),
        //     [editorRef]
        // );

        return (
            <HotKeys keyMap={keyMap} handlers={handlers}>
                <div className='editor-block'>
                    <div className='editor-body'>
                        {
                            /** toolbar when toolBar value will be true */
                            toolBar ? (
                                <div className='absolute flex gap-2 script-controls items-center top-[1%] right-14'>
                                    <Button
                                        id='submit-script-inline'
                                        onClick={() => onSubmit(true, mode)}
                                        size='sm'
                                        shape='square'
                                    >
                                        <i className='fa fa-save' />
                                    </Button>

                                    <Button
                                        id='submit-script-inline'
                                        onClick={() => getBeautifyScript()}
                                        size='sm'
                                        shape='square'
                                    >
                                        <i
                                            className='fa fa-code'
                                            aria-hidden='true'
                                        />
                                    </Button>

                                    <Button
                                        disabled={fontSize >= maxFontSize}
                                        onClick={() => {
                                            const newFontSize =
                                                fontSize >= maxFontSize
                                                    ? maxFontSize
                                                    : fontSize + 1;
                                            SetItem(SCRIPT_FONT_SIZE, fontSize);
                                            setFontSize(newFontSize);
                                        }}
                                        size='sm'
                                        shape='square'
                                    >
                                        <i className='fa fa-search-plus' />
                                    </Button>

                                    <Button
                                        disabled={fontSize <= minFontSize}
                                        onClick={() => {
                                            const newFontSize =
                                                fontSize <= minFontSize
                                                    ? minFontSize
                                                    : fontSize - 1;
                                            SetItem(SCRIPT_FONT_SIZE, fontSize);
                                            setFontSize(newFontSize);
                                        }}
                                        size='sm'
                                        shape='square'
                                    >
                                        <i className='fa fa-search-minus' />
                                    </Button>

                                    <SelectBox
                                        onChange={setMode}
                                        value={mode}
                                        options={ParseToSelectBoxOption({
                                            data: MODES,
                                            labelKey: 'name',
                                        })}
                                        placeholder='Mode'
                                        size='sm'
                                        isClearable={false}
                                        className='w-40'
                                        // field='name'
                                        // menuPlacement={'top'}
                                    />
                                </div>
                            ) : null
                        }
                        {/** editor body*/}
                        <AceEditor
                            mode={formatMode(mode?.value) || 'javascript'}
                            theme='monokai'
                            name='SK-Code-editor'
                            width='100%'
                            height={height || '80vh'}
                            value={value}
                            onChange={(editorVal) => {
                                setValue(editorVal);
                                onChange(editorVal, true);
                            }}
                            readOnly={disabled}
                            fontSize={fontSize}
                            setOptions={{
                                // enableBasicAutocompletion: true,
                                // enableLiveAutocompletion: true,
                                // enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                                useWorker: false,
                            }}
                            commands={[
                                {
                                    /* commands is array of key bindings. */
                                    name: 'savingChanges' /* name for the key binding. */,
                                    bindKey: {
                                        win: 'Ctrl-s',
                                        mac: 'Command-s',
                                    } /* key combination used for the command. */,
                                    exec: () => {
                                        onSubmit(true, mode);
                                    } /* function to execute when keys are pressed. */,
                                },
                                {
                                    name: 'beautify script',
                                    bindKey: {
                                        win: 'Ctrl-e',
                                        mac: 'Command-e',
                                    },
                                    exec: () => {
                                        getBeautifyScript();
                                    },
                                },
                            ]}
                            showPrintMargin
                            showGutter
                            highlightActiveLine
                            ref={ref}
                            onInput={() => {
                                onInput(editorRef.current);
                                // editorRef.current?.getSession().setAnnotations([
                                //     {
                                //         text: 'test',
                                //         type: 'error',
                                //         column: 4,
                                //         row: 2,
                                //     },
                                // ]);
                            }}
                            onLoad={(editor) => {
                                editorRef.current = editor;
                            }}
                        />
                    </div>
                </div>
            </HotKeys>
        );
    }
);

export default Editor;
