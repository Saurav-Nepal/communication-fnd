import { ReactNode } from 'react';

import { GenericListingType, ObjectDto } from '@finnoto/core';
import { CommonListFilterDto } from '@finnoto/core/src/backend/common/dtos/common.list.filter.dto';

export interface DetailDataType {
    isLoading: boolean;
    data: ObjectDto;
}
interface ListingDataType extends DetailDataType {
    activeId: number;
    data: ObjectDto[];
    stats?: { limit?: number; page?: number; total?: number };
}

export interface TwinPanelProps {
    apiConfigurations: TwinPanelApiConfiguration;
    leftContainerClassName?: string;
    cacheTime?: number;
    rightContainerClassName?: string;
    containerClassName?: string;
    children: [
        (data: ListingDataType) => ReactNode,
        (data: DetailDataType) => ReactNode
    ];
    onDetailData?: (...args: any) => void;
    onListingData?: (...args: any) => void;
    onListActiveChange?: (
        item: ObjectDto,
        context: {
            isLastItemEnds: boolean;
            isFirstItemEnds: boolean;
            listingData: ObjectDto[];
        }
    ) => void;
    isListMoveToTop?: boolean;
    isListScrollable?: boolean;
}

export interface TwinPanelApiConfiguration {
    className: GenericListingType;
    definitionKey?: string;
    method?: string;
    detailMethod?: string;
    detailMethodParams?:
        | ObjectDto
        | ((activeId: number, listingData: ObjectDto) => ObjectDto);
    methodParams?: ObjectDto;
    listingClassParams?: CommonListFilterDto;
    activeId?: number;
    cacheTime?: number;
    detailApiType?: GenericListingType;
    onDetailData?: (detailData: ObjectDto) => void;
    onListingData?: (listingData: ObjectDto[]) => void;
    onListActiveChange?: TwinPanelProps['onListActiveChange'];
    isListMoveToTop?: boolean;
    isListScrollable?: boolean;
}
