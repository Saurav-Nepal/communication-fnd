import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddRoleDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    role_id: number;
}
