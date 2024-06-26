import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddCustomFieldDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    type_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    column_type_id: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    choice_type_id?: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    priority?: number;

    @IsNotEmpty()
    @Expose()
    name: string;

    @IsOptional()
    @Expose()
    default_value: string;

    @IsOptional()
    @Expose()
    @IsBoolean()
    is_mandatory: boolean;

    @IsOptional()
    @Expose()
    @IsBoolean()
    active: boolean;
}
