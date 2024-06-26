import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CommentCreationDto {
    @IsNotEmpty()
    @Expose()
    comments: string;

    @IsNumber()
    @IsOptional()
    @Expose()
    id?: number;
}
