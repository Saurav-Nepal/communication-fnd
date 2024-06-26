import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditQueryDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    query: string;
}
