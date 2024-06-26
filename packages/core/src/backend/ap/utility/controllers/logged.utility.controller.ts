import { BaseModel } from '../../../../Models/base.models';
import { user } from '../../../../Models/User';

export class LoggedUtilityController extends BaseModel {
    protected endPoint = 'api';

    async getLookupOfType(id: number) {
        this.api = `${this.endPoint}/lookup-type/${id}/values`;
        return this.get();
    }

    async getProductRoles() {
        const product_id = user.getProductId();
        this.api = `${this.endPoint}/product-user/${product_id}/roles`;
        return this.get();
    }

    async getTDSCategories() {
        this.api = `${this.endPoint}/get-tds-categories`;
        return this.get();
    }

    async getDocumentTypes() {
        this.api = `${this.endPoint}/document-types`;
        return this.get();
    }

    async getBusinessDocumentTypes() {
        this.api = `${this.endPoint}/b/document-type`;
        return this.get();
    }
    async getBusinessVendorDocumentTypes(vendor_type_id: number) {
        this.api = `${this.endPoint}/b/document-type/${vendor_type_id}/find-vendor-document`;
        // this.bodyDto = FindVendorDocumentTypeDto;
        return this.get();
    }
}
