import { SALES_PREFERENCE_VALUE } from '../../Constants';
import { GetItemAsync, SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';

export class FetchSalesPreferenceValues extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/preference`;
    protected method = this.get;

    protected async preScript() {
        if (this.body.force) return;
        const pref_store = await GetItemAsync(SALES_PREFERENCE_VALUE);

        if (pref_store && pref_store.business_id === this.body.business_id) {
            if (this.body.name) {
                const search = pref_store.preferences.filter(
                    (pref: any) => pref.name === this.body.name
                );
                if (search.length > 0) {
                    this.listen = false;
                    this.result = this.returnResult(search[0]);
                }
                return;
            }
            this.listen = false;
            this.result = this.returnResult(pref_store.preferences);
        }
    }

    protected postScript() {
        if (this.result.success) {
            SetItem(
                SALES_PREFERENCE_VALUE,
                {
                    business_id: this.body.business_id,
                    preferences: this.result.response,
                },
                { span: 15 }
            );
            if (this.body.name && this.result.response) {
                const search = (this.result.response || []).filter(
                    (pref: any) => pref.name === this.body.name
                );
                if (search.length > 0) {
                    this.listen = false;
                    this.result = this.returnResult(search[0]);
                }
            }
        }
    }
}
