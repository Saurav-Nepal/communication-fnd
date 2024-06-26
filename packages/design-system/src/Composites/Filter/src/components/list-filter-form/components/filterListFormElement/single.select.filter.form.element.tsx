import { useMemo } from 'react';

import { IsUndefinedOrNull, LISTING_CONTROLLER_ROUTER } from '@finnoto/core';

import { ReferenceSelectBox, SelectBox } from '../../../../../../../Components';
import { useListFormFilterContext } from '../../provider/list.form.filter.provider';

export const SingleSelectFilterFormElement = ({ filter }: any) => {
    const { getValues, handleFilterData } = useListFormFilterContext();
    const value = getValues(filter?.key);
    const controller = useMemo(
        () => LISTING_CONTROLLER_ROUTER[filter?.controller_type],
        [filter?.controller_type]
    );
    if (!controller && filter?.options?.length)
        return (
            <SelectBox
                options={filter?.options}
                onChange={(option) => {
                    handleFilterData({
                        [filter?.key]: option?.value,
                    });
                }}
                label={filter?.name}
                value={!IsUndefinedOrNull(value) ? value : null}
                placeholder={`Select ${filter?.title} ...`}
                mainClassName='flex-1 single-select-filter '
                menuPosition='fixed'
                size='sm'
            />
        );
    return (
        <ReferenceSelectBox
            {...filter}
            className='w-full'
            label={filter?.name}
            value={!IsUndefinedOrNull(value) ? value : null}
            controller={controller}
            onChange={(option) => {
                handleFilterData({
                    [filter?.key]: option?.value,
                });
            }}
            size='sm'
            notHide
            mainClassName='flex-1  single-select-filter '
            menuPosition='fixed'
            placeholder={`Select ${filter?.title} ...`}
        />
    );
};
