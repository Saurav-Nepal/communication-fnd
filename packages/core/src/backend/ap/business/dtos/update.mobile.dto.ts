import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMobileDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    mobile: number;
}

export class UpdateBusinessVendorMobileDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    mobile: number;
}
