import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Login2faDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    credential: string;

    @IsOptional()
    @IsString()
    @Expose()
    code?: string;
}
