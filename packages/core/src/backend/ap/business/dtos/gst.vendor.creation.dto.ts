import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';
import { CommonClientCommunicationPayloadDto } from './common.client.communication.payload.dto';

export class GstVendorCreationDto extends CommonClientCommunicationPayloadDto {
    @IsOptional()
    @Expose()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @Expose()
    @Matches(/^\d{2}[0-9A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[A-Z][0-9A-Z]{1}$/, {
        message: 'Invalid gstin number',
    })
    gstin: string;

    @IsOptional()
    @Expose()
    custom_field_data?: any;
}
