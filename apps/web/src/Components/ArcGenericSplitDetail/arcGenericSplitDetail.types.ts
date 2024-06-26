import { ReactNode } from 'react';

import {
    GenericListingType,
    ObjectDto,
    TitleRoutePayload,
} from '@finnoto/core';
import {
    TwinPanelApiConfiguration,
    TwinPanelProps,
} from '@finnoto/design-system';
import { FilterTabItem } from '@finnoto/design-system/src/Components/Data-display/Filter/filter.types';

import { ArcGenericCardListingProps } from '@Components/ArcGenericCardListing/arcGenericCard.types';
import { ActionProps } from '@Components/GenericDocumentListing/genericDocumentListing.types';

export interface ArcGenericSplitDetailProps
    extends Pick<
        ArcGenericCardListingProps,
        | 'title'
        | 'type'
        | 'definitionKey'
        | 'customBreadCrumbData'
        | 'renderRightActionComponent'
        | 'renderRightFilterComponent'
        | 'filters'
        | 'cacheTime'
        | 'arcBreadcrumbActions'
    > {
    title: string;
    method?: string;
    detailApiType?: GenericListingType;
    detailMethod?: string;
    detailMethodParams?: TwinPanelApiConfiguration['detailMethodParams'];
    listWrapperClassName?: string;
    listContainerClassName?: string;
    renderCardItem?: (
        item: ObjectDto,
        activeId?: number,
        index?: number
    ) => ReactNode;
    renderTopBar?: () => ReactNode;
    renderCardLoading?: ReactNode;
    renderListingSection?: TwinPanelProps['children'][0];
    renderDetailSection?: TwinPanelProps['children'][1];
    customBreadCrumbData?: TitleRoutePayload[];
    hidePagination?: boolean;
    actions?: ActionProps[];
    tabs?: FilterTabItem[];
    tabFilterKey?: string;
    defaultActiveTab?: string;
    defaultClassParams?: ObjectDto;
    isScrollable?: boolean;
    isMoveTop?: boolean;
    isShowPagination?: boolean;
    onListActiveChange?: (item: ObjectDto, listingData: ObjectDto[]) => void;
    splitContainerClassName?: string;
    detailContainerClassName?: string;
    withLegacyFilter?: boolean;
    breadcrumbKey?: string;
}
