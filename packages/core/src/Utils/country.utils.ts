import { DEFAULT_DIAL_CODE, CURRENT_COUNTRY } from '../Constants';
import { INDIA_FLAG_URL } from '../Constants/hard.coding.constant';
import { ObjectDto } from '../backend/Dtos';
import { SetItem, GetItem, GetItemAsync } from './localStorage.utils';
// import { GetTimezoneOffset } from './time.utils';

export function GetDefaultCountry() {
    return {
        flag_image_url: INDIA_FLAG_URL,
        dialing_code: DEFAULT_DIAL_CODE,
        is_sms_otp_supported: true,
        international_dialing_code: DEFAULT_DIAL_CODE,
    };
}

// export function GetCountries() {
//     const getCountry = new FetchCountry();
//     return getCountry.process();
// }

// export async function GetCurrentCountry(
//     value = -GetTimezoneOffset(),
//     key = 'timezone_offset'
// ) {
//     const { success, response } = await GetCountries();
//     if (success) {
//         return response.find((item) => item[key] == value);
//     }
// }

export function SetCountry(countryObject: ObjectDto) {
    SetItem(CURRENT_COUNTRY, countryObject);
}

export function GetCountry() {
    return GetItem(CURRENT_COUNTRY);
}

export function GetCountryAsync() {
    return GetItemAsync(CURRENT_COUNTRY);
}

// export async function GetCountryCurrencyByDialingCode(dialingCode: number) {
//     const { success, response } = await GetCountries();
//     if (success) {
//         return response.find((item) => item['dialing_code'] == dialingCode);
//     }

//     return false;
// }
