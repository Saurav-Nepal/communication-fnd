import {
    OPEN_PROPERTY,
    OPEN_PROPERTY_BUSINESS,
} from '../../Constants/storage.constant';
import { SetItem } from '../../Utils/localStorage.utils';
import { BaseModel } from '../base.models';

export class OpenProperty extends BaseModel {
    protected api = 'api/open-property';
    protected method = this.get;
    protected isMeta = true;
    protected showToast = false;

    protected preScript(): void {
        this.isMeta = !this.body.isBusiness;
        this.api = this.body.isBusiness ? 'api/open-property' : this.api;
    }

    protected postScript() {
        if (this.result.success) {
            SetItem(
                this.isMeta ? OPEN_PROPERTY : OPEN_PROPERTY_BUSINESS,
                this.prepareStructure(this.result.response),
                { span: 15 }
            );
        }
    }

    protected prepareStructure(properties: any) {
        const props = {};
        for (let property of properties) {
            props[property.name] = property;
        }
        return props;
    }
}
