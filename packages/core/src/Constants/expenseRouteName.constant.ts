const HOME_ROUTE = '/e'; // home
export const EXPENSE_DASHBOARD_ROUTE = HOME_ROUTE;
export const VENDOR_REGISTER_ROUTE = '/vendor/register';

export const AR_DASHBOARD_ROUTE = '/r';
export const AR_ORDERS_DETAIL_ROUTE = AR_DASHBOARD_ROUTE + '/orders/d';

// Vendor Expense routes
export const VENDOR_EXPENSE_DASHBOARD_ROUTE = HOME_ROUTE + '/v';
export const VENDOR_ONBOARDING_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/onboarding';
export const VENDOR_ACCOUNT_LIST_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/accounts';
export const VENDOR_ACCOUNT_DETAIL_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/account/d';
export const VENDOR_INVITATIONS_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/invitations';
export const VENDOR_CLIENT_ROUTE = VENDOR_EXPENSE_DASHBOARD_ROUTE + '/clients';
export const VENDOR_CLIENT_DETAIL_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/client/d';
export const VENDOR_MY_BUSINESS_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/accounts';
export const VENDOR_MY_BUSINESS_DETAIL_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/account/d';
export const VENDOR_CLIENT_INVITATION_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/client-invitation';
export const VENDOR_CLIENT_LIST_INVITATION_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/invitations';
export const VENDOR_INVOICE_LIST_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/invoices';
export const VENDOR_INVOICE_ROUTE = VENDOR_EXPENSE_DASHBOARD_ROUTE + '/invoice';
export const VENDOR_INVOICE_DETAIL_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/invoice/d';
export const VENDOR_INVOICE_CREATE_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/invoice/c';
export const VENDOR_PAYMENT_LIST_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/payments';
export const VENDOR_PAYMENT_DETAIL_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/payment/d';

export const VENDOR_REPORTS_LIST_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/reports';
export const VENDOR_KYC_REPORTS_LIST_ROUTE =
    VENDOR_REPORTS_LIST_ROUTE + '/vn-invalid-kyc-list';

// Employee Expense routes
export const EMPLOYEE_EXPENSE_DASHBOARD_ROUTE = HOME_ROUTE + '/e';
export const EMPLOYEE_EXPENSE_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/expenses';
export const EMPLOYEE_EXPENSE_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/expense';
export const EMPLOYEE_EXPENSE_CREATE_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/expense/c';
export const EMPLOYEE_EMPLOYEE_ADVANCE_DETAIL =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/employee-advance/d';
export const EMPLOYEE_EMPLOYEE_ADVANCE_LIST =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/employee-advances';

export const EMPLOYEE_PURCHASE_REQUEST_CREATE_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/purchase-request/c';

export const EMPLOYEE_PURCHASE_REQUEST_DETAIL_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/purchase-request/d';

export const EMPLOYEE_PURCHASE_ORDER_DETAIL_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/purchase-order/d';

export const EMPLOYEE_PURCHASE_QUOTE_DETAIL_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/purchase-quotation/d';

export const EMPLOYEE_GRN_DETAIL_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/purchase-grn/d';
export const EMPLOYEE_EXPENSE_DETAIL_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/expense/d';
export const EMPLOYEE_BUSSINESS_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/my-businesses';
export const EMPLOYEE_PAYMENT_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/payments';

export const EMPLOYEE_PAYMENT_DETAIL_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/payment/d';
export const EMPLOYEE_BANK_ACCOUNT_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/bank-accounts';
export const EMPLOYEE_EMAIL_MESSAGES_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/email_messages';
export const EMPLOYEE_REPORT_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/reports';

// Employee Reports
export const EMPLOYEE_REPORTS_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/reports';
export const EMPLOYEE_MY_PENDING_APPROVALS_REPORTS_LIST_ROUTE =
    EMPLOYEE_REPORTS_LIST_ROUTE + '/my-pending-approvals-list';

// Finops Expense routes
export const FINOPS_EXPENSE_DASHBOARD_ROUTE = HOME_ROUTE + '/f';
export const FINOPS_VENDOR_INVITATION_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/vendor-invitations';
export const FINOPS_MY_VENDORS_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/vendors';
export const FINOPS_VENDOR_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/vendor';
export const FINOPS_BILLING_ENTITIES_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/billing-entities';
export const FINOPS_VENDOR_INVITATION_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/vendor-invitation';
export const FINOPS_EXPENSE_HEAD_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-heads';
export const FINOPS_DESIGNATION_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/designations';
export const FINOPS_LIMIT_CONFIG_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/limit-config';

export const FINOPS_CONFIGURATION_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/configurations';

export const FINOPS_INTEGRATION_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/integrations';

export const FINOPS_DESIGNATION_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/designation';

export const FINOPS_EXPENSE_HEAD_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-head';

export const FINOPS_DEPARTMENT_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/departments';
export const FINOPS_DEPARTMENT_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/department/d';

export const FINOPS_EMPLOYEE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/employees';
export const FINOPS_EMPLOYEE_DETAIL =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/employee';
export const FINOPS_EMPLOYEE_ADVANCE_DETAIL =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/employee-advance/d';
export const FINOPS_EMPLOYEE_ADVANCE_LIST =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/employee-advances';
export const FINOPS_BUSSINESS_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/my-businesses';
export const FINNOPS_EXPENSE_INVOICE_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense/d';
export const FINNOPS_EXPENSE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense';

export const FINNOPS_CHOICE_TYPE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/choice-types';

export const FINNOPS_CHOICE_TYPE_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/choice-type';

export const FINNOPS_CUSTOM_FIELD_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/custom-fields';
export const FINNOPS_VERIFICATION_LIMIT_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/verification-limit';
export const FINNOPS_PAYMENT_LIMIT_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/payment-limit';
export const FINOPS_BUSSINESS_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/my-business/d';
export const FINOPS_DOCUMENT_PREFERENCES_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/document-preferences';

export const FINOPS_EXPENSE_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expenses';
export const FINOPS_EXPENSE_ROUTE = FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense';
export const FINOPS_EXPENSE_CREATE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense/c';
export const FINOPS_EXPENSE_DETAILS_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense/d';
export const FINNOPS_CC_STATEMENT_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/credit-cards';
export const FINNOPS_CREDIT_CARDS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/credit-card-type';

export const FINOPS_DESIGNATION_LIMIT_LISTS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/designation_limits';
export const FINOPS_LIMIT_LISTS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/finops_limits';

export const FINOPS_USER_GROUP_LISTS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/user-groups';

export const FINOPS_USER_GROUP_DETAIL =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/user-group';
export const FINOPS_EMAIL_MESSAGE_SPLIT_DETAIL =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/email_messages/s';

export const FINOPS_DEPARTMENT_DESIGNATION_LIMIT_LISTS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/deparment_designations';

export const FINOPS_HEAD_DEPARTMENT_DESIGNATION_LIMIT_LISTS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/head_deparment_designation';

export const FINOPS_WORKFLOW_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/work-flow';

// Expense Approvals
export const FINOPS_APPROVAL_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-approval';
export const FINOPS_VERIFICATION_APPROVAL_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-approval/verification';
export const FINOPS_PAYMENT_APPROVAL_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-approval/payment';
export const FINOPS_ADVANCE_APPROVAL_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-approval/advance';
export const FINOPS_FINOPS_APPROVAL_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/expense-approval/finops';

// Advance Approvals
export const FINOPS_APPROVAL_ADVANCE_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/advance-approval';
export const FINOPS_VERIFICATION_APPROVAL_ADVANCE_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/advance-approval/verification';
export const FINOPS_PAYMENT_APPROVAL_ADVANCE_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/advance-approval/payment';
export const FINOPS_FINOPS_APPROVAL_ADVANCE_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/advance-approval/finops';

// Purchase Request Approvals
export const FINOPS_APPROVAL_PURCHASE_REQUEST_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-request-approval';
export const FINOPS_VERIFICATION_APPROVAL_PURCHASE_REQUEST_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-request-approval/verification';
export const FINOPS_FINOPS_APPROVAL_PURCHASE_REQUEST_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-request-approval/finops';

// Purchase Order Approvals
export const FINOPS_APPROVAL_PURCHASE_ORDER_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-order-approval';
export const FINOPS_VERIFICATION_APPROVAL_PURCHASE_ORDER_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-order-approval/verification';
export const FINOPS_FINOPS_APPROVAL_PURCHASE_ORDER_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-order-approval/finops';

export const FINOPS_PAYMENT_MODE_MODULE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/payment-modes';

export const FINOPS_PAYMENT_MODE_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/payment-mode/d';

export const FINOPS_ALL_PAYMENTS_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/all-payments';

export const FINOPS_BANK_TRANSFERS_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/bank-transfers';

export const FINOPS_CHEQUE_PAYMENTS_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/cheque-payments';
export const FINOPS_DD_PAYMENTS_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/dd-payments';
export const FINOPS_PAYMENT_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/payment/d';

export const FINOPS_CREDIT_NOTE_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/credit-note/d';

export const FINOPS_CREDIT_NOTE_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/credit-note';
export const FINOPS_GRADES_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/grades';

export const FINOPS_RECURRING_EXPENSE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/recurring/expense';
export const FINOPS_RECURRING_ADVANCE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/recurring/advance';

export const FINOPS_ADVANCE_CATEGORY_LIST =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/advance-categories';
export const FINOPS_ADVANCE_CATEGORY_DETAIL =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/advance-category/d';

export const FINOPS_BANK_APPROVER_LIST =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/bank-approvers';
export const FINOPS_BANK_APPROVER_DETAIL =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/bank-approver/d';

export const FINOPS_CC_STATEMENT_ITEM_ROUTES =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/credit-card/d';

export const FINOPS_EMAIL_ACCOUNT_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/email_accounts';

export const FINOPS_EMAIL_MESSAGES_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/email_messages';

export const FINOPS_EMAIL_MESSAGES_SPLIT_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/email_messages/s';

export const FINOPS_GSTR2_ITEM_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/gstr2b-item/d';
export const FINOPS_GSTR2_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/gstr2b-items';

export const FINOPS_REPORT_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/reports';

export const FINNOPS_VENDOR_EXPENSE_REPORT_URL =
    FINOPS_REPORT_LIST_ROUTE + '/ap-vendor-expense-report-list';

export const FINOPS_CURRENCY_RATE_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/currency-rates';

export const FINOPS_OFFLINE_BANK_TRANSFER_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/offline-bank-transfers';

export const FINOPS_BULK_UPLOAD =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/bulk_uploads';
export const FINOPS_BULK_UPLOAD_ITEMS =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/bulk-upload';

export const FINOPS_TDS_LIST_ROUTE = FINOPS_EXPENSE_DASHBOARD_ROUTE + '/tds';

export const FINOPS_PURCHASE_REQUEST_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-request';
export const FINOPS_PURCHASE_REQUEST_CREATE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-request/c';
export const FINOPS_PURCHASE_REQUEST_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-request/d';

export const FINOPS_PURCHASE_ORDER_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-order';

export const FINOPS_PURCHASE_QUOTE_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-quotation/d';
export const VENDOR_PURCHASE_QUOTE_DETAIL_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/purchase-quotation/d';
export const FINOPS_PURCHASE_QUOTE_DETAIL_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-quotation';

export const listGrnUrl = '/purchase-grn';
export const FINOPS_GRN_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + listGrnUrl;

export const FINOPS_GRN_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + `${listGrnUrl}/d`;

export const createPurchaseOrderUrl = '/purchase-order/c';
export const detailPurchaseOrderUrl = '/purchase-order/d';

export const createPurchaseRequestUrl = '/purchase-request/c';
export const detailPurchaseRequestUrl = '/purchase-request/d';
export const listPurchaseRequestUrl = '/purchase-request';
export const listPurchaseOrderUrl = '/purchase-order';

export const createPurchaseQuoteUrl = '/purchase-quotation/c';
export const detailPurchaseQuoteUrl = '/purchase-quotation/d';
export const listPurchaseQuoteUrl = '/purchase-quotation';

export const FINOPS_PURCHASE_ORDER_CREATE_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + createPurchaseOrderUrl;
export const FINOPS_PURCHASE_ORDER_DETAIL_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/purchase-order/d';

export const FINOPS_NOTIFICATION_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/notifications';

export const EMPLOYEE_NOTIFICATION_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/notifications';

export const FINOPS_ACTION_CENTER_LIST_ROUTE =
    FINOPS_EXPENSE_DASHBOARD_ROUTE + '/action-center';
export const FINOPS_ACTION_CENTER_DETAIL_ROUTE =
    FINOPS_ACTION_CENTER_LIST_ROUTE + '/s';

export const EMPLOYEE_ACTION_CENTER_LIST_ROUTE =
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE + '/action-center';
export const EMPLOYEE_ACTION_CENTER_DETAIL_ROUTE =
    EMPLOYEE_ACTION_CENTER_LIST_ROUTE + '/s';

export const VENDOR_PO_DETAILS_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/purchase-order/d';

export const VENDOR_ADVANCE_DETAILS_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/vendor-advance/d';

export const VENDOR_ADVANCE_LIST_ROUTE =
    VENDOR_EXPENSE_DASHBOARD_ROUTE + '/vendor-advance';
