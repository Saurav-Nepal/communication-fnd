import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRoleAssignmentDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @Expose()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @Expose()
    @IsArray()
    role_ids: number[];

    @IsOptional()
    @Expose()
    @IsString()
    email?: string;
}
