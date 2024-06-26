import { ReactNode } from 'react';

export type PolarisBadgeAppearance =
    | 'polaris-success'
    | 'polaris-success-dark'
    | 'polaris-error'
    | 'polaris-info'
    | 'polaris-info-dark'
    | 'polaris-gray'
    | 'polaris-warning'
    | 'polaris-magic'
    | 'polaris-orange'
    | 'polaris-error-dark'
    | 'polaris-business'
    | 'polaris-customer'
    | 'polaris-tertiary'
    | 'polaris-employee'
    | keyof typeof polarisStatusColors;

export interface BadgeInterface {
    label: string | any;
    appearance?:
        | 'error'
        | 'warning'
        | 'primary'
        | 'success'
        | 'accent'
        | 'info'
        | 'base'
        | 'secondary'
        | 'skyblue'
        | 'orange'
        | 'lightOrange'
        | PolarisBadgeAppearance;

    size?: 'xs' | 'sm' | 'md' | 'lg' | 'polaris-normal' | 'normal';
    className?: string;
    rightIconClassName?: string;
    leftIconColor?: string;
    lefticon?: any;
    leftIconSize?: number;
    leftComponent?: ReactNode;
    rightIcon?: any;
    onRightIconClick?: () => void;
    onClick?: () => void;
    solid?: boolean;
    showIconOnHover?: boolean;
    outline?: boolean;
    id?: string;
    onlyText?: boolean;
    hex?: {
        bg: string;
        text: string;
    };
    circle?: boolean;
}

export const statusColorSolid = {
    error: 'badge-error',
    warning: 'badge-warning',
    primary: 'badge-primary',
    success: 'badge-success',
    accent: 'badge-accent',
    info: 'badge-info',
    base: 'bg-[#A8B2C1] text-white',
    secondary: 'bg-secondary text-white',
    skyblue: 'bg-[#36ADD3] text-white',
    orange: 'bg-orange text-white',
    yellow: 'bg-[#FF8800] text-white',
    darkInfo: 'bg-[#1C61A1] text-white',
    darkBase: 'bg-[#8A8B8C] text-white',
    lightOrange: 'bg-[#ff8800] text-white',
};

export const polarisStatusColors = {
    'polaris-success':
        'bg-polaris-bg-fill-success-secondary text-polaris-text-success-secondary',
    'polaris-error':
        'bg-polaris-bg-fill-critical-secondary text-polaris-text-critical-secondary',
    'polaris-info':
        'bg-polaris-bg-fill-info-secondary text-polaris-text-info-secondary',
    'polaris-gray':
        'bg-polaris-bg-fill-transparent-secondary text-polaris-text-secondary',
    'polaris-tertiary':
        'bg-polaris-bg-surface-tertiary text-polaris-text-secondary',
    'polaris-warning':
        'bg-polaris-bg-fill-caution-secondary text-polaris-text-caution-secondary',
    'polaris-orange':
        'bg-polaris-bg-fill-warning-secondary text-polaris-text-warning-secondary',
    'polaris-magic':
        'bg-polaris-bg-fill-magic-secondary text-polaris-text-magic-secondary',
    'polaris-error-dark':
        'bg-polaris-bg-fill-critical text-polaris-text-critical-on-bg-fill',
    'polaris-info-dark':
        'bg-polaris-bg-fill-emphasis text-polaris-text-emphasis-on-bg-fill',
    'polaris-success-dark':
        'bg-polaris-bg-fill-success text-polaris-text-success-on-bg-fill',
    'polaris-business': 'bg-polaris-business text-polaris-business-icon',
    'polaris-customer': 'bg-polaris-customer text-polaris-customer-icon',
    'polaris-employee': 'bg-polaris-employee text-polaris-employee-icon',
    'info-dark': 'bg-info text-info',
    'info-primary': 'bg-primary text-primary',
};

export const statusColor = {
    error: 'badge-error bg-error/10 text-error',
    warning: 'badge-warning bg-warning/10 text-warning',
    primary: 'badge-primary bg-primary/10 text-primary',
    success: 'badge-success bg-success/10 text-success',
    accent: 'badge-accent bg-accent/10 text-accent',
    info: 'badge-info bg-info/10 text-info',
    base: 'bg-[#A8B2C133] text-base-secondary',
    secondary: 'bg-secondary/10 text-secondary',
    skyblue: 'bg-[#36acd33b] text-[#3F6C95]',
    orange: 'bg-[#ff703c3b] text-orange',
    yellow: 'bg-[#FF88003b] text-[#FF8800]',
    darkInfo: 'bg-[#1C61A13b] text-[#1C61A1]',
    darkBase: 'bg-[#8A8B8C3b] text-[#8A8B8C]',
    lightOrange: 'bg-[#ff8800]/10 text-[#ff8800]',
    ...polarisStatusColors,
};

export const sizeClass = {
    xs: 'text-[10px] px-2 h-5 ',
    sm: 'text-xs px-2 h-6',
    md: 'text-sm h-8 px-3 ',
    lg: 'text-base h-10 px-3',
    'polaris-normal': 'text-xs py-1.5 px-2 h-fit',
    normal: 'text-xs py-1 px-3 h-7',
};

export const polarisSizes = {
    '20': 'w-5 h-5',
    '24': 'w-6 h-6',
    '28': 'w-7 h-7',
    '32': 'w-8 h-8',
    '36': 'w-9 h-9',
    '40': 'w-10 h-10',
    '44': 'w-11 h-11',
};

export type BadgeCircleIconType = 'solid' | 'outline' | 'dotted';

export const badgeCircleIconColor = {
    'polaris-success': 'text-polaris-icon-success',
    'polaris-error': 'text-polaris-icon-critical',
    'polaris-info': 'text-polaris-icon-info',
    'polaris-gray': 'text-polaris-icon-secondary',
    'polaris-tertiary': 'text-polaris-icon-secondary',
    'polaris-warning': 'text-polaris-icon-caution',
    'polaris-orange': 'text-polaris-icon-warning',
    'polaris-magic': 'text-polaris-icon-magic',
    warning: 'text-warning',
    error: 'text-error',
    'polaris-error-dark': 'text-polaris-text-inverse',
    'polaris-info-dark': 'text-polaris-text-inverse',
    'polaris-success-dark': 'text-polaris-text-inverse',
    'polaris-business': 'text-polaris-business-icon',
    'polaris-customer': 'text-polaris-customer-icon',
    'polaris-open': 'text-[#94BED9]',
    'polaris-close': 'text-[#AECDC2]',
    'polaris-employee': 'text-polaris-employee-icon',
};
