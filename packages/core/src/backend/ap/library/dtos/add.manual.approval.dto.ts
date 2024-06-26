import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddManualApprovalDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    employee_id: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    level_id: number;

    @Expose()
    @IsNotEmpty()
    comments?: string;
}
