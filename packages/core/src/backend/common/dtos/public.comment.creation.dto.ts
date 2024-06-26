import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CommentCreationDto } from './comment.creation.dto';
export class PublicCommentCreationDto extends CommentCreationDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    access_key: number;
}
