interface DashboardSlug {
    slug: string;
    dataTitle: string;
}

export const ApSlugs: DashboardSlug[] = [
    {
        slug: 'ap.pending.approval.summary',
        dataTitle: 'pendingApprovals',
    },
    {
        slug: 'ap.today.approved.summary',
        dataTitle: 'approvedSummary',
    },
    {
        slug: 'ap.approval.status.overview',
        dataTitle: 'approvalStatus',
    },
    {
        slug: 'ap.today.rejected.summary',
        dataTitle: 'rejectedSummaryData',
    },
    {
        slug: 'ap.today.blocked.summary',
        dataTitle: 'blockedSummaryData',
    },
    { slug: 'ap.approval.aging.overview', dataTitle: 'approvalAgingData' },
    {
        slug: 'ap.payment.pending.aging.overview',
        dataTitle: 'paymentAgingData',
    },
];

export const MsmeSlugs: DashboardSlug[] = [
    {
        slug: 'ap.msme.no.of.vendors.summary',
        dataTitle: 'noOfMsmeVendor',
    },
    {
        slug: 'ap.msme.partially.paid.summary',
        dataTitle: 'partiallyPaid',
    },
    {
        slug: 'ap.msme.overdue.balance.summary',
        dataTitle: 'overdueBalance',
    },
    {
        slug: 'ap.msme.gross.balance.summary',
        dataTitle: 'grossBalance',
    },
    {
        slug: 'ap.msme.payable.calendar',
        dataTitle: 'payableCalendar',
    },
    {
        slug: 'ap.msme.payment.aging.summary',
        dataTitle: 'paymentAgingData',
    },
    {
        slug: 'ap.msme.pending.vendor.balance.summary',
        dataTitle: 'pendingVendorBalance',
    },
];

export const DepartmentDashboardSummarySlugs: DashboardSlug[] = [
    {
        slug: 'ap.department.total.raised.summary',
        dataTitle: 'total_raised',
    },
    {
        slug: 'ap.department.total.pending.approvals.summary',
        dataTitle: 'pending_approvals',
    },
    {
        slug: 'ap.department.blocked.document.summary',
        dataTitle: 'on_hold',
    },
    {
        slug: 'ap.departments.rejected.documents.summary',
        dataTitle: 'rejected_invoices',
    },
    {
        slug: 'ap.department.pending.payment.summary',
        dataTitle: 'pending_payment',
    },
    {
        slug: 'ap.department.payment.released.summary',
        dataTitle: 'payment_released',
    },
    {
        slug: 'ap.department.expense.head.summary',
        dataTitle: 'expenseHeadSummary',
    },
    {
        slug: 'ap.department.expense.status.summary',
        dataTitle: 'expenseStatusSummary',
    },
    {
        slug: 'ap.department.expense.aging.summary',
        dataTitle: 'expenseAgingSummary',
    },
    {
        slug: 'ap.department.expense.on.hold.aging.summary',
        dataTitle: 'onHoldAgingSummary',
    },
    {
        slug: 'ap.department.expenditure.summary',
        dataTitle: 'expenditureSummary',
    },
];

export const managementDashboardSlugs: DashboardSlug[] = [
    {
        slug: 'ap.my.department.raised.expense.summary',
        dataTitle: 'total_raised',
    },
    {
        slug: 'ap.my.department.pending.approvals.summary',
        dataTitle: 'pending_raised',
    },
    {
        slug: 'ap.my.department.on.hold.summary',
        dataTitle: 'on_hold_documents',
    },
    {
        slug: 'ap.my.department.rejected.documents.summary',
        dataTitle: 'rejected_invoices',
    },
    {
        slug: 'ap.my.department.pending.payments.summary',
        dataTitle: 'pending_payments',
    },
    {
        slug: 'ap.my.department.payment.released.summary',
        dataTitle: 'payment_released',
    },
    {
        slug: 'ap.my.department.expense.head.summary',
        dataTitle: 'expenseHeadSummary',
    },
    {
        slug: 'ap.my.department.expense.status.summary',
        dataTitle: 'expenseStatusSummary',
    },
    {
        slug: 'ap.department.expense.aging.summary',
        dataTitle: 'expenseAgingSummary',
    },
    {
        slug: 'ap.department.expense.on.hold.aging.summary',
        dataTitle: 'onHoldAgingSummary',
    },
    {
        slug: 'ap.my.department.expenditure.summary',
        dataTitle: 'expenditureSummary',
    },
];

export const ApAllPaymentsSlugs: DashboardSlug[] = [
    {
        slug: 'ap.payment.pending.summary',
        dataTitle: 'paymentPending',
    },
    {
        slug: 'ap.payment.confirmed.summary',
        dataTitle: 'paymentCompleted',
    },
    {
        slug: 'ap.payment.queue.summary',
        dataTitle: 'paymentQueue',
    },
    {
        slug: 'ap.payment.pending.aging.overview',
        dataTitle: 'paymentAgingData',
    },
    {
        slug: 'ap.payment.paid.date.group',
        dataTitle: 'paymentPaidDateGroup',
    },
    {
        slug: 'ap.payment.due.date.summary',
        dataTitle: 'paymentDueDateSummary',
    },
    {
        slug: 'ap.payment.mode.overview',
        dataTitle: 'paymentModeOverview',
    },
];

export const ApOnlineBankPaymentsSlugs: DashboardSlug[] = [
    {
        slug: 'ap.online.bank.payment.confirmed.summary',
        dataTitle: 'paymentComplete',
    },
    {
        slug: 'ap.online.bank.payment.pending.summary',
        dataTitle: 'paymentPending',
    },
    {
        slug: 'ap.online.bank.payment.queue.summary',
        dataTitle: 'paymentInQueue',
    },
    {
        slug: 'ap.online.bank.payment.suspense.summary',
        dataTitle: 'paymentSuspense',
    },
    {
        slug: 'ap.online.bank.payment.transaction.summary',
        dataTitle: 'paymentTransactionSummary',
    },
    {
        slug: 'ap.online.bank.payment.queue.transaction.aging.summary',
        dataTitle: 'paymentQueueTransactionAgingSummary',
    },
];

export const EpDashboardSlugs: DashboardSlug[] = [
    {
        slug: 'my.pending.approvals.summary',
        dataTitle: 'pendingApprovals',
    },
    {
        slug: 'my.today.approved.summary',
        dataTitle: 'approvedSummary',
    },
    {
        slug: 'my.today.rejected.summary',
        dataTitle: 'rejectedSummaryData',
    },
    {
        slug: 'my.today.hold.summary',
        dataTitle: 'holdSummaryData',
    },
    {
        slug: 'my.document.status.summary',
        dataTitle: 'documentSummary',
    },
    {
        slug: 'my.pending.approval.aging.summary',
        dataTitle: 'pendingAging',
    },
    {
        slug: 'my.reimbursement.status.summary',
        dataTitle: 'reimbursementStatus',
    },
    {
        slug: 'my.payment.in.queue.summary',
        dataTitle: 'paymentQueue',
    },
    {
        slug: 'my.payment.pending.summary',
        dataTitle: 'paymentPending',
    },
    {
        slug: 'my.payment.received.summary',
        dataTitle: 'paymentReceived',
    },
];

export const VpSlugs: DashboardSlug[] = [
    {
        slug: 'vn.today.created.summary',
        dataTitle: 'todayCreated',
    },
    {
        slug: 'vn.today.approved.summary',
        dataTitle: 'todayApproved',
    },
    {
        slug: 'vn.today.rejected.summary',
        dataTitle: 'todayRejected',
    },
    {
        slug: 'vn.today.payment.summary',
        dataTitle: 'todayPayment',
    },
    {
        slug: 'vn.invoice.aging.summary',
        dataTitle: 'invoiceAging',
    },
    {
        slug: 'vn.invoice.status.summary',
        dataTitle: 'invoiceStatus',
    },
    {
        slug: 'vn.pending.payment.summary',
        dataTitle: 'pendingPayment',
    },
    {
        slug: 'vn.paid.payment.summary',
        dataTitle: 'paidPayment',
    },
    {
        slug: 'vn.last.payment.date.group',
        dataTitle: 'lastPaymentDateGroup',
    },
];

export const recoOrderDashboardSlugs: DashboardSlug[] = [
    {
        slug: 'order.dashboard.total.orders.summary',
        dataTitle: 'totalOrders',
    },
    {
        slug: 'order.dashboard.reconciled.summary',
        dataTitle: 'reconciled',
    },
    {
        slug: 'order.dashboard.receivable.summary',
        dataTitle: 'receivable',
    },
    {
        slug: 'order.dashboard.received.summary',
        dataTitle: 'received',
    },
    {
        slug: 'order.dashboard.deposition.summary',
        dataTitle: 'deposition',
    },
    {
        slug: 'order.dashboard.payment.deposition.summary',
        dataTitle: 'orderPaymentDeposition',
    },
    {
        slug: 'order.dashboard.refund.deposition.summary',
        dataTitle: 'orderRefundDeposition',
    },
];

export const ArRecoDashboardSlugs: DashboardSlug[] = [
    {
        slug: 'ar.total.transaction.dashbaord.summary',
        dataTitle: 'totalTransactions',
    },
    {
        slug: 'ar.reconciled.payments.dashbaord.summary',
        dataTitle: 'reconciliedPayments',
    },
    {
        slug: 'ar.reconciled.orders.dashbaord.summary',
        dataTitle: 'reconciliedOrders',
    },
    {
        slug: 'ar.excess.payments.dashbaord.summary',
        dataTitle: 'excessPayments',
    },
    {
        slug: 'ar.deficit.payments.dashbaord.summary',
        dataTitle: 'deficitPayments',
    },
    {
        slug: 'ar.unknown.payments.dashbaord.summary',
        dataTitle: 'unkownPayments',
    },
    {
        slug: 'ar.refund.pending.dashbaord.summary',
        dataTitle: 'refundPending',
    },
    {
        slug: 'ar.refund.processed.dashbaord.summary',
        dataTitle: 'refundProcess',
    },
    {
        slug: 'ar.cash.transit.dashbaord.summary',
        dataTitle: 'cashTransit',
    },
    {
        slug: 'ar.mdr.charges.changes.dashbaord.summary',
        dataTitle: 'mdrCharges',
    },
    {
        slug: 'ar.total.transaction.summary',
        dataTitle: 'totalTransactions',
    },
];

export const getGstr2bSlugs = (type: 'gstr2b' | 'portal') => {
    if (type === 'gstr2b') {
        return Gstr2bSlugs;
    }
    return Gstr2bSlugs?.map((s) => {
        return {
            ...s,
            slug: s?.slug.replace('ap.gstr2b', 'ap.portal.gstr2b'),
        };
    });
};

export const Gstr2bSlugs: DashboardSlug[] = [
    {
        slug: 'ap.gstr2b.dashboard.total.invoice.summary',
        dataTitle: 'totalInvoicesSummary',
    },

    {
        slug: 'ap.gstr2b.dashboard.total.reconciled.summary',
        dataTitle: 'totalReconciledInvoicesSummary',
    },

    {
        slug: 'ap.gstr2b.dashboard.total.unreconciled.summary',
        dataTitle: 'totalUnreconciledInvoicesSummary',
    },

    {
        slug: 'ap.gstr2b.dashboard.unreconciled.summary',
        dataTitle: 'unreconciledInvoicesSummary',
    },

    {
        slug: 'ap.gstr2b.dashboard.vendor.wise.unreconciled.invoice.summary',
        dataTitle: 'vendorWiseUnreconciledInvoiceSummary',
    },
    {
        slug: 'ap.gstr2b.dashboard.vendor.wise.reconciled.invoice.summary',
        dataTitle: 'vendorWiseReconciledInvoiceSummary',
    },
];

export const getGstr2bModalListSlugs = (type: 'gstr2b' | 'portal') => {
    if (type === 'gstr2b') {
        return Gstr2bModalListSlugs;
    }
    return Gstr2bModalListSlugs?.map((s) => {
        return {
            ...s,
            slug: s?.slug.replace('ap.gstr2b', 'ap.portal.gstr2b'),
        };
    });
};

export const Gstr2bModalListSlugs: DashboardSlug[] = [
    {
        slug: 'ap.gstr2b.dashboard.total.invoice.list',
        dataTitle: 'totalInvoicesList',
    },
    {
        slug: 'ap.gstr2b.dashboard.total.unreconciled.list',
        dataTitle: 'totalUnreconciledInvoicesList',
    },
    {
        slug: 'ap.gstr2b.dashboard.total.reconciled.list',
        dataTitle: 'totalReconciledInvoicesList',
    },
    {
        slug: 'ap.gstr2b.dashboard.unreconciled.list',
        dataTitle: 'unreconciledInvoicesList',
    },
    {
        slug: 'ap.gstr2b.dashboard.vendor.wise.invoice.list',
        dataTitle: 'vendorWiseInvoiceList',
    },
    {
        slug: 'ap.gstr2b.dashboard.unreconciled.not.found.list',
        dataTitle: 'unreconciledNotFoundList',
    },
];
