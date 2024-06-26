import { user } from '.';
import { BaseModel } from '../base.models';
import { UpdateUserDto } from '../dto/update.user.dto';

export class UpdateUser extends BaseModel {
    protected api = 'api/user';
    protected method = this.put;
    protected bodyDto = UpdateUserDto;

    protected postScript() {
        if (this.result.success) {
            user.updateUserData(this.result.response);
        }
    }
}
