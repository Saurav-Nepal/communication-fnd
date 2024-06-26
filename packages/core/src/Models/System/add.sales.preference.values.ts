import { BaseModel } from '../base.models';
import { FetchSalesPreferenceValues } from './fetch.sales.preference.values';

export class AddSalesPreference extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/preference`;
    protected method = this.post;
    // protected bodyDto = AddSalesPreferenceDto;

    protected async postScript() {
        if (this.result.success) {
            await new FetchSalesPreferenceValues({
                business_id: this.body.business_id,
                force: true,
            }).process();
        }
    }
}
