import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CommonClientCommunicationPayloadDto } from './common.client.communication.payload.dto';
export class NonGstVendorCreationDto extends CommonClientCommunicationPayloadDto {
    @IsOptional()
    @Expose()
    @IsNumber()
    id?: number;

    //@todo it give error during non gstin vendor onboarding when user change something on gstin number and change non gstin mode
    // @IsOptional()
    // @Expose()
    // @Matches(/^\d{2}[0-9A-Z]{5}\d{4}[A-Z][1-9A-Z][A-Z][0-9A-Z]$/, {
    //     message: 'Invalid gstin number',
    // })
    // gstin: string;

    @IsOptional() // it is for international vendor
    @IsNumber()
    @Expose()
    pincode: number;

    @Expose()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    type_id: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @Expose()
    custom_field_data?: any;
}
