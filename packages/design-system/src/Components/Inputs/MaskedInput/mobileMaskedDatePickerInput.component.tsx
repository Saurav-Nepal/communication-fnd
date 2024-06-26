'use client';

import { format, isValid } from 'date-fns';
import { forwardRef, useCallback, useState } from 'react';

import {
    DEFAULT_DATE_FORMAT,
    EmptyFunction,
    GetDateValue,
} from '@finnoto/core';

import { Modal } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import {
    ModalBody,
    ModalContainer,
} from '../../Dialogs/Base/modal.container.component';
import { Button } from '../Button/button.component';
import { RenderDatePicker } from '../DatePicker';
import { MaskedInput } from './maskedInput.component';
import { MaskedDatePickerInputProps } from './maskInput.types';

import { CalendarSvgIcon } from 'assets';

export const MobileMaskedDatePickerInput = forwardRef(
    (
        {
            value,
            disabled = false,
            inputClassName = '',
            label,
            inputValue,
            placeholder,
            error,
            bordered = false,
            isRequired,
            translate = true,
            calender_icon = true,
            size,
            dateFormat = DEFAULT_DATE_FORMAT,
            onChange = EmptyFunction,
            onBlur,
            hideClear,
            warning,
            message,
            ...props
        }: MaskedDatePickerInputProps,
        ref: any
    ) => {
        const renderClearBtn = useCallback(() => {
            if (hideClear || isRequired || !value) return null;
            return (
                <Button
                    onClick={() => onChange(null)}
                    appearance='error'
                    size='xs'
                    outline
                >
                    Clear
                </Button>
            );
        }, [hideClear, isRequired, onChange, value]);

        const openDatePicker = useCallback(() => {
            return Modal.open({
                component: DatePickerSheet,
                shouldWarnFormUpdate: false,
                props: {
                    value,
                    ...props,

                    disabled,

                    label,
                    callback: (value) => {
                        onChange(value);
                        Modal.close();
                    },
                },
            });
        }, [disabled, label, onChange, props, value]);

        return (
            <MaskedInput
                mask={dateFormat}
                name='date'
                label={label}
                //convert to date format
                value={
                    isValid(GetDateValue(value, dateFormat))
                        ? format(GetDateValue(value, dateFormat), dateFormat)
                        : ''
                }
                disabled={disabled}
                inputClassName={`${inputClassName} cursor-pointer`}
                placeholder={placeholder}
                error={error}
                required={isRequired}
                size={size}
                onBlur={onBlur}
                //date format use for on change
                onChange={(value) => {
                    onChange(value ? GetDateValue(value, dateFormat) : value);
                }}
                ref={ref}
                warning={warning}
                message={message}
                addonEnd={
                    <div className='gap-2 row-flex'>
                        {renderClearBtn()}
                        <Icon
                            isSvg
                            className={cn('cursor-pointer', {
                                'cursor-none': disabled,
                            })}
                            source={CalendarSvgIcon}
                            size={20}
                            onClick={() => {
                                if (disabled) return;
                                openDatePicker();
                            }}
                            iconColor={cn('text-info', {
                                'text-base-secondary': disabled,
                            })}
                        />
                    </div>
                }
            />
        );
    }
);

const DatePickerSheet = ({
    value,
    onSave,
    onCancel,
    callback,
    ...props
}: any) => {
    const [date, setDate] = useState<any>(value);
    return (
        <ModalContainer title={props?.label}>
            <ModalBody>
                <RenderDatePicker
                    className='w-full'
                    {...props}
                    {...{
                        value: date,
                        onDateChange: (value) => {
                            setDate(value);
                        },
                    }}
                    handleClose={EmptyFunction}
                />
                <div className='items-center gap-4 mt-4 row-flex'>
                    <Button
                        onClick={() => {
                            if (props?.selectRange) {
                                return props?.onRangeSelect({
                                    startDate: undefined,
                                    endDate: undefined,
                                });
                            }
                            callback(null);
                        }}
                        appearance='error'
                        outline
                        className='flex-1'
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={() => {
                            if (props?.selectRange) {
                                return props?.onRangeSelect({
                                    startDate: date.startDate,
                                    endDate: date.endDate,
                                });
                            }
                            callback(date);
                        }}
                        defaultMinWidth
                        appearance='success'
                        className='flex-1'
                    >
                        Apply Date
                    </Button>
                </div>
            </ModalBody>
        </ModalContainer>
    );
};
