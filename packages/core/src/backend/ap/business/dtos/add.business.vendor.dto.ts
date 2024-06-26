import { Expose } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { NonGstVendorCreationDto } from './non.gst.vendor.creation.dto';

export class AddBusinessVendorDto extends (NonGstVendorCreationDto as new () => Omit<
    NonGstVendorCreationDto,
    'mobile'
>) {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    business_account_id?: number;

    @IsOptional()
    @Expose()
    custom_field_data?: any;

    @IsOptional()
    @IsEmail()
    @Expose()
    email: string;

    @IsOptional()
    @IsString()
    @Expose()
    mobile: number;
}
