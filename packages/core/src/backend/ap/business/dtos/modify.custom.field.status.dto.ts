import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
export class ModifyCustomFieldStatusDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    is_mandatory: boolean;

    @IsOptional()
    @Expose()
    @IsBoolean()
    active: boolean;
}
