'use client';

import { useState } from 'react';
import { useEffectOnce } from 'react-use';

import { FetchData, ParseToSelectBoxOption } from '@finnoto/core';

import { SelectBox } from './selectBox.component';

type selectBoxOptions = {
    label: string;
    value: string;
    otherOptions?: {
        subLabel: string;
    };
};

/**
 * Renders a searchable select box component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - The function to execute on change.
 * @param {*} props.value - The selected value.
 * @param {String} props.label - The label of the component.
 * @param {*} props.controller - The controller of the component.
 * @param {Object} [props.parseOptions] - The options to parse the select box data.
 * @param {String} [props.parseOptions.label='name'] - The label property of the select box options.
 * @param {String} [props.parseOptions.value='id'] - The value property of the select box options.
 * @param {Object} [props.parseOptions.otherOptions={subLabel: 'identifier'}] - Other options to parse the select box data.
 * @param {String} props.parseOptions.otherOptions.subLabel - The sub label property of the select box options.
 * @param {String} [props.error] - The error message to display.
 * @return {JSX.Element} The searchable select box component.
 *
 * @author @sirjandrn25
 */
export const SearchableSelectBox = ({
    onChange,
    value,
    error,
    label,
    controller,
    parseOptions,
}: {
    onChange: (value: any) => void;
    value: any;
    error?: string;
    label: string;
    controller: any;
    parseOptions?: selectBoxOptions;
}) => {
    const [data, setData] = useState<any>([]);
    const {
        label: selectLabel = 'name',
        value: selectValue = 'id',
        otherOptions = { subLabel: 'identifier' },
    } = parseOptions || {};

    const fetchList = async () => {
        const { success, response } = await FetchData({
            // TO-DO: handle placement for this component
            className: controller,
            method: 'list',
        });
        if (success) {
            setData(response?.records);
        }
    };

    useEffectOnce(() => {
        fetchList();
    });
    return !!data?.length ? (
        <SelectBox
            label={label}
            error={error}
            isSearchable
            value={value}
            options={ParseToSelectBoxOption(data, selectValue, selectLabel, {
                ...otherOptions,
            })}
            onChange={(option) => {
                onChange(option.value);
            }}
            menuPosition='absolute'
        />
    ) : (
        <></>
    );
};
