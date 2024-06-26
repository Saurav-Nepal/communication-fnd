import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IdPayloadDto } from './id.payload.dto';

export class AddDashboardComponentDto extends IdPayloadDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    identifier: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    custom_report_id: number;

    @IsOptional()
    @Expose()
    properties?: any;

    @IsOptional()
    @Expose()
    active?: boolean;
}
