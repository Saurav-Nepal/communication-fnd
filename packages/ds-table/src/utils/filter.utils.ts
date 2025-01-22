import { endOfDay, startOfDay } from 'date-fns';
import {
    formatQuery,
    RuleGroupTypeAny,
    transformQuery,
} from 'react-querybuilder';

import {
    isEmptyObject,
    isValidString,
    ObjectDto,
    parseJSONString,
} from '@slabs/ds-utils';

import {
    CURRENT_DATE,
    RESTRICTED_FILTERS,
} from '../constants/preferences.constants';
import {
    API_DATE_FORMAT,
    API_DATE_TIME_FORMAT,
    APIDateFormat,
} from './time.utils';

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
interface QueryString {
    [key: string]: string;
}

interface FilterData {
    [key: string]: any;
}

export const UrlParamToFilterData = (queryString: QueryString): FilterData => {
    let tempQueryParam: FilterData = {};

    for (const key in queryString) {
        const split_key = key.split('-');

        if (split_key.length === 3) {
            const [first, second, third] = split_key as [
                string,
                string,
                string,
            ];
            if (first in tempQueryParam) {
                tempQueryParam[first] = {
                    ...tempQueryParam[first],
                    [second]: {
                        ...(tempQueryParam[first] as ObjectDto)[second],
                        [third]: queryString[key],
                    },
                };
            } else {
                tempQueryParam = {
                    ...tempQueryParam,
                    [first]: {
                        [second]: {
                            [third]: queryString[key],
                        },
                    },
                };
            }
        } else if (split_key.length === 2) {
            const [first, second] = split_key as [string, string];
            if (first in tempQueryParam) {
                tempQueryParam[first] = {
                    ...tempQueryParam[first],
                    [second]:
                        queryString[key] === 'true' ? true : queryString[key],
                };
            } else {
                tempQueryParam[first] = {
                    [second]:
                        queryString[key] === 'true' ? true : queryString[key],
                };
            }
        } else {
            tempQueryParam[key] = queryString[key];
        }
    }

    if (
        'page' in tempQueryParam &&
        typeof tempQueryParam['page'] === 'string'
    ) {
        tempQueryParam['page'] = parseInt(tempQueryParam['page'], 10);
    }
    if (
        'limit' in tempQueryParam &&
        typeof tempQueryParam['limit'] === 'string'
    ) {
        tempQueryParam['limit'] = parseInt(tempQueryParam['limit'], 10);
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
    if (value === CURRENT_DATE) {
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
    if (!filterJson || isEmptyObject(filterJson)) return;

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
    const filterJson: RuleGroupTypeAny = isValidString(filterQuery)
        ? parseFilterQueryString(filterQuery)
        : filterQuery;

    if (!filterJson) return;
    if (isEmptyObject(filterJson)) return;

    try {
        return formatQuery(filterJson, 'sql');
    } catch (e) {
        console.error(e);
        return '';
    }
};

export const getDefaultFilterQueries = (
    defaultFilterQueries?: ObjectDto,
    defaultRestrictedQueries?: string
) => {
    const queries: ObjectDto = {};

    if (!defaultFilterQueries && !defaultRestrictedQueries) return queries;

    if (defaultFilterQueries) {
        defaultFilterQueries.rules = defaultFilterQueries.rules?.map(
            (rule: any, index: any) => {
                return {
                    field: rule?.field,
                    operator: rule?.operator,
                    path: [index],
                    value: rule?.value,
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
