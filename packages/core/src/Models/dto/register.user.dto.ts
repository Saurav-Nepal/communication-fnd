import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    credential: string;

    @IsOptional()
    @IsString()
    @Expose()
    code?: string;
}
