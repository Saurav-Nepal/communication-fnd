import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class AddCreditCardTypeDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    table_id: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    employee_id: number;

    @Expose()
    @IsOptional()
    cc_number: string;

    @Expose()
    @IsOptional()
    color: string;
}