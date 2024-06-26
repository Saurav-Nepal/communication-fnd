import { Expose } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import 'reflect-metadata';
import { ApprovalTypeEnum } from '../../../../Constants';

export class ResetApprovalDto {
    @IsNotEmpty()
    @IsEnum(ApprovalTypeEnum)
    @IsNumber()
    @Expose()
    type_id: number;

    @IsOptional()
    @IsString()
    @Expose()
    comments: number;
}
