import { BaseModel } from '../../../../Models/base.models';

export class IntegrationController extends BaseModel {
    protected endpoint = 'api/b/integrate';

    async search() {
        this.api = `${this.endpoint}/search`;
        return this.post();
    }

    async getSlackId() {
        this.api = `${this.endpoint}/slack-id`;
        return this.get();
    }
}
