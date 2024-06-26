import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ValidatePublicTokenDto {
    @Expose()
    @IsNotEmpty()
    token: string;

    @Expose()
    @IsNotEmpty()
    scope: string[];

    @Expose()
    @IsNotEmpty()
    source: string;
}