import { BaseModel } from '../../../Models/base.models';
import { user } from '../../../Models/User';
import { AddDashboardComponentsDto } from '../dtos/add.dashboard.components.dto';
import { AddDashboardDto } from '../dtos/add.dashboard.dto';
import { StringSearchDto } from '../dtos/string.search.dto';

export class DashboardController extends BaseModel {
    protected endPoint: string = `api/product`;

    async getAllDashboards() {
        const product_id = user.getProductId();
        this.api = `${this.endPoint}/${product_id}/dashboard`;

        return this.get();
    }

    async getDashboardDetails(identifier: string) {
        const product_id = user.getProductId();
        this.api = `api/b/dashboard-component/${identifier}/dashboard-detail`;

        return this.get();
    }

    async saveDashboardComponent() {
        this.api = `api/b/dashboard-component`;
        this.bodyDto = AddDashboardComponentsDto;

        return this.post();
    }
    async searchDashboardReports(identifier: string) {
        const product_id = user.getProductId();

        this.api = `${this.endPoint}/${product_id}/${identifier}/reports`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }

    async getAllReports() {
        this.api = `api/b/dashboard-component/all-report`;
        return this.get();
    }

    async create() {
        this.api = `${this.endPoint}`;
        this.bodyDto = AddDashboardDto;

        return this.post();
    }
}
