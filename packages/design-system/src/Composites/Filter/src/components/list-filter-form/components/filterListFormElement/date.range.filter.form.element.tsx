import { useMemo } from "react";
import { DateRangeFilterPicker } from "../../../../../../../Components";
import { useListFormFilterContext } from "../../provider/list.form.filter.provider";


export const DateRangeFilterFormElement = ({ filter }) => {
    const { getValues, handleFilterData } = useListFormFilterContext();
    const date = useMemo(
        () => getValues(filter?.key),
        [filter?.key, getValues]
    );

    return (
        <div className='items-center flex-1 range-filter row-flex'>
            <DateRangeFilterPicker
                value={date}
                onChange={(data) => {
                    handleFilterData({ date: data });
                }}
                className='flex-1 h-[32px]'
                offsetY={1}
            />
        </div>
    );
};