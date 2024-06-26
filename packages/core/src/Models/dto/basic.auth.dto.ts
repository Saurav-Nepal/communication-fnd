import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class BasicAuthDto {
    @IsNotEmpty()
    @Expose()
    username: string;

    @Expose()
    password?: string;
}
