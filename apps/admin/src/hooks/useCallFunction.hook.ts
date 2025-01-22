import { useEffect, useState } from 'react';

import { PARENT_LISTING_DATA } from '@/constants/state.constants';
import { ObjectDto } from '@/types';
import {
    GetFormContent,
    RemoveStarterFromThePath,
} from '@/utils/assistGeneric.utils';
import { ProcessPage } from '@/utils/pageMiddleware.utils';
import { SubscribeToEvent, UnsubscribeEvent } from '@/utils/stateManager.utils';

interface CallFunctionProps {
    listingRow?: any;
    genericData?: any;
    menuDetail?: any;
    parentData?: any;
    portlet?: any;
    source?: string;
    selectedRows?: any;
    callback?: any;
}

const customMethods: ObjectDto = {};

const useCallFunction = ({
    listingRow,
    genericData,
    menuDetail,
    parentData,
    portlet,
    source = 'model',
    selectedRows,
    callback,
}: CallFunctionProps) => {
    const [listing, setListing] = useState<any>();

    useEffect(() => {
        SubscribeToEvent({
            eventName: PARENT_LISTING_DATA,
            callback: setListing,
        });

        return () => {
            UnsubscribeEvent({
                eventName: PARENT_LISTING_DATA,
                callback: setListing,
            });
        };
    }, []);

    /**
     * Method Trigger when the action is clicked
     *
     * @memberof CustomAction
     */
    const callFunction = ({ action }, e) => {
        if (!genericData) return;

        if (listing) {
            genericData.listing = listing;
        }

        // let menuDetail = { ...menuDetailOriginal }; // inorder to avoid double binding, which affects parent state menuDetail
        if (source == 'model') {
            // dont send restricted query for model
            // delete menuDetail.restricted_query;
        }
        const data = RemoveStarterFromThePath({
            data: listingRow,
            starter: genericData.starter,
        });

        if (
            action.callback &&
            typeof customMethods[action.callback] == 'function'
        ) {
            action.callback = customMethods[action.callback];
        } else {
            action.callback = callback;
        }

        // If the action is linked to a form
        // We open the form
        if (action.form_id) {
            // executes form
            genericData.preDefinedmethods.customForm({
                action,
                listingRow: data,
                genericData,
                menuDetail: { ...(menuDetail || {}) },
                parent: parentData,
            });
        } else if (action.execution_script || action.script) {
            // script execution
            // script evaluation goes here
            let pageContent = GetFormContent({
                action,
                listingRow: data,
                genericData,
                portlet,
                source,
                menuDetail: { ...(menuDetail || {}) },
                parent: parentData,
                selectedRows: selectedRows,
            });
            pageContent = {
                ...pageContent,
                ...{
                    execution_script: action.execution_script || action.script,
                },
            };
            ProcessPage({ pageContent }, e);
        } else if (
            typeof genericData.preDefinedmethods[action.method] == 'function' ||
            typeof genericData.preDefinedmethods[action.name] == 'function'
        ) {
            const method =
                genericData.preDefinedmethods[action.method] ||
                genericData.preDefinedmethods[action.name];
            method(
                {
                    action,
                    listingRow: data,
                    genericData,
                    source,
                    menuDetail: { ...(menuDetail || {}) },
                    parent: parentData,
                    portlet,
                },
                e
            );
        } else {
            alert('The ui action ' + action.id + ' is not configued properly');
        }
    };

    return { callFunction };
};

export { useCallFunction };
