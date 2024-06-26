import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApprovalUserTransferDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @Expose()
    comments?: string;
}
