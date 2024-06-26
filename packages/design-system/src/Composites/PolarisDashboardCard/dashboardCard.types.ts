import { dateFilterTransformerType } from '../../Components';
import { BadgeInterface } from '../../Components/Data-display/Badge/badge.types';

export interface IDashboardCardProps {
    title: string;
    titleTooltipDescription?: string;
    heading: {
        type: 'text' | 'currency';
        value: string | number;
        size?: keyof typeof headingSizes;
        textType?: 'error' | 'success';
    };
    customRightComponent?: React.ReactNode;
    changeValue?: {
        value: number;
        suffix?: string; // %, days
        text?: string;
        inverse?: boolean;
        date?: dateFilterTransformerType;
    };
    data?: any;
    icon?: {
        source: any;
        background?: string;
        color?: string;
    };
    customBottomComponent?: React.ReactNode;
    badges?: {
        label?: string;
        icon?: any;
        appearance?: BadgeInterface['appearance'];
        size?: BadgeInterface['size'];
        iconColor?: string;
        message?: string;
    }[];
    slug?: string;
    refetchFn?: () => void;
    onClick?: () => void;
    loading?: boolean;
    showDateIcon?: boolean;
}

export const headingSizes = {
    normal: '!text-lg',
    lg: '!text-xl',
    extraLarge: '!text-[28px] !leading-[34px]',
};
