import { CommonController } from '../../common/controllers/common.controller';
export class UserRoleController extends CommonController {
    protected endPoint = 'api/b/user-role';

    async list() {
        this.api = this.endPoint;
        return this.get();
    }
}
