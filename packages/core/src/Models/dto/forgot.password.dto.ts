import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordPayloadDto {
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;
}
