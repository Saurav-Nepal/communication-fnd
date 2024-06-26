import { VerificationStatusTypeEnum } from '@finnoto/core';
import { cn } from '@finnoto/design-system';

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
        return <TextField label='Verification - Rejected' status='error' />;

    if (verification_status_id !== VerificationStatusTypeEnum.APPROVED) {
        return (
            <TextField label='Verification - In Progress' status='warning' />
        );
    }
    if (finops_status_id === VerificationStatusTypeEnum.REJECTED)
        return <TextField label='Finops - Rejected' status='error' />;

    if (finops_status_id !== VerificationStatusTypeEnum.APPROVED) {
        return <TextField label='Finops - In Progress' status='warning' />;
    }
    if (payment_status_id === VerificationStatusTypeEnum.REJECTED)
        return <TextField label='Payment - Rejected' status='error' />;

    if (payment_status_id === VerificationStatusTypeEnum.APPROVED) {
        return <TextField label='Payment - Approved' status='success' />;
    }
    return <TextField label='Payment - Pending Approval' status='warning' />;
};

const TextField = ({
    label,
    status,
}: {
    label: string;
    status: 'success' | 'error' | 'warning';
}) => {
    return (
        <div
            className={cn('flex  w-full text-success text-sm', {
                'text-error': status === 'error',
                'text-warning': status === 'warning',
            })}
        >
            {label}
        </div>
    );
};

export default ReportExpenseStatus;
