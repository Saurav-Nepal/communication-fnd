import { ListPreference } from '@/constants/api.constants';
import { GLOBAL } from '@/constants/global.constants';
import { Delete, Get, Post, Put } from '@/services';

export const GetPreferences = () => {
    return Get({ url: 'userPreference', callback: setValues });
};

/**
 * accepts source_type = JRAPP, source_id (menuId), user_id, name = default, query = null, column_definition
 * @param  {} key
 * @param  {} value
 * @param  {} override_all
 */
export function SetPreference({
    userId,
    menuId,
    name = 'default',
    selectedColumns,
    override_all,
    source,
    query = null,
    layout,
    url = ListPreference,
}) {
    const source_type = GetSourceMorphMap(source);

    const methods = { Post, Put };
    const method = 'Post';

    const body: any = {
        // query,
        name,
        column_definition: selectedColumns,
        source_type,
    };

    if (query) {
        body.query = query;
    }

    if (override_all) {
        body.override_all = true;
    }

    if (!source_type) {
        alert('Please provide valid source for setting preference'); // @TODO replace with ToastNotifications
    }

    body.source_id = menuId;

    const newurl = url;

    // @TODO add userid when saving for particular user (not for all)

    return methods[method]({
        url: newurl,
        data: body,
        urlPrefix: GLOBAL.API_HOST,
    });
}

export function DeletePreference({ layout }) {
    const url = ListPreference + '/' + layout.id;
    return Delete({ url, urlPrefix: GLOBAL.API_HOST });
}

function setValues(values) {
    // Intentional
}

/**
 * Returns model hash value against given source and vice versa when reverse is true
 * @param  {string} source
 * @param  {boolean} reverse=false
 */
export function GetSourceMorphMap(source, reverse = false) {
    let sourceMorph = {
        menu: '1ef387eee5c23a8d3c8f6a3130e1c397',
        model: 'a8855b02f7117b89181e846818251b37',
        modelAlias: 'ca92f0ad887a73e9ffa448f5e4620c70',
        form: 'c843c8bdd29ce0a01a2a6e63c9ed939b',
        user: 'ee4cdbfefe411a0f75b7c5daddf210ba',
        uiAction: '3bd405d419269ee68da40bea43bde43d',
        report: 'ab60ad4e1a51c7d593e957b7857662c1',
    };

    if (reverse) {
        sourceMorph = swap(sourceMorph);
    }
    return sourceMorph[source];
}

/**
 * Reverse keys with value
 * for e.g. swap({A : 1, B : 2, C : 3, D : 4}) = {1 : A, 2 : B, 3 : C, 4 : D}
 * @param  {Object} json
 */
function swap(json): any {
    const ret = {};
    for (const key in json) {
        ret[json[key]] = key;
    }
    return ret;
}
