import { Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    ValidateNested,
} from 'class-validator';
import { ApiHeaderDto } from './api.header.dto';
import { BasicAuthDto } from '../../ar/library/dtos/basic.auth.dto';
import 'reflect-metadata';

export class RelayWebhookDto {
    @Expose()
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @Expose()
    @IsOptional()
    @Type(() => ApiHeaderDto)
    @ValidateNested()
    @IsArray()
    headers?: ApiHeaderDto[];

    @Expose()
    @IsOptional()
    @Type(() => BasicAuthDto)
    @ValidateNested()
    auth?: BasicAuthDto;

    @IsOptional()
    @Expose()
    enabled_events?: Record<string, boolean>[];
}
