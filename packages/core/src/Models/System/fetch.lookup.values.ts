import { GetItemAsync, SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';
import { LOOKUP_VALUE } from '../../Constants/storage.constant';

export class FetchLookupValues extends BaseModel {
    protected api = 'lookups';
    protected method = this.get;

    protected async preScript() {
        const lookup = await GetItemAsync(LOOKUP_VALUE, true);
        if (lookup) {
            this.listen = false;
            this.result = this.returnResult(lookup);
        }
    }

    protected postScript() {
        if (this.result.success) {
            SetItem(LOOKUP_VALUE, this.result.response, {
                isNonVolatile: true,
                span: 24 * 60,
            });
        }
    }
}
