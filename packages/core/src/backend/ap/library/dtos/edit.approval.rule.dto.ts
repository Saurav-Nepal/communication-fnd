import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import 'reflect-metadata';

export class EditApprovalRuleDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    id?: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    priority?: number;
}
