import { ObjectDto } from '@finnoto/core';

import { AvatarProps } from '../../../Data-display/Avatar/avatar.types';
import {
    PolarisBadgeAppearance,
    polarisSizes,
} from '../../../Data-display/Badge/badge.types';

export interface ArcCardProps {
    className?: string;
    activeClassName?: string;
    detail?: ObjectDto;
    children?: React.ReactNode;
    isActive?: boolean;
    isClickable?: boolean;
    noBorder?: boolean;
    status?: {
        visible?: boolean;
        appearance?: PolarisBadgeAppearance;
        bg?: string;
    };
}

export interface ArcCardContentProps {
    withDashedBorder?: boolean;
    children: React.ReactNode;
    className?: string;
    hoverClassName?: string;
    activeClassName?: string;
}

export interface ArcCardIconProps {
    type?: 'icon' | 'image' | 'badge';
    appearance?: PolarisBadgeAppearance;
    iconColor?: string;
    source?: string;
    isIconVisible?: boolean;
    sourceKey?: string;
    size?: number;
    avatarSize?: AvatarProps['size'];
    badgeSize?: keyof typeof polarisSizes;
    className?: string;
    leftBorderColor?: string;
    background?: string;
    shape?: AvatarProps['shape'];
    badgeContent?: string;
    imageAlt?: string;
    hex?: {
        bg: string;
        text: string;
    };
    withTooltip?: boolean;
}

export interface ArcCardAvatarWithCountProps extends ArcCardIconProps {
    count: (detail: ObjectDto) => number;
    renderTooltipMessage: (detail: ObjectDto) => React.ReactNode;
}

export interface ArcCardLabelWithIconProps extends ArcCardIconProps {
    titleKey?: string;
    title?: string;
    renderTitle?: (detail: ObjectDto) => React.ReactNode;
    titleClassName?: string;
    visible?: boolean | ((detail: ObjectDto) => boolean);
    wrapperClassName?: string;
    withEllipsis?: boolean;
}

export interface ArcCardDataMapProps {
    columns: 'one' | 'two' | 'three';
    data:
        | ArcCardRowDataProps[]
        | ((detail: ObjectDto) => ArcCardRowDataProps[]);
    direction?: 'row' | 'column';
    justifyContent?: 'between' | 'start';
    className?: string;
}

export interface ArcCardRowDataProps {
    label: ArcCardLabelWithIconProps;
    valueKey?: string;
    renderValue?: (detail: ObjectDto) => React.ReactNode;
    valueClassName?: string;
    className?: string;
    visible?: boolean | ((detail: ObjectDto) => boolean);
}

export interface ArcCardHeadingProps {
    background?: string;
    className?: string;
    children?: React.ReactNode;
    withBottomBorder?: boolean;
    hex?: string;
}

export interface ArcHeadingRightProps {
    children: (detail: ObjectDto) => React.ReactNode;
    className?: string;
}

export interface ArcCardHeadingContentProps {
    renderTitle?: (detail: ObjectDto) => React.ReactNode;
    titleKey?: string;
    renderSubtitle?: (detail: ObjectDto) => React.ReactNode;
    subtitleKey?: string;
    titleContainerClassName?: string;
    withEllipsis?: boolean;
}
