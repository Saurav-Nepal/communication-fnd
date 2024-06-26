import { BaseModel } from '../../../../Models/base.models';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { ExtractTableListFilterDto } from '../dtos/extract.table.list.filter.dto';

export class ExtractTableController extends BaseModel {
    protected endpoint = 'api/b/extract-table';

    async search() {
        this.api = `${this.endpoint}/search`;
        this.bodyDto = ExtractTableListFilterDto;
        return this.post();
    }

    async find() {
        this.api = `${this.endpoint}/find`;
        this.bodyDto = StringSearchDto;
        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endpoint}/${id}`;
        return this.get();
    }
}
