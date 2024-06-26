'use client';

import { forwardRef, useMemo } from 'react';
import Select, {
    components,
    ControlProps,
    OptionProps,
    Theme,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

import {
    EmptyFunction,
    GetObjectFromArray,
    GetObjectProperty,
    IsArray,
    IsEmptyArray,
    IsFunction,
    isGroupedOptions,
    IsUndefinedOrNull,
    useApp,
} from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Button } from '../Button/button.component';
import { FormControl } from '../InputField/formControl.component';
import { inputContainerVariants } from '../InputField/input.types';
import {
    InputErrorMessage,
    InputMessage,
} from '../InputField/inputMessage.component';
import { Label } from '../InputField/label.component';
import { SelectBoxOption, SelectBoxProps } from './selectBox.types';

/**
 * Renders a select box input with an optional label, error and warning messages.
 *
 * @param {Object} props - The props object.
 * @param {string} props.label - The label text to display.
 * @param {string} props.defaultLabel - The default label text to display.
 * @param {string} [props.labelClassName=''] - The class name to apply to the label element.
 * @param {string} [props.mainClassName=''] - The class name to apply to the main container element.
 * @param {boolean} [props.translate=true] - Whether to translate the label text.
 * @param {string} props.error - The error message to display.
 * @param {string} props.warning - The warning message to display.
 * @param {boolean} [props.isRequired] - Whether the input is required.
 * @param {string} props.message - The additional message to display.
 * @param {ReactNode} props.messageComponent - The additional message component to display.
 * @return {JSX.Element} The rendered select box input.
 *
 * @author Rumesh Udash
 */
export const SelectBox = forwardRef(
    (
        {
            label,
            defaultLabel,
            labelClassName = '',
            mainClassName = '',
            translate = true,
            size = 'md',
            error,
            warning,
            isRequired,
            message,
            messageComponent,
            containerClassName,
            ...rest
        }: SelectBoxProps,
        ref
    ) => {
        const containerClass = cn(
            inputContainerVariants({
                containerSize: size,
                disabled: rest.isDisabled,
            }),
            error,
            warning,
            containerClassName
        );

        if (label) {
            return (
                <FormControl
                    {...{
                        className: cn(mainClassName, {
                            'valid-input': rest.value,
                        }),
                        containerClass,
                    }}
                >
                    <Label
                        {...{
                            label,
                            error,
                            required: isRequired,
                        }}
                    />
                    <SelectInput
                        {...rest}
                        size={size}
                        error={error}
                        warning={warning}
                        ref={ref}
                    />
                    <InputErrorMessage {...{ error, warning }} />
                    <InputMessage {...{ message, messageComponent, error }} />
                </FormControl>
            );
        }

        return (
            <div
                className={cn(`form-control `, containerClass, mainClassName, {
                    'valid-input': rest.value,
                })}
            >
                <SelectInput
                    {...rest}
                    size={size}
                    error={error}
                    warning={warning}
                    ref={ref}
                />
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
    }
);

const SelectInput = forwardRef(
    (
        {
            className,
            value: propValue,
            defaultValue: propDefaultValue,
            options: propOptions,
            width,
            footer,
            size,
            error,
            warning,
            menuPosition = 'fixed',
            menuPlacement = 'auto',
            onChange,
            footerClick = () => {},
            isSearchable = false,
            noBorder,
            hasPrefix,
            isAsync,
            isAsyncCreatable = false,
            getOptions,
            onOptionChangeOnly = EmptyFunction,
            ...rest
        }: SelectBoxProps,
        ref: any
    ) => {
        const { isArc } = useApp();

        const getHeight = () => {
            if (size === 'normal') return '28px';
            if (size === 'sm') return '32px';
            if (size === 'lg') return '40px';
            return '40px';
        };
        const getIndicatorPadding = () => {
            if (size === 'sm') return '2px';
            if (size === 'normal') return '1px';
            return '8px';
        };
        const getOptionPadding = () => {
            if (size === 'normal') return '6px 8px';
            if (size === 'sm') return '6px 8px';
            return '12px 10px';
        };

        const styles = {
            container: (base) => ({
                ...base,
                width: width,
                outline: 0,
            }),
            control: (base) => ({
                ...base,
                width: '100%',
                minHeight: getHeight(),
                height: rest.isMulti ? 'auto' : getHeight(),
                borderWidth: noBorder ? 0 : 1,
                borderTopLeftRadius: hasPrefix ? 0 : 4,
                borderBottomLeftRadius: hasPrefix ? 0 : 4,
                borderColor: error
                    ? 'hsl(var(--er))'
                    : 'var(--border-light-primary)',
                ':hover': {
                    borderColor: 'var(--border-dark-hover)',
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
                padding: '4px 8px',
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
            indicatorSeparator: (base) =>
                !isSearchable && !isAsync ? {} : { ...base },
            dropdownIndicator: (base) => ({
                ...base,
                padding: getIndicatorPadding(),
            }),
            clearIndicator: (base) => ({
                ...base,
                padding: getIndicatorPadding(),
            }),
            indicatorsContainer: (base) => ({
                ...base,
                color: '#ffffff',
            }),
            menu: (base, state) => {
                return {
                    ...base,
                    marginBottom:
                        footer && state.placement === 'bottom' ? '60px' : '4px',
                    padding: '8px',
                    overflow: 'hidden',
                };
            },
            menuPortal: (base) => ({
                ...base,
                zIndex: 99999999,
            }),
            group: (base) => ({
                ...base,
                paddingTop: '0',
            }),
            groupHeading: (base) => ({
                ...base,
                paddingLeft: '6px',
            }),
            option: (base) => ({
                ...base,
                padding: getOptionPadding(),
                // marginBottom: 8, Removed due to extra padding in bottom
            }),
            menuList: (base) => ({
                ...base,
                padding: 0,
                borderRadius: '4px',
            }),
        };

        const theme = (theme: Theme) => ({
            ...theme,
            borderRadius: 4,
            colors: {
                ...theme.colors,
            },
        });

        const options = useMemo(
            () =>
                ((propOptions as SelectBoxOption[]) || []).filter(
                    (option) => option?.isVisible !== false
                ),
            [propOptions]
        );
        const allOptions = useMemo(() => {
            if (!rest?.enableAllOptions) return [];
            return [
                {
                    label: rest?.allOptionText || 'All',
                    value: 'all',
                },
            ];
        }, [rest?.allOptionText, rest?.enableAllOptions]);
        const value = useMemo(() => {
            if (IsUndefinedOrNull(propValue)) {
                if (rest?.enableAllOptions) {
                    if (isAsync) return allOptions[0];
                    return 'all';
                }
                return propValue;
            }

            if (IsArray(propValue)) {
                if (isGroupedOptions(options))
                    return propValue.map((value) => {
                        let option = null;

                        for (let opt in options) {
                            option = GetObjectFromArray(
                                options[opt].options || [],
                                'value',
                                value
                            );
                            if (option) break;
                        }

                        return option;
                    });

                return propValue.map((value) =>
                    GetObjectFromArray(
                        options || [],
                        'value',
                        typeof options[0]?.value === 'number'
                            ? Number(value)
                            : value
                    )
                );
            }

            if (typeof propValue === 'object') {
                if (GetObjectProperty(propValue, 'label')) return propValue;
                return '';
            }

            if (!IsEmptyArray(options)) {
                if (isGroupedOptions(options)) {
                    let option = null;

                    for (let opt in options) {
                        option = GetObjectFromArray(
                            options[opt].options || [],
                            'value',
                            propValue
                        );
                        if (option) break;
                    }

                    return option;
                }
                return GetObjectFromArray(options || [], 'value', propValue);
            }

            return {
                label: propValue + '',
            };
        }, [propValue, options, rest?.enableAllOptions, isAsync, allOptions]);
        const defaultValue = useMemo(() => {
            if (IsUndefinedOrNull(propDefaultValue)) return propDefaultValue;
            if (typeof propDefaultValue === 'object') {
                if (GetObjectProperty(propDefaultValue, 'label'))
                    return propDefaultValue;
                return '';
            }

            if (!IsEmptyArray(options))
                return GetObjectFromArray(
                    options || [],
                    'value',
                    propDefaultValue
                );

            return {
                label: propDefaultValue + '',
            };
        }, [propDefaultValue, options]);

        const sanitizedOptions = useMemo(
            () => [...allOptions, ...options],
            [allOptions, options]
        );

        const asyncOptions = {
            value,
            defaultValue,
            defaultOptions: sanitizedOptions,
            loadOptions: getOptions,
            className: cn(
                'selectbox-container',
                {
                    'text-sm ': !isArc,
                    'text-polaris-size-325': isArc,
                },
                className
            ),
            styles,
            onChange: (option, meta) => {
                if (option?.value === 'all') return onChange(null, meta);
                onChange(option, meta);
            },
            theme,
            menuPlacement,
            menuPosition,
            // menuIsOpen: true, // this is for debug. Donot remove this.
            components: {
                Option,
                Control,
                Menu,
                MenuList,
                MenuPortal: ({ children, ...props }: any) => (
                    <components.MenuPortal
                        {...props}
                        className={'selectbox-menuportal'}
                    >
                        {children}
                    </components.MenuPortal>
                ),
                MenuListFooter: (props) =>
                    footer ? (
                        <MenuListFooter
                            text={footer}
                            onClick={() => {
                                props?.onMenuClose?.();
                                footerClick(
                                    rest?.refetchOptions || EmptyFunction
                                );
                            }}
                        />
                    ) : null,
            } as any,
            isSearchable,
            ...rest,
        };

        if (isAsyncCreatable && getOptions) {
            return (
                <AsyncCreatableSelect ref={ref} {...(asyncOptions as any)} />
            );
        }

        if (isAsync && getOptions) {
            return <AsyncSelect ref={ref} {...(asyncOptions as any)} />;
        }

        return (
            <Select
                ref={ref}
                value={value}
                defaultValue={defaultValue || undefined}
                options={sanitizedOptions}
                className={cn(
                    'selectbox-container',
                    {
                        'text-sm ': !isArc,
                        'text-polaris-size-325': isArc,
                    },
                    className
                )}
                aria-label={rest.name}
                styles={styles}
                onChange={(option, isMeta) => {
                    if (IsFunction(onChange)) {
                        if (option?.value === 'all') onChange(null, isMeta);
                        else onChange(option, isMeta);
                    }
                    if (IsFunction(onOptionChangeOnly)) {
                        if (option?.value === 'all') onOptionChangeOnly(null);
                        else onOptionChangeOnly(option);
                    }
                }}
                theme={theme}
                menuPlacement={menuPlacement}
                menuPosition={menuPosition}
                // menuIsOpen // this is for debug. Donot remove this.
                openMenuOnFocus
                components={
                    {
                        Option,
                        Control,
                        Menu,
                        MenuList,
                        MenuPortal: ({ children, ...props }: any) => (
                            <components.MenuPortal
                                {...props}
                                className={'selectbox-menuportal'}
                            >
                                {children}
                            </components.MenuPortal>
                        ),
                        MenuListFooter: (props) =>
                            footer ? (
                                <MenuListFooter
                                    text={footer}
                                    onClick={() => {
                                        props?.onMenuClose?.();
                                        footerClick();
                                    }}
                                />
                            ) : null,
                    } as any
                }
                filterOption={(option, inputValue) => {
                    if (!inputValue) return true;

                    return (
                        option.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()) ||
                        option.data?.subLabel
                            ?.toLowerCase()
                            .includes(inputValue.toLowerCase())
                    );
                }}
                isSearchable={isSearchable}
                formatGroupLabel={formatGroupLabel}
                {...rest}
            />
        );
    }
);

const formatGroupLabel = (data) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
    >
        <span>{data.label}</span>
        <span
            style={{
                backgroundColor: '#EBECF0',
                borderRadius: '2em',
                color: '#172B4D',
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 'normal',
                lineHeight: '1',
                minWidth: 1,
                padding: '0.16666666666667em 0.5em',
                textAlign: 'center',
            }}
        >
            {data.options.length}
        </span>
    </div>
);
const Menu = (props: any) => {
    const { MenuListFooter = null } = props.selectProps.components;
    const { className, ...rest } = props;

    return (
        <components.Menu
            className={cn(
                className,
                'Menu !bg-polaris-bg-surface !border border-polaris-border !shadow-md !z-[99999] !rounded-lg',
                {
                    '!pb-0': MenuListFooter !== null,
                }
            )}
            {...rest}
        >
            {props.children}
        </components.Menu>
    );
};

const MenuList = (props: any) => {
    const { MenuListHeader = null, MenuListFooter = null } =
        props.selectProps.components;
    const { className, ...rest } = props;
    return (
        <>
            <components.MenuList
                className={cn('MenuList', className, {
                    '!pb-2': MenuListFooter !== null,
                })}
                {...rest}
            >
                {props.children.length && MenuListHeader}
                {props.children}
            </components.MenuList>
            {MenuListFooter({ ...(props?.selectProps || {}) })}
        </>
    );
};
const Option = ({ children, ...props }: OptionProps<SelectBoxOption>) => {
    const { data, isSelected, isFocused, options } = props;

    const { isArc } = useApp();

    const isGrouped = useMemo(() => {
        if (options?.[0]?.options) return true;
        return false;
    }, [options]);

    return (
        <components.Option
            {...props}
            className={cn(
                'menu-option row-flex transition-all rounded text-base-content',
                {
                    '!bg-base-200 !bg-polaris-bg-surface-hover': isFocused,
                    '!bg-secondary text-neutral-content': isSelected,
                    '!bg-polaris-bg-surface-active !text-polaris-text':
                        isSelected && isArc,
                    'rounded-lg': isArc,
                },
                { '!pl-4': isGrouped }
            )}
        >
            <div className='items-center row-flex'>
                {data.prefix ?? null}
                <div
                    className={cn('font-normal col-flex', {
                        'text-polaris-size-325': isArc,
                    })}
                >
                    {children}
                    {data.subLabel ? (
                        <div
                            className={cn(
                                'font-normal text-xs text-base-secondary',
                                {
                                    'text-neutral-content': isSelected,
                                    '!text-polaris-text': isSelected && isArc,
                                }
                            )}
                        >
                            {data.subLabel}
                        </div>
                    ) : null}
                </div>
            </div>
        </components.Option>
    );
};

const MenuListFooter = ({ text, onClick = () => {} }: any) => (
    <div className='items-center w-full p-1 border-t menu-footer bg-base-100 col-flex'>
        <Button
            className='no-underline link link-hover hover:bg-transparent'
            appearance='plain'
            onClick={onClick}
            onTouchStart={onClick}
        >
            {text}
        </Button>
    </div>
);

const Control = ({ children, ...props }: ControlProps): any => {
    // @ts-ignore
    const { prefix, isDisabled } = props.selectProps;

    return (
        <components.Control
            className={`${cn('selectbox-control', {
                '!bg-base-100 !text-base-primary': !isDisabled,
                '!bg-base-200 !text-base-secondary disabled': isDisabled,
            })} `}
            {...props}
        >
            {prefix ? <span className='pl-2'>{prefix}</span> : null}
            {children}
        </components.Control>
    );
};
