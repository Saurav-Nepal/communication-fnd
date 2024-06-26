import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UpdateUserNameDto {
    @Expose()
    @IsNotEmpty()
    name: string;
}