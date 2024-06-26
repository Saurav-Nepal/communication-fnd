import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddListingPreferenceDto extends IdPayloadDto {
    @Expose()
    @IsOptional()
    identifier?: string;

    @Expose()
    @IsOptional()
    column_definition: any;

    @Expose()
    @IsOptional()
    query_definition: any;

    @Expose()
    @IsOptional()
    @IsBoolean()
    is_global?: boolean;

    @Expose()
    @IsOptional()
    is_favourite?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber({}, { each: true })
    user_ids?: number[];
    
    @Expose()
    @IsNotEmpty()
    @IsOptional()
    group_ids?: number[];
}
