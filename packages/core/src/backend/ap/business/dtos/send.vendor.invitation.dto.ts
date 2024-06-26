import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendVendorInvitationDto {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
