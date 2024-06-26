import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddWatchListDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    id?: number;

    @Expose()
    @IsOptional()
    comments?: string;

    @Expose()
    @IsString()
    @IsEmail()
    email?: string;
}
