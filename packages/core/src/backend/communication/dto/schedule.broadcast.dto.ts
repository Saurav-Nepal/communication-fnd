import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IdPayloadDto } from '../../common/dtos/id.payload.dto';

export class ScheduleBroadcastDto extends IdPayloadDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    template_id: number;

    @Expose()
    @IsNotEmpty()
    scheduled_at: Date;

    @Expose()
    @IsString()
    @IsNotEmpty()
    csv_link: string;
}
