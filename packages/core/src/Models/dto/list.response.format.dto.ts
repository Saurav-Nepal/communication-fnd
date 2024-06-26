import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
export class ListResponseFormatDto {
    @IsOptional()
    @IsBoolean()
    @Expose()
    json?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    csv?: boolean;
}
