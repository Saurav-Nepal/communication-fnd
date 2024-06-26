import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class StringSearchDto {
    @Expose()
    @IsOptional()
    str: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    vendor_id ?: number;

    @Expose()
    @IsNumber()
    @IsOptional()
    limit?: number;

    @Expose()
    @IsBoolean()
    @IsOptional()
    active?: number;

    @Expose()
    @IsOptional()
    @IsArray()
    ids?: number[];

    @Expose()
    @IsOptional()
    @IsArray()
    user_ids?: number[];

    @Expose()
    @IsOptional()
    source_type?: string;

    @Expose()
    @IsOptional()
    approval?: {
        pending?: boolean;
        approved?: boolean;
        rejected?: boolean;
    };
}
