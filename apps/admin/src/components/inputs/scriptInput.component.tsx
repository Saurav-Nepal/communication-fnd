import { Component, lazy, Suspense } from 'react';

import { SelectFromOptions } from '@/utils/common.utils';

import { CodeEditor } from '../codeEditor/codeEditor.component';

const Editor = lazy(() => import('@/components/aceEditor/aceEditor.component'));
const MODES = [
    { id: 1, name: 'Javascript', value: 'javascript' },
    { id: 2, name: 'PHP', value: 'php' },
    { id: 3, name: 'CSS', value: 'css' },
    { id: 4, name: 'SQL', value: 'sql' },
];

interface PROPS {
    column: any;
    payload: any;
    value: string;
    mode?: number;
    columns?: string;
    inline?: object;
    disabled?: boolean;
    onSave: (scriptId: number | null, options: object) => void;
    dontUpdateScript?: boolean;
}

interface STATE {
    column: any;
    mode: number;
    payload: any;
    value: string | null;
    script: string;
    columns: any;
    inline?: object;
    disabled?: boolean;
}
export class ScriptInput extends Component<PROPS, STATE> {
    constructor(props: PROPS) {
        super(props);

        const mode = SelectFromOptions(MODES, props.mode, 'value'); //This functions automatically selects the value from options based on the given input

        this.state = {
            column: this.props.column,
            mode,
            payload: this.props.payload,
            value: this.props.value,
            script: '',
            columns: this.props.columns,
            inline: props.inline,
            disabled: this.props.disabled,
        };
        this.onSubmit.bind(this);
    }

    onSubmit = (scriptId = null) => {
        this.setState({ value: scriptId });
        this.props.onSave(scriptId, { saveWhileTyping: true });
    };

    deleteScript = async () => {
        this.props.onSave(null, {});
    };

    onChange = (newValue, isOneTime) => {
        this.setState({ value: newValue });
        if (isOneTime) {
            this.props.onSave(newValue, { saveWhileTyping: false });
        }
    };

    render() {
        const { payload, column, value, disabled, mode } = this.state;
        const { inline, dontUpdateScript } = this.props;

        return (
            <div className='script-input'>
                {
                    // For inline
                    column.name.indexOf('_id') == -1 &&
                    (payload.method == 'edit' || payload.method == 'add') ? ( //Execute this only if method is either add or Edit And column name contains _id
                        <div className='input-code-editor'>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Editor
                                    disabled={disabled}
                                    onChange={this.onChange}
                                    value={value ?? ''}
                                    toolBar={false}
                                    onSubmit={this.onSubmit}
                                    modeType={mode}
                                    modes={MODES}
                                />
                            </Suspense>
                        </div>
                    ) : (
                        // For Outline editor
                        <div className='editor-actions row'>
                            <div className='col'>
                                <CodeEditor
                                    inline={inline}
                                    column={column}
                                    payload={payload}
                                    onSubmit={this.onSubmit}
                                    scriptId={value}
                                    dontUpdateScript={!!dontUpdateScript}
                                    onChange={(script) => {
                                        this.setState({ script });
                                        this.onChange(script, false);
                                    }}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}
