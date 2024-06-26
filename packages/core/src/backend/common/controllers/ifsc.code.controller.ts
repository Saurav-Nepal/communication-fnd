import { CommonController } from './common.controller';
export class IfscCodeController extends CommonController {
    protected endPoint = 'api/ifsc-code';

    async list(ifsc: string) {
        this.api = `${this.endPoint}/${ifsc}`;
        return this.get();
    }
}
