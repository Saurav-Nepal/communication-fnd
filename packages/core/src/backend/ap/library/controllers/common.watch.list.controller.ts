import { BaseModel } from '../../../../Models/base.models';
import { AddWatchListDto } from '../../../common/dtos/add.watch.list.dto';

export class CommonWatchListController extends BaseModel {
    protected endPoint: string;

    async getAll(recordId: number) {
        this.api = `${this.endPoint}/${recordId}/watch-list`;
        return this.get();
    }

    async create(recordId: number) {
        this.api = `${this.endPoint}/${recordId}/watch-list`;
        this.bodyDto = AddWatchListDto;

        return this.post();
    }

    async drop({ recordId, id }: { recordId: number; id: number }) {
        this.api = `${this.endPoint}/${recordId}/watch-list/${id}`;
        return this.delete();
    }
}
