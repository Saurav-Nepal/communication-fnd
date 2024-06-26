'use client';

import clsx from 'clsx';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { IMaskMixinProps } from 'react-imask/dist/mixin';
import { useUpdateEffect } from 'react-use';

import { EmptyFunction, IsValidString } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Loading } from '../../Data-display/Loading/loading.component';
import { FormControl } from '../InputField/formControl.component';
import {
    InputErrorMessage,
    InputMessage,
} from '../InputField/inputMessage.component';
import { Label } from '../InputField/label.component';
import {
    maskedInputContainerVariants,
    maskedInputGroupAddonVariants,
    maskedInputGroupVariants,
    MaskedInputProps,
    maskedInputVariants,
} from './maskInput.types';

export const MaskedInput = forwardRef(
    (
        {
            name,
            size = 'md',
            value,
            defaultValue,
            label,
            placeholder,
            min,
            max,
            message,
            messageComponent,
            error,
            readOnly,
            disabled,
            autoFocus,
            autoComplete,
            required,
            inputClassName,
            groupClassName,
            prefix,
            suffix,
            addonStart,
            addonEnd,
            className,
            onChange,
            onClick = EmptyFunction,
            onBlur = EmptyFunction,
            isVerified,
            isLoading = false,
            warning,
            smallWidth,
            mask = 'Y/m/d',
            blockTypes = {},
            placeholderChar = '_',
            dir,
            inputAddOnClassName,
        }: MaskedInputProps,
        ref: any
    ) => {
        const maskOptions: IMaskMixinProps = useMemo(
            () => ({
                mask,
                normalizeZeros: true,
                lazy: false,
                autofix: true,
                eager: true,
                placeholderChar,
                skipInvalid: true,

                blocks: {
                    dd: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                        maxLength: 2,
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                    },
                    yyyy: {
                        mask: IMask.MaskedRange,
                        from: 1970,
                        to: 9999,
                        maxLength: 4,
                    },
                    9: {
                        mask: IMask.MaskedNumber,
                        maxLength: 1,
                    },
                    hh: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                    },
                    mm: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 59,
                        maxLength: 2,
                    },
                    ...blockTypes,
                },
            }),
            [blockTypes, mask, placeholderChar]
        );

        const [loading, setLoading] = useState(isLoading);

        useUpdateEffect(() => {
            setLoading(isLoading);
        }, [isLoading]);

        const inputClasses = cn(
            maskedInputVariants({
                size,
                isError: !!error,
                smallWidth,
            }),
            inputClassName
        );

        const containerClass = cn(
            maskedInputContainerVariants({
                containerSize: size,
                disabled,
                isValidInput: IsValidString(value) && !disabled,
            })
        );

        const inputGroupClass = cn(
            maskedInputGroupVariants({
                InputGroupSizes: size,
            }),
            groupClassName
        );

        const withPrefixSuffix = useCallback(
            (element: React.ReactNode) => {
                if (prefix || suffix) {
                    return (
                        <label className={inputGroupClass}>
                            {prefix ? <span>{prefix}</span> : null}
                            {element}
                            {suffix ? <span>{suffix}</span> : null}
                        </label>
                    );
                }
                return element;
            },
            [prefix, suffix, inputGroupClass]
        );
        const addonClass = cn(
            maskedInputGroupAddonVariants({
                InputGroupSizes: size,
            }),
            inputAddOnClassName
        );
        const withAddons = useCallback(
            (element: React.ReactNode) => {
                if ((addonStart || addonEnd) && !loading) {
                    return (
                        <div className={addonClass} onClick={(e) => onClick(e)}>
                            {element}
                            {addonStart ? (
                                <span className='input-addon__start'>
                                    {addonStart}
                                </span>
                            ) : null}
                            {addonEnd ? (
                                <span className='z-10 input-addon__end'>
                                    {addonEnd}
                                </span>
                            ) : null}
                        </div>
                    );
                }
                return element;
            },
            [addonStart, addonEnd, loading, addonClass, onClick]
        );
        const withLoading = useCallback(
            (element: React.ReactNode) => {
                if (loading) {
                    return (
                        <div className={addonClass} onClick={(e) => onClick(e)}>
                            {element}
                            <span className='input-addon__end !text-primary'>
                                <Loading
                                    size='sm'
                                    color='primary'
                                    type='spinner'
                                />
                            </span>
                        </div>
                    );
                }
                return element;
            },
            [addonClass, loading, onClick]
        );
        const renderInput = useMemo(() => {
            return withAddons(
                withPrefixSuffix(
                    withLoading(
                        <IMaskInput
                            {...maskOptions}
                            className={inputClasses}
                            id={name}
                            disabled={disabled || loading}
                            {...{
                                value,
                                defaultValue,
                                name,
                                placeholder,
                                min,
                                max,
                                autoFocus,
                                autoComplete: autoComplete ? 'on' : 'off',
                                readOnly,
                                required,
                                dir,
                            }}
                            onComplete={onChange}
                            onAccept={(_, maskRef) => {
                                if (!IsValidString(maskRef.unmaskedValue)) {
                                    onChange(null);
                                }
                            }}
                            onClick={(e) => {
                                onClick(e);
                            }}
                            onFocus={(e: any) => {
                                e.target?.select();
                            }}
                            onBlur={onBlur}
                            onChange={EmptyFunction}
                        />
                    )
                )
            );
        }, [
            withAddons,
            withPrefixSuffix,
            withLoading,
            maskOptions,
            inputClasses,
            name,
            disabled,
            loading,
            value,
            defaultValue,
            placeholder,
            min,
            max,
            autoFocus,
            autoComplete,
            readOnly,
            required,
            dir,
            onChange,
            onBlur,
            onClick,
        ]);

        return (
            <FormControl ref={ref} {...{ containerClass, className }}>
                <Label {...{ label, error, isVerified, name, required }} />
                {renderInput}
                <InputErrorMessage {...{ error, warning }} />
                <InputMessage {...{ message, messageComponent, error }} />
            </FormControl>
        );
    }
);
