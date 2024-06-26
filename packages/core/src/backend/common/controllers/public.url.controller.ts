import { BaseModel } from '../../../Models/base.models';
export class PublicUrlController extends BaseModel {
    protected endPoint = 'p/url';
    protected baseURL = 'https://api.finnoto.dev';

    async show(slug: string) {
        this.api = `${this.endPoint}/${slug}`;
        return this.get();
    }
}
