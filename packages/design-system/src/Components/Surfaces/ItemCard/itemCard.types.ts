import { VariantProps } from 'class-variance-authority';

import { ObjectDto } from '@finnoto/core';

import { buttonVariants } from '../../Inputs/Button/button.types';
import { TAB_ITEM } from '../../Navigation/Tabs/commonTab.types';

export interface FooterItemProps {
    title: string;
    renderValue: (
        item?: ObjectDto
    ) => number | string | React.ReactNode | JSX.Element;
    icon?: any;
    iconSize?: number;
    item?: ObjectDto;
    visible?: boolean;
    className?: string;
}

interface ItemCardAction {
    icon: any;
    onClick: (item: ObjectDto) => void;
    appearance: VariantProps<typeof buttonVariants>['appearance'];
}

export interface ItemCardProps {
    item: ObjectDto;
    comments?: string;
    title: string;
    description: string;
    className?: string;
    ellipsis?: boolean;
    footerItems?: FooterItemProps[];
    actions?: ItemCardAction[];
    disableAction?: boolean;
    children?: React.ReactNode;
    tabs?: TAB_ITEM[];
}
