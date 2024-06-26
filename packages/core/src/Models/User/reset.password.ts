import { BaseModel } from '../base.models';
import { ResetPasswordPayloadDto } from '../dto/reset.password.dto';

export class ResetPassword extends BaseModel {
    protected api = 'reset-password';
    protected method = this.post;
    protected bodyDto = ResetPasswordPayloadDto;
}
