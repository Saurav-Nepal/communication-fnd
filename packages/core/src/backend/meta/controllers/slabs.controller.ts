import { BaseModel } from '../../../Models/base.models';

export class SlabsController extends BaseModel {
    protected endPoint = 'api';
    protected isMeta: boolean = true;

    async getGstin(gstin: string) {
        this.api = `${this.endPoint}/gst/${gstin}`;
        return this.get();
    }

    async getGstFilings(gstin: string) {
        this.api = `${this.endPoint}/gst/${gstin}/filings`;
        return this.get();
    }

    async getPostalCode(pincode: number) {
        this.api = `${this.endPoint}/postal-code/${pincode}`;
        return this.get();
    }

    async getIfscCode(ifscCode: string) {
        this.api = `${this.endPoint}/ifsc-code/${ifscCode}`;
        return this.get();
    }

    async getCompanyTypes() {
        this.api = `${this.endPoint}/get-company-types`;
        return this.get();
    }
    async getDocumentTypes() {
        this.api = `${this.endPoint}/get-document-types`;
        return this.get();
    }

    async getServerUrlById(server_id: number) {
        this.api = `p/server/${server_id}/get`;
        return this.get();
    }
}
