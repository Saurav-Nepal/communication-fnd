import React from 'react';

import { Button, Icon } from '../../../../../../Components';
import { MonthSelectFilter } from './month.select.filter';

import { ChevronDownOutlineSvgIcon } from 'assets';

const ActionAbleMonthSelector = React.forwardRef((props: any, ref) => {
    const { filter, handleFilterData, value } = props;
    return (
        <MonthSelectFilter
            filter={filter}
            onChange={(option) => {
                handleFilterData({ [filter?.key]: option?.value });
            }}
            value={value ? Number(value) : null}
            className='min-w-[200px] h-[32px]'
        >
            <Button
                size='md'
                appearance='polaris-tertiary'
                title='Month'
                {...props}
                ref={ref}
            >
                Months{' '}
                <Icon source={ChevronDownOutlineSvgIcon} isSvg size={20} />
            </Button>
        </MonthSelectFilter>
    );
});

export default ActionAbleMonthSelector;
