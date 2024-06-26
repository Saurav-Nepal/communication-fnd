import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class AddGroupMemberDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}
