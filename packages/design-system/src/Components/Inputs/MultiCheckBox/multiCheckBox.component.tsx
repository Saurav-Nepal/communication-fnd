import { useList, useUpdateEffect } from 'react-use';
import { cn } from '../../../Utils/common.ui.utils';
import { CheckBox } from '../CheckBox/checkBox.component';
import { MultiCheckBoxInterface } from './multiCheckBox.types';
import { EmptyFunction } from '@finnoto/core';

export const MultiCheckBox = ({
    className,
    selected,
    options = [],
    onChange = EmptyFunction,
    checkBoxClassName,
}: MultiCheckBoxInterface) => {
    const [list, { push, removeAt, set }] = useList(selected || []);

    useUpdateEffect(() => {
        set(selected);
    }, [selected]);
    return (
        <div className={cn('row-flex gap-4 flex-wrap', className)}>
            {options.map((el, index) => {
                return (
                    <CheckBox
                        {...el}
                        className={checkBoxClassName}
                        key={el?.key}
                        checked={list.includes(el?.key)}
                        onChange={(isCheck) => {
                            if (isCheck) {
                                push(el?.key);
                                onChange([...list, el?.key]);
                            } else {
                                removeAt(index);
                                onChange(list.filter((val) => val !== el?.key));
                            }
                        }}
                    />
                );
            })}
        </div>
    );
};
