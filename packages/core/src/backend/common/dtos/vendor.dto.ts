import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoggedVendorEmailResendVerificationDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    email: string;
}

export class LoggedVendorEmailVerificationDto extends LoggedVendorEmailResendVerificationDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    token: number;
}

export class LoggedVendorMobileResendVerificationDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    mobile: string;
}

export class LoggedVendorMobileVerificationDto extends LoggedVendorMobileResendVerificationDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    token: number;
}
