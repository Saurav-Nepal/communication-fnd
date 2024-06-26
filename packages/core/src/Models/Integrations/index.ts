import { AddBusinessIntegrationDto } from '../../backend/ap/business/dtos/add.business.integration.dto';
import { BusinessIntegrationListFilterDto } from '../../backend/ap/business/dtos/bussinessintegration.list.filter.dto';
import { CommonPersonController } from '../../backend/common/controllers/common.person.controller';
import { StringSearchDto } from '../../backend/common/dtos/string.search.dto';

export class Integrations extends CommonPersonController {
    endPoint = 'api/b/integration';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = BusinessIntegrationListFilterDto;
        return this.post();
    }

    async init() {
        this.api = this.endPoint;
        return this.get();
    }

    async getAll() {
        this.api = this.endPoint;
        return this.get();
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

    async create() {
        this.api = this.endPoint;
        this.bodyDto = AddBusinessIntegrationDto;

        return this.post();
    }
}
