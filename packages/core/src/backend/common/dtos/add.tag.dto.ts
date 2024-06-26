import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AddTagDto {
    @IsNotEmpty()
    @Expose()
    name?: string;
}
