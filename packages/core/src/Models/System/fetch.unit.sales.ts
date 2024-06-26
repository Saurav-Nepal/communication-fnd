import { SALES_UNIT } from '../../Constants';
import { GetItemAsync, SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';

export class FetchSalesUnit extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/product-unit`;
    protected method = this.get;

    protected async preScript() {
        if (this.body.force) return;
        const unit = await GetItemAsync(SALES_UNIT);

        if (unit && unit.business_id === this.body.business_id) {
            this.listen = false;
            this.result = this.returnResult(unit.units);
        }
    }

    protected postScript() {
        if (this.result.success) {
            SetItem(
                SALES_UNIT,
                {
                    business_id: this.body.business_id,
                    units: this.result.response,
                },
                {
                    span: 60 * 24,
                }
            );
        }
    }
}
