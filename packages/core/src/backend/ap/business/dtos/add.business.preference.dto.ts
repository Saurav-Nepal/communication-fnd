import { Expose } from 'class-transformer';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class AddBusinessPreferenceDto {
    @Expose()
    @IsNotEmpty()
    @IsJSON()
    preference: any;
}
