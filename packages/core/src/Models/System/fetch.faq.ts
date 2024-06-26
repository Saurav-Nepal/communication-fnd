import { BaseModel } from '../base.models';

export class FetchFAQ extends BaseModel {
    protected api = '/faq/' + this.body.type_id;
    protected method = this.get;
}
