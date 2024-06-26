import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsBoolean, ValidateNested } from "class-validator";
import { IdPayloadDto } from "../../../common/dtos/id.payload.dto";
import { BusinessViolationApprovalDto } from "./business.violation.approval.dto";
import 'reflect-metadata';

export class AddBusinessViolationDto extends IdPayloadDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    definition_id: number;

    @Expose()
    @IsNotEmpty()
    data: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    type_id?: number;

    @Expose()
    @IsOptional()
    source_type?: string;
    
    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BusinessViolationApprovalDto)
    approval?: BusinessViolationApprovalDto;
}