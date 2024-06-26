import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CommonListFilterDto } from './common.list.filter.dto';

export class EmailMessageListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    email_id?: number;

    @Expose()
    @IsOptional()
    from?: string;

    @Expose()
    @IsOptional()
    subject?: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    unread?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    archived?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    action_taken?: boolean;

    @Expose()
    @IsOptional()
    @IsArray()
    tag_names?: string[];
}
