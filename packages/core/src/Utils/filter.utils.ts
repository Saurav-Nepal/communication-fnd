import { endOfDay, startOfDay } from 'date-fns';
import {
    formatQuery,
    RuleGroupTypeAny,
    transformQuery,
} from 'react-querybuilder';

import { ObjectDto } from '../backend/Dtos';
import {
    API_DATE_FORMAT,
    CURRENT_EMPLOYEE,
    CURRENT_USER,
    currentDate,
    RESTRICTED_FILTERS,
} from '../Constants';
import { user } from '../Models/User';
import { IsEmptyObject, IsValidString, parseJSONString } from './common.utils';
import { API_DATE_TIME_FORMAT, APIDateFormat } from './time.utils';

export const IsObject = (value: any) => typeof value === 'object';

export const filterDataToUrlParam = (filterData: any) => {
    let general_url_param: any = {};
    for (let key in filterData) {
        let general_key = key;
        if (IsObject(filterData[key])) {
            const child_object = filterData[key];

            for (let child_key in child_object) {
                if (IsObject(child_object[child_key])) {
                    general_key += `-${child_key}`;
                    const grand_child_object = child_object[child_key];
                    for (let grand_child_key in grand_child_object) {
                        general_url_param[`${general_key}-${grand_child_key}`] =
                            grand_child_object[grand_child_key];
                    }
                } else {
                    general_url_param[`${general_key}-${child_key}`] =
                        child_object[child_key];
                }
            }
        } else {
            general_url_param[general_key] = filterData[key];
        }
    }

    if (general_url_param['date-range-min']) {
        general_url_param[`date-range-min`] = convertCurrentDate(
            general_url_param['date-range-min']
        );
    }
    if (general_url_param['date-range-max']) {
        general_url_param['date-range-max'] = convertCurrentDate(
            general_url_param['date-range-max']
        );
    }

    return general_url_param;
};
export const UrlParamToFilterData = (queryString: any) => {
    let tempQueryParam: any = {};

    for (let key in queryString) {
        const split_key = key.split('-');

        if (split_key.length === 3) {
            if (split_key[0] in tempQueryParam) {
                tempQueryParam[split_key[0]] = {
                    [split_key[1]]: {
                        ...tempQueryParam[split_key[0]][split_key[1]],
                        [split_key[2]]: queryString[key],
                    },
                };
            } else {
                tempQueryParam = {
                    ...tempQueryParam,
                    [split_key[0]]: {
                        [split_key[1]]: {
                            [split_key[2]]: queryString[key],
                        },
                    },
                };
            }
        } else if (split_key.length === 2) {
            if (split_key[0] in tempQueryParam) {
                tempQueryParam[split_key[0]] = {
                    ...tempQueryParam[split_key[0]],
                    [split_key[1]]:
                        queryString[key] === 'true' ? true : queryString[key],
                };
            } else {
                tempQueryParam[split_key[0]] = {
                    [split_key[1]]:
                        queryString[key] === 'true' ? true : queryString[key],
                };
            }
        } else {
            tempQueryParam[key] = queryString[key];
        }
    }

    if ('page' in tempQueryParam) {
        tempQueryParam['page'] = parseInt(tempQueryParam['page']);
    }
    if ('limit' in tempQueryParam) {
        tempQueryParam['limit'] = parseInt(tempQueryParam['limit']);
    }

    return tempQueryParam;
};

export const parseCurrentDate = (
    value: string,
    options?: {
        isEndDate?: boolean;
        format?: typeof API_DATE_TIME_FORMAT | typeof API_DATE_FORMAT;
        isApiDate?: boolean;
    }
) => {
    if (value === currentDate) {
        const {
            isEndDate = false,
            format = API_DATE_TIME_FORMAT,
            isApiDate = true,
        } = options || {};

        if (!isApiDate) return new Date();
        return APIDateFormat({
            date: isEndDate ? endOfDay(new Date()) : startOfDay(new Date()),
            format,
        });
    }

    return value;
};

export const convertCurrentDate = (value: any) => {
    const currDate = new Date();

    const target_date = new Date(value);

    if (currDate.toDateString() === target_date.toDateString())
        return 'currentDate';
    return value;
};

export const parseFilterQueryString = (filterQuery: string) => {
    const filterJson = parseJSONString(filterQuery);
    if (!filterJson || IsEmptyObject(filterJson)) return;

    try {
        return transformQuery(filterJson, {
            operatorMap: {
                like: 'ILIKE',
                'not like': 'NOT ILIKE',
            },
            ruleProcessor(rule) {
                if (
                    rule.operator === 'ILIKE' ||
                    rule.operator === 'NOT ILIKE'
                ) {
                    return { ...rule, value: `%${rule.value}%` };
                }
                return rule;
            },
        });
    } catch (error) {
        console.error(error);
        return;
    }
};

export const parseFilterQueryToSql = (filterQuery: string | ObjectDto) => {
    const filterJson: RuleGroupTypeAny = IsValidString(filterQuery)
        ? parseFilterQueryString(filterQuery)
        : filterQuery;

    if (!filterJson) return;
    if (IsEmptyObject(filterJson)) return;

    try {
        return formatQuery(filterJson, 'sql')
            .replace(CURRENT_EMPLOYEE, `${user.getUserData()?.employee?.id}`)
            .replace(CURRENT_USER, `${user.getUserData()?.id}`);
    } catch (e) {
        console.error(e);
        return '';
    }
};

export const getDefaultFilterQueries = (
    defaultFilterQueries?: ObjectDto,
    defaultRestrictedQueries?: string
) => {
    const queries = {};

    if (!defaultFilterQueries && !defaultRestrictedQueries) return queries;

    if (defaultFilterQueries) {
        defaultFilterQueries.rules = defaultFilterQueries.rules?.map(
            (rule, index) => {
                return {
                    field: rule.field,
                    operator: rule.operator,
                    path: [index],
                    value: rule.value,
                };
            }
        );
        queries['filter_query'] = JSON.stringify(defaultFilterQueries as any);
    }
    if (defaultRestrictedQueries) {
        queries[RESTRICTED_FILTERS] = defaultRestrictedQueries;
    }

    return queries;
};

export const GetFilterRestrictedFilterQuery = (
    filterQuery: string,
    restricted_fields: string
) => {
    const restrictedFilters = restricted_fields?.split(',');

    const filterRecursive = (rule: ObjectDto) => {
        if (restrictedFilters?.includes(rule?.field)) return true;

        rule.rules = rule?.rules?.filter(filterRecursive);
        return rule?.rules?.length > 0;
    };
    const jsonData = parseJSONString(filterQuery);

    const rules = jsonData?.rules?.filter(filterRecursive);

    if (!rules?.length) return;
    return JSON.stringify({
        ...jsonData,
        rules,
    });
};
