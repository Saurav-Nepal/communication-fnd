import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ApiSecretPayloadDto {
    @IsNotEmpty()
    @Expose()
    client_id: string;

    @IsNotEmpty()
    @Expose()
    client_secret: string;
}
