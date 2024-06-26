import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApprovalStepTypeEnum } from '../../../../Constants/preference.constants';

export class AddApprovalStepDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    @IsEnum(ApprovalStepTypeEnum)
    type_id: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    priority: number;

    @Expose()
    @IsOptional()
    properties?: any;
}
