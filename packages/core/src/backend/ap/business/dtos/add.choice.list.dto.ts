import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class AddChoiceListDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @Expose()
    @IsNotEmpty()
    name: string;
}
