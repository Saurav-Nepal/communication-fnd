import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsUrl,
    ValidateNested,
} from 'class-validator';
import { TemplateFileAttributesDto } from './template.file.attributes.dto';
export class TemplateFileUploadDto {
    @IsUrl()
    @IsNotEmpty()
    @Expose()
    url: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    template_id: number;

    @IsNumber()
    @IsOptional()
    @Expose()
    type_id?: number;

    @IsOptional()
    @Expose()
    @ValidateNested()
    @Type(() => TemplateFileAttributesDto)
    attributes?: TemplateFileAttributesDto;
}
