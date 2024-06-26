import { VerificationStatusTypeEnum } from '@finnoto/core';
import { cn, Ellipsis } from '@finnoto/design-system';

interface ReportExpenseStatusProps {
    verification_status_id?: number;
    finops_status_id?: number;
    payment_status_id?: number;
}
const ReportExpenseStatus = ({
    verification_status_id,
    finops_status_id,
    payment_status_id,
}: ReportExpenseStatusProps) => {
    if (verification_status_id === VerificationStatusTypeEnum.REJECTED)
        return (
            <StatusTextField label='Verification - Rejected' status='error' />
        );

    if (verification_status_id !== VerificationStatusTypeEnum.APPROVED) {
        return (
            <StatusTextField
                label='Verification - In Progress'
                status='warning'
            />
        );
    }
    if (finops_status_id === VerificationStatusTypeEnum.REJECTED)
        return <StatusTextField label='Finops - Rejected' status='error' />;

    if (finops_status_id !== VerificationStatusTypeEnum.APPROVED) {
        return (
            <StatusTextField label='Finops - In Progress' status='warning' />
        );
    }
    if (payment_status_id === VerificationStatusTypeEnum.REJECTED)
        return <StatusTextField label='Payment - Rejected' status='error' />;

    if (payment_status_id === VerificationStatusTypeEnum.APPROVED) {
        return <StatusTextField label='Payment - Approved' status='success' />;
    }
    return (
        <StatusTextField label='Payment - Pending Approval' status='warning' />
    );
};

export const StatusTextField = ({
    label,
    status,
}: {
    label: string;
    status: 'success' | 'error' | 'warning' | 'primary' | 'hold';
}) => {
    return (
        <div
            className={cn('flex  w-full text-success text-sm', {
                'text-error': status === 'error',
                'text-warning': status === 'warning',
                'text-primary': status === 'primary',
                'text-orange-400': status === 'hold',
            })}
        >
            <Ellipsis lines={1}>{label}</Ellipsis>
        </div>
    );
};

export default ReportExpenseStatus;
