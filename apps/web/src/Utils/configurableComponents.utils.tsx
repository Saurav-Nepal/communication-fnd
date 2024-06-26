import { DndComponents } from '@finnoto/design-system';

import SummaryCard from '@Components/SummaryCard/SummaryCard';

import {
    DashboardChargeBackSvgIcon,
    DashboardPaymentChargesSvgIcon,
    DashboardPaymentSvgIcon,
    DashboardRefundSvgIcon,
    DashboardRevenueSvgIcon,
    DashboardSettlementSvgIcon,
    DisputeSvgIcon,
    IndianCurrSvgIcon,
    TaskSvgIcon,
} from 'assets';

const dummyData = {
    mdr: [{ amount: 2118808.04, tax: 321929.42 }],
    refund: [{ amount: 38660697.74, count: 34664 }],
    reconciliationPending: [{ amount: 86966767, count: 38194 }],
    reconciliationDone: [{ amount: 182835224.55, count: 132977 }],
    settlementDone: [{ amount: 292055163.67, count: 311 }],
    payment: [{ amount: 269801991.55, count: 171171 }],
    disputeData: {
        1027: { amount: 1115454, count: 909 },
        1028: { amount: 1115454, count: 909 },
        1029: { amount: 210800, count: 176 },
        1030: { amount: 0, count: 0 },
        1031: { amount: 1896379, count: 812 },
    },
    inProgressDispute: { amount: 210800, count: 176 },
    chargebackData: {
        lost: { amount: 978654, count: 365 },
        pending: { amount: 318765, count: 79 },
    },
};

export const configurableDashboardComponents: DndComponents = {
    'business.payment.details': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DashboardPaymentSvgIcon,
                    title: 'Payments',
                    subTitle: 'Payment Summary',
                }}
                details={{
                    className: '',
                    data: [
                        {
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: dummyData.payment[0].count,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-primary',
                                },
                            ],
                        },
                        {
                            subDetails: [
                                {
                                    icon: IndianCurrSvgIcon,

                                    title: 'Amount',
                                    data: dummyData.payment[0].amount,
                                    type: 'currency_unit',
                                    iconClass: 'text-primary',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 4,
        defaultHeight: 5,
    },
    'business.mdr.details': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DashboardPaymentChargesSvgIcon,
                    title: 'Payment Charges',
                    subTitle: 'Charges Summary',
                }}
                details={{
                    className: '',
                    data: [
                        {
                            subDetails: [
                                {
                                    title: 'Service Charge',
                                    data: dummyData.mdr[0].tax,
                                    type: 'currency_unit',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-primary',
                                },
                            ],
                        },
                        {
                            subDetails: [
                                {
                                    icon: IndianCurrSvgIcon,

                                    title: 'Taxes',
                                    data: dummyData.mdr[0].amount,
                                    type: 'currency_unit',
                                    iconClass: 'text-primary',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 4,
        defaultHeight: 5,
    },
    'business.refund.details': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DashboardRefundSvgIcon,
                    title: 'Refunds',
                    subTitle: 'Refunds Summary',
                    iconClass: 'text-primary',
                }}
                details={{
                    className: '',
                    data: [
                        {
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: dummyData.refund[0].count,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-primary',
                                },
                            ],
                        },
                        {
                            subDetails: [
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-primary',
                                    title: 'Amount',
                                    data: dummyData.refund[0].amount,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 4,
        defaultHeight: 5,
    },
    'business.reconciliation.pending': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DashboardRevenueSvgIcon,
                    title: 'Reconciliations',
                    subTitle: 'Reconcilation Summary',
                    iconClass: 'text-primary',
                }}
                details={{
                    data: [
                        {
                            title: {
                                name: 'Pending',
                                className: 'text-warning',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-warning',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-warning',
                                    title: 'Count',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                        {
                            title: {
                                name: 'Settled',
                                className: 'text-success',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-success',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-success',
                                    title: 'Count',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 6,
        defaultHeight: 6,
    },
    'business.dispute.details': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DisputeSvgIcon,
                    title: 'Disputes',
                    subTitle: 'Disputes Summary',
                    iconClass: 'text-primary',
                }}
                details={{
                    className: '',
                    data: [
                        {
                            title: {
                                name: 'Raised',
                                className: 'text-warning',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-warning',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-warning',
                                    title: 'Amount',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                        {
                            title: {
                                name: 'Resolved',
                                className: 'text-success',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-success',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-success',
                                    title: 'Count',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 6,
        defaultHeight: 6,
    },
    'business.chargeback.details': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DashboardChargeBackSvgIcon,
                    title: 'Chargebacks',
                    subTitle: 'Chargebacks Summary',
                    iconClass: 'text-primary',
                }}
                details={{
                    className: '',
                    data: [
                        {
                            title: {
                                name: 'Pending',
                                className: 'text-warning',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-warning',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-warning',
                                    title: 'Amount',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                        {
                            title: {
                                name: 'Lost',
                                className: 'text-success',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-success',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-success',
                                    title: 'Count',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 6,
        defaultHeight: 6,
    },
    'business.settlement.done': {
        component: () => (
            <SummaryCard
                header={{
                    icon: DashboardSettlementSvgIcon,
                    title: 'Settlements',
                    subTitle: 'Settlements Summary',
                    iconClass: 'text-primary',
                }}
                details={{
                    className: '',
                    data: [
                        {
                            title: {
                                name: 'Pending',
                                className: 'text-warning',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-warning',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-warning',
                                    title: 'Amount',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                        {
                            title: {
                                name: 'Settled',
                                className: 'text-success',
                            },
                            subDetails: [
                                {
                                    title: 'Count',
                                    data: 0,
                                    type: 'number',
                                    icon: TaskSvgIcon,
                                    iconClass: 'text-success',
                                },
                                {
                                    icon: IndianCurrSvgIcon,
                                    iconClass: 'text-success',
                                    title: 'Count',
                                    data: 0,
                                    type: 'currency_unit',
                                },
                            ],
                        },
                    ],
                }}
            />
        ),
        defaultWidth: 6,
        defaultHeight: 6,
    },
};
