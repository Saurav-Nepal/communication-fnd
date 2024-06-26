import { ObjectDto } from '@finnoto/core';

import { TAB_ITEM, TabsProps } from '../commonTab.types';

export interface PolarisTabsItem extends TAB_ITEM {
    badge?: string | number;
    data?: ObjectDto;
    actions?: ActionsProps[];
}

export interface ActionsProps {
    name: string;
    icon?: string;
    onClick?: (tabData?: ObjectDto) => void;
    type?: 'error' | 'normal' | 'warning' | 'primary' | 'success';
    visible?: boolean;
    rightComponent?: React.ReactNode;
    disabled?: boolean;
}

export interface PolarisTabsProps extends TabsProps {
    tabs: PolarisTabsItem[];
    onClickToAddNew?: () => void;
    fitted?: boolean;
    listContainerClass?: string;
    listInnerContainerClass?: string;
    disableMeasurement?: boolean;
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
    querykey?: string;
}

export interface TabMeasurements {
    containerWidth: number;
    disclosureWidth: number;
    hiddenTabWidths: number[];
}
