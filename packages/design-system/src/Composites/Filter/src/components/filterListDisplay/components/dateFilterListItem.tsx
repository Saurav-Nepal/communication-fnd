import { FormatDisplayDate } from '@finnoto/core';

import { FilterItemWrapper } from './filterItem.wrapper';

export const DateFilterListItem = ({
    name,
    title,
    data,
    removeFilterData,
    isClearable,
    className,
    showTime,
}: any) => {
    if (!data) return <></>;
    return (
        <FilterItemWrapper
            className={className}
            isClearable={isClearable}
            onClick={() => {
                if (isClearable === false) return;
                removeFilterData();
            }}
        >
            <span>
                {name || title} {'> '}
            </span>{' '}
            {FormatDisplayDate(data, showTime)}
        </FilterItemWrapper>
    );
};
