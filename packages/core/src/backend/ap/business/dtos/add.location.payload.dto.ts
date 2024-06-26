import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';

export class AddLocationPayloadDto extends IdPayloadDto {
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @Expose()
    location: string;

    @IsNotEmpty()
    @Expose()
    @IsNumber()
    pincode: number;
}
