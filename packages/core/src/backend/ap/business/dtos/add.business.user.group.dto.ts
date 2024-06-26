import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class AddBusinessUserGroupDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    manager_id?: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsNotEmpty()
    description: string;
}
