import { SourceFilterDto } from '../dtos/source.filter.dto';
import { SourceMapListFilterDto } from '../dtos/source.map.list.filter.dto';
import { CommonPaymentController } from './common.payment.controller';

export class SourceMapController extends CommonPaymentController {
    protected endPoint = 'api/b/source-map';
    protected listFilter = SourceMapListFilterDto;

    async getSources() {
        this.api = this.endPoint + '/find-sources';
        this.bodyDto = SourceFilterDto;

        return this.post();
    }
}
