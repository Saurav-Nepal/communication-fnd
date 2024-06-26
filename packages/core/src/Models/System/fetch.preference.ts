import { BaseModel } from '../base.models';

export class FetchPreference extends BaseModel {
    protected api = 'api/preference';
    protected method = this.get;
}
