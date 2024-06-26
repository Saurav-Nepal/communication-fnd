'use client';

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import { useUpdateEffect } from 'react-use';

import { IsValidString } from '@finnoto/core';

import {
    cn,
    Debounce,
    IsFunction,
    IsNumber,
    IsUndefined,
    IsUndefinedOrNull,
} from '../../../Utils/common.ui.utils';
import { Avatar } from '../../Data-display/Avatar/avatar.component';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Loading } from '../../Data-display/Loading/loading.component';
import { FormControl } from './formControl.component';
import {
    inputContainerVariants,
    inputGroupAddonVariants,
    inputGroupVariants,
    inputVariants,
    MentionFieldInputProps,
} from './input.types';
import { InputErrorMessage, InputMessage } from './inputMessage.component';
import { Label } from './label.component';

import { VerifiedTickSvgIcon } from 'assets';

/**
 * Renders an input field with various customizable options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the input field.
 * @param {string} [props.type] - The type of the input field.
 * @param {string} [props.size="md"] - The size of the input field.
 * @param {*} [props.value] - The value of the input field.
 * @param {*} [props.defaultValue] - The default value of the input field.
 * @param {string} [props.label] - The label of the input field.
 * @param {string} [props.placeholder] - The placeholder text of the input field.
 * @param {number} [props.min] - The minimum value of the input field (applicable for number inputs).
 * @param {number} [props.max=99999999] - The maximum value of the input field (applicable for number inputs).
 * @param {number} [props.maxLength=200] - The maximum length of the input field.
 * @param {string} [props.message] - The message to display below the input field.
 * @param {*} [props.messageComponent] - The custom message component to render below the input field.
 * @param {string|string[]} [props.error] - The error message(s) to display below the input field.
 * @param {boolean} [props.readOnly] - Determines if the input field is read-only.
 * @param {boolean} [props.disabled] - Determines if the input field is disabled.
 * @param {boolean} [props.autoFocus] - Determines if the input field should be focused on mount.
 * @param {boolean} [props.autoComplete] - Determines if autocomplete is enabled for the input field.
 * @param {boolean} [props.autoUppercase] - Determines if the input value should be automatically converted to uppercase.
 * @param {boolean} [props.required] - Determines if the input field is required.
 * @param {string} [props.inputClassName] - Additional CSS class for the input field.
 * @param {string} [props.groupClassName] - Additional CSS class for the input field group.
 * @param {React.ReactNode} [props.prefix] - The prefix element to display before the input field.
 * @param {React.ReactNode} [props.suffix] - The suffix element to display after the input field.
 * @param {React.ReactNode} [props.addonStart] - The addon element to display at the start of the input field.
 * @param {React.ReactNode} [props.addonEnd] - The addon element to display at the end of the input field.
 * @param {Object} [props.debounceParams] - The debounce parameters for the onChange event.
 * @param {string} [props.className] - Additional CSS class for the component.
 * @param {function} [props.onChange] - The event handler for the onChange event.
 * @param {function} [props.onDebounceChange] - The event handler for the debounced onChange event.
 * @param {function} [props.onBlur] - The event handler for the onBlur event.
 * @param {function} [props.onClick] - The event handler for the onClick event.
 * @param {boolean} [props.isAmount] - Determines if the input field represents an amount.
 * @param {function} [props.onAsyncBlur] - The asynchronous event handler for the onBlur event.
 * @param {boolean} [props.isVerified] - Determines if the input field is verified.
 * @param {boolean} [props.isLoading=false] - Determines if the input field is in a loading state.
 * @param {string} [props.warning] - The warning message to display below the input field.
 * @param {boolean} [props.smallWidth] - Determines if the input field should have a smaller width.
 * @param {function} [props.onPaste] - The event handler for the onPaste event.
 * @param {function} [props.onCopy] - The event handler for the onCopy event.
 * @param {boolean} [props.trimSpecialChar=true] - Determines if special characters should be trimmed from the input value.
 * @param {*} ref - The ref object for the input field.
 * @returns {JSX.Element} The rendered React component.
 *
 * @author @saurav_nepal
 */
export const MentionFieldInput = forwardRef(
    (
        {
            name,
            type,
            size = 'md',
            value: propsValue,
            defaultValue,
            label,
            placeholder,
            min,
            max = 99999999,
            maxLength = 200,
            message,
            messageComponent,
            error,
            readOnly,
            disabled,
            autoFocus,
            autoComplete,
            autoUppercase,
            required,
            inputClassName,
            groupClassName,
            prefix,
            suffix,
            addonStart,
            addonStartClassName,
            addonEndClassName,
            addonEnd,
            debounceParams,
            className,
            onChange,
            onDebounceChange,
            onBlur,
            onClick = () => {},
            onFocus = () => {},
            isAmount,
            onAsyncBlur,
            isVerified,
            isLoading = false,
            warning,
            smallWidth,
            onPaste,
            onCopy,
            onKeyDown,
            onEnter,
            trimSpecialChar = false,
            id,
            defaultValidInput,
            labelClassName,
            mentionTrigger = '@',
            mentionContextData,
            ...props
        }: MentionFieldInputProps,
        ref: any
    ) => {
        const [value, setValue] = useState(propsValue || defaultValue);
        const [loading, setLoading] = useState(isLoading);
        const [verified, setVerified] = useState(isLoading);

        useUpdateEffect(() => {
            setLoading(isLoading);
        }, [isLoading]);

        useUpdateEffect(() => {
            setVerified(isVerified);
        }, [isVerified]);

        useEffect(() => {
            if (!IsUndefined(propsValue)) {
                setValue(propsValue);
            }
        }, [propsValue]);

        const inputClass = cn(
            inputVariants({
                size,
                isError: !!error,
                isAmount,
                isVerified: verified && !error,
                smallWidth,
            }),
            inputClassName
        );

        const containerClass = cn(
            inputContainerVariants({
                disabled,
                containerSize: size,
            })
        );

        const inputGroupClass = cn(
            inputGroupVariants({
                InputGroupSizes: size,
            }),
            groupClassName
        );

        const getValue = useCallback(
            (e: any) => {
                let value = e.target.value || '';

                if (['number'].includes(type || '')) {
                    return value ? Number(value) : '';
                }

                if (['email'].includes(type)) {
                    return value.toLocaleLowerCase();
                }
                if (trimSpecialChar && value)
                    value = value.replace(/[^a-zA-Z0-9 ]/g, '');

                if (autoUppercase && value) return value.toUpperCase();

                return value;
            },
            [autoUppercase, trimSpecialChar, type]
        );

        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setVerified(false);
                if (
                    type === 'number' &&
                    !IsUndefined(max) &&
                    Number(e.target.value) > max
                )
                    // max value check manually
                    return null;

                if (
                    type === 'number' &&
                    !IsUndefined(min) &&
                    Number(e.target.value) < min
                )
                    // min value check manually
                    return null;

                if (
                    type !== 'number' &&
                    maxLength &&
                    (e.target.value || '').length > maxLength
                )
                    // max string value check manually
                    return null;

                setValue(e.target.value);

                if (onChange && IsFunction(onChange)) onChange(getValue(e));

                if (onDebounceChange && IsFunction(onDebounceChange)) {
                    Debounce(
                        onDebounceChange,
                        debounceParams?.wait || 1000,
                        debounceParams?.immediate || false
                    )(getValue(e));
                }
            },
            [
                debounceParams?.immediate,
                debounceParams?.wait,
                getValue,
                max,
                maxLength,
                min,
                onChange,
                onDebounceChange,
                type,
            ]
        );

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && IsFunction(onEnter))
                    onEnter(getValue(e), e);
                if (IsFunction(onKeyDown)) onKeyDown(e);
            },
            [getValue, onEnter, onKeyDown]
        );

        const nextLoading = (state?: boolean) => {
            setLoading(false);
            if (state === true) {
                setVerified(true);
            }
        };

        const handleBlur = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (onBlur && IsFunction(onBlur)) onBlur(getValue(e));
                if (onAsyncBlur && IsFunction(onAsyncBlur)) {
                    setLoading(true);
                    setVerified(false);
                    onAsyncBlur(getValue(e), nextLoading);
                }
            },
            [getValue, onAsyncBlur, onBlur]
        );

        const withPrefixSuffix = useCallback(
            (element: React.ReactNode) => {
                if (prefix || suffix) {
                    return (
                        <label className={inputGroupClass}>
                            {prefix ? (
                                <span className='prefix'>{prefix}</span>
                            ) : null}
                            {element}
                            {suffix ? (
                                <span className='suffix'>{suffix}</span>
                            ) : null}
                        </label>
                    );
                }
                return element;
            },
            [prefix, suffix, inputGroupClass]
        );
        const addonGroupClass = cn(
            inputGroupAddonVariants({
                InputGroupSizes: size,
            }),
            groupClassName
        );
        const withAddons = useCallback(
            (element: React.ReactNode) => {
                return (
                    <div
                        className={addonGroupClass}
                        onClick={(e) => onClick(e)}
                    >
                        {element}
                        {addonStart && type !== 'hidden' ? (
                            <span
                                className={cn(
                                    'input-addon__start',
                                    addonStartClassName
                                )}
                            >
                                {addonStart}
                            </span>
                        ) : null}
                        {addonEnd &&
                        type !== 'hidden' &&
                        !(loading || verified) ? (
                            <span
                                className={cn(
                                    'input-addon__end',
                                    addonEndClassName
                                )}
                            >
                                {addonEnd}
                            </span>
                        ) : null}
                    </div>
                );
            },
            [
                addonGroupClass,
                addonStart,
                type,
                addonStartClassName,
                addonEnd,
                loading,
                verified,
                addonEndClassName,
                onClick,
            ]
        );

        const withLoading = useCallback(
            (element: React.ReactNode) => {
                return (
                    <>
                        {element}
                        {(loading || verified) && (
                            <span className='input-addon__end'>
                                {!!loading && (
                                    <Loading
                                        size='sm'
                                        color='primary'
                                        type='spinner'
                                    />
                                )}
                                {!!verified &&
                                    !error &&
                                    !!value &&
                                    !loading && (
                                        <Icon
                                            source={VerifiedTickSvgIcon}
                                            iconColor='text-success'
                                            isSvg
                                        />
                                    )}
                            </span>
                        )}
                    </>
                );
            },
            [error, loading, value, verified]
        );

        const renderInput = useMemo(() => {
            return withAddons(
                withPrefixSuffix(
                    withLoading(
                        <MentionsInput
                            className={cn(inputClass, 'mention_input_field')}
                            inputRef={ref}
                            onChange={(e: any) => {
                                return handleChange(e);
                            }}
                            {...{
                                name,
                                type,
                                value: value !== undefined ? value : '',
                                defaultValue,
                                placeholder,
                                min,
                                max,
                                autoFocus,
                                autoComplete: autoComplete ? 'on' : 'off',
                                readOnly,
                                required,
                            }}
                            id={id || name || label?.toString()}
                            onFocus={(e) => onFocus(e)}
                            onWheel={(e: any) =>
                                type === 'number' && e.currentTarget.blur()
                            }
                            disabled={disabled || loading}
                            onBlur={(e: any) => handleBlur(e)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick(e);
                            }}
                            onCopy={onCopy}
                            onPaste={onPaste}
                            onKeyDown={handleKeyDown}
                            singleLine
                            {...(props as any)}
                        >
                            <Mention
                                trigger={mentionTrigger}
                                data={mentionContextData}
                                className='bg-black'
                                displayTransform={(id, display) =>
                                    `${mentionTrigger}${display}`
                                }
                                renderSuggestion={(
                                    data,
                                    search,
                                    highlightedDisplay,
                                    index,
                                    focused
                                ) => {
                                    return (
                                        <div
                                            className={cn('px-2 py-1', {
                                                'bg-blue-100 rounded text-black':
                                                    focused,
                                            })}
                                        >
                                            {data?.display}
                                        </div>
                                    );
                                }}
                            />
                        </MentionsInput>
                    )
                )
            );
        }, [
            withAddons,
            withPrefixSuffix,
            withLoading,
            inputClass,
            ref,
            id,
            name,
            label,
            type,
            value,
            defaultValue,
            placeholder,
            min,
            max,
            autoFocus,
            autoComplete,
            readOnly,
            required,
            disabled,
            loading,
            onCopy,
            onPaste,
            handleKeyDown,
            props,
            mentionTrigger,
            mentionContextData,
            handleChange,
            onFocus,
            handleBlur,
            onClick,
        ]);
        const validInputCheck = useMemo(() => {
            if (defaultValidInput) return true;
            return (
                IsValidString(value) ||
                IsNumber(value) ||
                IsUndefinedOrNull(value)
            );
        }, [defaultValidInput, value]);

        return (
            <FormControl
                {...{
                    className: cn(className, {
                        'valid-input': validInputCheck, // for form validation issue comes in pwa due to the condition so changed the it
                    }),
                    containerClass,
                }}
            >
                <Label
                    {...{
                        label,
                        error,
                        verified,
                        name: name || label?.toString(),
                        required,
                        value,
                        id,
                        className: labelClassName,
                    }}
                />
                {renderInput}
                <InputErrorMessage {...{ error, warning }} />
                <InputMessage {...{ message, messageComponent, error }} />
            </FormControl>
        );
    }
);

const MentionComponentRenderer = ({
    suggestion,
    search,
    highlightedDisplay,
    index,
    focused,
}: {
    suggestion: SuggestionDataItem;
    search: string;
    highlightedDisplay: React.ReactNode;
    index: number;
    focused: boolean;
}) => {
    return (
        <div
            data-cy='mentions-portal'
            style={{
                top: '-9999px',
                left: '-9999px',
                zIndex: 100,
                position: 'absolute',
            }}
            className='scrollbar-xs text-sm border max-h-[300px] overflow-y-auto  overflow-hidden rounded-lg shadow-sm bg-polaris-bg-surface border-polaris-border '
        >
            <div
                className={cn(
                    'px-2 py-3 cursor-pointer flex gap-4 items-center relative min-w-[300px] border-l-2 border-transparent focus:bg-polaris-bg-surface-secondary-hover focus:border-primary outline-none',
                    {
                        'bg-polaris-bg-surface-secondary-hover': false,
                    }
                )}
            >
                <Avatar alt={'new'} size='xs' shape='circle' />
                new
            </div>
        </div>
    );
};
