import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommonDashboardPayloadDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    slug: string;

    @Expose()
    @IsOptional()
    @IsString()
    start_time?: string;

    @Expose()
    @IsOptional()
    @IsString()
    end_time?: string;

    [key: string]: any; // Index signature to allow additional properties
}