import { ApprovalStatusTypeEnum } from '@finnoto/core';
import { cn } from '@finnoto/design-system';

import { VerticalTimelineItem } from './verticalTimeline.types';

export const VerticalTimeline = ({
    className,
    children,
}: {
    className?: string;
    children: any;
}) => {
    return <ol className={cn(className)}>{children}</ol>;
};

export const VTimelineItem = ({
    children,
    title,
    contentClassName,
    titleClassName,
    onClick,
    align = 'center',
    titleLeftComponent,
    containerClass,
    titleContainerClassName,
    lineClassName,
    fullWidth,
}: VerticalTimelineItem) => {
    return (
        <li
            className={cn(
                'flex items-stretch w-full gap-4 group',
                containerClass
            )}
            onClick={onClick}
        >
            <div
                className={cn(
                    'relative flex',
                    {
                        'flex-1': fullWidth,
                    },
                    titleContainerClassName
                )}
            >
                {titleLeftComponent}
                <div
                    className={cn(
                        'rounded min-h-[40px] text-wrap h-full relative text-center text-xs centralize',
                        {
                            'items-start': align === 'start',
                            'flex-1': fullWidth,
                        },
                        titleClassName
                    )}
                >
                    <div
                        className={cn(
                            'absolute w-[1px] bg-base-300 h-full left-1/2 -translate-x-1/2 group-last-of-type:hidden',
                            {
                                'top-1/2': align === 'center',
                            },
                            lineClassName
                        )}
                    ></div>
                    {title}
                </div>
            </div>

            {!fullWidth && (
                <div className={cn('flex items-center', contentClassName)}>
                    {children}
                </div>
            )}
        </li>
    );
};

export const handleActivityTimeline = (id: number) => {
    if (id === ApprovalStatusTypeEnum.APPROVED) {
        return 'activity--approved';
    }
    if (id === ApprovalStatusTypeEnum.REJECTED) {
        return 'activity--rejected';
    }
    if (id === ApprovalStatusTypeEnum.PENDING) {
        return 'activity--pending';
    }
    if (id === ApprovalStatusTypeEnum.ONHOLD) {
        return 'activity--onhold';
    }
    return 'activity--normal';
};
