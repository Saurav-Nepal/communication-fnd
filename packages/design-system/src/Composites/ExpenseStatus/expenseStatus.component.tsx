import { createContext, useContext, useMemo, useState } from 'react';

import {
    ApprovalTypeEnum,
    DisplayDateTimeFormat,
    GetDateValue,
    IsNull,
    IsUndefined,
    ObjectDto,
    VerificationStatusTypeEnum,
} from '@finnoto/core';

import { Slot } from '@radix-ui/react-slot';

import { Typography } from '../../Components';
import { Icon } from '../../Components/Data-display/Icon/icon.component';
import { Tooltip } from '../../Components/Data-display/Tooltip/Tooltip.component';
import { cn } from '../../Utils/common.ui.utils';

import {
    ExpenseRejectedSvgIcon,
    ExpenseStatusFinopsIcon,
    ExpenseStatusPayableIcon,
    ExpenseStatusPaymentIcon,
    ExpenseStatusVerificationIcon,
    ExpenseVerifiedSvgIcon,
} from 'assets';

interface ExpenseStatusProps {
    className?: string;
    badgeClassName?: string;
    party_status?: VerificationStatusTypeEnum;
    verification_status?: VerificationStatusTypeEnum;
    finops_status?: VerificationStatusTypeEnum;
    payment_status?: VerificationStatusTypeEnum;
    verification_approved_at?: Date | string;
    finops_approved_at?: Date | string;
    payment_approved_at?: Date | string;
    approval_progress?: ObjectDto;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'normal';
    balance_amount?: number;
    amount?: number;
    pending_confirmation_amount?: number;
    paid_amount?: number;
    withCollapsible?: boolean;
    isInTable?: boolean;
}

interface StatusBadgeProps {
    status?: {
        title?: string;
        className?: string;
        icon?: any;
        type?: string;
    };
    approved_at?: Date | string;
    icon?: any;
    party_status?: VerificationStatusTypeEnum;
    type?: ApprovalTypeEnum;
    currentActive?: boolean;
    className?: string;
    title: string;
    progress?: any;
    size?: ExpenseStatusProps['size'];
    withCollapsible?: boolean;
    isInTable?: boolean;
}

const ExpenseStatusContext = createContext<{
    hoverStatus: string | null;
    setHoverStatus: any;
}>({
    hoverStatus: null,
    setHoverStatus: () => {},
});

export const ExpenseStatus = ({
    className,
    badgeClassName,
    party_status,
    verification_status,
    finops_status,
    payment_status,
    verification_approved_at,
    finops_approved_at,
    payment_approved_at,
    approval_progress,
    size = 'md',
    balance_amount,
    amount,
    pending_confirmation_amount,
    paid_amount,
    withCollapsible,
    isInTable,
}: ExpenseStatusProps) => {
    const status_list: Record<
        VerificationStatusTypeEnum,
        StatusBadgeProps['status']
    > = {
        [VerificationStatusTypeEnum.OPEN]: {
            title: 'Open',
            className: 'bg-base-300/50 text-base-secondary',
        },
        [VerificationStatusTypeEnum.SUBMITTED]: {
            title: 'Submitted',
            className: 'bg-base-300/50 text-base-secondary',
        },
        [VerificationStatusTypeEnum.PENDING_APPROVAL]: {
            title: 'Pending Approval',
            className: 'bg-accent/20 text-accent',
        },
        [VerificationStatusTypeEnum.APPROVED]: {
            title: 'Approved',
            className: 'bg-success/20 text-success ',
            type: 'approved',
            icon: ExpenseVerifiedSvgIcon,
        },
        [VerificationStatusTypeEnum.REJECTED]: {
            title: 'Rejected',
            className: 'bg-error/20 text-error',
            type: 'rejected',
            icon: ExpenseRejectedSvgIcon,
        },
        [VerificationStatusTypeEnum.ON_HOLD]: {
            title: 'On Hold',
            className: 'bg-party-status-hold/20 text-party-status-hold',
        },
    };

    const sizeClasses = {
        xs: 'text-[10px] badge-lg px-1 gap-1',
        sm: 'text-[10px] badge-lg',
        md: 'text-sm badge-lg h-[32px]',
        lg: 'text-sm badge-lg py-4',
        normal: 'text-sm h-[28px]',
    };

    const currentApprovalType = useMemo(() => {
        if (
            verification_status === VerificationStatusTypeEnum.REJECTED ||
            finops_status === VerificationStatusTypeEnum.REJECTED
        )
            return null;
        if (
            (verification_status || IsNull(verification_status)) &&
            ![
                VerificationStatusTypeEnum.APPROVED,
                VerificationStatusTypeEnum.REJECTED,
            ].includes(verification_status as any)
        ) {
            return 'verification';
        }
        if (
            finops_status &&
            ![
                VerificationStatusTypeEnum.APPROVED,
                VerificationStatusTypeEnum.REJECTED,
            ].includes(finops_status as any)
        ) {
            return 'finops';
        }
        if (
            ![
                VerificationStatusTypeEnum.APPROVED,
                VerificationStatusTypeEnum.REJECTED,
            ].includes(payment_status as any)
        ) {
            return 'payment';
        }
        return null;
    }, [finops_status, verification_status, payment_status]);

    const progress = useMemo(() => {
        const defaultProgress = { approved: 0, steps: 0, percentage: 0 };
        if (!approval_progress) return defaultProgress;

        const matrix = {
            ...defaultProgress,
            ...(approval_progress[currentApprovalType as any] ||
                defaultProgress),
        };

        return {
            approved: 0,
            steps: 0,
            ...matrix,
            percentage: (matrix.approved / matrix.steps) * 100,
        };
    }, [approval_progress, currentApprovalType]);

    const withBalance = !IsUndefined(balance_amount);

    const balanceStatusConditions = useMemo(() => {
        const isBalanceZero = balance_amount === 0 || balance_amount < 0;
        const isPaymentConfirmationIsZero = pending_confirmation_amount < 1;

        return {
            isBalanceZero,
            isPaymentConfirmationIsZero,
        };
    }, [balance_amount, pending_confirmation_amount]);

    const balanceStatus = useMemo(() => {
        if (
            party_status === VerificationStatusTypeEnum.REJECTED &&
            payment_status === VerificationStatusTypeEnum.APPROVED
        ) {
            return {
                title: 'Payment Failed',
                className:
                    status_list[VerificationStatusTypeEnum.REJECTED].className,
                type: 'rejected',
                icon: ExpenseRejectedSvgIcon,
            };
        }
        if (payment_status === VerificationStatusTypeEnum.APPROVED) {
            if (
                balanceStatusConditions.isBalanceZero &&
                balanceStatusConditions.isPaymentConfirmationIsZero
            )
                return {
                    title: 'Payment Done',
                    className:
                        status_list[VerificationStatusTypeEnum.APPROVED]
                            .className,
                    type: 'approved',
                    icon: ExpenseVerifiedSvgIcon,
                    progress: { percentage: 100 },
                };
            if (
                balanceStatusConditions.isBalanceZero &&
                !balanceStatusConditions.isPaymentConfirmationIsZero
            )
                return {
                    title: 'Pending Confirmation',
                    className: 'bg-warning/20 !text-warning',
                    currentActive:
                        payment_status === VerificationStatusTypeEnum.APPROVED,
                    progress: {
                        percentage:
                            (((amount || 0) - (balance_amount || 0)) /
                                (amount || 1)) *
                            100,
                    },
                };
        }

        return {
            title:
                payment_status === VerificationStatusTypeEnum.APPROVED
                    ? 'Payment Pending'
                    : 'Not Set',
            className: status_list[VerificationStatusTypeEnum.OPEN].className,
            currentActive:
                payment_status === VerificationStatusTypeEnum.APPROVED,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, balance_amount, payment_status]);

    return (
        <ExpenseStatusContextProvider withCollapsible={withCollapsible}>
            <div
                className={cn('row-flex gap-2 flex-1', className)}
                id='expense-status'
            >
                {/* Check to show only if status is defined */}
                {!IsUndefined(verification_status) && (
                    <StatusBadge
                        title={'Verification'}
                        icon={ExpenseStatusVerificationIcon}
                        className={cn(badgeClassName, sizeClasses[size])}
                        currentActive={currentApprovalType === 'verification'}
                        status={status_list[verification_status]}
                        party_status={party_status}
                        approved_at={verification_approved_at}
                        progress={progress}
                        size={size}
                        withCollapsible={withCollapsible}
                        isInTable={isInTable}
                    />
                )}

                {/* Check to show only if status is defined */}
                {!IsUndefined(finops_status) && (
                    <StatusBadge
                        title={'Finops'}
                        icon={ExpenseStatusFinopsIcon}
                        className={cn(badgeClassName, sizeClasses[size])}
                        currentActive={currentApprovalType === 'finops'}
                        status={status_list[finops_status]}
                        party_status={party_status}
                        approved_at={finops_approved_at}
                        progress={progress}
                        size={size}
                        withCollapsible={withCollapsible}
                        isInTable={isInTable}
                    />
                )}

                {/* Check to show only if status is defined */}
                {!IsUndefined(payment_status) && (
                    <StatusBadge
                        title={withBalance ? 'Payable' : 'Payment'}
                        icon={
                            withBalance
                                ? ExpenseStatusPayableIcon
                                : ExpenseStatusPaymentIcon
                        }
                        type={!currentApprovalType && ApprovalTypeEnum.PAYMENT}
                        className={cn(badgeClassName, sizeClasses[size])}
                        currentActive={currentApprovalType === 'payment'}
                        status={status_list[payment_status]}
                        party_status={party_status}
                        approved_at={payment_approved_at}
                        progress={progress}
                        size={size}
                        withCollapsible={withCollapsible}
                        isInTable={isInTable}
                    />
                )}
                {withBalance && (
                    <StatusBadge
                        title={'Payment'}
                        icon={ExpenseStatusPaymentIcon}
                        type={!currentApprovalType && ApprovalTypeEnum.PAYMENT}
                        className={cn(badgeClassName, sizeClasses[size])}
                        currentActive={balanceStatus.currentActive}
                        status={balanceStatus}
                        // party_status={party_status}
                        progress={balanceStatus.progress}
                        size={size}
                        withCollapsible={withCollapsible}
                        isInTable={isInTable}
                    />
                )}
            </div>
        </ExpenseStatusContextProvider>
    );
};

const StatusBadge = ({
    title,
    type,
    status,
    party_status,
    currentActive,
    className,
    progress,
    size,
    icon,
    withCollapsible,
    isInTable,
    approved_at,
}: StatusBadgeProps) => {
    const { hoverStatus, setHoverStatus } = useContext(ExpenseStatusContext);

    const handleTooltipMessage = (title, currentActive) => {
        if (
            (currentActive || type === ApprovalTypeEnum.PAYMENT) &&
            party_status === VerificationStatusTypeEnum.ON_HOLD
        ) {
            return 'On Hold';
        }
        if (title)
            return (
                <Typography variant='span'>
                    {title}
                    {!!approved_at && (
                        <>
                            <br />
                            <Typography variant='i' size='small'>
                                {DisplayDateTimeFormat({
                                    date: GetDateValue(approved_at),
                                })}
                            </Typography>
                        </>
                    )}
                </Typography>
            );
        if (currentActive) {
            return `In Progress ${progress?.approved}/${progress?.steps}`;
        }
        return 'Not Set';
    };

    const isCollapsed = useMemo(() => {
        if (!withCollapsible) return false;

        if (hoverStatus === null && status?.title === 'Payment Done')
            return false;

        if (
            hoverStatus === null &&
            !currentActive &&
            status?.type !== 'rejected'
        )
            return true;

        if (hoverStatus !== null && hoverStatus !== title) return true;

        return false;
    }, [
        currentActive,
        hoverStatus,
        status?.title,
        status?.type,
        title,
        withCollapsible,
    ]);

    return (
        <Tooltip message={handleTooltipMessage(status?.title, currentActive)}>
            <div
                id={`expense-status-${title.toLowerCase()}`}
                className={cn(
                    'badge !flex justify-start rounded relative border-transparent gap-2 overflow-hidden px-2 select-none',
                    className,
                    {
                        'flex-1 max-w-full': !withCollapsible,
                        'max-w-full w-full flex-1 transition-all ease-linear delay-500 cursor-pointer':
                            withCollapsible,
                        'max-w-[130px] w-[130px]': withCollapsible && isInTable,
                    },
                    {
                        [status?.className]:
                            !currentActive && !!status?.className,
                        'bg-base-300/40 text-base-secondary':
                            !status?.className,
                        'bg-warning/20 text-warning': currentActive,
                        'bg-party-status-hold/20 text-party-status-hold':
                            currentActive &&
                            party_status === VerificationStatusTypeEnum.ON_HOLD,
                        'max-w-[35px]': isCollapsed,
                    }
                )}
                onMouseEnter={() => {
                    if (!withCollapsible) return;
                    setHoverStatus(title);
                }}
            >
                <div
                    style={{
                        width: `${progress?.percentage}%`,
                    }}
                    className={cn(
                        'absolute bottom-0 left-0 h-[2px] animate-pulse',
                        {
                            'bg-warning': currentActive,
                            'bg-success !w-full': [
                                'Approved',
                                'Payment Done',
                            ].includes(status?.title),
                            'bg-party-status-hold':
                                currentActive &&
                                party_status ===
                                    VerificationStatusTypeEnum.ON_HOLD,
                        }
                    )}
                ></div>
                <Icon source={icon} size={size === 'xs' ? 12 : 18} isSvg />
                {title}
            </div>
        </Tooltip>
    );
};

const ExpenseStatusContextProvider = ({ children, withCollapsible }) => {
    const [hoverStatus, setHoverStatus] = useState<string | null>(null);

    const value = useMemo(
        () => ({
            hoverStatus,
            setHoverStatus,
        }),
        [hoverStatus]
    );

    return (
        <ExpenseStatusContext.Provider value={value}>
            <Slot
                onMouseLeave={() => {
                    if (!withCollapsible) return;
                    setHoverStatus(null);
                }}
            >
                {children}
            </Slot>
        </ExpenseStatusContext.Provider>
    );
};
