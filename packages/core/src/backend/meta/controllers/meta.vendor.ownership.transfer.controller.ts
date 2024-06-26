import { BaseModel } from '../../../Models/base.models';

export class MetaVendorOwnershipTransferController extends BaseModel {
	protected endPoint = 'api/vendor-ownership-transfer';

	async getPending() {
		this.api = `${this.endPoint}/get`;
		this.isMeta = true;
		return this.post();
	}

	async accept(id: number) {
		this.api = `${this.endPoint}/${id}/accept`;
		this.isMeta = true;
		return this.post();
	}

	async reject(id: number) {
		this.api = `${this.endPoint}/${id}/reject`;
		this.isMeta = true;
		return this.post();
	}
}
