import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class AddStatementItemDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @Expose()
    @IsNotEmpty()
    transaction_date: string;

    @Expose()
    @IsNotEmpty()
    remarks: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    statement_id: number;
}