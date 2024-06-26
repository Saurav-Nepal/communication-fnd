import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailPayloadDto {
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Expose()
    token: string;
}
