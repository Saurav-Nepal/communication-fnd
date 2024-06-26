import { ObjectDto } from '../backend/Dtos';
import { FormBuilderFormSchema } from '../Types';
import { AccessManager } from './accessManager.utils';
import GetterSetter from './getterSetter.utils';
import { StoreEvent } from './stateManager.utils';
import { Toast } from './toast.utils';

let onChangeListeners: Record<string, Function> = {};

export interface FormUtilSelfObj {
    form?: {
        formName?: string;
        formSchema?: FormBuilderFormSchema;
        data?: ObjectDto;
        response?: any;
        body?: ObjectDto;
        ctx?: ObjectDto;
        formUtils?: FormUtils;
    };
    page?: any;
}
export class FormUtils {
    self: FormUtilSelfObj;

    constructor() {
        this.self = {};
    }
    /**
     * Set value to key
     *
     * @param {*} key
     * @param {*} value
     */
    set(key: string, value: any) {
        GetterSetter.setter(key, value);
    }

    /**
     * Set value from key
     *
     * @param {*} key
     */
    get(key: string) {
        return GetterSetter.getter(key);
    }

    /**
     * every time new script is to be run, this method is invoked to update form object value
     * @param  {object} form
     */
    setForm(form: FormUtilSelfObj['form']) {
        this.self.form = form;
    }

    /**
     * Returns form object
     * After script execution, getForm is invoked to fetch modified form value
     * @param  {boolean} clearFormValue
     */
    getForm() {
        return this.self.form;
    }

    setFormSchema(schema: FormUtilSelfObj['form']['formSchema']) {
        this.self.form.formSchema = schema;
    }

    /**
     * Keeps registering all the events and maintains them in an array
     * @param  {string} {column - column path
     * @param  {function } callback} - callback on event trigger
     */
    onChange({ column, callback }: { column: string; callback: Function }) {
        onChangeListeners[column] = callback;
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

    alert({
        method = 'success',
        title = '',
        description = '',
        actions,
        ...args
    }) {
        // ConfirmUtil();
    }

    /**
     * This method is being used by form creator to keep notifying
     * on event change
     *
     * checks if there is any listener on the field, invoke it
     * @param  {object} {column - columns object
     * @param  {object} ...event}
     */
    OnChangeListener({
        column,
        value,
        valueObj,
        ...event
    }: {
        column: string;
        value: any;
        valueObj: any;
        [x: string]: any;
    }) {
        if (this.self.form) {
            this.self.form.data = valueObj;
            const callback = onChangeListeners[column];
            if (typeof callback == 'function') {
                callback(value, column, event, valueObj);
            }
        }
    }

    /**
     * Sets the value of the response property.
     *
     * @param {any} response - The new response value.
     */
    setResponseValue(response: any) {
        this.self.form.response = response;
    }

    /**
     * Returns response value after api call made thorough given route
     * this method is supposed to use only for postSubmission script
     */
    getResponseValue() {
        return this.self.form.response;
    }

    /**
     * returns dictionary value for provided column
     * @param  {string} column - column name
     */
    getAttribute(column: string) {
        return this.self.form.formSchema[column];
    }
    /**
     * sets dictionary value for provided column
     * for e.g. form.setAttribute('description', {label: 'Desc'}) - modified 'description' column's displayname to 'Desc'
     * @param  {string} column - column name
     * @param  {object} attribute - key value
     */
    setAttribute(
        column: string,
        attribute: ObjectDto,
        updateForm: boolean = true
    ) {
        const dict = {
            ...(this.self.form.formSchema[column] || {}),
            ...attribute,
        };

        this.self.form.formSchema[column] = dict as any;

        this.self.form.formUtils.updateForm(updateForm);
    }

    /**
     * set column field to visible or invisible depending on visibility
     * @param  {string} column - column name
     * @param  {boolean} visibility
     */
    setVisible(column: string, visibility: boolean) {
        const columnObj = this.self.form.formSchema[column];

        if (!columnObj) {
            this.self.form.formSchema[column] = {} as any;
        }

        this.self.form.formSchema[column].visible = visibility;

        this.self.form.formUtils.updateForm();
        return this.self;
    }

    /**
     * disables particular form element
     * for e.g. form.setDisabled('description', true) - make description field disabled
     * @param  {string} column - column name
     * @param  {boolean} value -true if disabled, false if enabled
     */
    setDisabled(
        columns: string[] | string,
        value: boolean = true,
        form = this.self.form
    ) {
        function disableColumn(column: string) {
            const columnObj = form.formSchema[column];

            if (!columnObj) {
                form.formSchema[column] = {} as any;
            }

            form.formSchema[column].disabled = value;
        }

        if (Array.isArray(columns)) {
            columns.forEach((column) => disableColumn(column));
        } else {
            disableColumn(columns);
        }

        this.self.form = form;
        this.self.form.formUtils.updateForm();

        return self;
    }

    /**
     * makes field required
     * for e.g. form.setMandatory('description' true) - make description field mandatory
     * @param  {string} column - column name
     * @param  {boolean} value -true if disabled, false if enabled
     */
    setMandatory(column: string, value: boolean) {
        if (!this.self.form.formSchema[column])
            this.self.form.formSchema[column] = {} as any;

        this.self.form.formSchema[column].required = value;

        this.self.form.formUtils.updateForm();
    }

    /**
     * returns value of the provided column
     * @param  {string} column - column name
     */
    getValue(column: string) {
        if (
            typeof this.self.form.data == 'object' &&
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
    setValue(column: string, value: any, updateForm: boolean = true) {
        if (typeof this.self.form == 'object') {
            this.self.form.data[column] = value;

            this.self.form.formUtils.updateForm(updateForm);
            return this.self.form.data[column];
        }

        return false;
    }

    /**
     * sets body which is appended with existing payload while making api call
     * @param  {object | string} body={}
     * @param  { string } value
     */
    setBody(body: string | ObjectDto = {}, value: any = '') {
        if (typeof body === 'string') {
            this.self.form.body[body] = value;
            return;
        }
        this.self.form.body = body;
    }

    /**
     * Returns body of the form right before making api call
     * this method is available for onSubmit and postSubmission script
     * @param  { string } key (Optional)
     */
    getBody(key: string) {
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
    removeBody(key: string) {
        if (!key) return;

        delete this.self.form.body[key];
    }

    setContext(ctx: string | ObjectDto = {}, value: any = '') {
        if (typeof ctx === 'string') {
            this.self.form.ctx[ctx] = value;
            return;
        }
        this.self.form.ctx = ctx;
    }

    getContext(key: string) {
        if (key) {
            return this.self.form.ctx[key];
        }
        return this.self.form.ctx;
    }

    removeContext(key: string) {
        if (!key) return;

        delete this.self.form.ctx[key];
    }

    /**
     * Clears scope
     */
    clearFormObject() {
        this.self = {};
        onChangeListeners = {};
    }

    /**
     * Makes modified form object available in formCreator class to appear changes on the ui
     * NOTE : It is suggested to avoid using this method as after execution of script, updateForm is invoked implicitly
     * @param  {boolean} updateState=true - updateState is used to check if DOM should also be refreshed along with form object
     * default value is true
     */
    updateForm(updateState: boolean = true) {
        StoreEvent({
            eventName: 'formChanged-' + (this.self.form.formName || ''),
            data: { ...this.self.form, ...{ updateState } },
            isMemoryStore: false,
            isTemp: true,
        });
    }

    /**
     * returns if user has role
     * can be used to determine absolute role with absolute variable
     * @param  {string} roleName
     * @param  {boolean} absolute
     */
    hasRole(roleName: string) {
        return AccessManager.hasRoleIdentifier(roleName);
    }

    /* These two method help us to save data from one script and retrieve in another script*/
    /**
     * @param  {string} name
     * @param  {object/array } value
     */
    storeData(name: string, value: any) {
        GetterSetter.setter(name, value);
    }
    /**
     * @param  {string} name
     */
    retrieveData(name: string) {
        return GetterSetter.getter(name);
    }

    /**
     * Prevent submition of form in onSubmit scripts.
     */
    preventSubmit(prevent: boolean = true) {
        GetterSetter.setter('preventSubmit', prevent);
    }
}
