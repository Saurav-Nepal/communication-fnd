import { GLOBAL } from '@/constants/global.constants';
import { Delete, Get, Post, Put } from '@/services';

import { CreateUrl, GetInput } from './assistGeneric.utils';
import { ProcessForm } from './formMiddleware.utils';
import GetterSetter from './getterSetter.utils';
import { Navigation } from './navigation.utils';
import { ProcessPage } from './pageMiddleware.utils';
import { GetTime } from './time.utils';
import { Toast } from './toast.utils';
import { GetUser } from './user.utils';

const self: any = {};

export class Pageutil {
    activeCalls = [];

    /**
     * every time new script is to be run, this method is invoked to update page object value
     * @param  {object} page
     */
    static setForm(page) {
        self.page = page;
    }

    setCalls = (activeCalls) => {
        this.activeCalls = activeCalls;
    };

    getCalls = () => {
        return this.activeCalls;
    };
    /**
     * @static
     * @returns
     * @memberof Pageutil
     */
    static userData() {
        return GetUser();
    }

    /**
     * @static
     * @param {*} column
     * @returns
     * @memberof Pageutil
     */
    static getParentValue(column) {
        return column ? self.page.parent[column] : self.page.parent;
    }

    /**
     * returns value of the provided column
     * @param  {string} column - column name
     */
    static getValue(column) {
        if (typeof self.page == 'object' && self.page.data[column]) {
            return self.page.data[column];
        }

        return self.page.data;
    }

    /**
     * @static
     * @returns
     * @memberof Pageutil
     */
    static getListData() {
        return self.page.listData;
    }

    /**
     * @static
     * @memberof Pageutil
     */
    static toast({
        method = 'success',
        title = '',
        description = '',
        actions,
        ...args
    }) {
        Toast[method]({ title, description, actions, ...args });
    }

    /**
     * Set value to key
     *
     * @param {*} key
     * @param {*} value
     */
    static set(key, value) {
        GetterSetter.setter(key, value);
    }

    /**
     * Get value from key
     *
     * @param {*} key
     */
    static get(key) {
        return GetterSetter.getter(key);
    }

    /**
     * @static
     * @param {*} path
     * @memberof Pageutil
     */
    static openModal(path, { ...args } = {}) {
        // const ModalBody = LoadAsyncComponent(() =>
        //     require(`./../Components/${path}`)
        // );
        // ModalManager.openModal({
        //     className: args.className || '',
        //     headerText: args.title || self.page.name || 'Input Form',
        //     modalBody: () => (
        //         <ModalBody
        //             data={self.page.data}
        //             menu={self.page.menu}
        //             parent={self.page.parent}
        //             callback={self.page.callback}
        //             dictionary={self.page.dictionary}
        //             {...args}
        //         />
        //     ),
        // });
    }

    /* Method for showing list of option and return selected one
     *  Three parameters
     *  descrption: text information, options:array of objects and a Callback method
     * */
    // static getOption({ description, options, callback, template }) {
    //     ModalManager.getOption({ description, options, callback, template });
    // }

    // REFACTOR LATER
    /**
     * Returns search params to create url
     */
    static getUrlParams() {
        return Navigation.search();
    }

    /**
     * To separate order from parent
     * @param  {string} urlString
     */
    static getOrderAndSort(urlString) {
        return urlString.split('.')[1];
    }

    /**
     * Returns callback method to refresh the page content
     */
    static getCallback() {
        return self.page.callback;
    }

    /**
     * Returns page object
     * After script execution, getForm is invoked to fetch modified page value
     */
    static getForm() {
        return self.page;
    }

    /**
     * @static
     * @param {*} url
     * @param {*} queryParam
     * @memberof Pageutil
     */
    static redirect(url, queryParam) {
        // static redirect({ action, listingRow, history, genericData }) {
        const e = GetterSetter.getter('event'); // taken from inject script utils
        url = CreateUrl({ url, obj: self.page.data });
        Navigation.navigate({ url, queryParam }, e);
    }

    /**
     * @static
     * @param {*} obj
     * @param {boolean} [reset=false]
     * @memberof Pageutil
     */
    static search(obj, reset = false) {
        Navigation.search(obj, { reset });
    }

    /**
     * @static
     * @returns
     * @memberof Pageutil
     */
    static getData() {
        return self.page.data;
    }

    /**
     * @static
     * @param {*} column
     * @param {*} value
     * @memberof Pageutil
     */
    static setData(column, value) {
        self.page.data[column] = value;
    }

    /**
     * @static
     * @param {*} message
     * @memberof Pageutil for alert
     */
    static alert(message) {
        Toast.success({ title: 'Success', description: message });
    }

    /**
     * @static
     * @returns
     * @memberof Pageutil
     */
    static getMenuDetail() {
        return self.page.menu;
    }

    /**
     * @static
     * @param {*} { url, callback, extraParams, method = 'get', urlPrefix = ROUTE_URL }
     * @memberof Pageutil
     */
    static httpCall({
        url,
        body,
        callback,
        extraParams,
        method = 'get',
        urlPrefix = GLOBAL.ROUTE_URL,
        ...args
    }) {
        const methods = {
            get: Get,
            post: Post,
            put: Put,
            delete: Delete,
        };

        methods[method]({
            url,
            body,
            callback,
            extraParams,
            urlPrefix,
            ...args,
        });
    }

    /**
     * expects dateTime, format
     * @param  {} {...args}
     */
    static getTime({ ...args }) {
        return GetTime({ ...args });
    }

    /**
     * invokes generic form via the script
     */
    static genericForm({ formContent, scripts, isForm, openModal = true }) {
        ProcessForm({ formContent, scripts, isForm, openModal });
    }

    /**
     * invokes another generic script
     */
    static genericScript({ pageContent }) {
        ProcessPage({ pageContent });
    }

    /**
     * @static This method is used to upload the documents
     * @param {*} { title, sourceId, documentType, documentLookup, showTypeSelector, source, onSubmit, upload, showDate }
     * @memberof Pageutil
     */
    static upload({
        url,
        title,
        sourceId,
        documentType,
        documentLookup,
        showTypeSelector,
        source,
        onSubmit,
        upload,
        showDate,
        dontUpload = false,
        singleUpload = false,
    }) {
        // MultiUploadModal({
        //     url,
        //     title: title,
        //     dontUpload: dontUpload,
        //     sourceId: sourceId,
        //     documentType: documentType,
        //     documentLookup: documentLookup,
        //     showTypeSelector: showTypeSelector,
        //     showDate: showDate,
        //     source: source,
        //     onSubmit: onSubmit,
        //     upload,
        //     singleUpload: singleUpload,
        // });
    }

    /**
     * @static This method is used to show the audit log data.
     * @memberof Pageutil
     * modelId: ID of the model
     * ListingRow: Complete Data of the row
     */
    static auditLog = async ({ listingRow, route }) => {
        // AuditLogModal({ listingRow, route });
    };

    /**
     * for single file upload
     * @static This method is used to upload the documents
     * @param {*} { title, sourceId, documentType, documentLookup, showTypeSelector, source, onSubmit, upload, showDate }
     * @memberof Pageutil
     */
    static singleUpload({ file, url, name }) {
        // UploadSingImage({ file, url, name });
    }

    /**
     * used to show info through script
     */
    static info({ description, headerText }) {
        // ModalManager.info({ description, headerText });
    }

    /**
     * Method to open Confirmation modal from confirm utils for use in pages
     */
    static confirm({ message, callback, formContent, title, isEmpty }) {
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

    /** Method for set input value with field name in the form */
    static getInput(fields, callback, heading, hideOverrideAll) {
        GetInput(fields, callback, heading, hideOverrideAll);
    }
}
