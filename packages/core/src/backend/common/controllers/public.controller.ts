import { BaseModel } from '../../../Models/base.models';
import { ValidatePublicTokenDto } from '../dtos/validate.public.token.dto';

export class PublicController extends BaseModel {
    protected endPoint = 'p';

    async validateToken() {
        this.api = `${this.endPoint}/validate-token`;
        this.bodyDto = ValidatePublicTokenDto;

        return this.post();
    }
}
