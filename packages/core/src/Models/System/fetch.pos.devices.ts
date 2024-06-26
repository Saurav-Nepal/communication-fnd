import { BaseModel } from '../base.models';

export class FetchPosDevices extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/pos`;
    protected method = this.get;
}
