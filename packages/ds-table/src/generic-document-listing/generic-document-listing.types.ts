import { ReactNode } from 'react';

import { ObjectDto } from '@slabs/ds-utils';

import { FilterContextInterface } from '../filter';
import {
    TableColumn,
    TablemenuActionFunctionProps,
    TablemenuActionProps,
    TablePreferencesProps,
} from '../table/table.types';
import { GenericListingType } from '../types/common.types';

export interface GenericDocumentListingProps {
    name: string;
    definitionKey?: string;
    tableWrapperClassName?: string;
    containerClassName?: string;
    type: GenericListingType;
    tableNumbering?: boolean;
    enableCsvDownload?: boolean;
    table: TableColumn[];
    rowActions?: TablemenuActionProps[] | TablemenuActionFunctionProps;
    // filters?: ListFormFilterProps[] | false;
    removeReportDate?: boolean;
    onlyDisplayQueryFilter?: boolean;
    hideFilter?: boolean;
    hideDisplayFilterKeys?: ObjectDto;
    showOuterDate?: boolean;
    searchMethodParams?: string | number | ObjectDto;
    disableFilterOut?: boolean;
    searchFilter?:
        | {
              placeholder?: string;
              local?: boolean;
              localSearchAttrs?: string | { [key: string]: number };
          }
        | false;
    // dateFilter?: dateFilterType;

    // amountFilter?: amountFilterType;
    disableNetworkCall?: boolean;
    actions?: ActionProps[];
    // customNoData?: NoDataFoundProps;
    // customBreadcrumbData?: TitleRoutePayload[];
    // spacing?: 'compact' | 'small' | 'default';
    showViewFilter?: boolean;
    dashboardComponent?: any;
    preferences?: TablePreferencesProps & {
        container?: boolean;
        selectable?: boolean;
    };
    defaultDbSort?: {
        key: string;
        order: 'asc' | 'desc';
    };
    tabs?: TableTabItem[];
    firstRowIcon?: any;
    // outerFirstIcon?: OuterRowAction;
    // outerSecondIcon?: OuterRowAction;
    tableType?: 'normal' | 'card';
    tableClass?: string;
    disableAggregation?: boolean;
    searchMethod?: string;
    tabFilterKey?: string;
    handleSelectedData?: (__: any) => void;
    selectableActionButton?: any;
    defaultActiveTab?: any;
    defaultClassParams?: ObjectDto;
    asInnerTable?: boolean;
    renderRightFilterComponent?: ReactNode;
    renderRightActionComponent?: ReactNode;
    isSNclickAble?: boolean;
    allColumns?: TableColumn[];
    hideSaveFilter?: boolean;
    splitDetailRoute?: string;
    hideToggleView?: boolean;
    arcBreadcrumbActions?: ActionProps[];
    disableNav?: boolean;
    defaultFilterParams?: ObjectDto;
    defaultFilterQueries?: ObjectDto;
    defaultRestrictedQueries?: string;
    renderMiddleComponent?: (data: any) => ReactNode;
    sanitizeFilter?: (data: ObjectDto) => ObjectDto;
    hidePagination?: boolean;
    withLegacyFilter?: boolean;
    filterTitle?: string;
    renderContentBeforeTable?:
        | ReactNode
        | ((options: {
              clearAllFilter: FilterContextInterface['clearAllFilter'];
          }) => ReactNode);
    disableContextAction?: boolean;
}

export interface MainFilterProp extends FilterProp {
    options?: FilterProp[];
}

export type FilterTypes = 'checkbox' | 'date_range' | 'input' | 'selectbox';

export interface FilterProp {
    name: string;
    key: string;
    type?: FilterTypes;
    placeholder?: string;
    label?: string;
    filterOption?: any[];
}

export interface ActionProps {
    name?: string;
    action?: (data: any) => void;
    type?:
        | 'create'
        | 'toggle_btn'
        | 'icon_btn'
        | 'normal'
        | 'action_btn'
        | 'hoverable_btn';
    outline?: boolean;
    buttonActions?: any[]; // temp any
    // buttonActions?: DropdownMenuActionsProps[];
    icon?: any;
    isSvg?: boolean;
    shape?: 'circle' | 'square';
    visible?: boolean | any;
    disabled?: boolean;
}

export type TableTabItem = {
    title: string;
    key: string;
    customFilterValue?: any;
};
