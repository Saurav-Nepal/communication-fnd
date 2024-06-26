import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SpotlightSearchDto {
    @IsNotEmpty()
    @Expose()
    str?: string | number;
}
