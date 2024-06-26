import {
    IsEmptyArray,
    IsFunction,
    Navigation,
    useFetchParams,
} from '@finnoto/core';
import { Icon } from '@finnoto/design-system';
import { DocumentSvgIcon } from 'assets';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import { ChatBasicFilterButtonProps } from './chat.types';

/**
 *
 * This is the filter component, It takes an filter options as an arrray of object and returns you an key on onFilterChange params
 *
 * @param active string
 * @param filters BasicFilterItem[]
 * @param onFilterChange () => void
 * @returns string
 */

export const ChatBasicFilterButton = ({
    active,
    filters,
    size = 'md',
    onFilterChange,
    disableNav = false,
    queryKey = 'basicfilter',
}: ChatBasicFilterButtonProps) => {
    const { queryString, ...queries } = useFetchParams();
    const { [queryKey]: selectQuery } = (queries as any) || {};

    const { asPath } = useRouter();

    const [filterBy, setFilterBy] = useState<string | number>();

    useEffectOnce(() => {
        setFilterBy(selectQuery || active || filters[0].key);

        if (!selectQuery) return;
        if (onFilterChange && IsFunction(onFilterChange))
            onFilterChange(selectQuery);
    });

    useUpdateEffect(() => {
        if (!active && !selectQuery) return setFilterBy(filters[0].key);

        setFilterBy(selectQuery || active);
        if (onFilterChange && IsFunction(onFilterChange))
            onFilterChange(selectQuery || active);
    }, [active, selectQuery]);

    const handleFilterSelect = (key: string | number) => {
        setFilterBy(key);
        if (onFilterChange && IsFunction(onFilterChange)) onFilterChange(key);

        if (disableNav) return;

        Navigation.navigate({
            url: asPath.split('?')[0],
            queryParam: {
                ...queryString,
                [queryKey]: key,
            },
        });
    };

    const inactiveClass = '';
    const activeClass = 'border-primary  text-primary tab-bordered';
    return (
        <div className='gap-2 px-2 row-flex'>
            {!IsEmptyArray(filters) &&
                filters.map((filter) => (
                    <div
                        key={filter.key}
                        className='tabs'
                        onClick={() => handleFilterSelect(filter.key)}
                    >
                        <a
                            className={`flex items-center gap-2 pb-3 tab  text-base-secondary hover:text-primary hover:border-primary ${
                                filterBy === filter.key
                                    ? activeClass
                                    : inactiveClass
                            } `}
                        >
                            <Icon
                                className='text-current'
                                source={filter.icon || DocumentSvgIcon}
                                size={20}
                                isSvg
                            />{' '}
                            <span>{filter.label}</span>
                        </a>
                    </div>
                ))}
        </div>
    );
};
