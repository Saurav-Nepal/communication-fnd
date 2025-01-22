import { useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { Modal } from '@slabs/ds-dialog';
import {
    indexOfObjectInArray,
    isEmptyArray,
    isEmptyObject,
    keys,
} from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import { SCRIPT_TYPE } from '@/constants/scriptType.constants';
import { Post, Put } from '@/services';
import {
    COLUMN_DATA_TYPE,
    FormBuilderFormSchema,
    FormBuilderSubmitType,
    ObjectDto,
} from '@/types';
import {
    GetChangedParams,
    GetUrlForFormSubmit,
    TrimBody,
} from '@/utils/assistGeneric.utils';
import { getColumnType } from '@/utils/common.utils';
import { ExecuteScript } from '@/utils/injectScript.utils';
import { SubscribeToEvent, UnsubscribeEvent } from '@/utils/stateManager.utils';
import { Toast } from '@/utils/toast.utils';

const useFormCreator = (props: any) => {
    const { headerActions, dictionary } = props.payload || {};

    const [payload, setPayload] = useState(props.payload);

    const [hasFormConfigurator, setHasFormConfigurator] = useState(false);
    const [hasCustomFormConfigurator, setHasCustomFormConfigurator] =
        useState(false);

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: 'loggedUser',
            callback: userDataFetched,
        });

        return () => {
            UnsubscribeEvent({
                eventName: 'loggedUser',
                callback: userDataFetched,
            });
        };
    });

    const userDataFetched = (data) => {
        setHasFormConfigurator(
            data.hasPermission('form-configurator') || false
        );
        setHasCustomFormConfigurator(
            data.hasPermission('custom-form-configurator') || false
        );
    };

    const actions = useMemo(() => {
        if (!headerActions) return [];
        return [];
        // return headerActions.forEach((uiAction) => {
        //     Object.keys(uiAction).forEach((oldkey) => {
        //         oldkey.split('.')[1] &&
        //             delete Object.assign(uiAction, {
        //                 [`${oldkey.split('.')[1]}`]: uiAction[`${oldkey}`],
        //             })[`${oldkey}`];
        //     });
        // });
    }, [headerActions]);

    const formSchema: FormBuilderFormSchema = useMemo(() => {
        const { column_definition } = payload.layout || {};

        if (isEmptyArray(column_definition)) return {};

        const schema: FormBuilderFormSchema = {};

        column_definition.map((column: COLUMN_DATA_TYPE) => {
            const dict = dictionary[column.index as string];

            if (column.split) {
                schema[column.label as string] = {
                    type: 'split',
                    key: column.label,
                    label: column.label,
                };
            }

            if (!dict) return;

            schema[dict.name] = {
                type: dict.visibility ? getColumnType(dict) : 'hidden',
                key: dict.name,
                label: column.columnTitle || dict.display_name,
                name: dict.name,
                placeholder: `Enter ${dict.display_name}`,
                required: dict.required,
                dict,
            };
        });

        return schema;
    }, [payload]);

    // const removeParentName = (uiActions) => {
    //     uiActions &&
    //         uiActions.forEach((uiAction) => {
    //             Object.keys(uiAction).forEach((oldkey) => {
    //                 oldkey.split('.')[1] &&
    //                     delete Object.assign(uiAction, {
    //                         [`${oldkey.split('.')[1]}`]: uiAction[`${oldkey}`],
    //                     })[`${oldkey}`];
    //             });
    //         });
    //     return uiActions;
    // };

    const handleSubmit: FormBuilderSubmitType = async (
        values
        // { setError }
    ) => {
        const { formUtils, scripts, method: methodType } = payload;
        payload.body = TrimBody(values);

        let Method = Post;
        if (methodType === 'edit') {
            Method = Put;

            const originalValues = formUtils.getOriginalData();
            payload.body = GetChangedParams(values, originalValues);
        }

        formUtils.set('preventSubmit', false);

        const updatedPayload = ExecuteScript({
            formContent: payload,
            scripts,
            context: formUtils,
            contextName: 'form',
            executionType: SCRIPT_TYPE.ON_SUBMIT,
            callback: afterSubmitCallback(),
        });

        if (formUtils.get('preventSubmit')) {
            afterSubmitCallback()({
                preventModalClose: true,
                preventRefresh: true,
            });
            return;
        }

        // If route is not mentioned with the form , we stop execution
        if (!payload.route) {
            afterSubmitCallback()();

            return;
        }

        const url = GetUrlForFormSubmit({ payload });

        let newBody: ObjectDto = {};

        if (!isEmptyObject(payload.restrictedQuery)) {
            newBody = payload.restrictedQuery;
        }

        if (updatedPayload.body) {
            newBody = { ...newBody, ...updatedPayload.body };
        }

        if (methodType === 'add') {
            delete newBody.id;
            delete newBody.uuid;
        }

        const result = await Method({
            url,
            data: sanitizePostData(newBody),
            urlPrefix: GLOBAL.ROUTE_URL,
        });

        payload.response = result;

        ExecuteScript({
            formContent: payload,
            scripts,
            context: formUtils,
            contextName: 'form',
            executionType: SCRIPT_TYPE.POST_SUBMISSION,
            callback: afterSubmitCallback(),
        });

        // if (result.response.errors) {
        //     result.response.errors.forEach((error) => {
        //         // Set errors
        //         ToastNotifications.error({
        //             title: 'Error',
        //             description: error.message,
        //         });
        //         setError({ [error.name]: error.message });
        //         // setErrors({
        //         //     errors: error.message,
        //         // }); /* this formik method used to set errors in errors object */
        //     });
        //     afterSubmitCallback(next)({
        //         preventModalClose: true,
        //         preventRefresh: true,
        //     });
        // }

        // if (result.response.info) {
        //     result.response.info.forEach((info) => {
        //         ToastNotifications.info({
        //             title: 'Information',
        //             description: info.message,
        //         });
        //     });
        //     afterSubmitCallback(next)();
        // }

        // if (result.response.warn) {
        //     result.response.warn.forEach((warn) => {
        //         ToastNotifications.warning({
        //             title: 'Warning',
        //             description: warn.message,
        //         });
        //     });
        //     afterSubmitCallback(next)();
        // }

        const { success, response } = result;

        if (success) {
            // Toast a notification according to edit or add
            Toast.success({
                title: 'Success',
                description:
                    payload.method == 'add'
                        ? 'Record Created'
                        : 'Record Updated',
            });

            afterSubmitCallback()();
            return;
        }

        afterSubmitCallback()({
            preventModalClose: true,
            preventRefresh: true,
        });

        // Showing an alert on failure
        Toast.error({
            title: 'Request Failed',
            description: result.response || 'Something went wrong',
        });
    };

    const sanitizePostData = (body: ObjectDto) => {
        keys(formSchema).forEach((formKey) => {
            const schema = formSchema[formKey];

            if (schema.type == 'json') {
                try {
                    body[formKey] = JSON.parse(body[formKey]);
                } catch (e) {
                    body[formKey] = {};
                }
                return;
            }
        });

        return body;
    };

    const afterSubmitCallback = () => {
        return ({ preventRefresh = false, preventModalClose = false } = {}) => {
            if (typeof payload.callback == 'function' && !preventRefresh) {
                payload.callback(payload.response); // callback to refresh content
            }

            if (!preventModalClose) {
                Modal.close();
            }
        };
    };

    const layoutChanged = (layout: any) => {
        setPayload((prev) => {
            const newPayload = { ...prev };

            newPayload.layout = layout;

            const editedLayout = indexOfObjectInArray(
                payload.layouts,
                'id',
                layout.id
            );

            if (editedLayout > -1) {
                newPayload.layouts[editedLayout] = layout;
            } else {
                newPayload.layouts.push(layout);
            }

            return ExecuteScript({
                formContent: newPayload,
                executionType: SCRIPT_TYPE.ON_LOAD,
                scripts: newPayload.scripts,
                context: newPayload.formUtils,
                contextName: 'form',
            });
        });
        Modal.close();
    };

    return {
        payload,
        formSchema,
        hasFormConfigurator,
        hasCustomFormConfigurator,
        headerActions: actions,
        handleSubmit,
        layoutChanged,
    };
};

export { useFormCreator };
