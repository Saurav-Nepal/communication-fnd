import { BaseModel } from '../base.models';
import { AddCommentDto } from '../../backend/common/dtos/add.comment.dto';

export class AddComment extends BaseModel {
    protected api = 'api/comment';
    protected method = this.post;
    protected bodyDto = AddCommentDto;
}
