'use client';
import { CalendarSvgIcon } from 'assets';
import { IsFunction, cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { InputField } from '../InputField/input.component';
import { DatePickerInputProps } from './datePicker.types';
import { DatePicker } from './datePicker.component';
import { Label } from '../InputField/label.component';
import { inputContainerVariants } from '../InputField/input.types';

export const DatePickerInput = ({
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
    customDisplay = null,
    size = 'md',
    onBlur,
    dateWrapperClassName = '',
    clearable = true,
    iconSide = 'left',
    ...props
}: DatePickerInputProps) => {
    const ClearableDateOption = () => {
        if (!clearable || isRequired || !value) return <></>;

        return (
            <div
                className='text-xs cursor-pointer text-error'
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (IsFunction(props?.onChange)) {
                        props?.onChange(undefined);
                    }
                    if (IsFunction(onBlur)) {
                        onBlur(undefined);
                    }
                }}
            >
                Clear
            </div>
        );
    };
    const CustomDisplay = customDisplay;
    const containerClass = cn(
        inputContainerVariants({
            containerSize: size,
            disabled,
        })
    );
    return (
        <div
            className={cn(
                'form-control col-flex w-full',
                dateWrapperClassName,
                containerClass
            )}
        >
            {/* {label && (
                <label
                    className={`label text-xs ${error && 'text-error'}`}
                    htmlFor={(props as any)?.name}
                >
                    <span>
                        {label}{' '}
                        {isRequired && <span className='text-error'>*</span>}
                    </span>
                    <ClearableDateOption />
                </label>
            )} */}
            <Label
                {...{
                    label,
                    error,
                    required: isRequired,
                    rightComponent: <ClearableDateOption />,
                }}
            />
            <DatePicker value={value} {...props} disabled={disabled}>
                {!customDisplay ? (
                    <InputField
                        name='date'
                        readOnly
                        addonStart={
                            iconSide === 'left' ? (
                                <Icon
                                    isSvg
                                    source={CalendarSvgIcon}
                                    size={20}
                                />
                            ) : undefined
                        }
                        addonEnd={
                            iconSide === 'right' ? (
                                <Icon
                                    isSvg
                                    source={CalendarSvgIcon}
                                    size={20}
                                />
                            ) : undefined
                        }
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={disabled}
                        inputClassName={`${inputClassName} cursor-pointer`}
                        error={error}
                        required={isRequired}
                        size={size}
                        onBlur={onBlur}
                        trimSpecialChar={false}
                    />
                ) : (
                    <CustomDisplay />
                )}
            </DatePicker>
        </div>
    );
};
