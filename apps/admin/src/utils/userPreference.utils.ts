import {
    ListPreference,
    UserPreferenceEndPoint,
} from '@/constants/api.constants';
import { GLOBAL } from '@/constants/global.constants';
import { Delete, Get, Post } from '@/services';
import { PreferenceProps } from '@/types';

let preferences: PreferenceProps[] = [];

export const GetUserPreferences = async (): Promise<PreferenceProps[]> => {
    const result = await Get({
        url: UserPreferenceEndPoint,
    });

    const { success, response } = result || {};
    if (success) {
        return (preferences = response);
    }
    return (preferences = []);
};

/**
 * getting all user preferences
 */
export const GetPreferences = () => {
    return preferences;
};

/**
 * @param {string | array} parameter
 */
export const GetSettings = (parameter: string | string[]) => {
    const shortArray =
        preferences &&
        preferences.length &&
        preferences.filter((entry) => entry.name == 'setting').pop();
    let data: any;
    const settings: any[] = [];

    if (shortArray) {
        data = shortArray.value;

        // if parameter will be array
        if (Array.isArray(parameter)) {
            parameter.forEach((shortkey) => {
                const shortData = data
                    .filter((value: any) => value.parameter == shortkey)
                    .pop();
                settings.push(shortData);
            });
            return settings;
        } else {
            return data
                .filter((value: any) => value.parameter == parameter)
                .pop();
        }
    }
};

/**
 * @param  {string | array} parameter
 */
export const GetThemeSettings = (parameter: string | string[]) => {
    const shortArray =
        preferences &&
        preferences.length &&
        preferences.filter((entry) => entry.name == 'themes').pop();
    let data: any;
    const settings: any[] = [];

    if (shortArray) {
        data = shortArray.value;

        // if parameter will be array
        if (Array.isArray(parameter)) {
            parameter.forEach((shortkey) => {
                Object.keys(data).forEach((value) => {
                    if (value == shortkey) {
                        settings.push(data[shortkey]);
                    }
                });
            });
            return settings;
        } else {
            return data[
                Object.keys(data)
                    .filter((value) => value == parameter)
                    .pop() ?? ''
            ];
        }
    }

    return [];
};

/**
 * accepts source_type = JRAPP, source_id (menuId), user_id, name = default, query = null, column_definition
 * @param string key
 * @param any value
 */
export function SetUserPreference(key: string, value: any) {
    const data = {
        name: key,
        value,
    };
    // @TODO add userid when saving for particular user (not for all)

    return Post({ url: 'user-preference', data });
}

export function DeletePreference({ layout }: { layout: any }) {
    const url = ListPreference + '/' + layout.id;
    return Delete({ url, urlPrefix: GLOBAL.API_HOST });
}
