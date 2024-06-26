import { MultiSelectFilter } from '../../../../../../../Components';
import { useListFormFilterContext } from '../../provider/list.form.filter.provider';

export const MultiSelectFilterFormElement = ({ filter }: any) => {
    const { handleFilterData, getValues } = useListFormFilterContext();
    const value = getValues(filter?.key);

    return (
        <MultiSelectFilter
            labelClassName={'text-sm w-full h-[32px]'}
            value={value}
            onChangeFilter={(data) => {
                handleFilterData({
                    [filter?.key]: data,
                });
            }}
            selectedSuffix='Selected'
            {...filter}
            placeholder={`Select ${filter?.title} ...`}
        />
    );
};
