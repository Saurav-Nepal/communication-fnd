import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApprovalFilterDto } from './approval.filter.dto';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';

export class OwnershipTransferInvitationListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @Type(() => ApprovalFilterDto)
    @ValidateNested()
    approval?: ApprovalFilterDto;
}
