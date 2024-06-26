import { BaseModel } from '../base.models';

export class DeleteSalesUnit extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/product-unit/${this.body.id}`;
    protected method = this.delete;
}
