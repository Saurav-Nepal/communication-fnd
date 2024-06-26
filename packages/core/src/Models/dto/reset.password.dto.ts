import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class ResetPasswordPayloadDto {
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Expose()
    token: string;

    @IsOptional()
    @Expose()
    password: string;
}
