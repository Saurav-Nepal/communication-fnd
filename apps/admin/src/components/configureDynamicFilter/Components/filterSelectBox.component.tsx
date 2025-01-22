import React, { useCallback } from 'react';
import ReactSelect, {
    ActionMeta,
    GroupBase,
    StylesConfig,
    Theme,
} from 'react-select';

import { getObjectFromArrayByValue } from '@slabs/ds-utils';

interface SelectBoxProps {
    label?: React.ReactNode | string;
    value?: any;
    valueKey?: string;
    placeholder?: string;
    width?: string;
    minWidth?: string;
    options?: any;
    className?: string;
    mainClassName?: string;
    labelClassName?: string;
    prefix?: React.ReactNode | string;
    isSearchable?: boolean;
    isClearable?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    menuPosition?: 'fixed' | 'absolute';
    onChange?(option: any, actionMeta: ActionMeta<SelectBoxOption>): void;
}

export type GroupedOption = {
    label: string;
    options: SelectBoxOption[];
};

export type SelectBoxOption = {
    value: string | number;
    label: string;
    isDisabled?: boolean;
    isFixed?: boolean;
    [key: string]: any;
};

const FilterSelectBox = ({
    className,
    value,
    valueKey = 'value',
    options,
    width,
    minWidth,
    size,
    menuPosition = 'fixed',
    onChange,
    isSearchable = false,
    ...rest
}: SelectBoxProps) => {
    const getHeight = () => {
        if (size === 'xs') return '24px';
        if (size === 'sm') return '32px';
        if (size === 'lg') return '48px';
        return '40px';
    };
    const getIndicatorPadding = () => {
        if (size === 'sm') return '2px';
        return '8px';
    };
    const getOptionPadding = () => {
        if (size === 'sm') return '6px 10px';
        return '8px 12px';
    };

    const styles: StylesConfig<
        SelectBoxOption,
        boolean,
        GroupBase<SelectBoxOption>
    > = {
        container: (base) => ({
            ...base,
            width,
            minWidth,
            fontSize: '0.875rem',
            outline: 0,
        }),
        control: (base) => ({
            ...base,
            width: '100%',
            minHeight: getHeight(),
            height: getHeight(),
            borderColor: '#DEE1E5',
            ':hover': {
                borderColor: `rgb(102,174,232)`,
                boxShadow: `0 2px 4px 1px rgba(102,174,232,0.2)`,
            },
            ':focus-within': {
                borderColor: `rgb(102,174,232)`,
                // borderWidth: '2px',
            },
        }),
        valueContainer: (base) => ({ ...base, maxHeight: '100%' }),
        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
        }),
        groupHeading: (base) => ({
            ...base,
            wordBreak: 'break-all',
            fontSize: '10px',
            lineHeight: 1.2,
        }),
        indicatorSeparator: (base) =>
            !isSearchable
                ? {}
                : {
                      ...base,
                      backgroundColor: '#cccccc',
                  },
        dropdownIndicator: (base) => ({
            ...base,
            padding: getIndicatorPadding(),
            color: '#cccccc',
        }),
        menu: (base, state) => {
            return {
                ...base,
                marginBottom: '4px',
                marginTop: '4px',
                overflow: 'hidden',
            };
        },
        menuPortal: (base) => ({ ...base, zIndex: 99999999 }),
        option: (base) => ({
            ...base,
            padding: getOptionPadding(),
        }),
    };

    const theme = (theme: Theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
            ...theme.colors,
        },
    });

    const getValue = useCallback(
        (value: any) => {
            if (!value || !options) return undefined;

            return (options as any).reduce((acc: any, curr: any) => {
                if (!acc) {
                    if (!curr.options && curr.value === value) return curr;
                    const option = getObjectFromArrayByValue(
                        curr.options || [],
                        valueKey,
                        value
                    );
                    if (option) return option;
                    return undefined;
                }
                return acc;
            }, undefined);
        },
        [value, valueKey, options]
    );

    return (
        <ReactSelect
            value={getValue(value)}
            options={options}
            styles={styles}
            onChange={onChange}
            theme={theme}
            menuPlacement='auto'
            menuPosition={menuPosition}
            openMenuOnFocus
            isSearchable={isSearchable}
            {...rest}
        />
    );
};

export default FilterSelectBox;

export const ParseToSelectBoxOption = (
    data: any[],
    value: string,
    label?: string,
    disabled?: string,
    extra = (_: any) => {
        return {};
    }
) => {
    if (data && data.length > 0) {
        return data.map((item) => ({
            value: item[value],
            label: label ? item[label] : item.label || item[value],
            isDisabled: (disabled ? item[disabled] : item.isDisabled) || false,
            ...extra(item),
            data: item,
        }));
    }
    return [];
};
