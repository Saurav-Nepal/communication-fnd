import { BaseModel } from '../base.models';
import { UserKeywordSearchDto } from '../dto/user.keyword.search.dto';

export class SearchProduct extends BaseModel {
    protected api = 'nearby-products';
    protected method = this.post;
    protected bodyDto = UserKeywordSearchDto;
}
