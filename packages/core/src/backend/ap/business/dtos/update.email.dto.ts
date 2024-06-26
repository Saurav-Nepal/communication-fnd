import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateEmailDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;
}
