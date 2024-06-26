import { Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsISO8601, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AddInvoicePaymentDto } from '../../../arc/business/dtos/add.invoice.payment.dto';
import { SourceColumnDto } from '../../../arc/utility/dtos/source.column.dto';
import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';

export class AddP2pDto extends IdPayloadDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    customer_id: number;

    @Expose()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    is_customer_promised: boolean;

    @Expose()
    @IsNotEmpty()
    @IsISO8601()
    due_date: string;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => SourceColumnDto)
    source: SourceColumnDto;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    promised_amount: number;

    @Expose()
    @IsOptional()
    @IsArray()
    @Type(() => AddInvoicePaymentDto)
    @ValidateNested()
    invoices?: AddInvoicePaymentDto[];
}
