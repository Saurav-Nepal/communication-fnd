import { ReactNode } from 'react';

import {
    GenericListingType,
    ObjectDto,
    TitleRoutePayload,
} from '@finnoto/core';
import { ListFormFilterProps } from '@finnoto/design-system';
import { NoDataFoundProps } from '@finnoto/design-system/src/Components/Data-display/NoDataFound/noDataFound.types';

import {
    ActionProps,
    TableTabItem,
} from '@Components/GenericDocumentListing/genericDocumentListing.types';

export interface ArcGenericCardListingProps {
    title: string;
    type: GenericListingType;
    definitionKey: string;
    methodParams?: any;
    defaultClassParams?: ObjectDto;
    gridCols?: 1 | 2 | 3 | 4;
    renderCardItem?: (item: ObjectDto) => ReactNode;
    customBreadCrumbData?: TitleRoutePayload[];
    actions?: ActionProps[];
    tabs?: TableTabItem[];
    filters?: ListFormFilterProps[] | false;
    renderRightFilterComponent?: ReactNode;
    renderRightActionComponent?: ReactNode;
    addAction?: ({ ...args }?: any) => void;
    cacheTime?: number;
    tabFilterKey?: string;
    isShowPagination?: boolean;
    activeTab?: string;
    defaultActiveTab?: string;
    splitDetailRoute?: string;
    hideToggleView?: boolean;
    arcBreadcrumbActions?: ActionProps[];
    noDataProps?: NoDataFoundProps;
    withLegacyFilter?: boolean;
    method?: string;
    onSplitButtonClick?: () => void;
}
