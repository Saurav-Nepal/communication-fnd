import { INTEGRATION_LIST } from '../Constants';
import { StoreEvent } from './stateManager.utils';

export const GetIntegrationStatusList = (force: boolean = false) => {
    StoreEvent({
        eventName: INTEGRATION_LIST,
    });
};
