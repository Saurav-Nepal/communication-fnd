import { Expose } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

export class CommonClientCommunicationPayloadDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsOptional()
    @IsString()
    @Expose()
    mobile: number;

    @IsOptional()
    @Expose()
    display_name: string;
}
