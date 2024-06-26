import { IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoggedUser2faResetDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    token: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    totp: number;
}
