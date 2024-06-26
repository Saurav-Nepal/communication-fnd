import { Expose } from 'class-transformer';
import {
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';

export class UserKeywordSearchDto {
    @Expose()
    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @Expose()
    @IsNotEmpty()
    @IsLongitude()
    longitude: number;

    @Expose()
    // @IsNotEmpty()
    @IsOptional()
    keys: string;
}
