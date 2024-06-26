import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ApiKeyCheckDto {
    @IsNotEmpty()
    @Expose()
    key: string;
}
