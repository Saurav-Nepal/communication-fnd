import { BaseModel } from '../base.models';
import { FetchCustomFields } from './fetch.custom.fields';

export class AddCustomField extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/custom-field`;
    protected method = this.post;
    // protected bodyDto = AddCustomFieldDto;

    protected async postScript() {
        if (this.result.success) {
            await new FetchCustomFields({
                business_id: this.body.business_id,
                force: true,
            }).process();
        }
    }
}
