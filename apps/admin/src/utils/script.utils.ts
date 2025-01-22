import { GLOBAL } from '@/constants/global.constants';
import { Post, Put } from '@/services';

export function SaveScript({
    payload,
    column,
    script,
    scriptId,
    mode,
    scriptName,
}) {
    const { RECORD_URL } = GLOBAL;
    let name = '';
    let params = {};

    if (payload && payload.relationship) {
        if (payload.relationship.related_model) {
            name = payload.relationship.related_model.name;
        } else if (payload.relationship.name) {
            name = payload.relationship.name;
        }
    }
    params = {
        name: scriptName || name + ' Script',
        script: script,
        description: name + ' Script for ' + column.name,
        source_type: payload.modelHash,
        source_id: payload.data?.id,
        source_column: column.name,
        /* Added new param script_type_id  for diffrentiating between php,html,javascript code in Script*/
        type_id: mode ? mode.id : null,
    };

    if (scriptId) {
        return Put({
            url: 'system-script/' + scriptId,
            // body: params,
            data: params,
            urlPrefix: RECORD_URL,
        });
    }
    return Post({ url: 'system-script', data: params, urlPrefix: RECORD_URL });
}

export function SaveScriptInListing({
    script,
    scriptId,
    listingRow,
    modelHash,
    name,
    identifier,
    selectedColumn,
    mode,
    scriptName,
}) {
    const { RECORD_URL } = GLOBAL;
    const params = {
        name: scriptName || name + ' Script',
        script: script,
        description: name + ' Script for ' + selectedColumn.name,
        source_type: modelHash,
        source_id: listingRow[identifier + '.id'],
        source_column: selectedColumn.name,
        /* Added new param script_type_id  for diffrentiating between php,html,javascript code in Script*/
        type_id: mode ? mode.id : null,
    };

    if (scriptId) {
        return Put({
            url: 'system-script/' + scriptId,
            data: params,
            urlPrefix: RECORD_URL,
        });
    }
    return Post({ url: 'system-script', data: params, urlPrefix: RECORD_URL });
}
