import { BaseModel } from '../../../Models/base.models';
import { CommonListFilterDto } from '../../common/dtos/common.list.filter.dto';
import { ScheduleBroadcastDto } from '../dto/schedule.broadcast.dto';
import { WhatsappTemplateCreationDto } from '../dto/whatsapp.template.dto';

export class ScheduleBroadcastController extends BaseModel {
    protected endPoint = 'api/b/schedule-broadcast';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }

    async messages(id: number) {
        this.api = `${this.endPoint}/${id}/messages`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;

        return this.get();
    }
    async create() {
        this.api = `${this.endPoint}`;
        this.bodyDto = ScheduleBroadcastDto;

        return this.post();
    }
}
