import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddBusinessIntegrationDto extends IdPayloadDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    integration_id: number;

    @Expose()
    @IsNotEmpty()
    name: string;
}
