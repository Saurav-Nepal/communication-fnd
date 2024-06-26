import { COUNTRIES } from '../../Constants';
import { SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';

export class FetchCountry extends BaseModel {
    protected api = 'countries';
    protected method = this.get;

    protected postScript() {
        if (this.result.success) {
            SetItem(COUNTRIES, this.result.response);
        }
    }
}
