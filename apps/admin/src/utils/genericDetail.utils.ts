import { isEmptyObject, isUndefinedOrNull } from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import { Get } from '@/services';
import { ObjectDto } from '@/types';

import {
    ConvertMenuDetailForGenericPage,
    CreateFinalColumns,
    CreateUrlForFetchingDetailRecords,
    FilterOutDuplicateActions,
    GetColumnsForListing,
    GetParsedLayoutScript,
    GetPreSelectedMethods,
    RegisterMethod,
} from './assistGeneric.utils';
import { BuildUrlForGetCall } from './common.utils';

/**
 * Fetches data for detail page
 * same as ConfigureDataForDirective
 * @param  {object} genericDetailObject - urlParameter
 */
export const GetDetailRecord = async ({
    configuration: genericDetailObject,
    callback,
    data,
    urlParameter,
    withoutIdentifier = false,
    additionalTabs,
}: ObjectDto) => {
    const params: any = Initialization(genericDetailObject);
    const options: any = {};

    options.list = true;
    if (params.includes) {
        options.includes = params.includes;
    }

    if (data.layout && data.layout.id) {
        options.layout_id = data.layout.id;
    } else if (genericDetailObject.layout && genericDetailObject.layout.id) {
        options.layout_id = genericDetailObject.layout.id;
    }
    options.dictionary = params.dictionary ? false : true;

    if (!withoutIdentifier) {
        options.request_identifier = data.request_identifier;
    }

    const module = CreateUrlForFetchingDetailRecords({
        url: genericDetailObject.url,
        urlParameter,
    });

    if (!module) {
        alert('No Url has been set for this menu, Contact Admin');
        return false;
    }

    // flag to check promise

    const url = BuildUrlForGetCall(module, options);

    const extraParams = {
        callback,
        params,
        data,
        genericDetailObject,
        additionalTabs,
    };
    const result = await Get({
        url,
        extraParams,
        urlPrefix: GLOBAL.ROUTE_URL,
    });

    return PrepareObjectForDetailPage(result, { extraParams });
};

/**
 * Invoked when actual data for generic detail is fetched to process further and again callbacks with final data and columns list
 * @param  {object} result
 * @param  {object} {extraParams}
 */
function PrepareObjectForDetailPage(result, { extraParams }) {
    const {
        callback,
        genericDetailObject,
        data: portletData,
        additionalTabs,
    } = extraParams;
    const data = result.response;

    if (isUndefinedOrNull(data)) {
        alert('No Data Returned for this menu');
        return false;
    }

    const portletDetail = data.record;
    let tabs;

    // if fetching data for the first time, process tabs object and attach extra properties
    if (data.tabs && Object.keys(data.tabs).length) {
        tabs = data.tabs;

        if (additionalTabs && additionalTabs.length) {
            // Add the additionaltabs to the tab
            additionalTabs.forEach((entry) => {
                tabs[entry.tab] = entry;
            });
        }

        tabs = GetDataForTabs({ tabs });
    } else {
        // else take from previously fetched data
        tabs = portletData.tabs;
    }

    portletData.tabs = { ...tabs };

    const portlet: any = GetDataForPortlet({
        portletDetail,
        genericDetailObject,
        portletData,
    });

    const tabDetail = {
        tabs,
    };

    const preDefinedmethods = GetPreSelectedMethods();
    const methods = RegisterMethod(genericDetailObject.nextActions);
    portlet.methods = methods;
    portlet.preDefinedmethods = preDefinedmethods;

    const returnData = {
        portlet,
        tabDetail,
    };
    if (typeof callback == 'function') {
        callback(returnData);
    }

    return returnData;
}

/**
 * same as ConfigureDataForPortlet.getData
 * @param  {} genericDetailObject
 * @param  {object} portletDetail - current object returned from api
 * @param  {object} portletData - previous data object
 */
export function GetDataForPortlet({
    portletDetail,
    genericDetailObject,
    portletData,
}) {
    const obj: any = {};
    obj.data = portletDetail.data;

    obj.modelHash = portletDetail.model_hash;

    let { relationship, dictionary } = portletDetail;

    dictionary =
        dictionary && Object.keys(dictionary).length
            ? dictionary
            : portletData.dictionary;
    relationship =
        relationship && Object.keys(relationship).length
            ? relationship
            : portletData.relationship;

    const params = {
        dictionary,
        relationship,
        includesList: Object.keys(dictionary), //@TODO improve this part
    };

    obj.portletColumns = GetColumnsForListing(params);
    if (
        genericDetailObject.layout &&
        genericDetailObject.layout.column_definition
    ) {
        obj.finalColumns = CreateFinalColumns(
            obj.portletColumns,
            genericDetailObject.layout.column_definition,
            relationship
        );
    } else {
        obj.finalColumns = [];
    }

    obj.tabs = portletData.tabs;
    obj.starter = portletDetail.base || portletData.starter;
    obj.request_identifier = portletDetail.request_identifier;
    obj.relationship = relationship;
    obj.dictionary = dictionary;
    const model = (obj.model = relationship[obj.starter]);
    obj.nextActions = FilterOutDuplicateActions([
        ...obj.model.ui_actions,
        ...genericDetailObject.uiActions,
    ]);
    obj.model = model;
    const formPreferences = GetParsedLayoutScript(model.form_layouts);

    const formPreference = formPreferences[0] || {};
    if (
        !isEmptyObject(formPreference) &&
        typeof formPreference.column_definition == 'string'
    ) {
        formPreference.column_definition = JSON.parse(
            formPreference.column_definition
        );
    }

    obj.formPreference = formPreference;
    obj.formPreferences = formPreferences;

    return obj;
}

export function GetDataForTabs({ tabs }) {
    for (const i in tabs) {
        tabs[i] = ConvertMenuDetailForGenericPage(tabs[i]);
    }
    return tabs;
}

//@TODO remove this method
/**
 * returns columns array
 * same as menu service' getColumns
 * @param  {} params - should contain includes, relationship, starter, dictionary,
 * @param  {} excludeStarter
 */
export function GetColumnsForDetail(params, excludeStarter) {
    const columns: any[] = [];
    const selectedColumns = {};
    if (!params && typeof params != 'object') {
        alert('Expected Params as object, Contact Admin');
        return false;
    }

    const relationship = params.relationship;

    const includes = params.includes.split(',');
    for (const a in includes) {
        includes[a] = params.starter + '.' + includes[a];
        includes[a] = includes[a].toLowerCase();
    }

    if (!excludeStarter) includes.unshift(params.starter);

    for (const b in includes) {
        columns[includes[b]] = params.dictionary[includes[b]];
    }
    for (const i in columns) {
        for (const j in columns[i]) {
            const element = i + '.' + columns[i][j].name;

            columns[i][j]['absPath'] = element
                .replace(/\.?([A-Z]+)/g, function (x, y) {
                    return '_' + y.toLowerCase();
                })
                .replace(/^_/, '')
                .replace(params.starter, '')
                .replace('.', '');
            columns[i][j]['path'] =
                columns[i][j]['absPath'].split(/\.(.+)?/)[1];
            columns[i][j]['parent'] = i;

            const relationIndex = columns[i][j]['parent'];
            if (
                !isUndefinedOrNull(relationship) &&
                relationship.hasOwnProperty(relationIndex) &&
                relationship[relationIndex].hasOwnProperty('related_model')
            ) {
                columns[i][j].reference_route =
                    relationship[relationIndex].related_model.state_name;
                columns[i][j].parentColumn = relationship[relationIndex]
                    .related_column
                    ? relationship[relationIndex].related_column.name
                    : null;
            }

            selectedColumns[columns[i][j].parent + '.' + columns[i][j].id] =
                columns[i][j];
        }
    }
    return selectedColumns;
}

function Initialization(genericDetailObject) {
    return {
        includes: genericDetailObject.includes,
        starter: genericDetailObject.starter,
    };
}
