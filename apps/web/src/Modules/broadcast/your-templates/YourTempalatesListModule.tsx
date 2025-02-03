import {
    Navigation,
    WHATSAPP_TEMPLATE_CREATION_ROUTE,
    WHATSAPP_TEMPLATE_LIST_ROUTE,
} from '@finnoto/core';

import GenericDocumentListingComponent from '../../../Components/GenericDocumentListing/genericDocumentListing.component';
import { GenericDocumentListingProps } from '../../../Components/GenericDocumentListing/genericDocumentListing.types';

const YourTemplatesListModule = () => {
    const props: GenericDocumentListingProps = {
        type: 'communication_template',
        name: 'Your Template List',
        actions: [
            {
                name: 'Create Template',
                type: 'create',
                action: () => {
                    Navigation.navigate({
                        url: WHATSAPP_TEMPLATE_CREATION_ROUTE,
                    });
                },
            },
        ],
        table: [
            {
                name: 'Template Name',
                key: 'name',
                url: (item) => `${WHATSAPP_TEMPLATE_LIST_ROUTE}/${item.id}`,
            },
            {
                name: 'category',
                key: 'category',
            },
            {
                name: 'status',
                key: 'status',
            },
            {
                name: 'Language',
                key: 'language',
            },
            {
                name: 'Last Updated',
                key: 'updated_at',
                type: 'date_time',
            },
        ],
    };
    return <GenericDocumentListingComponent {...props} />;
};

export default YourTemplatesListModule;
