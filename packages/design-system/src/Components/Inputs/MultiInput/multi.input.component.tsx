'use client';

import React, { KeyboardEventHandler, useEffect } from 'react';
import { components, ControlProps, Theme } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Toast } from '../../../Utils';
import {
    cn,
    GetObjectProperty,
    IsEmptyArray,
    IsFunction,
    IsUndefined,
} from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { SelectBoxOption } from '../SelectBox/selectBox.types';
import { MultiInputProps } from './multi.input.types';

import { DeleteSvgIcon } from 'assets';

/**
 * Renders a MultiInput component with an optional label, error, warning, and message.
 *
 * @param {MultiInputProps} label - The label for the MultiInput component.
 * @param {string} labelClassName - The class name for the label.
 * @param {string} mainClassName - The class name for the MultiInput component.
 * @param {string} error - The error message to display.
 * @param {string} warning - The warning message to display.
 * @param {boolean} isRequired - Indicates if the MultiInput component is required.
 * @param {string} message - The message to display.
 * @param {ReactNode} messageComponent - The message component to display.
 * @return {JSX.Element} The MultiInput component.
 *
 * @author @rumeshudash
 */
export const MultiInput = ({
    label,
    labelClassName,
    mainClassName,
    error,
    warning,
    isRequired,
    message,
    messageComponent,
    ...rest
}: MultiInputProps) => {
    const containerClass = cn({ error, warning });

    if (label) {
        return (
            <div className={cn(`form-control `, mainClassName, containerClass)}>
                <label
                    className={`label label-text-alt text-base-primary pb-2 font-medium ${labelClassName} ${
                        !!error && '!text-error'
                    }`}
                >
                    <span>
                        {label}{' '}
                        {isRequired && <span className='text-error'>*</span>}
                    </span>
                </label>
                <MultiInputRender {...rest} {...{ error, label }} />
                {error && (
                    <div className={`label label-text-alt text-error`}>
                        {error}
                    </div>
                )}
                {warning && (
                    <div className={`label label-text-alt text-warning`}>
                        {warning}
                    </div>
                )}
                {message && !error && (
                    <div className={`label label-text-alt text-base-secondary`}>
                        {message}
                    </div>
                )}
                {messageComponent && <div>{messageComponent}</div>}
            </div>
        );
    }

    return (
        <div className={`form-control ${containerClass} ${mainClassName}`}>
            <MultiInputRender {...rest} {...{ error, label }} />
            {error && (
                <div className={`text-error text-sm font-normal pt-1 `}>
                    {error}
                </div>
            )}
            {warning && (
                <div className={`text-warning text-sm font-normal pt-1 `}>
                    {warning}
                </div>
            )}
            {messageComponent && <div>{messageComponent}</div>}
        </div>
    );
};

const MultiInputRender = ({
    value: propValue,
    defaultValue: propDefaultValue,
    size,
    label = 'Value',
    placeholder = 'Type email and press enter...',
    isRequired,
    isDisabled,
    noBorder,
    hasPrefix,
    error,
    width,
    displayInside = true,
    onChange,
    validate = () => true,
    disabled,
    ...rest
}: MultiInputProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState<SelectBoxOption[]>(
        getValue(propValue || propDefaultValue) || []
    );

    useEffect(() => {
        if (!IsUndefined(propValue)) {
            setValue(getValue(propValue));
        }
    }, [propValue]);

    const getHeight = () => {
        if (size === 'sm') return '32px';
        if (size === 'normal') return '28px';
        if (size === 'lg') return '48px';
        return '40px';
    };
    const getIndicatorPadding = () => {
        if (size === 'sm') return '2px';
        return '8px';
    };
    const getOptionPadding = () => {
        if (size === 'sm') return '6px 10px';
        return '12px 16px';
    };

    const styles = {
        container: (base) => ({
            ...base,
            width,
            outline: 0,
        }),
        control: (base) => ({
            ...base,
            width: '100%',
            minHeight: getHeight(),
            borderWidth: noBorder ? 0 : 1,
            borderTopLeftRadius: hasPrefix ? 0 : 4,
            borderBottomLeftRadius: hasPrefix ? 0 : 4,
            borderColor: error ? 'hsl(var(--er))' : 'hsla(var(--bc) / 0.2)',
            ':hover': {
                borderColor: 'rgba(16, 24, 40, 1)',
            },
            ':focus': {
                borderColor: 'rgba(16, 24, 40, 1)',
                color: 'rgba(16, 24, 40, 1)',
            },
            boxShadow: 'none',
            borderRadius: 4,
        }),
        valueContainer: (base) => ({
            ...base,
            maxHeight: '100%',
        }),
        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
        }),
        singleValue: (base) => ({
            ...base,
            color: 'var(--text-base-primary)',
        }),
        clearIndicator: (base) => ({
            ...base,
            padding: getIndicatorPadding(),
        }),
        option: (base) => ({
            ...base,
            padding: getOptionPadding(),
            // marginBottom: 8, Removed due to extra padding in bottom
        }),
    };

    const theme = (theme: Theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
            ...theme.colors,
        },
    });

    const handleDelete = (index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        handleChange(newValue);
    };

    const handleChange = (newValue: any[]) => {
        if (IsFunction(onChange)) {
            onChange(parseValue(newValue));
        } else {
            setValue(newValue);
        }
    };

    const handleKeyDown: KeyboardEventHandler = (evt) => {
        if (!inputValue) return;

        switch (evt.key) {
            case 'Enter':
            case 'Tab':
                evt.preventDefault();
                const error = validate(inputValue);

                if (error !== true) {
                    // TODO: i don't clear input value
                    return Toast.error({ description: error });
                }

                const alreadyExists = value.some(
                    (val) => val.label === inputValue
                );
                if (alreadyExists) {
                    setInputValue('');
                    return;
                }

                const newValue = [...value, createOption(inputValue)];
                handleChange(newValue);
                setInputValue('');
        }
    };

    return (
        <>
            <CreatableSelect
                value={displayInside ? value : []}
                components={{
                    DropdownIndicator: null,
                    Control,
                }}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                className={cn('text-sm selectbox-container')}
                styles={styles}
                theme={theme}
                onChange={(newValue: any[]) => {
                    if (displayInside) handleChange(newValue);
                }}
                isDisabled={disabled || isDisabled}
                onInputChange={setInputValue}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                {...rest}
                onBlur={() => {
                    // after submit it push the valid value
                    if (validate(inputValue) === true)
                        handleChange([...value, createOption(inputValue)]);
                }}
            />
            {!displayInside && !IsEmptyArray(value) && (
                <div className='gap-2 pt-2 col-flex'>
                    {value.map((option, idx) => (
                        <div
                            key={option.value}
                            className='items-center justify-between gap-4 p-1 px-2 text-sm border rounded bg-base-200 group row-flex'
                        >
                            <span>{option.label}</span>
                            <span
                                className='p-[3px] transition-all rounded cursor-pointer row-flex group-hover:text-error hover:bg-error/10'
                                onClick={() => handleDelete(idx)}
                            >
                                <Icon source={DeleteSvgIcon} isSvg size={13} />
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

const createOption = (label: string) => ({
    label,
    value: label,
});

const getValue = (value: any): SelectBoxOption[] => {
    if (!value) return [];

    if (Array.isArray(value)) {
        return value.map((val) => {
            if (typeof val !== 'object') {
                return createOption(val);
            }
            return val;
        });
    }

    if (typeof value === 'object') {
        if (GetObjectProperty(value, 'label')) return [createOption(value)];
        return [];
    }

    return [createOption(value)];
};

const parseValue = (value: SelectBoxOption[]) => {
    const returnValue = value.map((val) => val.value);

    if (IsEmptyArray(returnValue)) return [];
    return returnValue;
};

const Control = ({ children, ...props }: ControlProps): any => {
    // @ts-ignore
    const { prefix, isDisabled } = props.selectProps;

    return (
        <components.Control
            className={`${cn('selectbox-control', {
                // '!bg-base-100 !text-base-primary': !isDisabled,
                '!bg-base-200 !text-base-secondary': isDisabled,
            })} `}
            {...props}
        >
            {prefix ? <span className='pl-2'>{prefix}</span> : null}
            {children}
        </components.Control>
    );
};
