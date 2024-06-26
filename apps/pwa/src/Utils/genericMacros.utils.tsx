import { ApprovalStatusTypeEnum, ObjectDto } from '@finnoto/core';
import { cn, Typography } from '@finnoto/design-system';

import { getDetailUrlUsingSourceType } from './functions.utils';

export const activity_type_macro = (item: any) => {
    const data = item?.activity_type;
    switch (item?.activity_id) {
        case ApprovalStatusTypeEnum.APPROVED:
            return <span className='text-success'>{data || 'Approved'}</span>;
        case ApprovalStatusTypeEnum.ONHOLD:
            return <span className='text-warning'>{data || 'OnHold'}</span>;
        case ApprovalStatusTypeEnum.REJECTED:
            return <span className='text-error'>{data || 'Rejected'}</span>;
        case ApprovalStatusTypeEnum.PENDING:
            return <span className='text-warning'>{data || 'Pending'}</span>;
    }
};

export const render_related_source_item_macro = (item: ObjectDto) => {
    const url = getDetailUrlUsingSourceType(item?.source_type, item?.source_id);
    return (
        <Typography link={url}>
            <span
                className={cn({
                    'border-b border-dashed text-base-primary': url,
                })}
            >
                {item?.attributes?.source_identifier ||
                    item?.source_identifier ||
                    '-'}
            </span>
        </Typography>
    );
};
