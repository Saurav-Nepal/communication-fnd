import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { IdPayloadDto } from '../../common/dtos/id.payload.dto';

export class TallyGroupEditPayloadDto extends IdPayloadDto {
    @IsOptional()
    @Expose()
    @IsNumber()
    parent_id?: number;

    @IsOptional()
    @Expose()
    name?: string;
}
