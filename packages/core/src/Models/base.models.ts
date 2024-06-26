import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { MessageFormatter } from 'class-validator-message-formatter';

import { CapitalizeFirst, IsEmptyArray } from '../Utils/common.utils';
import { ErrorStatus } from '../Utils/http.utils';
import { Toast } from '../Utils/toast.utils';
import Base from './base';

/**
 * This is base class with all high level logic regarding models
 * Class contain generic and common function wrapper as well

 * @export
 * @class BasePayment
 * @extends {Base}
 */
export class BaseModel extends Base {
    /**
     * Endpoint
     */
    protected api = '';

    /**
     * BaseURL
     */
    protected baseURL: string;
    /**
     * Query at url
     */
    protected query: string;

    /**
     * RESTful method such as GET, POST, PUT, DELETE, etc.
     */
    protected method: any = this._get;

    /**
     * DTO that will be applied to request body validation
     */
    protected bodyDto: any;

    /**
     * DTO that will be applied to get request body validation
     */
    protected getBodyDto: any;

    /**
     * DTO that will be applied to put request body validation
     */
    protected putBodyDto: any;

    /**
     * DTO that will be applied to post request body validation
     */
    protected postBodyDto: any;

    /**
     * DTO that will be applied to delete request body validation
     */
    protected deleteBodyDto: any;

    /**
     * this would contain the elements required for the additional header params
     * @protected
     * @type {*}
     * @memberof BaseModel
     */
    protected headers: { [key: string]: string } = {};

    /**
     * Input provided by frontend
     */
    protected body: any;

    /**
     * Flag to stop process at any moment we want
     */
    protected listen = true;

    /**
     * Extra parameters that need to be added to request body
     */
    protected appendBody = {};

    /**
     * Parameters that need to be removed before sending request body
     */
    protected deleteBody = [];

    /**
     * Request body for API
     */
    protected requestBody: any;

    /**
     * Response received from backend after processing of API
     */
    protected response: any;

    /**
     * Flag to use meta server or not
     */
    protected isMeta: boolean = false;

    /**
     * Result need to be made for front end to interpret
     */
    protected result: {
        message: string;
        response: any;
        actions: any;
        success: boolean;
    } = {
        message: 'processed',
        response: 'response',
        actions: null,
        success: true,
    };

    /**
     * Flag to show toast on front-end or not
     */
    protected showToast = true;

    /**
     * For pagination, number of record in one API call
     */
    protected take = 10;
    /**
     * For pagination, number of pages
     */
    protected skip = 1;

    /**
     * Custom field provided to front-end in case to automate action against api
     */
    protected actions = null;

    constructor(body: any = {}) {
        super(body);
        this.body = body;
    }

    public methodsType = Object.getOwnPropertyNames(BaseModel);

    /**
     * This method will process end to end cycle of API
     * We have prescript, through which we can implement custom logic before API processing
     * fetchEndpoint, that will prepare endpoint and the query on the url
     * fetchRequestBody will prepare request body based on DTO validation provided
     * getDetails will process API and will get the result
     *
     * @param parameter
     * @returns
     */
    public async process(parameter = null): Promise<any> {
        await this.preScript();

        await this.fetchEndpoint();
        await this.fetchRequestBody();
        await this.getDetails();

        if (this.listen) {
            await this.postScript(); // There is a chance if api fails listen will become automatically false so have put check below
        }
        return this.result;
    }

    public async get(): Promise<any> {
        this.method = this._get;
        if (this.getBodyDto) this.bodyDto = this.getBodyDto;
        return this.process();
    }

    public async put(): Promise<any> {
        this.method = this._put;
        if (this.putBodyDto) this.bodyDto = this.putBodyDto;
        return this.process();
    }

    public async post(): Promise<any> {
        this.method = this._post;
        if (this.postBodyDto) this.bodyDto = this.postBodyDto;
        return this.process();
    }

    public async delete(): Promise<any> {
        this.method = this._delete;
        if (this.deleteBodyDto) this.bodyDto = this.deleteBodyDto;
        return this.process();
    }

    /**
     * This method will check if listen flag is true or false
     * Based on the flag it will create query part of the API, for filtering
     */
    protected async fetchEndpoint() {
        if (!this.listen) return;

        if (this.query) {
            this.api = this.api + '?' + this.query;
        }

        if (this.body.baseURL) {
            this.baseURL = this.body.baseURL;
        }
    }

    /**
     * This method will also check for listen flag
     * It will prepare Request body based on the DTO validation provided
     * We can manipulate request body also out of DTO scope
     * @returns
     */
    protected async fetchRequestBody(): Promise<void> {
        if (!this.listen) return;

        if (!this.body.ignore_dto_all) {
            if (!this.bodyDto || !this.body) return;

            this.requestBody = plainToInstance(this.bodyDto, this.body, {
                excludeExtraneousValues: true,
            });

            await this.validateRequestBody();
        } else {
            this.requestBody = this.body;
        }

        this.manipulateRequestBody();
    }

    /**
     * This method will validate request body
     * Against the DTO provided in child class
     */
    private async validateRequestBody() {
        const validation = await validate(
            plainToInstance(this.bodyDto, this.requestBody)
        );

        if (IsEmptyArray(validation)) return;

        this.listen = false;

        const errors = MessageFormatter.format(validation as any[]);
        global.console.log(`DTO validation error in `, this.constructor.name, {
            errors,
            payload: this.body,
            dto: this.bodyDto,
        });

        for (const error of errors) {
            this.toastNotification(`${CapitalizeFirst(error.message)}`);
        }

        this.result = {
            message: errors[0].message,
            response: errors,
            actions: this.actions,
            success: false,
        };
    }

    /**
     * This method will broadcast a toast notification to frontend.
     * @param message
     * @returns result
     */
    protected toastNotification(message) {
        if (!this.showToast) return;

        Toast.warning({ description: message });
    }

    /**
     * Manipulate request body based on class varaible that is appendBody and deleteBody
     */
    private manipulateRequestBody() {
        if (!this.listen) return;

        this.appendRequestBody();
        this.deleteRequestBody();
    }

    /**
     * It adds the extra key value pair to request body provided to appendBody variable
     */
    private appendRequestBody() {
        Object.entries(this.appendBody).forEach(
            (item) => (this.requestBody[item[0]] = item[1])
        );
    }

    /**
     * It deletes key and its value from request body, provided to deleteBody variable
     */
    private deleteRequestBody() {
        this.deleteBody.forEach((item) => delete this.requestBody[item]);
    }

    /**
     * This method will check for listen flag
     * if true it will hit the API will the prepared request body
     */
    protected async getDetails() {
        if (!this.listen) return;

        this.response = await this.method({
            url: this.api,
            data: this.requestBody,
            baseURL: this.baseURL,
            headers: this.headers || {},
            isMeta: this.isMeta,
        });

        this.responseMessage(this.response.status);
    }

    /**
     * Response message will prepare response based on the status provided
     * Based on status code we will include toast notifcation on the front end part.
     * if status code between 200 to 299 its success case.
     * @param status
     * @returns
     */
    protected responseMessage(status: number) {
        if (ErrorStatus.includes(status)) {
            this.showToast = false;
        } else if (status > 199 && status < 300) {
            this.result = {
                message: this.response.statusText,
                response: this.response.data,
                actions: this.actions,
                success: true,
            };
            return this.result;
        }

        this.listen = false;
        const response = this.response?.response || this.response;

        if (status >= 400 && status < 500) {
            this.result = {
                message: response.statusText,
                response: response?.data || 'Something went wrong',
                actions: this.actions,
                success: false,
            };
            return this.result;
        }

        this.toastNotification(
            response?.data?.message ||
                response?.data?.data?.message ||
                'Something went wrong'
        );

        return (this.result = {
            message: response.statusText,
            response: response?.data?.message || 'Something went wrong',
            actions: this.actions,
            success: false,
        });
    }

    /**
     * To prepare data, after successful processing of API
     * @param data any
     * @returns result
     */
    protected returnResult(data: any) {
        return {
            message: this.result.message,
            response: data,
            actions: this.result.actions || null,
            success: this.result.success,
        };
    }

    /**
     * This is for frontend, to know if API processing got failed
     * @param message string
     * @param data any
     * @returns result
     */
    protected failureResult(message: string, data: any) {
        return {
            message: message,
            response: data,
            actions: this.result.actions || null,
            success: false,
        };
    }

    /**
     * This method will be overide by child class
     * It runs before we hit the API from our side
     * This is for extra logic that we need to implement between front-end and backend
     */
    protected preScript() {
        //empty prescript
    }

    /**
     * This method will be overide by child class
     * an be overide by child class
     * This is for extra logic that we need to implement between front-end and backend
     */
    protected postScript() {
        //empty postscript
    }

    /**
     * This method will paginate the response, and its extact same as process
     * By default take and skip will be 10 and 1 respectively
     * We will also run pre and post script here in pagination also to maintain symetric business
     * @returns result
     */
}
