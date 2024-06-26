import { BaseModel } from '../../../../Models/base.models';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { EditQueryDto } from '../dtos/edit.query.dto';

export class BusinessReportController extends BaseModel {
    protected endPoint = 'api/b/report';

    async fetchData() {
        this.api = `${this.endPoint}/${this.body.slug}/data`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }

    async fetchList() {
        this.api = `${this.endPoint}/${this.body.slug}/list`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }

    async getScriptDetail(slug: string) {
        this.api = `${this.endPoint}/${slug}/get-detail`;
        return this.get();
    }
    async editScript(id: string) {
        this.api = `${this.endPoint}/${id}/edit-script`;
        this.bodyDto = EditQueryDto;

        return this.post();
    }
}
