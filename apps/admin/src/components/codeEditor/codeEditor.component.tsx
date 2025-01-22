/**
 * Opens code editor in modal
 * https://github.com/securingsincity/react-ace is used for code editor
 * Supports javascript, php, sql, css
 *
 * Accepts value, mode, isVisible props
 */

import { Component, lazy, Suspense } from 'react';

import { Button, Input } from '@slabs/ds-core';
import { ConfirmUtil, Modal } from '@slabs/ds-dialog';

import { GLOBAL } from '@/constants/global.constants';
import { Get, Post, Put } from '@/services';
import { SaveScript, SaveScriptInListing } from '@/utils/script.utils';
import { Toast } from '@/utils/toast.utils';

const Editor = lazy(() => import('@/components/aceEditor/aceEditor.component'));
let tempScript = ''; // used to keep track, if script has been changed

type COLUMN = {
    display_name: string;
    id: number;
    model_id: any;
    name: string;
    nullable: boolean;
    parent: string;
    path: string;
    query_params: any;
    reference_model: object;
    required: boolean;
    type_id: number;
    uiActions: any;
    visibility: boolean;
};

type PAYLOAD = {
    relationship: {
        related_model: any;
        name: string;
    };
    modelHash: string;
    data: {
        id: number;
    };
    method: string;
};
interface PROPS {
    buttonComponent?: any;
    column: COLUMN;
    dontUpdateScript: boolean;
    inline: any;
    onChange: (script: string) => void;
    onSubmit: (number, object) => void;
    payload: PAYLOAD;
    scriptId: string | number | null;
    //Optional
    data?: any;
    identifier?: any;
    listingRow?: object;
    menuUrl?: string;
    modelHash?: any;
    name?: string;
    selectedColumn?: any;
    script?: string;
}

interface STATE {
    scriptId?: number | null;
    selected?: boolean;
    scriptName?: string | null;
    mode?: object;
    script?: string;
}
export class CodeEditor extends Component<PROPS, STATE> {
    state: STATE = {};
    constructor(props) {
        super(props);
        tempScript = props.script;

        this.state = {
            scriptId: this.props.listingRow
                ? this.props.data
                : this.props.scriptId, //Stores Script ID - Integer
            // script: props.script || ''     //Stores Script - String
            selected: false,
            scriptName: null,
            mode: {},
        };
    }

    onChange = (newValue) => {
        const { onChange, listingRow } = this.props;
        this.setState({ script: newValue });

        if (!listingRow) {
            onChange(newValue);
        }
    };

    /**
     use for open the code editor
    */
    openModal = (script_type_id) => {
        const { script, scriptName } = this.state;

        Modal.open({
            headingTitle: 'Code Editor',
            modalSize: 'wide',
            component: () => (
                <div>
                    <div className='flex items-center mx-4 my-2'>
                        <div className='flex-auto mr-2'>
                            <div className='text-input'>
                                <Input
                                    name='script-name'
                                    className='form-control'
                                    placeholder='Enter Script Name'
                                    onChange={(e) =>
                                        this.setState({
                                            scriptName:
                                                e.target.value.length > 0
                                                    ? e.target.value
                                                    : null,
                                        })
                                    }
                                    aria-autocomplete='none'
                                    defaultValue={scriptName ?? undefined}
                                />
                            </div>
                        </div>
                        <div className=''>
                            <Button onClick={() => this.onSubmit(true)}>
                                Save Script
                            </Button>
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Editor
                            onChange={this.onChange}
                            value={script}
                            onSubmit={this.onSubmit}
                            onModeChange={(mode) => this.setState({ mode })}
                            modeType={script_type_id} // PHP, JavaScript, etc etc
                            toolBar
                        />
                    </Suspense>
                </div>
            ),
        });
    };

    // Open the editor
    openEditor = async (event: any) => {
        const { RECORD_URL, DATA_URL } = GLOBAL;
        // If meta key or ctrl is pressed , open in new editor
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        // If there is script id , load it
        if (this.state.scriptId) {
            const { success, response } = await Get({
                url: 'system-script/' + this.state.scriptId,
                urlPrefix: DATA_URL,
            });
            if (success) {
                this.state.script = response.script;
                this.state.scriptName = response.name;

                this.setState(this.state);

                const script_type_id = response.type_id;
                this.openModal(script_type_id);
            }
        } else {
            // Else show plain editor
            // Create a Dummy  script
            const {
                payload,
                column,
                listingRow,
                modelHash,
                identifier,
                selectedColumn,
            } = this.props;

            // Assign the name to
            // const name = payload.relationship.related_model ? payload.relationship.related_model.name : payload.relationship.name;

            let name = '';
            let params;
            // Adding script From listing page
            if (listingRow) {
                params = {
                    name: this.props.name + ' Script',
                    description: this.props.name + ' Script for ' + '',
                    source_type: modelHash,
                    source_id: listingRow[identifier + '.id'],
                    source_column: `${selectedColumn.name}`,
                };
                const createScript = async () => {
                    const result = await Post({
                        url: 'system-script',
                        params,
                        urlPrefix: RECORD_URL,
                    });
                    if (result.success) {
                        Put({
                            url:
                                this.props.menuUrl?.split('/')[1] +
                                '/' +
                                listingRow[identifier + '.id'],
                            data: {
                                [selectedColumn.name]: result.response.id,
                            },
                            urlPrefix: RECORD_URL,
                        });
                        this.setState({ scriptId: result.response.id });
                    }
                };
                ConfirmUtil({
                    message: 'Are you sure you want to add the script ?',
                    onConfirmPress: createScript,
                    confirmAppearance: 'success',
                });
                debugger;
            } else {
                // Adding script From Form
                if (payload && payload.relationship) {
                    if (payload.relationship.related_model) {
                        name = payload.relationship.related_model;
                    } else if (payload.relationship.name) {
                        name = payload.relationship.name;
                    }
                }
                params = {
                    name: name + ' Script',
                    description: name + ' Script for ' + '',
                    source_type: payload.modelHash,
                    source_id: payload.data.id,
                    source_column: column.name,
                };

                const createScript = async () => {
                    const result = await Post({
                        url: 'system-script',
                        data: params,
                        urlPrefix: RECORD_URL,
                    });
                    if (result.success) {
                        this.props.onSubmit(result.response.id, {});
                        this.state.scriptId = result.response.id;
                        this.setState({ scriptId: result.response.id }, () => {
                            this.openEditor(event);
                        });
                    }
                };
                ConfirmUtil({
                    message: 'Are you sure you want to add the script ?',
                    onConfirmPress: createScript,
                    confirmAppearance: 'success',
                });
            }
        }
    };
    /**
     * @param  {boolean} save
     * 'save' variable  will prevent to close the script, now only submit button will save and close the script.
     * @param {object} mode
     *  'mode' variable have script type id (ie. php:12 , javascript: 11 ...etc.)
     */
    onSubmit = async (save = false, mode = null) => {
        const seletedMode = mode || this.state.mode;

        const {
            payload,
            column,
            dontUpdateScript,
            onSubmit,
            listingRow,
            modelHash,
            name,
            identifier,
            selectedColumn,
        } = this.props;
        const { scriptId, script, scriptName } = this.state;
        let result;
        if (dontUpdateScript) {
            onSubmit(scriptId, { saveWhileTyping: true }); //saveWhileTyping is the flag that saves data locally while typing if saveWhileTyping==true
            return;
        }

        if (listingRow) {
            result = await SaveScriptInListing({
                listingRow,
                modelHash,
                script,
                scriptId,
                name,
                identifier,
                selectedColumn,
                mode: seletedMode,
                scriptName,
            });
        } else {
            result = await SaveScript({
                payload,
                column,
                script,
                scriptId,
                mode: seletedMode,
                scriptName,
            });
        }
        if (result.success) {
            tempScript = this.state.script ?? '';
        }
        if (!save) {
            Modal.close();
        }
        Toast.success({
            title: 'Success',
            description: 'Changes saved in script',
        });
    };

    removeScript = async () => {
        const { RECORD_URL } = GLOBAL;
        const { listingRow, identifier, selectedColumn } = this.props;
        const removeConfirm = async () => {
            if (listingRow) {
                Put({
                    url:
                        this.props.menuUrl?.split('/')[1] +
                        '/' +
                        listingRow[identifier + '.id'],
                    data: { [selectedColumn.name]: null },
                    urlPrefix: RECORD_URL,
                });
            } else {
                this.props.onSubmit(null, {});
            }

            this.setState({ scriptId: null });
        };
        ConfirmUtil({
            message: 'Are you sure you want to remove the script',
            onConfirmPress: removeConfirm,
        });
    };

    selectScript = (data) => {
        if (data) {
            this.props.onSubmit(data.id, {});
            this.setState({ scriptId: data.id, selected: true });
        }
    };

    unselectScript = () => {
        this.props.onSubmit(null, {});
        this.setState({ scriptId: null, selected: false });
    };

    render() {
        // const { column, payload } = this.props;
        const { scriptId, selected } = this.state;

        return (
            <div>
                {this.props.listingRow ? (
                    <div>
                        <span>
                            <Button
                                onClick={(e) => this.openEditor(e)}
                                id='listing-script-icon'
                                className='listing-script-icon'
                                type='button'
                            >
                                {scriptId ? 'Edit' : 'Add' /* NOSONAR */}{' '}
                            </Button>
                        </span>
                        <span>
                            {scriptId && (
                                <Button
                                    onClick={this.removeScript}
                                    id='listing-script-icon'
                                    className='listing-script-icon'
                                    type='button'
                                >
                                    Remove
                                </Button>
                            )}
                        </span>
                    </div>
                ) : (
                    <div className='flex'>
                        {!scriptId && (
                            <div className='inline'>
                                <Button
                                    onClick={(e) => this.openEditor(e)}
                                    color='primary'
                                    type='button'
                                    size={'sm'}
                                >
                                    Add Script
                                </Button>
                            </div>
                        )}

                        {scriptId && (
                            <div className='inline'>
                                <Button
                                    onClick={(e) => this.openEditor(e)}
                                    color='primary'
                                    type='button'
                                    size={'xs'}
                                >
                                    Edit Script
                                </Button>
                            </div>
                        )}

                        {/* {!scriptId && column && (
                            <div className="flex flex-row w-full">
                                <div className="flex-1">
                                    <ReferenceInput
                                        column={column}
                                        name={column.name}
                                        placeholder="Select Script"
                                        onChange={this.selectScript}
                                    />
                                </div>
                                {payload.method !== 'add' && (
                                    <Button
                                        className="ml-2"
                                        onClick={(e) => this.openEditor(e)}
                                        appearance="primary"
                                    >
                                        <i className="fa fa-plus" />
                                    </Button>
                                )}
                            </div>
                        )} */}

                        {this.props.scriptId && (
                            <div className='inline ml-2'>
                                {!selected && (
                                    <Button
                                        color='secondary'
                                        onClick={this.removeScript}
                                        type='button'
                                        size='xs'
                                    >
                                        Remove Script
                                    </Button>
                                )}

                                {selected && (
                                    <Button
                                        color='error'
                                        onClick={this.unselectScript}
                                        type='button'
                                        size='xs'
                                    >
                                        Remove Selection
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
