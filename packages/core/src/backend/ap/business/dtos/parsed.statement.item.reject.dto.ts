import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ParsedStatementItemRejectDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    statement_id: number;
}
