import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { GstVendorCreationDto } from './gst.vendor.creation.dto';

export class AddBusinessVendorGstDto extends GstVendorCreationDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    business_account_id?: number;

    @IsOptional()
    @IsEmail()
    @Expose()
    email: string;
}
