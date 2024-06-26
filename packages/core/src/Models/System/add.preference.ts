import { BaseModel } from '../base.models';
import { AddPreferenceDto } from '../dto/add.preference.dto';

export class AddPreference extends BaseModel {
    protected api = 'api/preference';
    protected method = this.post;
    protected bodyDto = AddPreferenceDto;
}
