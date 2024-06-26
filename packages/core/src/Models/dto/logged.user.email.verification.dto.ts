import { IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoggedUserEmailVerificationDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    otp: number;
}
