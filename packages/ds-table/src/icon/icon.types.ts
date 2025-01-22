export type IconSourceType = string | (() => any);

type OUTLINE_IDENTIFIER = 'circular' | 'rectangle';

export type IconProps = {
    source: IconSourceType;
    onClick?: (_?: any) => void | unknown;
    size?: number;
    height?: number | string;
    iconClass?: string;
    className?: string;
    iconColor?: string;
    isSvg?: boolean;
    outlined?: OUTLINE_IDENTIFIER;
    fill?: string;
    hex?: string;
};
