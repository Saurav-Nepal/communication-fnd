import { BaseModel } from '../../../../Models/base.models';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { ViolationDefinitionListFilterDto } from '../dtos/violation.definition.list.filter.dto';

export class ViolationDefinitionController extends BaseModel {
    protected endPoint = 'api/b/violation-definition';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = ViolationDefinitionListFilterDto;

        return this.post();
    }

    async find() {
        this.api = `${this.endPoint}/find`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }
}
