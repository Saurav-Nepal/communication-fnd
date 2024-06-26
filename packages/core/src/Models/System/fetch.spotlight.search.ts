import { BaseModel } from '../base.models';
import { SpotlightSearchDto } from '../dto/spotlight.search.dto';

export class FetchSpotlightSearch extends BaseModel {
    protected api = `api/sb/${this.body.business_id}/spotlight-search`;
    protected method = this.post;
    protected bodyDto = SpotlightSearchDto;
}
