/**
 * Contains all regex being used in the project
 */

export const MATCH_PARENT_PATH = /"(.*?)"+./g; //  finds out string within double quotes for e.g. "columnentity".source_id = 86 would become source_id = 86
export const MATCH_WHITESPACE = / /g;
export const MATCH_START_END_PARANTHESIS = /(^\()|(\)$)/g; // (test(class)test) => test(class)test
export const PICK_AFTER_LAST_DOTS = /[^\.]+$/; // `vehicle`.id = id
export const STRING_WITHIN_TILDE = new RegExp('(?:").*(?:")', 'g');

export const STR_TO_BOOL = /^\s*(true|1|on)\s*$/i;

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

export const REPLACE_EMPTY_LINE = /^\s*[\r\n]/gm;

export const GSTIN_NUMBER =
    /^\d{2}[0-9A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[A-Z][0-9A-Z]{1}$/;

export const URL_REGEX = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/;
export const IFSC_CODE_REGEX = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
