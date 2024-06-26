import { IsEmptyArray, IsFunction } from '@finnoto/core';
import { Icon, SelectBox, SelectBoxOption } from '@finnoto/design-system';

import { UserCustomerSvgIcon } from 'assets';
import { ReactNode, useEffect, useState } from 'react';

interface selectFilterProps {
    active?: string | number;
    filters: SelectBoxOption[];
    icon?: string;
    onFilterChange?: (_: string | number) => void;
    children?: ReactNode;
}

const SelectFilter = ({
    active,
    filters = [],
    icon,
    onFilterChange,
    children,
}: selectFilterProps) => {
    const [filterBy, setFilterBy] = useState<string | number>();

    useEffect(() => {
        if (filterBy || IsEmptyArray(filters)) return;

        setFilterBy(filters[0].key);
    }, [active, filterBy, filters]);

    useEffect(() => {
        if (!active) return;

        setFilterBy(active);
    }, [active]);

    const handleFilterSelect = (key: string | number) => {
        setFilterBy(key);
        if (onFilterChange && IsFunction(onFilterChange)) onFilterChange(key);
    };

    return (
        <SelectBox
            className={'min-w-[150px] text-base-primary'}
            mainClassName='text-base-primary'
            labelClassName='text-base-primary'
            placeholder={'Select Filter'}
            value={filterBy || active}
            options={filters}
            size='sm'
            prefix={
                icon ? (
                    <Icon
                        source={icon ? icon : UserCustomerSvgIcon}
                        iconColor='text-base-primary'
                        size={26}
                    />
                ) : (
                    children
                )
            }
            onChange={(value) => handleFilterSelect(value.key)}
            defaultValue={active}
        />
    );
};
export default SelectFilter;
