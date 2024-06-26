import { BaseModel } from '../base.models';
import { UserKeywordSearchDto } from '../dto/user.keyword.search.dto';

export class SearchBusiness extends BaseModel {
    protected api = 'nearby-shops';
    protected method = this.post;
    protected bodyDto = UserKeywordSearchDto;
    protected appendBody = {
        relations: ['address', 'segments'],
    };
}
