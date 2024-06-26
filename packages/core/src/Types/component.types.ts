import { ReactNode } from 'react';

/* Page Loader */
export interface PageLoaderProps {
    screenHeight?: boolean;
    className?: string;
}

/* Admin Wrapper */
export interface AdminWrapperProps {
    children: ReactNode;
}

export type ButtonAppearanceType =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'
    | 'blockLink'
    | 'plain';
export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonShapeType = 'square' | 'circle';

export type GroupedOption = {
    label: string;
    options: SelectBoxOption[];
};

export type SelectBoxOption = {
    value?: any;
    label: string | any;
    isDisabled?: boolean;
    isFixed?: boolean;
    isVisible?: boolean;
    prefix?: React.ReactNode;
    [key: string]: any;
};

export type MetrixItemType = 'number' | 'currency' | 'currency_unit';
