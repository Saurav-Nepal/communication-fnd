import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class BankAccountUpdateDto {
    @IsNotEmpty()
    @Expose()
    name: string;
}
