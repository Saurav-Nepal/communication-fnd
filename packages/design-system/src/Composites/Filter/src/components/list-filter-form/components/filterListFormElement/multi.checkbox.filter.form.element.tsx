import { MultiSelectFilter } from "../../../../../../../Components";
import { useListFormFilterContext } from "../../provider/list.form.filter.provider";


export const MultiCheckBoxFilterFormElement = ({ filter }: any) => {
    const { handleFilterData, getValues } = useListFormFilterContext();
    const value = getValues(filter?.key);
    return (
        <MultiSelectFilter
            labelClassName={'text-sm w-full h-[32px] '}
            isSearchable={false}
            value={value}
            selectedSuffix='Selected'
            onChangeFilter={(data) => {
                handleFilterData({
                    [filter?.key]: data,
                });
            }}
            {...filter}
            placeholder={`Select ${filter?.title} ...`}
        />
    );
};