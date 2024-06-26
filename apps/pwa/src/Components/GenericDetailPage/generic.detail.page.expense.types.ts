import {
    GenericListingType,
    ObjectDto,
    commonActionRoleIdentifiersProps,
} from '@finnoto/core';
import { DropdownMenuActionProps, TAB_ITEM } from '@finnoto/design-system';

export interface ApiInterface {
    type: GenericListingType;
    method?: string;
}

type detailItemInfoType = {
    name: string;
    key: string;
    renderValue: (detail: ObjectDto) => void;
};
export interface DetailInfoItem {
    titleKey?: string | ((detail: ObjectDto) => void);
    subTitleKey?: string | ((detail: ObjectDto) => void);
    icon?: any | ((detail: ObjectDto) => void);
    items: detailItemInfoType[];
    renderExtraInfo?: (data: ObjectDto) => void;
}
export type headingInfoType = DetailInfoItem & {
    type: 'vendor' | 'employee' | 'business' | 'avatar';
};
export interface DetailPageInterface {
    disableBreadCrumb?: boolean;
    api: ApiInterface;
    name: string;
    subDetailInfo: {
        heading: headingInfoType;
        items?: DetailInfoItem[];
    };
    breadcrumb?: any;
    tabItems?: TAB_ITEM[];
    onInitRetrieveDetail?: (data: ObjectDto) => void;
    actions?: DropdownMenuActionProps[];
    menu?: ObjectDto;
    onEdit?: (data: ObjectDto, callback?: (data?: any) => void) => void;
    edit_key?: string; // this handle edit action
    custom_column_id?: number;
    custom_field_key?: string;
    disableCommon?: {
        note?: boolean;
        document?: boolean;
        contact_person?: boolean;
    };
    listingRoute?: string;
    status_action: {
        key?: string;
        method?: string;
        activeLabel?: 'Activate';
        activateId?: string;
        deactiveLabel?: 'Deactivate';
        status_key?: string;
        visible?: boolean;
    };
    commonActionRoleIdentifiers: commonActionRoleIdentifiersProps;
}
