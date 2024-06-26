import { useEffectOnce, useList, useUpdateEffect } from 'react-use';

import {
    FetchData,
    IsEmptyArray,
    ObjectDto,
    ParseToSelectBoxOption,
} from '@finnoto/core';

import { Icon } from '../../Components';
import {
    ListSelectInput,
    ListSelectInputProps,
} from './listSelectInput.component';

import { DepartmentChildren, DepartmentParent } from 'assets';

export interface NestedListSelectInputProps
    extends Omit<ListSelectInputProps, 'prefixItem' | 'isMulti'> {
    childMethod?: string;
    parentMethod?: string;
}

export const NestedListSelectInput = ({
    value,
    label,
    name,
    placeholder,
    valueKey = 'id',
    labelKey = 'name',
    sublabelKey,
    method = 'findParent',
    childMethod = 'getChilds',
    parentMethod = 'getParents',
    initMethod = 'show',
    onSelect,
    ...rest
}: NestedListSelectInputProps) => {
    const [
        tempOptions,
        { set, push, updateAt, removeAt, filter, clear: clearList },
    ] = useList<ObjectDto>([]);

    // ----- Functions -----

    /**
     * Retrieves the parent options asynchronously.
     *
     * @return {Promise<void>} A promise that resolves once the parent options are retrieved.
     */
    const getParentOptions = async () => {
        if (!value) return;

        const { success: parentSuccess, response: parentResponse } =
            await FetchData({
                className: rest.controller,
                method: parentMethod,
                methodParams: value,
            });

        if (!parentSuccess) return;

        const newOptions = ParseToSelectBoxOption(
            parentResponse,
            valueKey,
            labelKey,
            {
                subLabel: sublabelKey,
            }
        ).reverse();

        set(newOptions);
    };

    // ----- Use Effects -----

    useEffectOnce(() => {
        if (!IsEmptyArray(tempOptions)) return;

        getParentOptions();
    });

    useUpdateEffect(() => {
        if (!value) return clearList();
        if (!IsEmptyArray(tempOptions)) {
            const option = tempOptions[tempOptions.length - 1];
            if (option?.value === value) return;
        }
        getParentOptions();
    }, [value]);

    return (
        <div className='gap-1 col-flex'>
            <ListSelectInput
                value={tempOptions[0]?.value}
                onSelect={(option) => {
                    onSelect(option);

                    clearList();
                    if (!option?.value) return;
                    push(option);
                }}
                prefixItem={() => (
                    <Icon
                        source={DepartmentParent}
                        className='pr-2'
                        size={18}
                        isSvg
                    />
                )}
                {...{
                    label,
                    placeholder,
                    name,
                    method,
                    valueKey,
                    labelKey,
                    sublabelKey,
                }}
                {...rest}
            />
            {tempOptions.map((parentOption, index) => {
                if (!parentOption.data?.attributes?.childs) return null;

                const newElementIndex = index + 1;

                return (
                    <ListSelectInput
                        key={`${newElementIndex}-${parentOption.value}`}
                        value={tempOptions[newElementIndex]?.value}
                        onSelect={(option) => {
                            filter((_, fIdx) => fIdx <= newElementIndex);

                            if (!option?.value) {
                                onSelect(parentOption as any);
                                return removeAt(newElementIndex);
                            }

                            onSelect(option);

                            if (tempOptions[newElementIndex]?.value)
                                return updateAt(newElementIndex, option);
                            push(option);
                        }}
                        prefixItem={() => (
                            <Icon
                                source={DepartmentChildren}
                                className='pr-2'
                                size={18}
                                isSvg
                            />
                        )}
                        {...{
                            label: label ? `Child ${label}` : undefined,
                            name: name
                                ? `Child ${name} ${newElementIndex}`
                                : `Child ${label} ${newElementIndex}`,
                            method: childMethod,
                            methodParams: parentOption.value,
                            valueKey,
                            labelKey,
                            sublabelKey,
                        }}
                        {...rest}
                    />
                );
            })}
        </div>
    );
};
