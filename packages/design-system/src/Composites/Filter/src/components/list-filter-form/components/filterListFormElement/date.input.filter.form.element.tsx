import { APIDateFormat, GetDateValue } from '@finnoto/core';

import { MaskedDatePickerInput } from '../../../../../../../Components';
import { DateInputFilterProps } from '../../list.form.filter.types';
import { useListFormFilterContext } from '../../provider/list.form.filter.provider';

//@todo i will implement group feature
export const DateInputFilterFormElement = ({
    filter,
}: {
    filter: DateInputFilterProps;
}) => {
    const { getValues, handleFilterData } = useListFormFilterContext();
    const value = getValues(filter?.key);

    return (
        <MaskedDatePickerInput
            value={value ? GetDateValue(value) : undefined}
            inputAddOnClassName={'w-full'}
            className='flex-1 single-date-filter'
            hideClear
            onChange={(value) => {
                handleFilterData({
                    [filter?.key]: value
                        ? APIDateFormat({ date: value })
                        : undefined,
                });
            }}
        />
    );
};
