import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class ApiHeaderDto {
    @Expose()
    @IsNotEmpty()
    @MinLength(1)
    key: string;

    @Expose()
    @IsNotEmpty()
    @MinLength(1)
    value: string;

    @IsBoolean()
    @IsOptional()
    @Expose()
    encrypt?: boolean;
}
