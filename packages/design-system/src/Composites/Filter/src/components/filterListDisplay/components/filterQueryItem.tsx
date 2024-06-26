import { useMemo } from 'react';
import { formatQuery, transformQuery } from 'react-querybuilder';

import {
    CURRENT_EMPLOYEE,
    CURRENT_USER,
    DisplayDateFormat,
    GetDateValue,
    IsEmptyArray,
    IsEmptyObject,
    isIsoDate,
    IsValidString,
    parseJSONString,
} from '@finnoto/core';

import { FilterItemWrapper } from './filterItem.wrapper';

export const FilterQueryItem = ({
    filter_query,
    removeFilterData,
    isDeletable = true,
    className,
    showCrossIcon,
}: any) => {
    const query = useMemo(() => {
        const filter_json = parseJSONString(filter_query);

        if (!filter_json || IsEmptyObject(filter_json)) return null;
        const transformedQuery = transformQuery(filter_json, {
            ruleProcessor(rule) {
                if (!IsValidString(rule.value)) return rule;
                const valueArray = rule.value?.split(',');
                if (IsEmptyArray(valueArray)) return rule;
                if (isIsoDate(valueArray[0])) {
                    const newValueArray = valueArray
                        .map((value: any) =>
                            value
                                ? DisplayDateFormat({
                                      date: GetDateValue(value),
                                  })
                                : null
                        )
                        .filter(Boolean);
                    return {
                        ...rule,
                        value: newValueArray.join(','),
                    };
                }
                return rule;
            },
        });
        try {
            return formatQuery(transformedQuery, 'spel');
        } catch (e) {
            console.error(e);
            return '';
        }
    }, [filter_query]);

    if (!query) return <></>;
    return (
        <FilterItemWrapper
            onClick={() => {
                if (!isDeletable) return;
                removeFilterData();
            }}
            isDeletable={isDeletable}
            isClearable={isDeletable}
            className={className}
            showCrossIcon={showCrossIcon}
        >
            <span className='capitalize'>Query {'> '}</span>
            <span>
                &quot;
                {query
                    .replace(CURRENT_USER, 'Current User')
                    .replace(CURRENT_EMPLOYEE, 'Current User')}
                &quot;
            </span>
        </FilterItemWrapper>
    );
};
