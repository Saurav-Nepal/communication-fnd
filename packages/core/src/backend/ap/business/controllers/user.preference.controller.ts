import { BaseModel } from '../../../../Models/base.models';
import { AddUserPreferenceDto } from '../dtos/add.user.preference.dto';

export class UserPreferenceController extends BaseModel {
    protected endPoint = 'api/b/user-preference';

    async getAll() {
        this.api = this.endPoint;

        return this.get();
    }
    async show(slug: string) {
        this.api = `${this.endPoint}/${slug}`;
        return this.get();
    }

    async create(slug: string) {
        this.api = `${this.endPoint}/${slug}`;
        this.bodyDto = AddUserPreferenceDto;
        return this.post();
    }
}
