import { ReactNode } from 'react';

import { ObjectDto } from '@finnoto/core';

type NoDataButtonType = {
    size?: 'md' | 'xs' | 'sm';
    appearance?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'polaris-white'
        | 'polaris-brand';
    name: string;
    onClick?: (files?: ObjectDto) => void;
    outline?: boolean;
};

export interface NoDataFoundProps {
    icon?: string | (() => any);
    showIcon?: boolean;
    title?: string;
    customIconSize?: number;
    className?: string;
    description?: string;
    descriptionClassName?: string;
    size?: 'md' | 'lg' | 'sm';
    button?: NoDataButtonType;
    enableAddNew?: boolean;
    children?: ReactNode;
    customNoData?: ReactNode;
    leftButton?: NoDataButtonType;
    name?: string;
    titleClassName?: string;
}

export const defaultProps = {
    appearance: 'primary',
    size: 'sm',
    outline: true,
    className: 'flex gap-2',
    onClick: () => {},
};

export const arcDefaultProps = {
    appearance: 'primary',
    size: 'sm',
    onClick: () => {},
};

export const arcLeftProps = {
    appearance: 'polaris-white',
    size: 'sm',
    outline: true,
    onClick: () => {},
};

export const IconSize = {
    sm: 145,
    md: 165,
    lg: 185,
    xl: 205,
};

export const TitleDescriptionTextSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
};

export const ArcTitleDescriptionTextSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-lg',
};
