import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    password: string;
}
