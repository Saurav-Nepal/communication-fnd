export interface DataRowInterface {
    label: string | any;
    labelIcon?: any;
    value: string | any;
    warning?: string | any;
    containerClassName?: string;
    labelClassName?: string;
    valueClassName?: string;
    className?: string;
    onClick?: () => void;
    sub_rows?: DataRowInterface[];
    type?: 'normal' | 'net';
    visible?: boolean;
    isHoverable?: boolean;
}
