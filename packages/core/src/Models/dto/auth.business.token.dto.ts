import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class AuthBusinessToken {
    @IsOptional()
    @Expose()
    product_id: number;
}
