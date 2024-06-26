import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AttachStatementItemExpenseDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    expense_id: number;

    @Expose()
    @IsNotEmpty()
    amount: number;

    @Expose()
    @IsNotEmpty()
    comments: string;
    
}