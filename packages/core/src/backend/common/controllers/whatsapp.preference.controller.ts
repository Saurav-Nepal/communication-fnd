import { SetWhatsappPreferenceDto } from '../dtos/set.whatsapp.preference.dto';
import { BaseModel } from '../../../Models/base.models';

export class WhatsappPreferenceController extends BaseModel {
    protected endPoint = 'api/b/whatsapp';

    async getStatus() {
        this.api = this.endPoint;

        return this.get();
    }
    async setStatus() {
        this.api = `${this.endPoint}/set-status`;
        this.bodyDto = SetWhatsappPreferenceDto;

        return this.post();
    }
}
