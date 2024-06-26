import { useMemo } from 'react';

import { getActiveStatusText, ObjectDto } from '@finnoto/core';
import { cn } from '@finnoto/design-system';

const LineStatusCard = ({ data }: { data: ObjectDto }) => {
    const active = data?.active;
    const activeText = useMemo(
        () => getActiveStatusText(active, data),
        [active, data]
    );

    const appearanceClass = useMemo(() => {
        if (activeText === 'Deactivated') return 'text-orange';
        return active ? 'text-success' : 'text-error';
    }, [active, activeText]);

    return (
        <span className={cn('font-medium', appearanceClass)}>{activeText}</span>
    );
};
export default LineStatusCard;
