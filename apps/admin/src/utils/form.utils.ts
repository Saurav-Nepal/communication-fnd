import { GLOBAL } from '@/constants/global.constants';
import { Delete, Get, Post, Put } from '@/services';

import { CreateUrl, GetInput } from './assistGeneric.utils';
import { BuildUrlForGetCall, SelectFromOptions } from './common.utils';
import { ProcessForm } from './formMiddleware.utils';
import GetterSetter from './getterSetter.utils';
import { Navigation } from './navigation.utils';
import { ProcessPage } from './pageMiddleware.utils';
import { GetSourceMorphMap } from './preference.utils';
import { StoreEvent } from './stateManager.utils';
import { GetTime } from './time.utils';
import { Toast } from './toast.utils';
import { GetUser, GetUserDetail } from './user.utils';

let onChangeListeners = {};

export class FormUtils {
    self: any;

    constructor() {
        this.self = {};
    }

    /**
     * Set value to key
     *
     * @param {*} key
     * @param {*} value
     */
    set(key, value) {
        GetterSetter.setter(key, value);
    }

    /**
     * Set value from key
     *
     * @param {*} key
     */
    get(key) {
        return GetterSetter.getter(key);
    }

    /**
     * Keeps registering all the events and maintains them in an array
     * @param  {string} {column - column path
     * @param  {function } callback} - callback on event trigger
     */
    onChange({ column, callback }) {
        onChangeListeners[column] = callback;
    }

    /**
     * used to show info through script
     * @param  {string} {description- description text
     * @param  {string } headerText} - header
     */
    info({ description, headerText }) {
        // ModalManager.info({ description, headerText });
    }

    getListData() {
        return this.self.form.listData;
    }

    /**
     * Returns source hash value for the given source
     * @param  {string} source
     */
    getSourceHash(source) {
        return GetSourceMorphMap(source);
    }

    toast({
        method = 'success',
        title = '',
        description = '',
        actions,
        ...args
    }) {
        Toast[method]({ title, description, actions, ...args });
    }

    /**
     * Returns callback method to refresh the page content
     */
    getCallback() {
        return this.self.page.callback;
    }

    /**
     * This method is being used by form creator to keep notifying
     * on event change
     *
     * checks if there is any listener on the field, invoke it
     * @param  {object} {column - columns object
     * @param  {object} ...event}
     */
    OnChangeListener({ column, value, valueObj, ...event }) {
        if (this.self.form) {
            this.self.form.data[column.name] = value;
            const callback = onChangeListeners[column.path];
            if (typeof callback == 'function') {
                callback(value, column, event, valueObj);
            }
        }
    }

    /**
     * sets body which is appended with existing payload while making api call
     * @param  {object | string} body={}
     * @param  { string } value
     */
    setBody(body = {}, value = '') {
        if (typeof body === 'string') {
            this.self.form.body[body] = value;
            alert();
            return;
        }
        this.self.form.body = body;
    }

    /**
     * Returns body of the form right before making api call
     * this method is available for onSubmit and postSubmission script
     * @param  { string } key (Optional)
     */
    getBody(key) {
        if (key) {
            return this.self.form.body[key];
        }
        return this.self.form.body;
    }

    /**
     * Remove selected attribute from body.
     * @param { string } key Body attribute key
     * @returns void
     */
    removeBody(key) {
        if (!key) return;

        delete this.self.form.body[key];
    }

    /**
     * Returns response value after api call made thorough given route
     * this method is supposed to use only for postSubmission script
     */
    getResponseValue() {
        return this.self.form.response;
    }

    /**
     * To make api call
     * @param  {} {url -> put full url like 'api/admin/apiName'
     * @param  {} body -> JSON object that is to be sent along with the api
     * @param  {} callback -> initialize a function and wrote toast method
     * @param  {} extraParams -> if you want send some extra params along with api
     * @param  {} method='get' as default and supported methods like get,post,put,delete
     * @param  {} urlPrefix=ROUTE_URL}
     */
    httpCall({
        url,
        body,
        callback,
        extraParams,
        method = 'get',
        urlPrefix = GLOBAL.ROUTE_URL,
    }: any) {
        const methods = {
            get: Get,
            post: Post,
            put: Put,
            delete: Delete,
        };

        methods[method]({ url, body, callback, extraParams, urlPrefix });
    }

    // /**
    //  * if id is provided return particular element else returns form element
    //  * @param  {string} column {optional}
    //  */
    // getElement(column) {
    //     if (!column) {
    //         return document.getElementsByTagName("form")[0];
    //     }
    //     return document.getElementById(column);
    // };

    /**
     * Used to change page name
     * @param  {string} name
     */
    formName(name) {
        this.self.form.name = name;
    }

    /**
     * set column field to visible or invisible depending on visibility
     * @param  {string} column - column name
     * @param  {boolean} visibility
     */
    setVisible(column, visibility, form = this.self.form) {
        const columnObj = form.dictionary[column];

        if (!columnObj) {
            return form;
        }

        form.dictionary[column].visibility = visibility;

        this.self.form = form;

        this.self.form.formUtils.updateForm(false);
        return form;
    }

    /**
     * disables particular form element
     * for e.g. form.setDisabled('description', true) - make description field disabled
     * @param  {string} column - column name
     * @param  {boolean} value -true if disabled, false if enabled
     */
    setDisabled(columns, value = true, form = this.self.form) {
        if (Array.isArray(columns)) {
            columns.forEach((column) => disableColumn(column));
        } else {
            disableColumn(columns);
        }

        function disableColumn(column) {
            const columnObj = form.dictionary[column];

            if (!columnObj) {
                return form;
            }

            form.dictionary[column].disabled = value;
        }

        this.self.form = form;
        this.self.form.formUtils.updateForm(false);

        return form;
    }

    /**
     * returns value of the provided column
     * @param  {string} column - column name
     */
    getValue(column) {
        if (
            typeof this.self.form == 'object' &&
            this.self.form.data.hasOwnProperty(column)
        ) {
            return this.self.form.data[column];
        }

        return this.self.form.data;
    }

    /**
     * sets value of input fields
     * @param  {string} column - column name
     * @param  {any} value - value to be set for particular element
     */
    setValue(column, value, updateForm = false) {
        if (typeof this.self.form == 'object') {
            this.self.form.data[column] = value;

            this.self.form.formUtils.updateForm(updateForm);

            return this.self.form.data[column];
        }

        return false;
    }

    /**
     * Returns menu detail
     */
    getMenuDetail() {
        return this.self.form.menu;
    }

    /**
     * same as data value,
     * ideally this method should be used when dealing with form
     *
     * @param  {} column
     */
    getRecordValue(column) {
        if (!column) {
            return this.self.form.record;
        }
        return this.self.form.record[column];
    }

    /**
     * in case of tabs, returns portlet value
     * @param  {string} column
     */
    getParentValue(column) {
        return column ? this.self.form.parent[column] : this.self.form.parent;
    }

    /**
     * returns dictionary value for provided column
     * @param  {string} column - column name
     */
    getAttribute(column) {
        return this.self.form.dictionary[column];
    }

    /**
     * sets dictionary value for provided column
     * for e.g. form.setAttribute('description', {display_name: 'Desc'}) - modified 'description' column's displayname to 'Desc'
     * @param  {string} column - column name
     * @param  {object} attribute - key value
     */
    setAttribute(column, attribute, updateForm = false) {
        const dict = { ...this.self.form.dictionary[column], ...attribute };
        this.self.form.dictionary[column] = dict;

        this.self.form.formUtils.updateForm(updateForm);
    }

    //
    /**
     * To embed the query along with reference url
     * @param  {string} column -> column name like "source_id"
     * @param  {object} queryParams -> param where you want to apply some query like {query: `lookup_type = ${lookuptypeId}`}
     */
    setQuery(column, queryParams, updateForm = false) {
        const dict = this.self.form.dictionary[column];

        if (dict && dict.reference_model) {
            let url = dict.reference_model.route_name;
            url = BuildUrlForGetCall(url, queryParams);
            this.self.form.dictionary[column].reference_model.modified_route =
                url;

            this.self.form.formUtils.updateForm(updateForm);
        }
    }

    /**
     *
     * Shorthand for making the lookup call
     *
     * @param {*} lookup_id
     */
    getLookup(lookup_id, callback) {
        return this.httpCall({
            url: 'api/admin/lookupValue?query=lookup_type=' + lookup_id,
            callback: (result) => {
                callback(result.response);
            },
        });
    }

    redirect(url, queryParam) {
        url = CreateUrl({ url, obj: this.self.form.data });
        Navigation.navigate({ url, queryParam });
    }

    search(obj, reset = false) {
        Navigation.search(obj, { reset });
    }

    /**
     * makes field required
     * for e.g. form.setMandatory('description' true) - make description field mandatory
     * @param  {string} column - column name
     * @param  {boolean} value -true if disabled, false if enabled
     */
    setMandatory(column, value) {
        this.self.form.dictionary[column].required = value;

        this.self.form.formUtils.updateForm(false);
    }

    /**
     * every time new script is to be run, this method is invoked to update form object value
     * @param  {object} form
     */
    setForm(form) {
        this.self.form = form;
        this.self.data = { ...this.self.form.data } || {};
    }

    getOriginalData() {
        return this.self.data;
    }

    /**
     * Returns form object
     * After script execution, getForm is invoked to fetch modified form value
     * @param  {boolean} clearFormValue
     */
    getForm() {
        return this.self.form;
    }

    /**
     * Clears scope
     */
    clearFormObject() {
        this.self.form = {};
        onChangeListeners = {};
    }

    /**
     * Makes modified form object available in formCreator class to appear changes on the ui
     * NOTE : It is suggested to avoid using this method as after execution of script, updateForm is invoked implicitly
     * @param  {boolean} updateState=true - updateState is used to check if DOM should also be refreshed along with form object
     * default value is true
     */
    updateForm(updateState = true) {
        StoreEvent({
            eventName: 'formChanged-' + this.self.form.layout.id,
            data: { ...this.self.form, ...{ updateState } },
        });
    }

    /**
     * expects dateTime, format
     * @param  {} {...args}
     */
    getTime({ ...args }) {
        return GetTime({ ...args });
    }

    /**
     * Open a form with formid
     *
     * @param  {} formId
     */
    static openForm = ({ formId }) => {
        const formContent = {
            listingRow: {},
            parent: {},
            method: 'Add',
            form: { form_id: formId },
            source: 'form',
            menu: {},
            route: 'api/admin/comment',
            callback: () => {
                console.log('Form Submitted');
            },
        };
        ProcessForm({ formContent, isForm: true });
    };

    /**
     * invokes generic form via the script
     * @param  {object} {formContent
     * @param  {array} scripts
     * @param  {boolean} isForm
     * @param  {boolean} openModal=true}
     */
    genericForm({ formContent, scripts, isForm, openModal = true }) {
        ProcessForm({ formContent, scripts, isForm, openModal });
    }

    /**
     * invokes another generic script
     * @param  {} {pageContent}
     */
    genericScript({ pageContent }) {
        ProcessPage({ pageContent });
    }

    /**
     * returns if user has role
     * can be used to determine absolute role with absolute variable
     * @param  {string} roleName
     * @param  {boolean} absolute
     */
    hasRole(roleName, absolute) {
        const user = GetUser();
        const userData = GetUserDetail(user);
        const method = absolute ? 'hasRole' : 'hasAbsoluteRole';
        return userData[method](roleName);
    }

    /**
     * returns if user has permission
     * can be used to determine absolute permission with absolute variable
     * @param  {string} permissionName
     * @param  {boolean} absolute
     */
    hasPermission(permissionName, absolute) {
        const user = GetUser();
        const userData = GetUserDetail(user);
        const method = absolute ? 'hasPermission' : 'hasAbsolutePermission';
        return userData[method](permissionName);
    }

    upload({
        url,
        title,
        sourceId,
        documentType,
        showTypeSelector,
        source,
        onSubmit,
    }) {
        // MultiUploadModal({
        //     url,
        //     title: title,
        //     sourceId: sourceId,
        //     documentType: documentType,
        //     showTypeSelector: showTypeSelector,
        //     source: source,
        //     onSubmit: onSubmit,
        // } as any);
    }

    /**
     *for single file upload
     * @static
     * @param {*} { file, url, name }
     * @memberof FormUtil
     */
    singleUpload({ file, url, name }) {
        // UploadSingImage({ file, url, name });
    }
    /* Method to open Confirmation modal from confirm utils for use in forms  */
    confirm({ message, callback, formContent, title, isEmpty }) {
        // ConfirmUtils.confirmModal({
        //     template: formContent ? (
        //         <TableWrapper
        //             listing={formContent.array}
        //             columns={formContent.column}
        //         ></TableWrapper>
        //     ) : null,
        //     message: message,
        //     callback: callback,
        //     title: title,
        //     isEmpty: isEmpty,
        // });
    }

    setFormAttribute(hideSubmit) {
        this.self.form.hideSubmit = hideSubmit;
    }
    /* Added a method here to get logged user, for use in scripts/forms */
    getLoggedUser() {
        return GetUser();
    }

    /** Method for set input value with field name in the form */
    getInput(fields, callback) {
        GetInput(fields, callback);
    }

    selectFromOptions(options, value, field = 'id') {
        return SelectFromOptions(options, value, field);
    }

    /* These two method help us to save data from one script and retrieve in another script*/
    /**
     * @param  {string} name
     * @param  {object/array } value
     */
    storeData(name, value) {
        GetterSetter.setter(name, value);
    }
    /**
     * @param  {string} name
     */
    retrieveData(name) {
        return GetterSetter.getter(name);
    }

    /* Method for showing list of option and return selected one
     *  Three parameters
     *  descrption: text information, options:array of objects and a Callback method
     * */
    getOption({ description, options, callback, template }) {
        // ModalManager.getOption({ description, options, callback, template });
    }

    /**
     * Prevent submition of form in onSubmit scripts.
     */
    preventSubmit(prevent = true) {
        GetterSetter.setter('preventSubmit', prevent);
    }
}
