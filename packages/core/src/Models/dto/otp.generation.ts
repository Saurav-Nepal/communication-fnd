import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class OtpDto {
    @IsNotEmpty()
    @Expose()
    user: {
        dialing_code: number;
        mobile: number;
    };

    @Expose()
    otp: number;

    @Expose()
    @IsOptional()
    is_login: boolean;

    @Expose()
    @IsOptional()
    referral_code: string;
}
