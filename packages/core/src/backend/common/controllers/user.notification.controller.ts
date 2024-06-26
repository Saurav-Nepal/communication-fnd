import { BaseModel } from '../../../Models/base.models';
import { StringSearchDto } from '../dtos/string.search.dto';
import { UserNotificationListFilterDto } from '../dtos/user.notification.list.filter.dto';

export default class UserNotificationController extends BaseModel {
    protected endPoint = 'api/b/user-notification';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = UserNotificationListFilterDto;

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
    async archive(id: number) {
        this.api = `${this.endPoint}/${id}/archive`;
        return this.post();
    }

    async unArchive(id: number) {
        this.api = `${this.endPoint}/${id}/unarchive`;
        return this.post();
    }
    async acknowledge(id: number) {
        this.api = `${this.endPoint}/${id}/acknowledge`;
        return this.post();
    }
    async removeAcknowledge(id: number) {
        this.api = `${this.endPoint}/${id}/remove-acknowledge`;
        return this.post();
    }
    async acknowledgeAll(id: number) {
        this.api = `${this.endPoint}/acknowledge-all`;
        return this.post();
    }
    async archiveAll(id: number) {
        this.api = `${this.endPoint}/archive-all`;
        return this.post();
    }
}
