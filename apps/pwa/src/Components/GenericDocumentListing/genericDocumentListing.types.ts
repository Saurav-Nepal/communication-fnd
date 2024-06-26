import { GenericListingType, ObjectDto } from '@finnoto/core';
import { NoDataFoundProps } from '@finnoto/design-system/src/Components/Data-display/NoDataFound/noDataFound.types';
import { ButtonProps } from '@finnoto/design-system/src/Components/Inputs/Button/button.types';

import { GenericCardListingListProps } from '@Components/GenericCardListing/genericCardListing';

interface OptionInterface {
    name: string;
    key: string;
}

// export interface SelectInstantFilterInterface {
//     key: string;
//     name?: string;
//     options: OptionInterface[];
// }

export interface GenericDocumentListingProps {
    document_id?: number;
    name: string;
    type: GenericListingType;
    defaultName?: string;
    cardIcon?: any;
    definitionKey?: string;
    // cardIconClassName?: string;
    dashboardComponent?: any;
    filters?: any | false;
    // selectInstantFilter?: SelectInstantFilterInterface;
    dateFilter?:
        | {
              name?: string;
              startDateLabel?: string;
              endDateLabel?: string;
              defaultRange?: { start: Date; end: Date };
          }
        | false;
    amountFilter?: { name?: string } | false;
    searchFilter?: { placeholder?: string } | false;
    disableNetworkCall?: boolean;
    queries?: any;
    list?: GenericCardListingListProps;
    actions?: GenericDocumentListActionProps[];
    // topCreateAction?: () => void;
    showViewFilter?: boolean;
    listingMethod?: string;
    tabs?: TableTabItem[];
    onTabFilterChange?: (value: any, key: string) => void;
    tabFilterKey?: string;
    defaultActiveTab?: any;
    defaultClassParams?: ObjectDto;
    noDataProps?: NoDataFoundProps;
    noAppHeader?: boolean;
    onBackPress?: () => void;
}
export type TableTabItem = {
    title: string;
    key: string;
    customFilterValue?: any;
};

export interface GenericDocumentListActionProps {
    name: string;
    key?: string;
    defaultName?: string;
    icon?: string | (() => any);
    isSvg?: boolean;
    url?: string;
    appearance?: ButtonProps['appearance'];
    visible?: boolean;
    action?: () => void;
    typ?: 'add' | 'dropdown';
}
export interface MainFilterProp extends FilterProp {
    options?: FilterProp[];
}
export interface FilterProp {
    name: string;
    key: string;
    type?: FilterTypes;
}

export type FilterTypes = 'checkbox' | 'date_range';
