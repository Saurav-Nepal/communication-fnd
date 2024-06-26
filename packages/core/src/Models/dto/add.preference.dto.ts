import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class AddPreferenceDto {
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @Expose()
    value: number;
}
