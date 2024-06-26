import { SALES_CUSTOM_FIELDS } from '../../Constants';
import { GetItemAsync, SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';

export class FetchCustomFields extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/custom-field`;
    protected method = this.get;

    protected async preScript() {
        if (this.body.force) return;
        const pref_store = await GetItemAsync(SALES_CUSTOM_FIELDS);

        if (pref_store && pref_store.business_id === this.body.business_id) {
            this.listen = false;
            this.result = this.returnResult(pref_store.fields);
        }
    }

    protected postScript() {
        if (this.result.success) {
            SetItem(
                SALES_CUSTOM_FIELDS,
                {
                    business_id: this.body.business_id,
                    fields: this.result.response,
                },
                { span: 15 }
            );
        }
    }
}
