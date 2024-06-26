import { ApprovalStatusType } from '@finnoto/core';
import { Badge } from '@finnoto/design-system';

export const InvitationStatusByEnum = ({
    status_id,
}: {
    status_id: number;
}) => {
    switch (status_id) {
        case ApprovalStatusType.PENDING:
            return (
                <div className='centralize'>
                    <Badge label={'Pending'} appearance={'warning'} size='md' />
                </div>
            );
        case ApprovalStatusType.REJECTED:
            return (
                <div className='centralize'>
                    <Badge label={'Rejected'} appearance={'error'} size='md' />
                </div>
            );
        case ApprovalStatusType.APPROVED:
            return (
                <div className='centralize'>
                    <Badge
                        label={'Approved'}
                        appearance={'success'}
                        size='md'
                    />
                </div>
            );
    }
};
