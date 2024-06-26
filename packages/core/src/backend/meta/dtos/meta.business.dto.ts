import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MetaBusinessDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string;

    @IsOptional()
    @Expose()
    @IsNumber()
    product_id?: number;
}
