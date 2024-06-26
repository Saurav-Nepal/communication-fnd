import { Expose } from "class-transformer";
import { IsOptional, IsNumber } from "class-validator";

export class BusinessViolationApprovalDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    department_manager?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    user_manager?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    user_group_manager?: number;
    
    @Expose()
    @IsOptional()
    @IsNumber()
    individual?: number;
}