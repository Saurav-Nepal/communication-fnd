/** Business and customer analytics events */

export const PAGE_VISITED_SK = 'page_visited';

export const GENERIC_SEARCH_SK = 'generic_search';

export const SHOP_VISITED_SK = 'shop_visited';

export const PUBLIC_DOCUMENT_VISITED_SK = 'public_document_visited';

export const CARD_ADDED_SK = 'cart_added';

export const ITEM_PHOTO_CLICKED_SK = 'item_photo_clicked';

export const SUCCESSFUL_QR_SCAN_SK = 'qr_scan';

export const ADDRESS_SWITCHED_SK = 'address_switched';

export const LOGIN_ANALYTICS = 'login'; // to be created in server

export const SAVE_USER_EVENT = 'save_user_event';

// Login Page
export const APP_OPENED_ANALYTICS_EVENT = 'app_opened';

export const SET_LOCATION_ANALYTICS_EVENT = 'c_setlocation';

export const LOGIN_WHATSAPP_ANALYTICS_EVENT = 'c_login_whatsapp';

export const LOGIN_SMS_ANALYTICS_EVENT = 'c_login_SMS';

export const LOGIN_VERIFY_PROCEED_ANALYTICS_EVENT = 'c_click_verify&proceed';

export const LOGIN_RESEND_OTP_ANALYTICS_EVENT = 'click_resendOTP';

export const VIEW_DASHBOARD_ANALYTICS_EVENT = 'c_view_dashboard';

/**************************************************************** CUSTOMER EVENT START **************************************************************** */

// ACCOUNTS
export const CUSTOMER_ACCOUNTS_ANALYTICS_EVENT = 'c_click_accounts';

export const CUSTOMER_UPDATE_PROFILE_ANALYTICS_EVENT = 'c_update_profile';

export const CUSTOMER_MY_ORDERS_ANALYTICS_EVENT = 'c_click_myorders';

export const CUSTOMER_ORDER_ITEM_ANALYTICS_EVENT = 'c_click_ordereditem';

export const CUSTOMER_ORDER_DETAIL_WHATSAPP_ANALYTICS_EVENT =
    'c_click_whatsapp_orderedpage';

export const CUSTOMER_ORDER_DETAIL_MESSAGE_ANALYTICS_EVENT =
    'c_click_textmessage_orderedpage';

export const CUSTOMER_ORDER_DETAIL_CALL_ANALYTICS_EVENT =
    'c_click_call_orderedpage';

export const CUSTOMER_ORDER_DETAIL_SUMMARY_ANALYTICS_EVENT =
    'c_view_summary_orderedpage';

export const CUSTOMER_ORDER_DETAIL_ANALYTICS_EVENT =
    'c_view_orderdetail_orderedpage';

export const CUSTOMER_ORDER_DETAIL_PAYMENT_ANALYTICS_EVENT =
    'c_view_payment_orderedpage';

export const CUSTOMER_FAVOURITES_ANALYTICS_EVENT = 'c_click_fav';

export const CUSTOMER_SAVED_ADDRESSES_ANALYTICS_EVENT =
    'c_click_savedaddresses';

export const CUSTOMER_ADD_NEW_ADDRESS_ANALYTICS_EVENT =
    'c_click_confirmlocation';

export const CUSTOMER_REFERRAL_ANALYTICS_EVENT = 'c_click_referracode';

export const CUSTOMER_REFERRAL_SHARE_ANALYTICS_EVENT = 'c_share_refferalcode';

export const CUSTOMER_HELP_SUPPORT_ANALYTICS_EVENT = 'c_click_help&support';

export const CUSTOMER_CONTACT_WHATSAPP_ANALYTICS_EVENT =
    'c_click_contactwhatsapp';

export const CUSTOMER_CONTACT_MAIL_ANALYTICS_EVENT = 'c_click_contactmail';

export const CUSTOMER_LOGOUT_ANALYTICS_EVENT = 'c_click_logout';

// Home
export const CUSTOMER_POSTER_DIGITAL_SHOP_ANALYTICS_EVENT =
    'c_click_opendigigtaldukaan';

export const CUSTOMER_CLICK_CATEGORY_ANALYTICS_EVENT = 'c_click_categorypage';

export const CUSTOMER_CLICK_SHOP_ANALYTICS_EVENT = 'c_click_shoppage';

export const CUSTOMER_ADD_CART_ANALYTICS_EVENT = 'c_click_addcart';

export const CUSTOMER_VIEW_CART_ANALYTICS_EVENT = 'c_click_viewcart';

export const CUSTOMER_CONFIRM_ORDER_ANALYTICS_EVENT = 'c_click_confirmorder';

export const CUSTOMER_GO_TO_HOME_ANALYTICS_EVENT = 'c_click_gotohome';

export const CUSTOMER_SCAN_ANALYTICS_EVENT = 'c_click_scan';

export const CUSTOMER_SHARE_BUSINESS_ANALYTICS_EVENT = 'c_click_share';

export const CUSTOMER_ADD_FAVOURITE_ANALYTICS_EVENT = 'c_click_favourite';

// PAYMENT
export const CUSTOMER_PAYMENT_ANALYTICS_EVENT = 'c_click_payment';

export const CUSTOMER_ADD_PAYMENT_ANALYTICS_EVENT = 'c_click_addpayment';

export const CUSTOMER_SAVE_PAYMENT_ANALYTICS_EVENT = 'c_click_savepayment';

export const CUSTOMER_RECIEVABLE_ANALYTICS_EVENT = 'c_click_receivable';

export const CUSTOMER_PAYABLE_ANALYTICS_EVENT = 'c_click_payable';

export const CUSTOMER_SETTLED_ANALYTICS_EVENT = 'c_click_settled';

export const CUSTOMER_PENDING_REVIEW_ANALYTICS_EVENT = 'c_view_pendingreview';

export const CUSTOMER_PASSBOOK_ANALYTICS_EVENT = 'c_view_passbook';
/**************************************************************** CUSTOMER EVENT ENDS**************************************************************** */

/**************************************************************** BUSINESS EVENT START **************************************************************** */

// ACCOUNTS
export const BUSINESS_ACCOUNTS_ANALYTICS_EVENT = 'click_SK_accounts';

export const BUSINESS_UPDATE_PROFILE_ANALYTICS_EVENT = 'save_SK_profile';

export const BUSINESS_SWITCH_TO_CUSTOMER_ANALYTICS_EVENT =
    'click_SK_switchtocustomer';

export const BUSINESS_ADD_BUSINESS_ANALYTICS_EVENT = 'click_SK_addbusiness';

export const BUSINESS_ADD_BUSINESS_CATEGORY_PROCEED_ANALYTICS_EVENT =
    'click_SK_proceed';

export const BUSINESS_SAVED_ADDRESS_ANALYTICS_EVENT = 'click_SK_saveaddress';

export const BUSINESS_ADD_PRODUCT_PROCEED_ANALYTICS_EVENT =
    'click_SK_addproductproceed';

export const BUSINESS_QR_ANALYTICS_EVENT = 'click_SK_QR';

export const BUSINESS_PAYMENT_METHOD_ANALYTICS_EVENT = 'click_SK_paymentmethod';

export const BUSINESS_ADD_PAYEMNT_ANALYTICS_EVENT = 'click_SK_addpaymentmethod';

export const BUSINESS_UPI_SUBMIT_ANALYTICS_EVENT = 'click_SK_UPIsubmit';

export const BUSINESS_DELIVERY_ANALYTICS_EVENT = 'click_SK_delivery';

export const BUSINESS_DELIVERY_STORE_PICKUP_ANALYTICS_EVENT =
    'delivery_Sk_storepickup_confirm';

export const BUSINESS_DELIVERY_TO_CUSTOMER_ANALYTICS_EVENT =
    'delivery_sk_customers_confirm';

export const BUSINESS_MANAGER_ANALYTICS_EVENT = 'click_sk_managers';

export const BUSINESS_ADD_MANAGER_ANALYTICS_EVENT = 'add_sk_newmanager';

export const BUSINESS_DELETE_MANAGER_ANALYTICS_EVENT = 'sk_manager_delete';

export const BUSINESS_REFERRAL_ANALYTICS_EVENT = 'click_sk_referral';
export const BUSINESS_SHARE_REFERRAL_ANALYTICS_EVENT = 'share_sk_referral';

export const BUSINESS_HELP_SUPPORT_ANALYTICS_EVENT = 'click_sk_help&support';

export const BUSINESS_CONTACT_WHATSAPP_ANALYTICS_EVENT =
    'click_sk_contactwhatsapp';

export const BUSINESS_CONTACT_MAIL_ANALYTICS_EVENT = 'click_sk_contactmail';

export const BUSINESS_LOGOUT_ANALYTICS_EVENT = 'click_sk_logout';

//DASHBOARD
export const BUSINESS_LIVE_SALE_STATS_ANALYTICS_EVENT =
    'clicksk_sk_livesalesstats';

export const BUSINESS_SHARE_ICON_ANALYTICS_EVENT = 'share_sk_bsuiness';

export const BUSINESS_ADD_PRODUCT_ANALYTICS_EVENT = 'click_sk_addproduct';

export const BUSINESS_SHARE_BUTTON_ANALYTICS_EVENT = 'click_sk_sharebusiness';

//PAYMENT
export const BUSINESS_PAYMENT_ANALYTICS_EVENT = 'view_sk_payment';

export const BUSINESS_ADD_PAYMENT_ANALYTICS_EVENT = 'click_sk_addpayment';

export const BUSINESS_RECIEVABLE_ANALYTICS_EVENT = 'click_sk_receivable';

export const BUSINESS_PAYABLE_ANALYTICS_EVENT = 'click_sk_payable';

export const BUSINESS_SETTLED_ANALYTICS_EVENT = 'click_sk_settled';

export const BUSINESS_PENDING_REVIEW_ANALYTICS_EVENT = 'view_sk_pendingreview';

export const BUSINESS_PASSBOOK_ANALYTICS_EVENT = 'view_sk_passbook';

//INVENTORY
export const BUSINESS_STOCK_TRACKING_DISABLED_ANALYTICS_EVENT =
    'click_sk_stocktrackdisabled';

export const BUSINESS_PRODUCT_ACTIVE_ANALYTICS_EVENT = 'click_sk_active';

export const BUSINESS_INVENTORY_SHARE_ANALYTICS_EVENT = 'click_sk_share';

// Orders
export const BUSINESS_PENDING_ORDER_ANALYTICS_EVENT = 'click_sk_pending';

export const BUSINESS_INPROGRESS_ORDER_ANALYTICS_EVENT = 'click_sk_inprogress';

export const BUSINESS_ALL_ORDER_ANALYTICS_EVENT = 'click_sk_all';

export const BUSINESS_ACCEPTED_ORDER_ANALYTICS_EVENT = 'click_sk_accepted';

export const BUSINESS_READY_ORDER_ANALYTICS_EVENT = 'click_sk_ready';

export const BUSINESS_COMPLETED_ORDER_ANALYTICS_EVENT = 'click_sk_completed';

export const BUSINESS_CANCELLED_ORDER_ANALYTICS_EVENT = 'click_sk_cancelled';

/**************************************************************** BUSINESS EVENT ENDS**************************************************************** */
