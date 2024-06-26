import { BaseModel } from '../../../../Models/base.models';
import { BusinessDashboardDto } from '../dtos/business.dashboard.dto';

export class BusinessDashboardController extends BaseModel {
    protected endPoint = 'api/b/dashboard';

    async getData() {
        this.api = `${this.endPoint}/summary`;
        this.bodyDto = BusinessDashboardDto;
        return this.post();
    }
}
