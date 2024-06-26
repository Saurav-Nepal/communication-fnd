import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { CommonListFilterDto } from "./common.list.filter.dto";

export class SummaryTdsListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsNotEmpty()
    pan: string;
}