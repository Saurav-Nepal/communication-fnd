import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddChoiceTypeDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsNotEmpty()
    description: string;
}
