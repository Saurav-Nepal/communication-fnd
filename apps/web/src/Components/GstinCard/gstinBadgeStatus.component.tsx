import React from 'react';

import { GST_STATUS_TYPE } from '@finnoto/core';
import { Badge } from '@finnoto/design-system';

const GstinBadgeStatus = ({ status_id }: { status_id: number }) => {
    switch (status_id) {
        case GST_STATUS_TYPE.ACTIVE:
            return <Badge label='Active' size='sm' appearance='success' />;
        case GST_STATUS_TYPE.SUSPENDED:
            return <Badge label='Suspended' size='sm' appearance='warning' />;
        case GST_STATUS_TYPE.CANCELLED:
            return <Badge label='Cancelled' size='sm' appearance='error' />;
        default:
            return <></>;
    }
};

export default GstinBadgeStatus;
