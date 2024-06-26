import { BaseModel } from '../base.models';
import { FetchSalesUnit } from './fetch.unit.sales';

export class AddSalesUnit extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/product-unit`;
    protected method = this.post;
    // protected bodyDto = AddSalesUnitDto;

    protected async postScript() {
        if (this.result.success) {
            await new FetchSalesUnit({
                business_id: this.body.business_id,
                force: true,
            }).process();
        }
    }
}
