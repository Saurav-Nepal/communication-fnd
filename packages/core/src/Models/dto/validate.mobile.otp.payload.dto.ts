import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MobileOtpPayloadDto } from './mobile.otp.payload.dto';

export class ValidateMobileOtpPayloadDto extends MobileOtpPayloadDto {
    @IsNumber()
    @Expose()
    @IsNotEmpty()
    otp: number;

    @IsOptional()
    @Expose()
    token?: string;
}
