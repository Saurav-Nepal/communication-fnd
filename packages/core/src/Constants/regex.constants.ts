/**
 *  Regex constants
 */

export const MOBILE_FORMAT_REGEX =
    /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m; // includes country code;

export const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MOBILE_NUMBER_REGEX =
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const INDIA_MOBILE_NUMBER_REGEX = /^[6789]\d{9}$/;

export const FetchUrlParamStringRegex = /\?.*/g;

export const BUSINESS_ID_PICKER = /[^business/]{1}[0-9]+[^/a-z]/;

export const AMOUNT_REGEX =
    /^\$?((\d{1,3})(?:,[0-9]{3}){0,1}|(\d{1})(?:,[0-9]{3}){0,2}|(\d{1,7}))(\.\d{1,3})?$/;

export const DECIMAL_REGEX = /^(\d*\.)?\d+$/;

export const DIGIT_REGEX = /^\d+$/; /* To check a string have only numbers */

export const STR_TO_BOOL = /^\s*(true|1|on)\s*$/i;

export const REPLACE_EMPTY_LINE = /^\s*[\r\n]/gm;

export const START_WITHOUT_SPACE = /^[^\s]+(\s+[^\s]+)*$/;

export const GSTIN_NUMBER =
    /^\d{2}[0-9A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[A-Z][0-9A-Z]{1}$/;

export const URL_REGEX = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/;
export const IFSC_CODE_REGEX = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
export const PINCODE_NUMBER = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;

export const ACCOUNT_NUMBER_REGEX = /[a-zA-Z0-9]$/;
export const ONLY_ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export const ONLY_PERCENTAGE_REGEX =
    /^([0-9]{1,2}(\.[0-9]{1,2})?|100(\.0{1,2})?)$/;

export const ONLY_TWO_POINT_DECIMAL = /^\d+(\.\d{2})?$/;
