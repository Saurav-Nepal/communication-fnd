import { ReactNode } from 'react';

import { ObjectDto } from '@slabs/ds-utils';

export type DateFilterType =
    | {
          name?: string;
          key?: string;
          startDateLabel?: string;
          endDateLabel?: string;
          defaultRange?: { min: Date; max: Date };
      }
    | boolean;
export type AmountFilterType =
    | {
          name?: string;
          key?: string;
          defaultRange?: { min: number; max: number };
      }
    | boolean;

export interface FilterContextInterface {
    filterData: ObjectDto;
    filterJson: ObjectDto | undefined;
    filterQuery: string | undefined;
    sqlFilterQuery: string | undefined;
    queryString: ObjectDto;
    handleNavigationSearch: (
        data: ObjectDto,
        isAliasing?: boolean,
        options?: { reset?: boolean }
    ) => void;
    removeFilterData: (key: string | string[]) => void;
    handleFilterData: (data: ObjectDto) => void;
    pagination: { page?: number; limit?: number };
    setPagination: (data: ObjectDto) => void;
    // listFilters: ListFormFilterProps[];
    defaultValues: ObjectDto;
    hasAnyFilter?: (ignore_filter?: string[]) => boolean;
    hasVisibleFilterBtn?: boolean;
    clearAllFilter?: (queries?: ObjectDto) => void;
    definitionFilterColumns?: ObjectDto[];
    isFilterButtonVisible?: boolean;
    // innerListFilters?: ListFormFilterProps[];
    filterAliasKey?: string;
    isAnyFilterApplied?: boolean | null;
    defaultQueries?: ObjectDto;
}
export interface FilterProviderInterface {
    children: ReactNode;
    defaultValues?: ObjectDto;
    filterAliasKey?: string;
    filters?: ObjectDto[];
    dateFilter?: DateFilterType;
    amountFilter?: AmountFilterType;
    name: string;
    definitionKey?: string;
    // innerListFilters?: ListFormFilterProps[];
    filterStoreKey?: string;
    disableNav?: boolean;
    defaultFilterParams?: ObjectDto;
    defaultFilterQueries?: ObjectDto;
    defaultRestrictedQueries?: string;
}
