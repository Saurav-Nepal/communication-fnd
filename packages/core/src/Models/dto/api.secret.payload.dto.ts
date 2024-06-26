import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApiSecretPayloadDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    client_id: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    client_secret: string;
}
