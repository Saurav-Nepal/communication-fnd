import { BaseModel } from '../../../../Models/base.models';

export class FormScriptController extends BaseModel {
    protected endPoint = 'api/b/form-script';

    async show(identifier: string) {
        this.api = `${this.endPoint}/${identifier}`;
        return this.get();
    }
}
