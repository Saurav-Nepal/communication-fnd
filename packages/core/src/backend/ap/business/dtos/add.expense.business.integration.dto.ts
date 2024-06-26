import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddExpenseBusinessIntegrationDto  {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    integration_id: number;

    @Expose()
    @IsString()
    @IsOptional()
    code: string;
}
