import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApprovalStatusTypeEnum } from '../../../../Constants';

export class ApprovalPayloadDto {
    @IsOptional()
    @Expose()
    @IsNumber()
    @IsEnum(ApprovalStatusTypeEnum)
    activity_id?: number;

    @IsOptional()
    @Expose()
    comments?: string;
}
