import { Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';
export class SetWhatsappPreferenceDto {
    @Expose()
    @IsBoolean()
    active: boolean;
}
