import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { USER_NAME_LENGTH } from '../../Constants/text.length.constant';

export class UpdateUserDto {
    @MaxLength(USER_NAME_LENGTH, {
        message: `Name should not be more than ${USER_NAME_LENGTH} characters`,
    })
    @IsOptional()
    @Expose()
    name: string;

    @IsOptional()
    @Expose()
    @IsUrl()
    image_url: string;

    @IsOptional()
    @Expose()
    @IsEmail()
    email: string;

    @IsOptional()
    @Expose()
    referral_code?: string;
}
