import { ReactNode } from 'react';

import { CircleConfirmSvgIcon, Fail, Pending } from 'assets';

export const statusIcons = {
    success: CircleConfirmSvgIcon,
    warning: Pending,
    error: Fail,
};

export const statusAppearance = {
    success: {
        text: 'text-success',
        background: 'bg-success/10',
        border: 'border-success',
    },
    warning: {
        text: 'text-warning',
        background: 'bg-warning/10',
        border: 'border-warning',
    },
    error: {
        text: 'text-error',
        background: 'bg-error/10',
        border: 'border-error',
    },
};

export interface StatusInformationCardProps {
    type: keyof typeof statusIcons;
    title: string;
    body?: ReactNode;
    className?: string;
}
