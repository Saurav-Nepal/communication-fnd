/**
 * Collects object for Form, runs script(if any) in the context of form Obj
 * having name, data, dictionary, layout, actions
 * Finally renders form in modal
 */

import { ConfirmUtil, Modal } from '@slabs/ds-dialog';
import { capitalize, isUndefined } from '@slabs/ds-utils';

import { FormCreator } from '@/components/formCreator/formCreator.component';
import { GLOBAL } from '@/constants/global.constants';
import { SCRIPT_TYPE } from '@/constants/scriptType.constants';
import { Get } from '@/services';

import {
    CreateUrlForFetchingDetailRecords,
    GetColumnsForListing,
    GetParsedLayoutScript,
    GetUrlForFormCreator,
    ParseRestrictedQuery,
} from './assistGeneric.utils';
import { SelectFromOptions } from './common.utils';
import { FormUtils } from './form.utils';
import { ExecuteScript } from './injectScript.utils';
import { GetItem } from './localStorage.utils';
import { Toast } from './toast.utils';

export const ProcessForm = async ({
    formContent,
    scripts,
    isForm,
    openModal = true,
    disableActions,
    direct,
    onDismiss,
}: any): Promise<any | void> => {
    const url = GetUrlForFormCreator({
        payload: formContent,
        getDictionary: true,
        isForm,
    });
    const { success, response } = await Get({
        url,
        urlPrefix: isForm ? GLOBAL.API_HOST : GLOBAL.ROUTE_URL,
        // allowDuplicateCall: true,
    });

    if (!success) {
        Toast.error({ title: 'Error', description: response });
        return;
    }

    const { client_scripts } = response; // NOSONAR

    formContent.scripts = client_scripts;

    const params = {
        relationship: formContent.relationship,
        includesList: Object.keys(response.dictionary),
        dictionary: response.dictionary,
    };
    formContent.dictionary = GetColumnsForListing(params, true);
    if (formContent.method == 'edit' && !isUndefined(response.data)) {
        formContent.data = response.data;
    }

    let layouts = formContent.layouts;

    // Maintaining a new instance for each util declaration
    const formUtils = new FormUtils();

    // if ui action is intended for form type
    if (isForm) {
        formContent.route = CreateUrlForFetchingDetailRecords({
            url: response.form.end_point || response.form.route_url,
            urlParameter: formContent.data,
        });
        formContent.layout = [];

        layouts = GetParsedLayoutScript(response.form_layouts);
        formContent.layouts = layouts; //layouts

        if (layouts[0] && layouts[0].column_definition) {
            formContent.layout = layouts[0];
        }
        formContent.record = formContent.data;
        formContent.data = GetDataFromDictionary(
            formContent.dictionary,
            formContent.data
        );
        formContent.modelId = response.form.id;
        formContent.formId = response.form.id;
        formContent.name = response.form.name;

        if (response.form.method_id == 23) {
            formContent.method = 'edit';
        } else if (response.form.method_id == 22) {
            formContent.method = 'add';
        }

        // for prompt type form
        if (response.form.form_type_id == 53) {
            const { description: message } = response.form;
            const submitCallback = response.client_scripts
                ? response.client_scripts
                : [];
            ConfirmUtil({
                title: formContent.name,
                message,
                onConfirmPress: () => {
                    ExecuteScript({
                        formContent,
                        scripts: submitCallback,
                        context: formUtils,
                        contextName: 'form',
                        callback: formContent.callback,
                    });
                },
            });
            return;
        }
    }

    // get
    // form-layout-{modelId} = layout id
    const layoutId = GetItem(`form-layout-${formContent.modelId}`);
    formContent.layout = SelectFromOptions(layouts, layoutId, 'id') || {};

    const restrictedQuery = ParseRestrictedQuery(
        formContent.menu.restricted_query
    );
    formContent.data = { ...formContent.data, ...restrictedQuery };
    formContent.restrictedQuery = restrictedQuery;
    formContent.name = capitalize(formContent.name?.replace('entity', ''));

    // setting initial form content in formutils
    // setForm also create a copy of initial data, which is used to compare edited value at the time of form submission, and this way only edited column values are being sent

    // Assigning formUtils to formContent , singleton
    formContent.formUtils = formUtils;

    formUtils.setForm(formContent);

    for (const i in restrictedQuery) {
        formContent = formUtils.setVisible(i, false, formContent);
    }

    // Pre_onLoad script is used to control the execution flow
    // if formVal has false value, script execution is immediately stopped.
    const formVal = ExecuteScript({
        formContent,
        scripts: client_scripts,
        context: formUtils,
        contextName: 'form',
        executionType: SCRIPT_TYPE.PRE_ONLOAD,
    });

    if (formVal === false) {
        return;
    }
    if (Array.isArray(client_scripts)) {
        formContent = ExecuteScript({
            formContent,
            scripts: client_scripts,
            context: formUtils,
            contextName: 'form',
            executionType: SCRIPT_TYPE.ON_LOAD,
        });
    }

    if (openModal) {
        OpenModalForm(formContent);
    } else {
        // when modal is not required to show form
        return {
            name: formContent.name,
            template: (
                <FormCreator
                    payload={formContent}
                    onDismiss={onDismiss}
                    disableActions={disableActions}
                    direct={direct}
                />
            ),
        };
    }
};

export function OpenModalForm(formContent) {
    Modal.open({
        className: 'generic-form-container',
        headingTitle: formContent.name,
        component: () => <FormCreator payload={formContent} />,
    });
}

function GetDataFromDictionary(dictionary, data) {
    const obj = {};
    data = data && Object.keys(data).length ? data : {};
    for (const i in dictionary) {
        const column = dictionary[i];
        if (column) {
            obj[column.name] = data[column.name];
        }
    }

    return obj;
}
