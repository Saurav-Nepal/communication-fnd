export interface BankCardProps {
    ifsc_code: string;
    bank_id?: number;
    account_number: number | string;
    name: string;
    showIcon?: boolean;
    active?: boolean;
    onClick?: (data?: any) => void;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    branch?: string;
    titleClassName?: string;
}

export interface BankCardHorizontalProps {
    name?: string;
    acc_no?: string;
    ifsc?: string;
    active?: boolean;
    verified?: boolean;
    swift_code?: string;
    text?: 'primary' | 'secondary' | 'neutral';
    titleText?: 'primary' | 'secondary' | 'neutral';
    size?: 'xs' | 'md';
    badge?: 'active' | 'verified' | 'none';
    icon?: any;
    className?: string;
}
