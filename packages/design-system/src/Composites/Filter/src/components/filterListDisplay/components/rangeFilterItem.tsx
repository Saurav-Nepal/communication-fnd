import { Capitalize, IsFunction } from '@finnoto/core';

import { Icon } from '../../../../../../Components';
import { cn } from '../../../../../../Utils/common.ui.utils';
import { FilterItemWrapper } from './filterItem.wrapper';

import { CrossSvgIcon } from 'assets';

export const RangeFilterItem = ({
    title,
    min,
    max,
    removeFilterData,
    renderFilter,
    isClearable,
    className,
}: any) => {
    const handleRemoveFilter = () => removeFilterData('date');
    if (IsFunction(renderFilter))
        return <>{renderFilter({ min, max }, handleRemoveFilter)}</>;
    return (
        <FilterItemWrapper className={cn('gap-1', className)}>
            <span className='capitalize'>
                {Capitalize(title)} {'> '}
            </span>
            <span>{min}</span> to <span className='pr-2'>{max}</span>
            {isClearable && (
                <Icon
                    className='cursor-pointer'
                    source={CrossSvgIcon}
                    isSvg
                    size={10}
                    iconColor='text-current'
                    onClick={() => removeFilterData(`date`)}
                />
            )}
        </FilterItemWrapper>
    );
};
