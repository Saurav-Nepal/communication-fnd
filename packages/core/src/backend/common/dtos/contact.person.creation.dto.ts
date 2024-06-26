import { Expose } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class ContactPersonCreationDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    id?: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;

    @Expose()
    @IsOptional()
    @IsString()
    mobile?: string;

    @Expose()
    @IsOptional()
    role?: string;

    @Expose()
    @IsOptional()
    comments?: string;
}
