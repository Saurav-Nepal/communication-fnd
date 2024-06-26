import { BaseModel } from '../../../Models/base.models';
import { CommonListFilterDto } from '../dtos/common.list.filter.dto';

export class FetchReport extends BaseModel {
    async fetch() {
        this.api = 'api/b/report/' + this.body.slug;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }
}
