import { add as AddQuery, formatQuery } from 'react-querybuilder';

import {
    isEmptyArray,
    isEmptyObject,
    isFunction,
    isUndefinedOrNull,
} from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import { Get, Post } from '@/services';
import { ObjectDto } from '@/types';

import {
    ConvertToQuery,
    CreateFinalColumns,
    FilterOutDuplicateActions,
    GetColumnsForListing,
    GetParsedLayoutScript,
    GetPathWithParent,
    GetPreSelectedMethods,
    ParseRestrictedQuery,
    RegisterMethod,
} from './assistGeneric.utils';
import {
    BuildUrlForGetCall,
    SelectFromOptions,
    TrimQueryString,
} from './common.utils';
import { Navigation } from './navigation.utils';
import { Toast } from './toast.utils';

let tempQuery; // used to decide if stats is to be fetched from server

/**
 * prepare query, pagination, and everything required according to
 * url and menu detail, fetch data and passes them further to the components
 * to show listing data
 */
export const GetListingRecord = async ({
    configuration,
    queryString = {},
    callback,
    data,
    currentUser = {},
    index,
    isTab,
    is_report = false,
    withoutIdentifier = false,
    exportVariable = false,
}: ObjectDto) => {
    const params: ObjectDto = Initialization(configuration, queryString);

    let options: ObjectDto = GetDefaultOptions(isTab);

    params.page = queryString.page
        ? parseInt(queryString.page)
        : data.currentPage;
    if (params.includes) {
        options.includes = params.includes;
    }

    if (params.order) {
        options.order = params.order + ' ' + params.sort;
    }

    if (queryString.jsonquery || queryString.search) {
        let query = JSON.parse(queryString.jsonquery || `{}`);

        if (queryString.search) {
            const search = JSON.parse(queryString.search);
            if (isEmptyArray(query.rules) && !isEmptyArray(search.rules)) {
                query = search;
            } else {
                query.rules.push(...search.rules);
            }
        }

        if (!isEmptyArray(query.rules)) {
            options.query = formatQuery(query, 'sql');
        }
    }

    /** Handling Group By  */

    if (queryString.group_by && !configuration.groupedListing) {
        options.group_by = queryString.group_by;
    }

    if (
        configuration.groupedListing &&
        queryString.group_by &&
        queryString[queryString.group_by]
    ) {
        options.query +=
            queryString.group_by + ' = ' + queryString[queryString.group_by];
    }

    /** Handling Group By  Ends*/

    // if there is a query in url , add it to the options.query
    options.query += isUndefinedOrNull(queryString.query)
        ? ''
        : ' and ' + queryString.query;

    const restricted_query =
        configuration.restricted_query || configuration.query;
    options.query += isUndefinedOrNull(restricted_query)
        ? ''
        : ' and ' + ConvertToQuery.call(this, restricted_query);
    if (!withoutIdentifier) {
        options.request_identifier = data.request_identifier;
    }
    // If a filter is applied , add the query to options.query

    /****************************************************
     * @TODO based on layout id of urlparam, select query
     ***************************************************/
    if (queryString.layout) {
        options.layout_id = queryString.layout;
    } else if (data.layout && data.layout.id) {
        options.layout_id = data.layout.id;
    } else if (configuration.layout && configuration.layout.id) {
        options.layout_id = configuration.layout.id;
    }

    if (
        queryString.layout &&
        Object.keys(queryString.layout).length &&
        Array.isArray(configuration.layouts)
    ) {
        const activeLayout = configuration.layouts.filter(function (layout) {
            return layout.id == queryString.layout;
        })[0];
        if (!queryString.query && activeLayout && activeLayout.query) {
            options.query += ' and ' + activeLayout.query;
            configuration.layout = activeLayout;
        }
    }

    // @TODO add query
    // options.query += isUndefinedOrNull(configuration.query) ? "" : ConvertToQuery.bind(this)(configuration.query);

    // If currentUser is specified in the query replace it with the currentUsers id
    if (options.query.includes("'currentUser'") && currentUser.id) {
        options.query = options.query.replace("'currentUser'", currentUser.id);
    }

    // const tempQuery =
    //     isUndefinedOrNull(queryString.query) &&
    //     isUndefinedOrNull(queryString.search);
    // To be used to fetch stats when user selects some query and then deselects it

    // @TODO dont fetch dictionary if already available
    options.dictionary = data.dictionary ? false : true;

    options.page = queryString.page || options.page;
    options.limit = queryString?.limit || (isTab ? 10 : 20);

    if (queryString.scopes) {
        options.scopes = queryString.scopes;
    }

    /**
     * Variable maintained to be used inside table factory
     * The applied query params was required to do an aggregation on the column
     */

    options = TrimQueryString(options);

    const url = BuildUrlForGetCall(configuration.url, options);

    // Mutating query on api was failing as we were using fetch
    // Below fix solved the issue , Need to be changed if there is an
    // alternate solution

    // justdoit
    const headers = {
        'Content-Type': 'application/xhtml+xml',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    };

    const methods = { post: Post };
    const extraParams = {
        finalUrl: url,
        callback,
        page: options.page,
        limit: options.limit,
        data,
        configuration,
        params,
        index,
        currentUser,
        isTab,
        options,
    };

    if (configuration.type == 'custom') {
        // Condition for handling custom tabs
        const result = await methods[configuration.extraConfig.method]({
            url: configuration.url,
            body: { includes: 'child_menus', ...options },
            callback: configuration.extraConfig.prepareAsGenericListing
                ? PrepareObjectForListing
                : PrepareObjectForCustomListing,
            extraParams,
            persist: true,
            urlPrefix: GLOBAL.ROUTE_URL,
        });

        if (configuration.extraConfig.prepareAsGenericListing) {
            return PrepareObjectForListing(result, { extraParams });
        }
        return PrepareObjectForCustomListing(result, { extraParams });
    } else {
        // when export is passed hit the api with export = true
        if (exportVariable) {
            await Get({
                url: url + '&export=true',
                headers,
                callback: () => {
                    Toast.success({
                        description: 'Email send succussfully.',
                        title: 'SUCCESS',
                    });
                },
                extraParams,
                // persist: true,
                urlPrefix: GLOBAL.ROUTE_URL,
            });
            return null;
        } else {
            const result = await Get({
                url,
                headers,
                // callback: PrepareObjectForListing,
                extraParams,
                // persist: true,
                urlPrefix: GLOBAL.ROUTE_URL,
            });

            return PrepareObjectForListing(result, { extraParams });
        }
    }
};

/**
 * Invoked when actual data for listing is fetched to process further and again callbacks with final data and columns list
 * @param  {object} result
 * @param  {object} {extraParams}
 */
function PrepareObjectForListing(result, { extraParams }) {
    const {
        callback,
        page,
        limit,
        data,
        configuration,
        params,
        index,
        currentUser,
        isTab,
        options,
    } = extraParams;
    if (result.success && result.response) {
        const {
            data: apiData,
            dictionary,
            relationship,
            stats,
            request_identifier,
            model_hash: modelHash,
        } = result.response;
        let { base } = result.response;
        base = base || data.starter;

        // @TODO search columns
        // self.searchSupportedColumns = [];
        // for (var key in columns) {
        //     if (columns[key].path.split('.').length == 1) {
        //         self.searchSupportedColumns.push(columns[key]);
        //     }
        // }

        params.dictionary =
            dictionary && Object.keys(dictionary).length
                ? dictionary
                : data.dictionary;
        params.relationship =
            relationship && Object.keys(relationship).length
                ? relationship
                : data.relationship;

        const restrictedQuery = ParseRestrictedQuery(
            configuration.restricted_query
        );
        if (!isEmptyObject(restrictedQuery)) {
            let baseDictionary = params.dictionary[base];
            const restrictedColumns = Object.keys(restrictedQuery);
            baseDictionary = baseDictionary.filter(
                (column) =>
                    column && restrictedColumns.indexOf(column.name) == -1
            );

            params.dictionary[base] = baseDictionary;
        }

        params.includesList = Object.keys(params.dictionary);

        const model = params.relationship[base];
        const modelName = model.name.toLowerCase();

        let modelAliasId;
        if (isTab) {
            modelAliasId = configuration.menuId;
        }

        let formPreference: any = {};
        let formPreferences: any[] = [];
        if (!isEmptyObject(configuration.form_layouts)) {
            formPreferences = GetParsedLayoutScript(configuration.form_layouts);
        } else {
            formPreferences = GetParsedLayoutScript(model.form_layouts);
        }

        formPreference = formPreferences[0] || {};

        if (!isEmptyObject(formPreference)) {
            if (typeof formPreference.column_definition !== 'object') {
                formPreference.column_definition = JSON.parse(
                    formPreference.column_definition
                );
            }
        }

        let nextActions;

        if (model.ui_actions) {
            nextActions = FilterOutDuplicateActions([
                ...model.ui_actions,
                ...configuration.uiActions,
            ]);
        } else {
            nextActions = FilterOutDuplicateActions([
                ...configuration.uiActions,
            ]);
        }

        // Preparing the generic listing object
        const genericListingObj = {
            finalUrl: extraParams.finalUrl,
            stats: stats || data.stats,
            dictionary: params.dictionary,
            relationship: params.relationship, // modelName: self.configuration.formPreferenceName + '.form',
            listing: apiData,
            currentPage: page,
            limit,
            pageName: configuration.pageName,
            starter: base,
            model,
            modelAliasId,
            includes: configuration.includes,
            defaultOrder: configuration.order + ',' + configuration.sort,
            finalColumns: [] as any[],
            columns: GetColumnsForListing({ ...params, ...{ isArray: false } }),
            // @TODO uncomment this line to get selectedColumn
            layout: configuration.layout || {},
            nextActions,
            formPreference,
            formPreferences,
            url: configuration.url,
            dataModel: modelName,
            userFilter: configuration.layouts,
            userId: currentUser ? currentUser.id : null,
            menuId: configuration.menuId,
            modelId: model.id,
            request_identifier,
            modelHash,
            grouped: options.group_by ? true : false,
            // chartData: PrepareChartData({
            //     data: apiData,
            //     charts: model.charts,
            // }),
            group_by: null as any,
            groupedColumns: null as any,
            preDefinedmethods: null as any,
            methods: null as any,
        };

        // Prepairing object for configure-filter directive
        const filterContent = {
            dictionary: Object.values(genericListingObj.columns),
            layout: genericListingObj.layout,
            restrictColumns: configuration.restrictColumnFilter,
            scopes: data.scopes,
        };

        // Maintaining grouped Columns for case of groupBy
        if (genericListingObj.grouped) {
            genericListingObj.group_by = options.group_by;
            genericListingObj.groupedColumns = [options.group_by, 'count'];
        }

        // Build the final columns that is required for the portlet table
        genericListingObj.finalColumns = CreateFinalColumns(
            genericListingObj.columns,
            genericListingObj.layout.column_definition,
            genericListingObj.relationship
        );
        genericListingObj.preDefinedmethods = GetPreSelectedMethods();
        genericListingObj.methods = RegisterMethod(
            genericListingObj.nextActions
        );

        const returnData = {
            success: true,
            genericData: genericListingObj,
            filterContent,
            index,
        };

        if (isFunction(callback)) {
            callback(returnData);
        }

        return returnData;
    }

    return { success: false, error: result.response };
}

/**
 *
 * This method is written for customTab support on detail includes
 * For custom tab we need a different type of data
 *
 *
 * @param {*} result
 * @param {*} param1
 */
function PrepareObjectForCustomListing(result, { extraParams }) {
    const { callback, configuration } = extraParams;

    if (result.success && result.response) {
        const customResponse = {
            type: 'custom',
            listing: result.response,
            columns: configuration.extraConfig.columns,
            finalColumns: [],
        };

        const returnData = { genericData: customResponse, filterContent: {} };

        if (isFunction(callback)) {
            callback(returnData);
        }

        return returnData;
    }

    return null;
}

/**
 * Returns default option for get call params
 */
export function GetDefaultOptions(isTab?: boolean) {
    return {
        includes: '',
        // query: 'id=id',
        query: '',
        limit: isTab ? 10 : 20,
        page: 1,
        list: true,
        stats: false,
        dictionary: false,
        // layout_id: 1
    };
}

export function FilterTable(data, method) {
    const urlParams = Navigation.getUrlParams()?.params;
    let query = '';

    if (urlParams.query) {
        // if previous query present then it will executed
        let a: string[] = [];
        let f = 0;
        a = urlParams.query.split(' AND ');
        for (const ai of a) {
            // for checking overlapping query
            let b = {};
            let newquery;
            b = ai.split(' LIKE ');
            if (newquery == b[0]) {
                f = 1;
            }
        }
        if (f == 0) {
            // if not overlappin
            query =
                urlParams.query +
                ' AND ' +
                GetPathWithParent(data.selectedColumn) +
                method[0] +
                "'" +
                data.listingRow[data.selectedColumn.path] +
                "'";
            urlParams.query = query;
            Navigation.search(urlParams);
        } else {
            // if overlappin
            query = urlParams.query;
            urlParams.query = query;
            Navigation.search(urlParams);
        }
    } else {
        // if previous query not present then it will executed
        // query = `\`${data.selectedColumn.parent}\`${data.selectedColumn.name}${method[0]}'${data.listingRow[data.selectedColumn.path]}`;
        query =
            GetPathWithParent(data.selectedColumn) +
            method[0] +
            "'" +
            data.listingRow[data.selectedColumn.path] +
            "'";

        urlParams.query = query;
        Navigation.search(urlParams);
    }
}
export function FilterTableJson(data, method) {
    const column = data.selectedColumn;
    const urlParams = Navigation.getUrlParams()?.params;
    let jsonquery = {
        combinator: 'and',
        rules: [],
    };

    if (urlParams.jsonquery) {
        // if previous query present then it will executed
        jsonquery = JSON.parse(urlParams.jsonquery);
    }

    const newQuery = AddQuery(
        jsonquery,
        {
            field: `${column.parent}.${
                column.referenced_column
                    ? column.referenced_column
                    : column.name
            }`,
            operator: (method[0] as string)?.toLowerCase().trim(),
            value: data.listingRow[data.selectedColumn.path],
        },
        []
    );

    urlParams.jsonquery = JSON.stringify(newQuery);
    Navigation.search(urlParams);
}

export async function GetAggregation(operator, caption, data) {
    const options: any = GetDefaultOptions();
    options.aggregation_column = data.selectedColumn.name;
    options.aggregation_operator = operator;

    const url = BuildUrlForGetCall(data.genericData.finalUrl, options);

    const result = await Get({ url, urlPrefix: GLOBAL.ROUTE_URL });

    if (result.success) {
        if (result.response.data.length) {
            Toast.success({
                description:
                    result.response.data[0][options.aggregation_column],
                title: caption,
            });
        }
    }
}

/**
 * everytime few variables are being initialized whenever api call is made to fetch data
 */
function Initialization(configuration, urlParameter: any = {}) {
    const sorts = ['desc', 'asc'];
    let order = isUndefinedOrNull(urlParameter.order)
        ? configuration.order
        : urlParameter.order;
    order = order === 'id' ? `\"${configuration.base}\".${order}` : order;
    return {
        includes: Array.isArray(configuration.includes)
            ? configuration.includes.join(',')
            : configuration.includes,
        dictionary: null,
        // starter: configuration.starter,
        order,
        sort: SelectFromOptions(sorts, urlParameter.sort || configuration.sort),
    };
}
