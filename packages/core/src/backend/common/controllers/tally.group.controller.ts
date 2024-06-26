import { BaseModel } from '../../../Models/base.models';
import { StringSearchDto } from '../dtos/string.search.dto';
import { TallyGroupEditPayloadDto } from '../dtos/tally.group.edit.payload.dto';
import { TallyGroupListFilterDto } from '../dtos/tally.group.list.filter.dto';

export default class TallyGroupController extends BaseModel {
	protected endPoint = 'api/b/tally-group';

	async list() {
		this.api = `${this.endPoint}/search`;
		this.bodyDto = TallyGroupListFilterDto;

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

	async create() {
		this.api = this.endPoint;
		this.bodyDto = TallyGroupEditPayloadDto;
		return this.post();
	}

	async markSynced(id: number) {
		this.api = `${this.endPoint}/${id}/mark-synced`;
		return this.post();
	}

	async markForSync(id: number) {
		this.api = `${this.endPoint}/${id}/enable-sync`;
		return this.post();
	}
}
