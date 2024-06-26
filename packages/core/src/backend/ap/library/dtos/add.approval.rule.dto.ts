import { Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import 'reflect-metadata';
import {
    ApprovalActivityTypeEnum,
    ApprovalTypeEnum,
} from '../../../../Constants/preference.constants';
import { AddApprovalStepDto } from './add.approval.step.dto';
import { EditApprovalRuleDto } from './edit.approval.rule.dto';

export class AddApprovalRuleDto extends EditApprovalRuleDto {
    @Expose()
    @IsNotEmpty()
    filter_condition: any;

    @Expose()
    @IsNumber()
    @IsEnum(ApprovalTypeEnum)
    @IsNotEmpty()
    type_id: number;

    @Expose()
    @IsNumber()
    @IsEnum(ApprovalActivityTypeEnum)
    @IsNotEmpty()
    activity_type_id: number;

    @Expose()
    @ValidateNested()
    @Type(() => AddApprovalStepDto)
    @IsArray()
    @IsOptional()
    steps: AddApprovalStepDto[];
}
