import { ObjectDto, getActiveStatusText } from '@finnoto/core';
import { Badge, cn } from '@finnoto/design-system';
import React, { ReactNode, useMemo } from 'react';

const ActiveBadge = ({
    status,
    isTextOnly,
    label,
    data,
}: {
    status: boolean;
    isTextOnly?: boolean;
    label?: string | ReactNode;
    data?: ObjectDto;
}) => {
    const textLabel = useMemo(() => {
        if (label) return label;
        return getActiveStatusText(status, data);
    }, [data, label, status]);

    if (isTextOnly)
        return (
            <div
                className={cn('text-xs', {
                    'text-success': status,
                    'text-error': !status,
                })}
            >
                {textLabel}
            </div>
        );
    return (
        <Badge
            size='sm'
            appearance={status ? 'success' : 'error'}
            label={textLabel}
        />
    );
};

export default ActiveBadge;
