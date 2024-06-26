import { Expose } from 'class-transformer';
import {
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';

export class AddAddressDto {
    @IsOptional()
    @Expose()
    name: string;

    @IsOptional()
    @Expose()
    pincode: number;

    @IsNotEmpty()
    @IsLatitude()
    @Expose()
    latitude: number;

    @IsNotEmpty()
    @IsLongitude()
    @Expose()
    longitude: number;

    @Expose()
    @IsNotEmpty()
    street_address: string;

    @Expose()
    @IsNotEmpty()
    address: string;

    @Expose()
    @IsOptional()
    country: string;

    @Expose()
    @IsOptional()
    attributes: {
        house_name: string;
        landmark: string;
    };
}
