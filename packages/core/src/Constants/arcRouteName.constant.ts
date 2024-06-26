const ARC_HOME_ROUTE = '/arc';

export const COLLECTION_STRATEGIES_LIST_ROUTE =
    ARC_HOME_ROUTE + '/collection-strategies';
export const EMAIL_TEMPLATES_LIST_ROUTE = ARC_HOME_ROUTE + '/email-templates';
export const EMAIL_TEMPLATES_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/email-template/d';
export const COLLECTION_STRATEGIES_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/collection-strategies/d';
export const COLLECTION_STRATEGIES_SPLIT_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/collection-strategies/s';
export const COLLECTION_STRATEGIES_CREATION_ROUTE =
    ARC_HOME_ROUTE + '/collection-strategies/c';

export const NOTIFICATION_STRATEGIES_LIST_ROUTE =
    ARC_HOME_ROUTE + '/notification-strategies';

export const NOTIFICATION_STRATEGIES_DETAIL_ROUTE =
    NOTIFICATION_STRATEGIES_LIST_ROUTE + '/d';
export const NOTIFICATION_STRATEGIES_SPLIT_DETAIL_ROUTE =
    NOTIFICATION_STRATEGIES_LIST_ROUTE + '/s';
export const NOTIFICATION_STRATEGIES_CREATION_ROUTE =
    NOTIFICATION_STRATEGIES_LIST_ROUTE + '/c';

export const ARC_EMPLOYEE_LIST_ROUTE = ARC_HOME_ROUTE + '/employees';
export const ARC_CUSTOMER_LIST_ROUTE = ARC_HOME_ROUTE + '/customers';
export const ARC_CUSTOMER_DETAIL_ROUTE = ARC_HOME_ROUTE + '/customers/d';
export const ARC_CUSTOMER_SPLIT_DETAIL_ROUTE = ARC_HOME_ROUTE + '/customers/s';
export const ARC_CUSTOMER_CONVERSATION_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/customers/d/conversation';
export const ARC_EMPLOYEE_EDIT_ROUTE = ARC_HOME_ROUTE + '/employee';
export const ARC_EMPLOYEE_DETAIL_ROUTE = ARC_HOME_ROUTE + '/employee/d';
export const ARC_EMPLOYEE_SPLIT_DETAIL_ROUTE = ARC_HOME_ROUTE + '/employee/s';
export const ARC_DISPUTE_LIST_ROUTE = ARC_HOME_ROUTE + '/disputes';
export const ARC_DISPUTE_SPLIT_DETAIL_ROUTE = ARC_HOME_ROUTE + '/dispute/s';
export const ARC_DISPUTE_DETAIL_ROUTE = ARC_HOME_ROUTE + '/dispute/d';

export const ARC_USER_GROUP_SPLIT_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/user-group/s';
export const ARC_USER_GROUP_LIST_ROUTE = ARC_HOME_ROUTE + '/user-group';

export const ARC_INVOICE_LIST_ROUTE = ARC_HOME_ROUTE + '/invoices';

export const ARC_INVOICE_ROUTE = ARC_HOME_ROUTE + '/invoice';
export const ARC_INVOICE_CREATE_ROUTE = ARC_HOME_ROUTE + '/invoices/c';
export const ARC_INVOICE_DETAILS_ROUTE = ARC_HOME_ROUTE + '/invoices/d';
export const ARC_INVOICE_SPLIT_DETAILS_ROUTE = ARC_HOME_ROUTE + '/invoice/s';

export const ARC_CREDIT_NOTE_CREATE_ROUTE = ARC_HOME_ROUTE + '/credit-note/c';
export const ARC_CREDIT_NOTE_DETAILS_ROUTE = ARC_HOME_ROUTE + '/credit-note/d';
export const ARC_CREDIT_NOTE_SPLIT_DETAILS_ROUTE =
    ARC_HOME_ROUTE + '/credit-note/s';
export const ARC_CREDIT_NOTE_EDIT_ROUTE = ARC_HOME_ROUTE + '/credit-note';

export const ARC_DEBIT_NOTE_CREATE_ROUTE = ARC_HOME_ROUTE + '/debit-note/c';
export const ARC_DEBIT_NOTE_EDIT_ROUTE = ARC_HOME_ROUTE + '/debit-note';
export const ARC_DEBIT_NOTE_DETAILS_ROUTE = ARC_HOME_ROUTE + '/debit-note/d';
export const ARC_DEBIT_NOTE_SPLIT_DETAILS_ROUTE =
    ARC_HOME_ROUTE + '/debit-note/s';
export const ARC_DEBIT_NOTES_INVOICE = ARC_HOME_ROUTE + '/debit-note/invoice';

export const ARC_CREDIT_NOTES_INVOICE_DETAILS =
    ARC_HOME_ROUTE + '/credit-note/invoice';

export const ARC_TICKET_TEMPLATE_DETAILS_ROUTE =
    ARC_HOME_ROUTE + '/ticket-template/s';

export const ARC_TICKET_TEMPLATE_LIST_ROUTE =
    ARC_HOME_ROUTE + '/ticket-template';

export const ARC_CATEGORIES_LIST_ROUTE = ARC_HOME_ROUTE + '/categories';
export const ARC_CATEGORIES_DETAIL_ROUTE = ARC_HOME_ROUTE + '/categories/d';
export const ARC_CATEGORIES_SPLIT_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/categories/s';

export const ARC_SPLIT_DETAILS = {
    arc_employee: ARC_EMPLOYEE_SPLIT_DETAIL_ROUTE,
    arc_customer: ARC_CUSTOMER_SPLIT_DETAIL_ROUTE,
    arc_dispute: ARC_DISPUTE_SPLIT_DETAIL_ROUTE,
    arc_user_group: ARC_USER_GROUP_SPLIT_DETAIL_ROUTE,
    arc_customer_category: ARC_CATEGORIES_SPLIT_DETAIL_ROUTE,
    arc_collection_strategies: COLLECTION_STRATEGIES_SPLIT_DETAIL_ROUTE,
    arc_invoices: ARC_INVOICE_SPLIT_DETAILS_ROUTE,
};

export const ARC_CHOICE_TYPE_SPLIT_VIEW = ARC_HOME_ROUTE + '/choice-type/s';

export const ARC_CHOICE_TYPE_LIST_VIEW = ARC_HOME_ROUTE + '/choice-type';

export const ARC_TICKETS_LIST_ROUTE = ARC_HOME_ROUTE + '/tickets';
export const ARC_TICKETS_SPLIT_VIEW = ARC_HOME_ROUTE + '/ticket/s';
export const ARC_TICKETS_DETAIL_ROUTE = ARC_HOME_ROUTE + '/ticket/d';

export const ARC_WORKFLOW_LIST_ROUTE = ARC_HOME_ROUTE + '/workflow';
export const ARC_WORKFLOW_SPLIT_VIEW = ARC_HOME_ROUTE + '/workflow/s';
export const ARC_WORKFLOW_DETAIL_ROUTE = ARC_HOME_ROUTE + '/workflow/d';

export const ARC_CREDIT_NOTE_LIST_ROUTE = ARC_HOME_ROUTE + '/credit-note';
export const ARC_DEBIT_NOTE_LIST_ROUTE = ARC_HOME_ROUTE + '/debit-note';

export const PROMISE_TO_PAY_SPLIT_VIEW = ARC_HOME_ROUTE + '/promise-to-pay/s';
export const PROMISE_TO_PAY_DETAIL_VIEW = ARC_HOME_ROUTE + '/promise-to-pay/d';
export const PROMISE_TO_PAY_LIST = ARC_HOME_ROUTE + '/promise-to-pay';

export const ARC_ACTION_CENTER_LIST_ROUTE = ARC_HOME_ROUTE + '/action-center';
export const ARC_ACTION_CENTER_DETAIL_ROUTE =
    ARC_ACTION_CENTER_LIST_ROUTE + '/s';

export const CALL_REMINDER_LIST_ROUTE = ARC_HOME_ROUTE + '/call-reminder';
export const CALL_REMINDER_SPLIT_DETAIL_ROUTE = CALL_REMINDER_LIST_ROUTE + '/s';
export const CALL_REMINDER_DETAIL_ROUTE = CALL_REMINDER_LIST_ROUTE + '/d';

export const ARC_CUSTOMER_PAYMENT_LIST = ARC_HOME_ROUTE + '/customer-payments';
export const ARC_CUSTOMER_PAYMENT_DETAIL_ROUTE =
    ARC_HOME_ROUTE + '/customer-payment/d';
export const ARC_CUSTOMER_PAYMENT_SPLITS_ROUTE =
    ARC_HOME_ROUTE + '/customer-payment/s';
export const ARC_CONFIGURATION_ROUTE = ARC_HOME_ROUTE + '/configurations';

export const ARC_EMAIL_MESSAGE_LIST = ARC_HOME_ROUTE + '/email-messages';
export const ARC_EMAIL_MESSAGE_SPLIT = ARC_EMAIL_MESSAGE_LIST + '/s';

export const ARC_NOTIFICATION_LIST = ARC_HOME_ROUTE + '/notifications';
