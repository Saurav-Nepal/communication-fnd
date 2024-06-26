import { Expose } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';

export class GstCreationDto {
    @IsNotEmpty()
    @Expose()
    @Matches(/^\d{2}[0-9A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[A-Z][0-9A-Z]{1}$/, {
        message: 'Invalid gstin number',
    })
    gstin: string;
}
