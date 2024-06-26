import {
    SETTLED_UP_TEXT,
    PAYABLE_TEXT,
    RECIEVABLE_TEXT,
    YOU_OWE_TEXT,
    OWES_YOU_TEXT,
} from '../Constants';
import { FormatCurrency } from './currency.utils';

/**
 * Give you sentance regarding amount, according to its value
 *
 * @param {*} amount
 * @returns string
 */
export function GetAmountDescription(amount: number): string {
    if (amount === 0) return SETTLED_UP_TEXT;

    return amount < 0 ? PAYABLE_TEXT : RECIEVABLE_TEXT;
}

/**
 * Give you list sentance regarding amount, according to its value
 *
 * @param {*} amount
 * @returns string
 */
export function GetListAmountDescription(amount: number): string {
    if (amount === 0) return SETTLED_UP_TEXT;

    return amount < 0 ? YOU_OWE_TEXT : OWES_YOU_TEXT;
}

/**
 * Fetch Name if record is against either Business or User
 *
 * @param {*} record
 * @returns
 */
export function GetName(record: any): string {
    const name = record.receiver_business?.name
        ? record.receiver_business.name
        : record.receiver_user.name;

    if (name) return name;

    return GetMobileNumber(record).toString();
}

/**
 * Fetch mobile number from either business or user

 *
 * @param {*} record
 * @returns
 */
export function GetMobileNumber(record: any): number {
    return record.receiver_business?.mobile
        ? record.receiver_business.mobile
        : record.receiver_user.mobile;
}

/**
 * Gives you formatted amount value with Rupee symbol on it.
 *
 * @param {*} amount
 * @returns
 */
export function GetFormattedAmount(amount: number): string {
    return FormatCurrency({ amount: Math.abs(amount) });
}

/**
 * Gives you initials against name.
 *
 * @param {*} name
 * @returns
 */
export function GetInitials(name: string): string {
    if (!name) return 'SK';
    const string = name.split(' ');
    return (
        string[0].charAt(0).toUpperCase() +
        (string[1]
            ? string[1].charAt(0).toUpperCase()
            : string[0][1]?.toUpperCase())
    );
}

/**
 * Gives a flag whether user is shopkhata user or not
 *
 * @param {*} record
 * @returns
 */
export function GetVerified(record: any): boolean {
    return record.receiver_business
        ? true
        : Boolean(record.receiver_user.mobile_verified_at);
}

/**
 * Fetch dialing code from either business or user

 *
 * @param {*} record
 * @returns
 */
export function GetDialingCode(record: any): number {
    return record.receiver_user
        ? record.receiver_user.dialing_code
        : record.receiver_business.dialing_code;
}

/**
 * Gives display picture either of user or business.
 *
 * @param {*} record
 * @returns
 */
export function GetDisplayPicture(record: any): boolean {
    return record.receiver_business
        ? record.receiver_business.primary_image_url
        : record.receiver_user.image_url ?? null;
}
