import { BaseModel } from '../../../../Models/base.models';
import { AddListingPreferenceDto } from '../dtos/add.listing.preference.dto';

export class ListingController extends BaseModel {
    private endPoint = `api/b/listing-page`;

    async show(identifier: string) {
        this.api = `${this.endPoint}/${identifier}`;

        return this.get();
    }

    async create(identifier: string) {
        this.api = `${this.endPoint}/${identifier}`;
        this.bodyDto = AddListingPreferenceDto;

        return this.post();
    }

    async remove({ identifier, id }: { identifier: string; id: number }) {
        this.api = `${this.endPoint}/${identifier}/${id}`;

        return this.delete();
    }
}
