import React, { useCallback, useMemo } from 'react';

import { AccessNestedObject, ObjectDto } from '@finnoto/core';
import {
    ArcCard,
    BadgeCircleIcon,
    BadgeCircleIconProps,
    cn,
    Ellipsis,
    FormatCurrencyStyled,
} from '@finnoto/design-system';
import {
    PolarisBadgeAppearance,
    polarisStatusColors,
} from '@finnoto/design-system/src/Components/Data-display/Badge/badge.types';
import {
    ArcCardDataMapProps,
    ArcCardIconProps,
    ArcCardProps,
} from '@finnoto/design-system/src/Components/Surfaces/Arc/Cards/card.types';

export interface GenericSplitCardAvatarHeading
    extends Pick<
        ArcCardIconProps,
        | 'sourceKey'
        | 'imageAlt'
        | 'avatarSize'
        | 'badgeSize'
        | 'source'
        | 'className'
        | 'type'
        | 'shape'
        | 'size'
    > {}

export interface GenericSplitDetailCardProps {
    onClick?: (e) => void;
    isActive?: boolean;
    detail: ObjectDto;
    titleKey: string;
    title?: string;
    customAvatar?: React.ReactNode;
    avatarHeading?: GenericSplitCardAvatarHeading;
    subtitle?: {
        visible?: (detail: ObjectDto) => boolean;
        subtitleKey: string;
        renderValue?: (detail: ObjectDto) => React.ReactNode;
    };
    topRightText?: {
        type?: 'amount' | 'text';
        sourceKey?: string;
        renderText?: (detail: ObjectDto) => React.ReactNode;
        getAmount?: (detail: ObjectDto) => number;
        isTextError?: boolean;
        visible?: (detail: ObjectDto) => boolean;
    };
    bottomLeft?: {
        status?: (detail: ObjectDto) => BadgeCircleIconProps['appearance'];
        statusVisible?: (detail: ObjectDto) => boolean;
        sourceKey?: string;
        renderText?: (detail: ObjectDto) => React.ReactNode;
    };
    bottomRight?: {
        type: 'badge' | 'avatar' | 'icon' | 'custom';
        sourceKey?: string;
        source?: any;
        appearance?: PolarisBadgeAppearance;
        alt?: string;
        text?: string;
        visible?: (detail: ObjectDto) => boolean;
        withEllipsis?: boolean;
        renderCustom?: (detail: ObjectDto) => React.ReactNode;
    };
    status?: ArcCardProps['status'];
}

const GenericSplitDetailCard = (props: GenericSplitDetailCardProps) => {
    const {
        subtitle,
        titleKey,
        detail,
        avatarHeading,
        onClick,
        isActive,
        topRightText,
        bottomLeft,
        bottomRight,
        customAvatar,
        ...rest
    } = props;

    const avatarData = useMemo(() => {
        if (!avatarHeading) return null;
        const data: ArcCardIconProps = {
            type: avatarHeading.type ?? 'image',
            ...avatarHeading,
        };
        return data;
    }, [avatarHeading]);

    return (
        <ArcCard
            {...{
                detail,
                onClick,
                isActive,
                isClickable: !!onClick,
                className: cn(
                    'bg-base-100 hover:bg-base-200-light rounded border-base-200-light hover:!shadow-sm hover:border-base-300 relative',
                    {
                        'bg-base-100 hover:bg-base-100 shadow-none hover:!shadow-none hover:border-base-200':
                            !onClick,
                    }
                ),
                activeClassName:
                    'border-primary bg-primary/10 hover:bg-primary/10 hover:border-primary shadow-md hover:!shadow-md',
            }}
            {...rest}
        >
            <ArcCard.Heading className='justify-between px-2 pb-1.5'>
                <div className={cn('flex items-center flex-1 gap-2')}>
                    {(props?.avatarHeading || customAvatar) &&
                        (customAvatar || <ArcCard.Icon {...avatarData} />)}
                    <ArcCard.HeadingContent
                        {...{
                            titleContainerClassName:
                                'text-sm text-base-primary',
                            titleKey,
                            renderTitle: props?.title
                                ? (detail) => (
                                      <span className='font-medium text-base-primary'>
                                          {props.title}
                                      </span>
                                  )
                                : undefined,
                            withEllipsis: true,
                            subtitleKey: subtitle?.subtitleKey,
                            renderSubtitle: (detail) => {
                                const subtitleValue = AccessNestedObject(
                                    detail,
                                    subtitle?.subtitleKey
                                );
                                if (subtitle?.visible?.(detail) === false)
                                    return null;

                                return (
                                    <span className='text-xs text-base-secondary'>
                                        <Ellipsis>
                                            {subtitle?.renderValue?.(detail) ||
                                                subtitleValue}
                                        </Ellipsis>
                                    </span>
                                );
                            },
                        }}
                    />
                    {topRightText && <HeadingRight {...topRightText} />}
                </div>
            </ArcCard.Heading>
            <BottomComponent {...{ bottomLeft, bottomRight }} />
        </ArcCard>
    );
};

const HeadingRight = ({
    isTextError,
    sourceKey,
    renderText,
    getAmount,
    type = 'amount',
    visible,
}: GenericSplitDetailCardProps['topRightText']) => {
    return (
        <ArcCard.HeadingRightComponent>
            {(detail) => {
                const content = AccessNestedObject(detail, sourceKey);
                if (visible && visible(detail) === false) return null;

                if (type === 'text')
                    return (
                        <span
                            className={cn(
                                'text-base-primary font-medium text-sm text-right',
                                {
                                    'text-error': isTextError,
                                }
                            )}
                        >
                            {renderText?.(detail) || content}
                        </span>
                    );

                return (
                    <span>
                        {FormatCurrencyStyled({
                            amount: getAmount?.(detail) || content,
                            textType: isTextError ? 'error' : undefined,
                        })}
                    </span>
                );
            }}
        </ArcCard.HeadingRightComponent>
    );
};

const BottomComponent = ({
    bottomLeft,
    bottomRight,
}: {
    bottomLeft: GenericSplitDetailCardProps['bottomLeft'];
    bottomRight: GenericSplitDetailCardProps['bottomRight'];
}) => {
    const renderBottomLeftComponent = useCallback(
        (detail) => {
            if (!bottomLeft) return null;
            const bottomLeftValue =
                bottomLeft?.renderText?.(detail) ||
                AccessNestedObject(detail, bottomLeft.sourceKey);
            return (
                <div className='flex flex-1 gap-1 max-w-[85%]'>
                    {bottomLeft?.status &&
                        bottomLeft?.statusVisible?.(detail) !== false && (
                            <BadgeCircleIcon
                                {...{
                                    type: 'solid',
                                    size: 16,
                                    appearance: bottomLeft?.status?.(detail),
                                }}
                            />
                        )}
                    {bottomLeftValue && (
                        <span className='flex-1 truncate text-polaris-size-325'>
                            {bottomLeftValue}
                        </span>
                    )}
                </div>
            );
        },
        [bottomLeft]
    );

    const renderBottomRightComponent = useCallback(
        (detail) => {
            if (!bottomRight || bottomRight?.visible?.(detail) === false)
                return null;

            const { type, alt, appearance, sourceKey, text } = bottomRight;

            const source =
                AccessNestedObject(detail, sourceKey) || bottomRight.source;

            if (type === 'icon')
                return (
                    <ArcCard.Icon
                        {...{
                            appearance,
                            type: 'badge',
                            source,
                            badgeSize: '24',
                            className: 'rounded-full',
                            size: 16,
                        }}
                    />
                );

            if (type === 'avatar')
                return (
                    <div className='border rounded-full border-polaris-border'>
                        <ArcCard.Icon
                            {...{
                                type: 'image',
                                source,
                                imageAlt: alt,
                                avatarSize: '24',
                                shape: 'circle',
                            }}
                        />
                    </div>
                );

            const appearanceClassName = polarisStatusColors[appearance];

            return (
                <div
                    className={cn(
                        'px-2 py-1 rounded-full font-normal text-xs min-w-[24px] centralize',
                        appearanceClassName
                    )}
                >
                    {bottomRight?.withEllipsis ? (
                        <Ellipsis>{text || source}</Ellipsis>
                    ) : (
                        text || source
                    )}
                </div>
            );
        },
        [bottomRight]
    );

    const bottomData = useMemo(() => {
        const data: ArcCardDataMapProps = {
            columns: 'one',
            className: '',
            data: [
                {
                    label: {
                        renderTitle: renderBottomLeftComponent,
                        wrapperClassName: 'flex-1',
                    },
                    renderValue: renderBottomRightComponent,
                },
            ],
        };
        return data;
    }, [renderBottomLeftComponent, renderBottomRightComponent]);

    return (
        <ArcCard.Content
            className='px-2 pt-1.5'
            hoverClassName='group-hover/card:bg-base-200-light'
            activeClassName='bg-transparent group-hover/card:bg-transparent'
        >
            <ArcCard.DataMap {...bottomData} />
        </ArcCard.Content>
    );
};

export default GenericSplitDetailCard;
