import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';

export class CreditCardTypeListFilterDto extends CommonListFilterDto {
	@Expose()
	@IsOptional()
	@IsNumber()
	employee_id?: number;
}
