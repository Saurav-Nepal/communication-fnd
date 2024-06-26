import { useCallback, useMemo } from 'react';

import { ParseToSelectBoxOption } from '@finnoto/core';

import { MultiSelectFilter } from '../../../../../../../Components';
import { useListFormFilterContext } from '../../provider/list.form.filter.provider';

export const GroupCheckBoxFilterFormElement = ({ filter }: any) => {
    const { groups = [] } = filter || {};
    const { getValues, handleFilterData } = useListFormFilterContext();
    const sanitize_options = useMemo(() => {
        return groups.map((el) => ({
            ...el,
            rightLabel: el?.name,
        }));
    }, [groups]);

    const selected = useMemo(() => {
        if (filter?.parentKey) {
            const values = getValues(filter?.parentKey);
            return Object.keys(values);
        }
        const values = [];
        groups.forEach((group) => {
            if (getValues(group.key)) {
                values.push(group?.key);
            }
        });
        return values;
    }, [filter?.parentKey, getValues, groups]);
    const handleChangeValues = useCallback(
        (selected_values) => {
            const sanitized_data = groups.reduce((acc, group) => {
                const isChecked = selected_values.includes(group?.key);
                return {
                    ...acc,
                    [group?.key]: isChecked ? group?.value || true : undefined,
                };
            }, {});

            if (filter?.parentKey) {
                handleFilterData({ [filter.parentKey]: sanitized_data });
                return;
            }
            handleFilterData(sanitized_data);
        },
        [filter.parentKey, groups, handleFilterData]
    );

    return (
        <MultiSelectFilter
            labelClassName={'text-sm w-full h-[32px]  '}
            isSearchable={false}
            value={selected}
            selectedSuffix='Selected'
            onChangeFilter={(data) => {
                handleChangeValues(data);
            }}
            {...filter}
            options={ParseToSelectBoxOption(filter?.groups, 'key', 'name')}
            placeholder={`Select ${filter?.title} ...`}
        />
    );
};
