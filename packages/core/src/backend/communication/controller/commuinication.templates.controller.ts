import { BaseModel } from '../../../Models/base.models';
import { CommonListFilterDto } from '../../common/dtos/common.list.filter.dto';
import { StringSearchDto } from '../../common/dtos/string.search.dto';
import { WhatsappTemplateCreationDto } from '../dto/whatsapp.template.dto';

export class CommunicationTemplateController extends BaseModel {
    protected endPoint = 'api/b/communication-whatsapp-templates';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;

        return this.get();
    }
    async create() {
        this.api = `${this.endPoint}`;
        this.bodyDto = WhatsappTemplateCreationDto;

        return this.post();
    }

    async find() {
        this.api = `${this.endPoint}/find`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }
}
