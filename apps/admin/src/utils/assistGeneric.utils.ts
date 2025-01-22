import { ConfirmUtil } from '@slabs/ds-dialog';
import {
    isEmptyObject,
    isUndefinedOrNull,
    isValidString,
} from '@slabs/ds-utils';

import {
    FormDetailEndPoint,
    GetMenuDetailEndPoint,
} from '@/constants/api.constants';
import { GLOBAL } from '@/constants/global.constants';
import {
    MATCH_PARENT_PATH,
    MATCH_START_END_PARANTHESIS,
    MATCH_WHITESPACE,
} from '@/constants/regex.constants';
import { Delete, Get } from '@/services';
import { ObjectDto } from '@/types';

import { BuildUrlForGetCall } from './common.utils';
import { ProcessForm } from './formMiddleware.utils';
import { Navigation } from './navigation.utils';
import { Pageutil } from './page.utils';
import { Toast } from './toast.utils';

export function GetSelectedColumnDefinition(layout) {
    const selectedColumnsDefinition =
        layout && typeof layout == 'object' ? layout.column_definition : null;

    if (typeof selectedColumnsDefinition == 'string') {
        return JSON.parse(selectedColumnsDefinition);
    }
}

export function RemoveStarterFromThePath({ data, starter }) {
    const obj = {};
    for (const i in data) {
        const index = i.replace(starter + '.', '');
        obj[index] = data[i];
    }
    return obj;
}

export function GetParsedLayoutScript(listLayouts) {
    if (!Array.isArray(listLayouts)) {
        return [];
    }
    return listLayouts.map((layout) => {
        try {
            layout.column_definition =
                typeof layout.column_definition == 'string'
                    ? JSON.parse(layout.column_definition)
                    : layout.column_definition;
        } catch (e) {
            layout.column_definition = {};
        }
        return layout;
    });
}

export function GetChangedParams(newValues: any, originalValues: any = {}) {
    const data: any = {};
    if (isEmptyObject(originalValues)) {
        return newValues;
    }
    if (!isEmptyObject(newValues)) {
        for (const i in newValues) {
            const newValue = newValues[i];
            const oldValue = originalValues[i];
            if (newValue != oldValue) {
                data[i] = newValue;
            }
        }
    }

    return data;
}

/**
 * Trims final body
 * removes empty params from api call param
 * @param  {pbject} newValues
 */
export function TrimBody(newValues: any) {
    const data: any = {};
    if (isEmptyObject(newValues)) {
        return newValues;
    }
    for (const i in newValues) {
        const newValue = newValues[i];
        if (newValue == '') {
            continue;
        } else {
            data[i] = newValue;
        }
    }
    return data;
}

export function ParseRestrictedQuery(queryString: string) {
    const parsedQuery: ObjectDto = {};
    if (!queryString) {
        return parsedQuery;
    }
    const queries = queryString.split(' and ');
    queries.forEach((orQuery) => {
        orQuery = orQuery.replace(MATCH_START_END_PARANTHESIS, '');
        const queryArr = orQuery.split(' or ');
        queryArr.forEach((query) => {
            if (!query) {
                return;
            }

            query = query
                .replace(MATCH_PARENT_PATH, '')
                .replace(MATCH_WHITESPACE, '');
            const splitedQuery = query.split('=');
            let value = splitedQuery[1];

            if (typeof value == 'string') {
                value = value.replace(/'/g, '');
            }
            parsedQuery[splitedQuery[0]] = value;
            // parsedQuery.push(query)
        });
    });

    return parsedQuery;
}

/**
 * Returns path including parent and column name having parent wrapped within '`'
 * @param  {Object} column
 */
export function GetPathWithParent(column: ObjectDto) {
    return `\"${column.parent}\".${
        column.referenced_column ? column.referenced_column : column.name
    }`;
}

/**
 * Filters out same kind of actions on the basis of their identifier
 * in the event of same identifier, action having higher id gets preference
 * @param  {array} actions
 */
export function FilterOutDuplicateActions(actions: ObjectDto[]) {
    const obj: ObjectDto = {};
    const finalActions = [...actions];
    const duplicateIndices: number[] = [];
    if (!Array.isArray(actions)) {
        return [];
    }
    actions.forEach((action, index) => {
        const identifier = action.name;
        if (obj[identifier]) {
            const duplicateIndex =
                obj[identifier].id > action.id ? index : obj[identifier].index;
            duplicateIndices.push(duplicateIndex);
        } else {
            obj[identifier] = { ...action, ...{ index } };
        }
    });

    duplicateIndices // NOSONAR
        .sort((a, b) => a - b) // NOSONAR
        .forEach((key, index) => {
            finalActions.splice(key - index, 1);
        });
    return finalActions;
}

/**
 * Takes column object, return url for making api call
 * @param  {object} column
 */
export function ExtractUrlFromColumnDefinition(column: ObjectDto) {
    if (
        column.reference_model &&
        (column.reference_model.route_name ||
            column.reference_model.modified_route)
    ) {
        return column.reference_model.modified_route
            ? column.reference_model.modified_route
            : column.reference_model.route_name;
    } else if (column.route) {
        return column.route;
    }
}

export function ExtractUrlFromSourceColumnDefinition(column: ObjectDto) {
    return ExtractUrlFromColumnDefinition(column);
}

export function ChangeRecordToData(route: string) {
    if (!isValidString(route)) return null;
    return route.replace('record', 'data');
}

export function GetFormContent({
    listingRow,
    action,
    genericData,
    source,
    method = '',
    menuDetail = {},
    parent = {},
    selectedRows = [],
    portlet,
}: any) {
    return {
        method: method.toLowerCase(),
        menu: menuDetail,
        source,
        parent: parent,
        callback: action.callback,
        data: listingRow,
        starter: genericData.starter,
        dictionary: genericData.columns,
        relationship: genericData.model,
        layout: genericData.formPreference,
        layouts: genericData.formPreferences,
        userId: genericData.userId,
        modelId: genericData.modelId,
        modelAliasId: genericData.modelAliasId,
        route: genericData.url,
        name: method + ' ' + genericData.starter,
        modelHash: genericData.modelHash,
        listData: genericData.listing,
        genericData: genericData,
        selectedRows: selectedRows,
        portlet: portlet,
    };
}

/**
 * temp function to get input , will be moveed to modalmanger
 * @param {*} fields
 * hideOverrideAll is used to disable and enable saveToAll button
 */
export function GetInput(
    _fields: any,
    _callback: any,
    heading = null,
    hideOverrideAll = null
) {
    // ModalManager.openModal({
    //     headerText: heading || 'Input Values',
    //     modalBody: () => (
    //         <InputModal
    //             fields={fields}
    //             hideOverrideAll={hideOverrideAll}
    //             onClose={callback}
    //         />
    //     ),
    // });
}

/**
 * parse url string to actual one
 * this method seek for ':', whenever it encounters one, replace with actual data
 * for e.g. booking/:id is converted to booking/12
 * @param  {string} url=''
 * @param  {object} obj
 */
export function CreateUrl({ url = '', obj }: { url: string; obj: any }) {
    const reg = /(:)\w+/g;
    const params = url.match(reg);
    if (!(params && params.length)) {
        return url;
    }
    for (const i in params) {
        const attr = params[i].substr(1);
        url = url.replace(params[i], obj[attr]);
    }
    return url;
}

/**
 * evaluates condition and return boolean value accordingly
 * @param  {string} condition
 * @param  {object} itemRow
 */
export function EvalCondtionForNextActions(
    condition: string,
    itemRow,
    starter
) {
    if (!condition) {
        return true;
    }
    let data = { ...itemRow };

    if (starter) {
        data = RemoveStarterFromThePath({ data: itemRow, starter });
    }

    const reg = /:[\w.]*/g;
    const evaluatedExpressions: any[] = [];
    let expressions = condition.match(reg) ?? [];

    for (const i in expressions) {
        const expression = expressions[i].split(':')[1];
        // added try catch for checking conditions of menu action
        try {
            const isSingleLevel =
                expression.split('.').length > 1 ? false : true;
            if (isSingleLevel) {
                evaluatedExpressions[i] = data[expression]; // NOSONAR
            } else {
                evaluatedExpressions[i] = eval(`data.${expression}`); // NOSONAR
            }

            if (evaluatedExpressions[i] instanceof Array) {
                if (evaluatedExpressions[i].length) {
                    evaluatedExpressions[i] = 1; // NOSONAR
                } else {
                    evaluatedExpressions[i] = 0; // NOSONAR
                }
            }

            evaluatedExpressions[i] = // NOSONAR
                typeof evaluatedExpressions[i] == 'string'
                    ? `'${evaluatedExpressions[i]}'`
                    : evaluatedExpressions[i];

            const regexForMatchingCondition = new RegExp(expressions[i], 'g'); // replaces all the matched parameters
            condition = condition.replace(
                regexForMatchingCondition,
                evaluatedExpressions[i] &&
                    typeof evaluatedExpressions[i] == 'object'
                    ? 1
                    : evaluatedExpressions[i]
            );
        } catch (e: any) {
            console.error(e.message);
            evaluatedExpressions[i] = data[expression]; // NOSONAR
            condition = condition.replace(
                expressions[i],
                "'" + evaluatedExpressions[i] + "'"
            );
        }
    }
    try {
        return eval(condition); // NOSONAR
    } catch (e) {
        console.warn('Error in filter condition, Please check script');
        console.warn('Executed script ->', e);
        console.error(e);
    }
}

/**
 * Evaluates value against url
 * @param  {} url
 */
export function CreateUrlForFetchingDetailRecords({
    url,
    urlParameter,
}: {
    url: string;
    urlParameter: ObjectDto;
}) {
    if (!url) {
        return false;
    }
    const reg = /([:$])\w+/g;
    const params = url.match(reg);
    if (!params || !params.length) {
        return url;
    }
    for (const i in params) {
        const key = params[i];

        url = url.replace(key, urlParameter[key.substring(1)]);
    }
    return url;
}

/**
 * takes dictionary and relationship and create object having key combination of its parent and id
 * used for getting list of columns in above explained format which is again used by CreateFinalColumns method to return selected columns
 * @param  {string} {includes
 * @param  {object} relationship
 * @param  {string} starter
 * @param  {object} dictionary
 * @param  {boolean} excludeStarter}
 */
export function GetColumnsForListing(params: any, excludeParent = false) {
    const {
        includes,
        relationship,
        starter,
        dictionary,
        excludeStarter,
        includesList = [],
    } = params;

    const columns: ObjectDto = {};
    const dictionaryColumns: ObjectDto = {};

    if (!(Array.isArray(includesList) && includesList.length)) {
        const includesArr = includes.split(',');
        for (const i in includesArr) {
            const tempIncludes = includesArr[i].split('.');
            let newStarter = starter;
            for (const j in tempIncludes) {
                newStarter += `.${tempIncludes[j]}`;
                includesList.push(newStarter);
            }
        }
        if (!excludeStarter) {
            includesList.unshift(starter);
        }
    }

    for (const i in includesList) {
        columns[includesList[i]] = dictionary[includesList[i]];
    }
    for (const i in columns) {
        for (const j in columns[i]) {
            const selectedColumn: ObjectDto = {};

            const element = !excludeParent
                ? `${i}.${columns[i][j].name}`
                : columns[i][j].name;

            selectedColumn.parent = i;

            // Adding id to fix issue with sort by db on portlet table
            selectedColumn.id = columns[i][j].id;

            selectedColumn.path = element;
            selectedColumn.type_id = columns[i][j].type_id;
            selectedColumn.model_id = columns[i][j].model_id;
            selectedColumn.name = columns[i][j].name;
            selectedColumn.visibility = columns[i][j].visibility;
            selectedColumn.required = columns[i][j].required;
            selectedColumn.nullable = columns[i][j].nullable;
            selectedColumn.reference_model = columns[i][j].reference_model;
            selectedColumn.display_name = columns[i][j].display_name;
            selectedColumn.query_params = columns[i][j].query_params;

            if (selectedColumn.reference_model && selectedColumn.query_params) {
                selectedColumn.reference_model.modified_route =
                    BuildUrlForGetCall(
                        selectedColumn.reference_model.route_name,
                        { query: selectedColumn.query_params }
                    );
            }
            const relationIndex = columns[i][j].parent;
            if (
                !isUndefinedOrNull(relationship) &&
                relationship.hasOwnProperty(relationIndex)
            ) {
                if (
                    relationship[relationIndex].hasOwnProperty('related_model')
                ) {
                    selectedColumn.reference_route =
                        relationship[relationIndex].related_model.state_name;
                    selectedColumn.parentColumn = relationship[relationIndex]
                        .related_column
                        ? relationship[relationIndex].related_column.name
                        : null;
                } else if (relationship[relationIndex].state_name) {
                    selectedColumn.reference_route =
                        relationship[relationIndex].state_name;
                }
            }

            const index = !excludeParent
                ? selectedColumn.parent + '.' + selectedColumn.name
                : selectedColumn.name;
            dictionaryColumns[index] = selectedColumn;
        }
    }
    return dictionaryColumns;
}

/**
 * Returns url for api call
 * being used in formCreator to detemine the url based on the method
 * @param  {object} payload
 */
export function GetUrlForFormCreator({
    payload,
    getDictionary = false,
    isForm,
}) {
    let url = '';
    if (payload.source == 'form' || isForm) {
        url = `${FormDetailEndPoint}/${payload.form.form_id}`;
        return url;
    }

    // @TODO @shubham remove below line after sometime - shubham
    url =
        payload.method == 'edit'
            ? payload.route +
              '/' +
              (payload.data.id || payload.data[payload.starter + '.id'])
            : payload.route;

    if (getDictionary) {
        return url + (payload.method == 'edit' ? '/edit' : '/create');
    }
    return url;
}

export function GetUrlForFormSubmit({ payload }) {
    let url = '';
    const isForm = payload.source == 'form' ? true : false;
    if (isForm) {
        // if (isForm && payload.method != 'edit') {
        // get url
        url = ConvertToQuery.bind({
            data: payload.data,
            record: payload.record,
        })(payload.route);
        return url;
    }
    url =
        payload.method == 'edit'
            ? payload.route +
              '/' +
              (payload.data.id || payload.data[payload.starter + '.id'])
            : payload.route;

    return url;
}

/**
 * takes query as string & evaluates them
 * replace string variable to their value
 * @param  {string} params
 * @returns evaluated query
 */
export function ConvertToQuery(params) {
    const reg = /(:[$\w.]*)\w+/g;
    const tempArr = params.match(reg);

    for (const i in tempArr) {
        if (tempArr[i] && typeof tempArr[i] == 'string') {
            const a = eval('this.' + tempArr[i].split(':')[1]); // NOSONAR
            const b = tempArr[i];
            params = params.replace(b, a);
        }
    }
    return params;
}

/**
 * returns final list of selected columns to be shown on each car for each row
 * Takes columns list being prepared by 'GetColumnsForListing' method, preference list and relationship
 * same as TableFactory.createFinalObject
 * @param  {object} columns
 * @param  {object} selectedColumns
 * @param  {object} relationship
 */
export function CreateFinalColumns(
    columns: ObjectDto,
    selectedColumns: ObjectDto[] = [],
    relationship,
    _is_report = false
) {
    const finalColumnDefinition: ObjectDto[] = [];
    let splitEnabled = false;
    let defaultColumns = false;

    if (selectedColumns && selectedColumns.length == 0) {
        for (const i in columns) {
            if (
                columns[i].name === 'created_at' ||
                columns[i].name === 'updated_at' ||
                columns[i].name === 'deleted_at' ||
                columns[i].name === 'created_by' ||
                columns[i].name === 'updated_by' ||
                columns[i].name === 'id'
            ) {
                continue;
            }

            selectedColumns.push({
                object: columns[i].parent,
                column: columns[i].name,
                headingCollapsed: true,
                heading: '',
                index: i,
            });

            if (selectedColumns.length >= 6) {
                break;
            }
        }
        defaultColumns = true;
    }

    for (const i in selectedColumns) {
        const selected = selectedColumns[i];
        if (!selected.split) {
            const dict = columns[selected.index];
            if (dict) {
                finalColumnDefinition[i] = dict; // NOSONAR
                finalColumnDefinition[i].id = dict.id;

                finalColumnDefinition[i].route = selected.route
                    ? selected.route
                    : false;
                finalColumnDefinition[i].display_name = selected.columnTitle
                    ? selected.columnTitle
                    : finalColumnDefinition[i].display_name;
                finalColumnDefinition[i].split = splitEnabled;
                // To change the hide status of the column
                finalColumnDefinition[i].hide = selected.hide;

                finalColumnDefinition[i].filter = selected.filter;

                finalColumnDefinition[i].defaultLayout = defaultColumns;

                const relationIndex = dict.parent;

                if (
                    !isUndefinedOrNull(relationship) &&
                    relationship.hasOwnProperty(relationIndex) &&
                    (relationship[relationIndex].menu_url ||
                        relationship[relationIndex].hasOwnProperty(
                            'reference_model'
                        ))
                ) {
                    finalColumnDefinition[i].menu_url =
                        relationship[relationIndex].menu_url ||
                        relationship[relationIndex].reference_model.menu_url;
                }
            }
        } else if (selected.separator) {
            finalColumnDefinition[i] = { ...selected, isSplit: false }; // NOSONAR
            splitEnabled = false;
        } else {
            finalColumnDefinition[i] = { ...selected, isSplit: true }; // NOSONAR
            splitEnabled = !splitEnabled;
        }

        // if it is a seperator
        if (selected.name == 'seperator') {
            finalColumnDefinition[i] = selected; // NOSONAR
        }
    }
    return finalColumnDefinition;
}

function createQueryUrl(url, restrictQuery, genericData) {
    let query = '';
    let orderMethod;

    if (restrictQuery) {
        if (query) {
            query += restrictQuery;
        } else {
            query += restrictQuery.split('and ')[1];
        }
    }

    if (query) {
        query = '?redirectQuery=' + query; // NOSONAR
        orderMethod = '&'; // NOSONAR
    } else {
        orderMethod = '?'; // NOSONAR
    }

    return url;
}

/**
 * Returns predefined methods used by CustomAction component
 * methods includes redirect, add, edit, delete, auditLog
 */
export function GetPreSelectedMethods() {
    const methods: any = {};
    let menuDetail: ObjectDto | null = null;
    let menuDictionary: ObjectDto | null = null;
    let menuColumns: ObjectDto | null = null;

    methods.redirectGeneric = ({ action, listingRow, genericData }) => {
        let url = CreateUrl({ url: action.parameter, obj: listingRow });

        url = createQueryUrl(url, genericData.restrictQuery, genericData);
        Navigation.navigate({ url });
    };

    /**
     * To be used to edit menu directly from generic detail page
     */
    methods.editMenu = async (menuId) => {
        const options = {
            dictionary: menuDictionary ? false : true,
        };

        const url = 'menu';
        const builtUrl = BuildUrlForGetCall(url + '/' + menuId, options);
        const res: any = await Get({ url: builtUrl });

        menuDictionary = res.dictionary || menuDictionary;
        menuDetail = res.response;

        const params = {
            dictionary: menuDictionary,
            includes: '',
            starter: url,
        };
        if (!menuColumns) {
            menuColumns = GetColumnsForListing(params);
        }

        const genericData = {
            columns: menuColumns,
            url,
        };
        methods.editGeneric({ listingRow: menuDetail, genericData });
    };

    /**
     * Generic add method
     * @param  {object} {action
     * @param  {object} listingRow
     * @param  {object} genericData}
     */
    methods.addGeneric = ({
        action,
        listingRow,
        genericData,
        source = 'module',
        menuDetail, // NOSONAR
        parent,
    }) => {
        const formContent = GetFormContent({
            listingRow,
            action,
            genericData,
            source,
            method: 'Add',
            menuDetail,
            parent,
        });
        ProcessForm({ formContent });
    };

    /**
     * Generic edit method
     * @param  {object} {action
     * @param  {object} listingRow
     * @param  {object} genericData}
     */
    methods.editGeneric = ({
        action,
        listingRow,
        genericData,
        source = 'model',
        menuDetail, // NOSONAR
        parent,
        portlet,
    }) => {
        const formContent = GetFormContent({
            listingRow,
            action,
            genericData,
            source,
            method: 'Edit',
            menuDetail,
            parent,
            portlet,
        });
        ProcessForm({ formContent });
    };

    methods.customForm = ({
        action,
        listingRow,
        genericData,
        source = 'form',
        menuDetail, // NOSONAR
        parent,
    }) => {
        const formContent: any = GetFormContent({
            listingRow,
            action,
            genericData,
            source,
            method: 'Add',
            menuDetail,
            parent,
        });
        formContent.form = action;
        ProcessForm({ formContent, isForm: true });
    };

    /**
     * Passes entire listing row object which is used to prepopulate input fields
     * short cut for adding new record
     * @param  {object} action
     * @param  {object} listingRow
     * @param  {object} genericData
     */
    methods.copyGeneric = ({
        action,
        listingRow,
        genericData,
        source = 'module',
        menuDetail, // NOSONAR
        parent,
    }) => {
        // NOSONAR
        const formContent = GetFormContent({
            listingRow,
            action,
            genericData,
            source,
            method: 'Add',
            menuDetail,
            parent,
        });
        ProcessForm({ formContent });
    };

    methods.deleteGeneric = async ({ action, listingRow, genericData }) => {
        const deletekey = isUndefinedOrNull(action.redirectValueName)
            ? listingRow.id
            : listingRow[action.redirectValueName];

        const method = async () => {
            const result = await Delete({
                url: `${genericData.url}/${deletekey}`,
                urlPrefix: GLOBAL.ROUTE_URL,
            });
            if (result.success) {
                action.callback();
                Toast.success({
                    title: 'Success',
                    description: 'Records has been deleted',
                });
            }
        };

        ConfirmUtil({
            message: 'Are you sure you want to delete this record?',
            onConfirmPress: method,
            confirmAppearance: 'error',
        });
    };

    // auditLog
    methods.auditGeneric = ({ listingRow, genericData }) => {
        const route = genericData.url;
        Pageutil.auditLog({ listingRow, route });
    };
    return methods;
}

/**
 * Register all the methods coming from db
 * takes string as method definition, and corresponding dependencies, register them and pass object of all methods
 * @param  {} methodArr
 */
export function RegisterMethod(methodArr) {
    const methods = {};
    for (const i in methodArr) {
        const methodObj = methodArr[i];

        if (!methodObj) {
            return null;
        }
        if (
            methodObj.definition &&
            typeof methodObj.definition == 'object' &&
            methodObj.definition.script
        ) {
            if (methodObj.dependency) {
                methods[methodObj.name] = new Function( // NOSONAR
                    'callback',
                    methodObj.dependency,
                    methodObj.definition.script
                );
            } else {
                methods[methodObj.name] = new Function( // NOSONAR
                    'callback',
                    methodObj.definition.script
                );
            }
        }
    }
    return methods;
}

/**
 * Returns meta data about menus to be used to fetch actual listing data
 * This method is invoked, Once menu detail is fetched
 * @param  {object} menuDetail
 */
export function ConvertMenuDetailForGenericPage(menuDetail) {
    let splits;
    if (menuDetail.order_definition || menuDetail.default_ordering) {
        splits = menuDetail.order_definition
            ? menuDetail.order_definition.split(' ')
            : menuDetail.default_ordering.split(' ');
        if (
            !splits[1] &&
            (menuDetail.order_definition
                ? menuDetail.order_definition.includes(',')
                : menuDetail.default_ordering.includes(','))
        ) {
            splits = menuDetail.order_definition
                ? menuDetail.order_definition.split(',')
                : menuDetail.default_ordering.split(',');
        }
        if (menuDetail.base && splits[0]) {
            splits[0] = `\"${menuDetail.base}\".${splits[0]}`;
        }
    }

    const layouts = menuDetail.list_layouts || menuDetail.layouts;
    menuDetail.layouts = GetParsedLayoutScript(layouts);

    const layoutWithUser = layouts.length
        ? layouts.filter((layout) => layout.user_id)
        : [];
    const layout = layouts.length ? layoutWithUser[0] || layouts[0] : null;
    // menuDetail.layouts = menuDetail.layouts.filter(layout => layout && layout.name && layout.query && layout.name != 'default');

    delete menuDetail.list_layouts;

    // Fixed self assignment.
    // if (layout) {
    //     layout.column_definition = layout.column_definition;
    // }

    /**
     * Preparing obj to build template
     */
    const param = {
        type: menuDetail.type,
        includes: menuDetail.includes,
        url: menuDetail.route,
        restricted_query: menuDetail.restricted_query,
        restrictColumnFilter: menuDetail.restricted_column,
        order:
            (menuDetail.order_definition // NOSONAR
                ? menuDetail.order_definition
                : menuDetail.default_ordering) && splits[0]
                ? splits[0].trim()
                : null,
        sort:
            (menuDetail.order_definition // NOSONAR
                ? menuDetail.order_definition
                : menuDetail.default_ordering) && splits[1]
                ? splits[1].trim()
                : 'desc',
        menuId: menuDetail.id,
        modelId: menuDetail.alias_model_id,
        layouts: menuDetail.layouts,
        form_layouts: menuDetail.form_layouts,
        layout,
        pageName: menuDetail.name,
        image: menuDetail.image,
        uiActions: menuDetail.ui_actions || [],
        base: menuDetail.base,
        extraConfig: menuDetail,
    };

    // For Custom Tabs we have added a column type
    // to identify that its custom ,
    // for such cases we add an extra config to the
    // the param
    if (menuDetail.type == 'custom') {
        param.extraConfig = menuDetail;
    }

    return param;
}

/**
 * Fetches Menu detail to render generic page
 * @param  {id} menuId
 * @param  {function} callback
 */
export async function GetMenuDetail(menuId, callback = null) {
    const url = GetMenuDetailEndPoint + menuId;

    const { success, response } = await Get({
        url,
        // callback,
        // persist: callback ? true : false,
        urlPrefix: GLOBAL.API_HOST,
    });

    if (success) {
        return response;
    }
    return null;
}
