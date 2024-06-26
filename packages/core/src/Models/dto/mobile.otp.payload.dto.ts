import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class MobileOtpPayloadDto {
    @IsNotEmpty()
    @Expose()
    mobile: number;
}
