import { BaseModel } from '../../../../Models/base.models';
import { AddListingPreferenceDto } from '../dtos/add.listing.preference.dto';

export class ListingPreferenceController extends BaseModel {
    private endPoint = `api/b/listing-preference`;

    async getAll(slug: string) {
        this.api = `${this.endPoint}/${slug}`;
        return this.get();
    }

    async show({ slug, id }: { slug: string; id: number }) {
        this.api = `${this.endPoint}/${slug}/${id}`;
        return this.get();
    }
    async getGlobal(slug: string) {
        this.api = `${this.endPoint}/${slug}/global`;
        return this.get();
    }
    async getPersonal(slug: string) {
        this.api = `${this.endPoint}/${slug}/personal`;
        return this.get();
    }

    async makeGlobal({ slug, id }) {
        this.api = `${this.endPoint}/${slug}/${id}/make-global`;
        return this.post();
    }
    async makePersonal({ slug, id }) {
        this.api = `${this.endPoint}/${slug}/${id}/make-personal`;
        return this.post();
    }

    async create(identifier: string) {
        this.api = `${this.endPoint}/${identifier}`;
        this.bodyDto = AddListingPreferenceDto;

        return this.post();
    }
    async makeFavorite({ slug, id }) {
        this.api = `${this.endPoint}/${slug}/${id}/make-favourite`;
        return this.post();
    }
    async removeFavorite({ slug, id }) {
        this.api = `${this.endPoint}/${slug}/${id}/remove-favourite`;
        return this.post();
    }

    async remove({ identifier, id }: { identifier: string; id: number }) {
        this.api = `${this.endPoint}/${identifier}/${id}`;

        return this.delete();
    }
}
