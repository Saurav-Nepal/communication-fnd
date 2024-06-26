import { useCallback, useMemo } from 'react';

import {
    IsEmptyString,
    IsUndefinedOrNull,
    ObjectDto,
    useApp,
} from '@finnoto/core';

import { createSafeContext } from '../../../../Utils';
import {
    AccessNestedObject,
    cn,
    IsFunction,
    IsObject,
    IsValidString,
} from '../../../../Utils/common.ui.utils';
import { Avatar } from '../../../Data-display/Avatar/avatar.component';
import {
    badgeCircleIconColor,
    polarisSizes,
    polarisStatusColors,
} from '../../../Data-display/Badge/badge.types';
import { Ellipsis } from '../../../Data-display/Ellipsis/ellipsis.component';
import { Icon } from '../../../Data-display/Icon/icon.component';
import { Tooltip } from '../../../Data-display/Tooltip/Tooltip.component';
import {
    ArcCardAvatarWithCountProps,
    ArcCardContentProps,
    ArcCardDataMapProps,
    ArcCardHeadingContentProps,
    ArcCardHeadingProps,
    ArcCardIconProps,
    ArcCardLabelWithIconProps,
    ArcCardProps,
    ArcCardRowDataProps,
    ArcHeadingRightProps,
} from './card.types';

const arcCardContextErrMessage = 'ArcCard must be used within ArcCardProvider';

const [ArcCardProvider, useArcCard] = createSafeContext<
    Omit<ArcCardProps, 'className' | 'children'> | undefined
>(arcCardContextErrMessage);

export type ArcCardComponentProps = ArcCardProps &
    React.HTMLAttributes<HTMLDivElement>;

const ArcCard = ({
    className,
    children,
    detail,
    isActive,
    isClickable,
    activeClassName,
    status,
    ...rest
}: ArcCardComponentProps) => {
    return (
        <ArcCardProvider value={{ isActive, isClickable, detail }}>
            <div
                className={cn(
                    'border border-polaris-border rounded-lg transition-all overflow-hidden group/card',
                    {
                        'hover:shadow-polaris-shadow-200 hover:border-polaris-border-hover hover:bg-polaris-bg-surface-hover cursor-pointer select-none ':
                            isClickable,
                        relative: !!status?.visible !== false,
                    },
                    className,
                    {
                        [activeClassName ||
                        'bg-polaris-bg-surface-info border border-polaris-border-info hover:border-polaris-border-info hover:bg-polaris-bg-surface-info hover:shadow-polaris-shadow-300 shadow-polaris-shadow-300']:
                            isActive,
                    },
                    {
                        'border-none': rest.noBorder,
                    }
                )}
                {...rest}
            >
                {!!status && status?.visible !== false && (
                    <div
                        className={cn(
                            'absolute w-1 rounded-r top-3 h-7',
                            polarisStatusColors[status.appearance]
                        )}
                        style={{
                            backgroundColor: status.bg,
                        }}
                    ></div>
                )}
                {children}
            </div>
        </ArcCardProvider>
    );
};

const ArcCardHeading = (props: ArcCardHeadingProps) => {
    const { isActive } = useArcCard();

    const hexColor = useMemo(
        () => (props.hex ? { backgroundColor: props.hex } : {}),
        [props]
    );

    return (
        <div
            className={cn(
                'flex gap-2 px-3 py-2 items-center',
                {
                    'border-b': props.withBottomBorder,
                },
                props.className,
                props.background,
                {
                    'border-polaris-border-info':
                        props.withBottomBorder && isActive,
                }
            )}
            style={hexColor}
        >
            {props.children}
        </div>
    );
};

const ArcCardHeadingRightComponent = (props: ArcHeadingRightProps) => {
    const { detail } = useArcCard();

    return <>{props.children(detail)}</>;
};

const ArcCardHeadingContent = (props: ArcCardHeadingContentProps) => {
    const { detail } = useArcCard();

    const titleValues = useMemo(() => {
        return {
            title:
                props.renderTitle ||
                AccessNestedObject(detail, props.titleKey) ||
                ' ',
            subtitle:
                props.renderSubtitle ||
                AccessNestedObject(detail, props.subtitleKey) ||
                ' ',
        };
    }, [
        detail,
        props.renderSubtitle,
        props.renderTitle,
        props.subtitleKey,
        props.titleKey,
    ]);

    return (
        <div className='flex items-center justify-between flex-1 gap-2'>
            <div
                className={cn('flex-1 col-flex', props.titleContainerClassName)}
            >
                {IsValidString(titleValues.title) ? (
                    props.withEllipsis ? (
                        <span className='font-medium text-polaris-text'>
                            <Ellipsis>{titleValues.title}</Ellipsis>
                        </span>
                    ) : (
                        <h5 className='font-medium'>{titleValues.title}</h5>
                    )
                ) : IsObject(titleValues?.title) ? null : (
                    titleValues.title(detail)
                )}

                {IsValidString(titleValues.subtitle) ? (
                    <p className='text-xs'>{titleValues.subtitle}</p>
                ) : (
                    titleValues.subtitle(detail)
                )}
            </div>
        </div>
    );
};

const ArcCardContent = (props: ArcCardContentProps) => {
    const { isClickable, isActive } = useArcCard();

    return (
        <div
            className={cn(
                'px-3 pb-2 transition-all',
                {
                    'py-2': !props.withDashedBorder,
                },
                {
                    [props.hoverClassName ||
                    'group-hover/card:bg-polaris-bg-surface-hover']:
                        isClickable,
                },
                {
                    [props.activeClassName ||
                    'bg-polaris-bg-surface-info border-polaris-border-info group-hover/card:bg-polaris-bg-surface-info']:
                        isActive,
                },
                props.className
            )}
        >
            {props.withDashedBorder && (
                <div
                    className={cn(
                        'mb-2 border-[0.5px] border-dashed border-polaris-border  transition-all',
                        {
                            'group-hover/card:border-polaris-border-hover':
                                isClickable,
                            'group-hover/card:border-polaris-border-info border-polaris-border-info':
                                isActive,
                        }
                    )}
                ></div>
            )}
            {props.children}
        </div>
    );
};

const ArcCardIcon = ({ type = 'icon', ...props }: ArcCardIconProps) => {
    const { detail, isActive } = useArcCard();
    const { isArc } = useApp();

    const className = useMemo(() => {
        const borderColor = props.leftBorderColor
            ? `${props.leftBorderColor} border-l-[2px]`
            : 'border-none';
        const backgroundColor = props.background
            ? `${props.background} h-10 w-10`
            : '';

        return cn(
            'rounded overflow-hidden centralize',
            props.background,
            backgroundColor,
            borderColor,
            props.className
        );
    }, [props]);

    const source = useMemo(
        () =>
            props.source || AccessNestedObject(detail, props.sourceKey) || null,
        [detail, props.source, props.sourceKey]
    );

    const hexColor = useMemo(
        () =>
            props.hex
                ? { backgroundColor: props.hex.bg, color: props.hex.text }
                : {},
        [props]
    );

    if (type === 'badge') {
        return (
            <div
                className={cn(
                    {
                        'rounded-full': props.shape === 'rounded',
                    },
                    polarisStatusColors[props.appearance],
                    badgeCircleIconColor[props.appearance],
                    polarisSizes[props.badgeSize || '24'],
                    {
                        [`${polarisStatusColors['polaris-info']} ${badgeCircleIconColor['polaris-info']}`]:
                            isActive && isArc,
                    },
                    className
                )}
                style={hexColor}
            >
                {props.badgeContent ? (
                    <span>{props.badgeContent}</span>
                ) : (
                    <Icon
                        source={source}
                        size={props.size ?? 20}
                        iconColor={props.iconColor}
                        isSvg
                    />
                )}
            </div>
        );
    }

    return (
        <div className={className} style={hexColor}>
            {type === 'icon' ? (
                <Icon
                    source={source}
                    size={props.size ?? 20}
                    iconColor={cn(props.iconColor, {
                        [`${badgeCircleIconColor['polaris-info']}`]: isActive,
                    })}
                    isSvg
                    hex={props.hex && props.hex.text}
                />
            ) : props?.withTooltip ? (
                <Tooltip message={props?.imageAlt} asChild>
                    <div>
                        <Avatar
                            source={source}
                            customSize={props.size ?? 20}
                            size={props.avatarSize || 'sm'}
                            shape={props.shape || 'rounded'}
                            alt={props?.imageAlt}
                            imageWrapperClassName='bg-polaris-avatar-one-bg-fill text-polaris-avatar-one-text-on-bg-fill '
                        />
                    </div>
                </Tooltip>
            ) : (
                <Avatar
                    source={source}
                    customSize={props.size ?? 20}
                    size={props.avatarSize || 'sm'}
                    shape={props.shape || 'rounded'}
                    alt={props?.imageAlt}
                    imageWrapperClassName='bg-polaris-avatar-one-bg-fill text-polaris-avatar-one-text-on-bg-fill'
                />
            )}
        </div>
    );
};

const ArcCardAvatarWithCount = ({
    count,
    ...props
}: ArcCardAvatarWithCountProps) => {
    const { detail } = useArcCard();

    return (
        <Tooltip message={props.renderTooltipMessage?.(detail)}>
            <div className='relative flex cursor-pointer'>
                <ArcCardIcon {...props} className='absolute right-2.5 z-10' />
                <div
                    className={cn(
                        'relative z-20 bg-polaris-bg-surface-tertiary border-polaris-bg-surface-tertiary text-polaris-text rounded-full centralize',
                        polarisSizes[props.avatarSize || '24'],
                        {
                            rounded: props.shape === 'rounded',
                        }
                    )}
                >
                    <span className='select-none text-polaris-text'>
                        +{count(detail)}
                    </span>
                </div>
            </div>
        </Tooltip>
    );
};

const ArcCardDataMap = ({ justifyContent, ...props }: ArcCardDataMapProps) => {
    const { detail } = useArcCard();

    // Handle if items are at justified at ends or center
    const getAlignClassName = useCallback(
        (index: number) => {
            // For the first item
            if (index === 0 && justifyContent === 'between') {
                return props.direction === 'column'
                    ? 'items-start'
                    : 'justify-start';
            }

            // For the last item
            if (
                index === props.data.length - 1 &&
                justifyContent === 'between'
            ) {
                return props.direction === 'column'
                    ? 'items-end'
                    : 'justify-end';
            }

            return props.direction === 'column'
                ? 'items-center'
                : 'justify-between';
        },
        [props.data.length, props.direction, justifyContent]
    );

    const sanitizedData = useMemo(() => {
        if (IsFunction(props.data)) {
            return props.data(detail);
        }
        return props.data ?? [];
    }, [detail, props]);

    return (
        <div
            className={cn(
                'grid gap-3',
                {
                    'grid-cols-1': props.columns === 'one',
                    'grid-cols-2': props.columns === 'two',
                    'grid-cols-3 ': props.columns === 'three',
                },
                props.className
            )}
        >
            {sanitizedData.map((item, index) => (
                <ArcCardDataRowItem
                    key={index}
                    {...item}
                    className={cn(
                        {
                            'flex-col': props.direction === 'column',
                        },
                        getAlignClassName(index),
                        item.className
                    )}
                />
            ))}
        </div>
    );
};

const ArcCardDataRowItem = (props: ArcCardRowDataProps) => {
    const { detail } = useArcCard();

    const value = useMemo(() => {
        return (
            props.renderValue ||
            AccessNestedObject(detail, props.valueKey) ||
            ' '
        );
    }, [props, detail]);

    if (IsFunction(props.visible) && props.visible?.(detail) === false)
        return null;
    if (props?.visible === false) return null;

    const renderValue = IsValidString(value)
        ? value
        : IsFunction(value)
        ? value(detail)
        : null;

    return (
        <div
            className={cn(
                'flex gap-2 justify-between items-center',
                {
                    'gap-0': renderValue === null,
                },
                props.className
            )}
        >
            <ArcLabelWithIcon {...props.label} />
            {renderValue !== null && (
                <span className={cn('font-medium', props.valueClassName)}>
                    {IsValidString(value) ? (
                        <span>{value}</span>
                    ) : (
                        value(detail)
                    )}
                </span>
            )}
        </div>
    );
};

const ArcLabelWithIcon = ({
    titleClassName,
    wrapperClassName,
    ...props
}: ArcCardLabelWithIconProps) => {
    const { detail } = useArcCard();

    const iconTitle = useMemo(() => {
        return (
            props.renderTitle ||
            props.title ||
            AccessNestedObject(detail, props.titleKey) ||
            ' '
        );
    }, [detail, props.renderTitle, props.title, props.titleKey]);

    // give priority to the props.isIconVisible if it is defined, else check source value
    const isIconVisible = useMemo(() => {
        if (IsUndefinedOrNull(props.isIconVisible)) return !!props.source;
        return props.isIconVisible;
    }, [props.isIconVisible, props.source]);

    if (IsFunction(props?.visible) && props?.visible?.(detail) === false)
        return null;
    if (props?.visible === false) return null;

    return (
        <div
            className={cn(
                'flex gap-2',
                {
                    'gap-0':
                        IsValidString(iconTitle) && IsEmptyString(iconTitle),
                },
                wrapperClassName
            )}
        >
            {isIconVisible && <ArcCardIcon {...props} />}
            {!IsFunction(iconTitle) ? (
                props.withEllipsis ? (
                    <Ellipsis>{iconTitle}</Ellipsis>
                ) : (
                    <p className={cn(titleClassName)}>{iconTitle}</p>
                )
            ) : null}
            {IsFunction(iconTitle) ? iconTitle(detail) : null}
        </div>
    );
};

const ArcCardContentDescription = ({
    children,
}: {
    children: React.ReactNode | ((detail: ObjectDto) => React.ReactNode);
}) => {
    const { detail } = useArcCard();
    return (
        <p className='font-normal'>
            {IsFunction(children) ? children(detail) : children}
        </p>
    );
};

ArcCard.Heading = ArcCardHeading;
ArcCard.HeadingContent = ArcCardHeadingContent;
ArcCard.HeadingRightComponent = ArcCardHeadingRightComponent;
ArcCard.Content = ArcCardContent;
ArcCard.Icon = ArcCardIcon;
ArcCard.DataMap = ArcCardDataMap;
ArcCard.ArcLabelWithIcon = ArcLabelWithIcon;
ArcCard.ContentDescription = ArcCardContentDescription;
ArcCard.AvatarWithCount = ArcCardAvatarWithCount;

export { ArcCard };
