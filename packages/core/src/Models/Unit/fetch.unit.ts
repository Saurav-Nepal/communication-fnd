import { UNIT } from '../../Constants';
import { GetItemAsync, SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';

export class FetchUnit extends BaseModel {
    protected api = 'product-units';
    protected method = this.get;

    protected async preScript() {
        const unit = await GetItemAsync(UNIT, true);
        if (unit) {
            this.listen = false;
            this.result = this.returnResult(unit);
        }
    }

    protected postScript() {
        if (this.result.success) {
            SetItem(UNIT, this.result.response, {
                isNonVolatile: true,
                span: 30,
            });

            if (this.result.success && this.body.type_id) {
                this.result = this.returnResult(this.fetchRelatable());
            }
        }
    }

    private async fetchRelatable() {
        await this.process();

        return this.result.response.filter(
            (record) => record.type_id === this.body.type_id
        );
    }
}
