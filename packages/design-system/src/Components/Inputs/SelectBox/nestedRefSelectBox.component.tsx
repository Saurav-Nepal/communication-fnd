import { useEffectOnce, useList, useUpdateEffect } from 'react-use';

import {
    FetchData,
    IsEmptyArray,
    ObjectDto,
    ParseToSelectBoxOption,
} from '@finnoto/core';

import { Icon } from '../../Data-display/Icon/icon.component';
import { NestedRefSelectBoxProps } from './nestedRefSelectBox.types';
import { ReferenceSelectBox } from './referenceSelectBox.component';

import { DepartmentChildren, DepartmentParent } from 'assets';

/**
 * Renders a nested reference select box component.
 *
 * @param {NestedRefSelectBoxProps} value - The current selected value.
 * @param {string} label - The label for the select box.
 * @param {string} valueKey - The key used to access the value of each option.
 * @param {string} labelKey - The key used to access the label of each option.
 * @param {string} sublabelKey - The key used to access the sublabel of each option.
 * @param {string} method - The method name for finding the parent.
 * @param {string} childMethod - The method name for getting the children.
 * @param {string} parentMethod - The method name for getting the parents.
 * @param {string} initMethod - The method name for initializing the select box.
 * @param {function} onChange - The function called when the value changes.
 * @param {NestedRefSelectBoxProps} rest - Additional props for the select box.
 * @return {JSX.Element} - The rendered nested reference select box component.
 */
export const NestedRefSelectBox = ({
    value,
    label,
    valueKey = 'id',
    labelKey = 'name',
    sublabelKey = 'identifier',
    method = 'findParent',
    childMethod = 'getChilds',
    parentMethod = 'getParents',
    initMethod = 'show',
    onChange,
    autoFocus,
    autoSelectZeroth,
    isRequired,
    name,
    ...rest
}: NestedRefSelectBoxProps) => {
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
                sublabelPrefix: rest.sublabelPrefix,
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
        <div className='gap-1 nested-form-control col-flex'>
            <ReferenceSelectBox
                value={tempOptions[0]}
                onChange={(option, actionMeta) => {
                    onChange(option, actionMeta);

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
                    name,
                    label,
                    method,
                    valueKey,
                    labelKey,
                    sublabelKey,
                    autoFocus,
                    autoSelectZeroth,
                    isRequired,
                }}
                {...rest}
            />
            {tempOptions.map((parentOption, index) => {
                if (!parentOption.data?.attributes?.childs) return null;

                const newElementIndex = index + 1;

                return (
                    <ReferenceSelectBox
                        key={`${newElementIndex}-${parentOption.value}`}
                        value={tempOptions[newElementIndex]}
                        onChange={(option, actionMeta) => {
                            filter((_, fIdx) => fIdx <= newElementIndex);

                            if (!option?.value) {
                                onChange(parentOption, actionMeta);
                                return removeAt(newElementIndex);
                            }

                            onChange(option, actionMeta);

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
                            method: childMethod,
                            methodParams: parentOption.value,
                            valueKey,
                            labelKey,
                            sublabelKey,
                            name: `${name}__${newElementIndex}`,
                        }}
                        {...rest}
                    />
                );
            })}
        </div>
    );
};
