import { ReactNode } from 'react';

import { FilterContextInterface } from '@finnoto/design-system';

import { ConfigurableDashboardProps } from '@Components/ConfigurableDashboard/configurableDashboard.component';
import { GenericDocumentListingProps } from '@Components/GenericDocumentListing/genericDocumentListing.types';

export interface GenericDashboardProps
    extends Pick<
            GenericDocumentListingProps,
            'filters' | 'disableNav' | 'defaultFilterParams'
        >,
        Pick<
            ConfigurableDashboardProps,
            | 'gap'
            | 'defaultLayouts'
            | 'components'
            | 'identifier'
            | 'rowHeight'
            | 'debug'
        > {
    name: string;
    renderRightComponent?:
        | ReactNode
        | ((options: {
              clearAllFilter: FilterContextInterface['clearAllFilter'];
          }) => ReactNode);
}
