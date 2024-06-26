import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class ModifyBusinessNotificationPreferenceDto {
    @Expose()
    @IsNotEmpty()
    @IsArray()
    emails: string[];

    @Expose()
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
