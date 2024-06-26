import { ReactNode } from 'react';

import { ObjectDto } from '@finnoto/core';

import { GenericDocumentListingProps } from './genericDocumentListing.types';

export interface GenericDefinitionListingProps
    extends Omit<GenericDocumentListingProps, 'table'> {
    definitionKey: string;
    configurationClass?: string;
    macros?: { [key: string]: (item: ObjectDto) => ReactNode };
    status_macros?: {
        [key: string]: (
            status: boolean,
            item: ObjectDto
        ) => 'activate' | 'activate_badge';
    };
    query_macros?: {
        [key: string]: (item: ObjectDto) => {
            value: string | number | boolean;
            field: string;
        };
    };
    hideTableConfiguration?: boolean;
    hideListingSlug?: boolean;
    visibleFunctions?: {
        [key: string]: boolean | ((item?: ObjectDto) => boolean);
    };
}
