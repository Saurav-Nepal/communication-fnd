import { HOME_ROUTE } from './dashboardRouteName.constant';

const PAYMENT_HOME_ROUTE = '/payment';

export const UPI_PAYMENT_LIST_ROUTE = PAYMENT_HOME_ROUTE + '/upi-payment';
export const UPI_PAYMENT_DETAIL_ROUTE = PAYMENT_HOME_ROUTE + '/upi-payment/s';

export const UPI_REFUND_LIST_ROUTE = PAYMENT_HOME_ROUTE + '/upi-refund';
export const UPI_REFUND_DETAIL_ROUTE = PAYMENT_HOME_ROUTE + '/upi-refund/s';

export const UPI_REQUEST_LIST_ROUTE = PAYMENT_HOME_ROUTE + '/upi-request';

export const PAYMENT_NOTIFICATION_LIST_ROUTE = HOME_ROUTE + '/notification';
