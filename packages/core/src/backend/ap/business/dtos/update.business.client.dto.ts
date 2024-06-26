import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateBusinessClientDto {
    @Expose()
    @IsBoolean()
    @IsOptional()
    is_msme?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Max(100)
    @Min(0)
    ltds_percentage?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Max(1000)
    @Min(0)
    credit_period?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    bank_id?: number;

    @Expose()
    @IsOptional()
    name?: string;
    
    @Expose()
    @IsOptional()
    email?: string;

    @Expose()
    @IsOptional()
    mobile?: string;
}
