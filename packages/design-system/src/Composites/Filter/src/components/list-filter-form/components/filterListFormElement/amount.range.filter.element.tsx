import { ObjectDto } from "@finnoto/core";
import { IndianRupee } from "lucide-react";
import { useCallback, useMemo } from "react";
import { InputField } from "../../../../../../../Components";
import { useListFormFilterContext } from "../../provider/list.form.filter.provider";


export const AmountRangeFilterFormElement = ({ filter }: any) => {
    const { getValues, handleFilterData } = useListFormFilterContext();

    const value: ObjectDto = useMemo(() => {
        return getValues(filter?.key)?.range;
    }, [filter?.key, getValues]);

    const handleChange = useCallback(
        (key: string, amount: number) => {
            const data = {
                ...value,
                [key]: amount,
            };

            handleFilterData({
                [filter?.key]: {
                    range: data,
                },
            });
        },
        [filter?.key, handleFilterData, value]
    );
    return (
        <div className='items-center w-full range-filter row-flex'>
            <InputField
                addonStart={<IndianRupee size={18} />}
                type='number'
                isAmount
                placeholder={'Min Amount'}
                onChange={(amt) => handleChange('min', amt)}
                value={value?.min || 0}
                className='flex-1 range-filter-input range-filter'
                groupClassName={' min-w-[100px]'}
                inputClassName='border-r-0 rounded-r-none'
            />

            <InputField
                addonStart={<IndianRupee size={18} />}
                type='number'
                className='flex-1 '
                isAmount
                placeholder={'Max Amount'}
                onChange={(amt) => handleChange('max', amt)}
                value={value?.max || 0}
                groupClassName={' min-w-[100px]'}
            />
        </div>
    );
};