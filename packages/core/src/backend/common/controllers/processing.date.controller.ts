import { ProcessingDateListFilterDto } from '../dtos/processing.date.list.filter.dto';
import { CommonController } from './common.controller';
export class ProcessingDateController extends CommonController {
    private endPoint = 'api/b/processing-date';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = ProcessingDateListFilterDto;

        return this.post();
    }
}
