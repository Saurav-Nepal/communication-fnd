import React from 'react';
import Truncate from 'react-truncate';

import { useToggle } from '@slabs/ds-hooks';
import { cn } from '@slabs/ds-utils';

import { EllipsisProps } from './ellipsis.types';

export const Ellipsis = ({
    lines = 1,
    width,
    className,
    showText = 'more',
    hideText = 'less',
    withShowMore = false,
    children,
    showTextClassName,
    truncateClassName,
    id,
}: EllipsisProps) => {
    const [isExpanded, toggleExpand] = useToggle([false, true]);
    const [isTruncated, toggleTruncated] = useToggle([false, true]);

    return (
        <div className={cn('w-full', className)}>
            <Truncate
                lines={!isExpanded && lines}
                width={width}
                ellipsis={
                    withShowMore ? (
                        <span>
                            …{' '}
                            <a
                                className={cn(
                                    'table-link font-medium text-base-primary',
                                    showTextClassName
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleExpand(true);
                                }}
                            >
                                {showText}
                            </a>
                        </span>
                    ) : undefined
                }
                onTruncate={toggleTruncated}
                trimWhitespace
                className={truncateClassName}
                id={id}
            >
                {children}
            </Truncate>
            {!isTruncated && isExpanded && (
                <span>
                    {' '}
                    <a
                        className='font-medium table-link text-base-primary'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleExpand(false);
                        }}
                    >
                        {hideText}
                    </a>
                </span>
            )}
        </div>
    );
};
