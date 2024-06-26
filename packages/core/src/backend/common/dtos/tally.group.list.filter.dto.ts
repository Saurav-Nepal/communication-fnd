import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { CommonListFilterDto } from './common.list.filter.dto';

export class TallyGroupListFilterDto extends CommonListFilterDto {
	@IsOptional()
	@Expose()
	@IsBoolean()
	is_ledger: boolean;

	@IsOptional()
	@Expose()
	@IsBoolean()
	needs_sync?: boolean;
}
