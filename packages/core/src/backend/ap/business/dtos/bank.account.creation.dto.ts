import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';
import { Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    ValidateNested
} from 'class-validator';
import 'reflect-metadata';
import { FileUploadDto } from '../../../common/dtos/file.upload.dto';


export class BankAccountCreationDto extends IdPayloadDto {
    @IsOptional()
    @Expose()
    name?: string;

    @IsOptional()
    @Expose()
    display_name?: string;

    @IsNotEmpty()
    @Expose()
    account_number: string;

    @IsOptional()
    @Expose()
    @IsString()
    swift_code: string;

    @IsOptional()
    @Expose()
    @Matches(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/, { message: 'Invalid ifsc code' })
    ifsc_code: string;

    @IsOptional()
    @Expose()
    @ValidateNested()
    @Type(() => FileUploadDto)
    @IsArray()
    files: FileUploadDto[];
}
