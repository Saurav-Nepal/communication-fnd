import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenBusiness {
    @IsNotEmpty()
    @IsString()
    @Expose()
    token: string;
}
