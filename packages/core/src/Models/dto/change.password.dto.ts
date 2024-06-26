import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @Expose()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Expose()
    @IsNotEmpty()
    old_password: string;
}
