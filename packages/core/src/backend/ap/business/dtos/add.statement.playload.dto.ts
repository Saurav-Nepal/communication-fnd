import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { FileUploadDto } from "../../../../Types";

export class AddStatementPayloadDto {
    @Expose()
    @IsNotEmpty()
    file: FileUploadDto;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    card_id: number;
    @Expose()
    @IsNotEmpty()
    comments: string;
    @Expose()
    @IsNotEmpty()
    start_date: string;
    @Expose()
    @IsNotEmpty()
    end_date: string
}