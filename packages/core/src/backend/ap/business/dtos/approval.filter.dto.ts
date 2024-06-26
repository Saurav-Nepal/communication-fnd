import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ApprovalFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    approved?: boolean;

    @IsOptional()
    @Expose()
    @IsBoolean()
    pending?: boolean;

    @IsOptional()
    @Expose()
    @IsBoolean()
    rejected?: boolean;
}
