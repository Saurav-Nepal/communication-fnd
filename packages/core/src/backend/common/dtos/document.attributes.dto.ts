import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class DocumentAttributesDto {
    @Expose()
    @IsOptional()
    comments?: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    size?: number;

    @Expose()
    @IsOptional()
    name?: string;

    @Expose()
    @IsOptional()
    type?: string;
}
