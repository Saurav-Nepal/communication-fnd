import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class InvitedUserCreationDto {
    @IsOptional()
    @Expose()
    name?: string;
    @IsNotEmpty()
    @Expose()
    email: string;
    @IsOptional()
    @Expose()
    @IsArray()
    role_ids: number[];
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    business_id: number;
    @IsOptional()
    @IsNumber()
    @Expose()
    product_id: number;
    @IsOptional()
    @Expose()
    @IsArray()
    roles?: string[];
}
