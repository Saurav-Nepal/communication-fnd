'use client';

import { format, isDate } from 'date-fns';
import { useMemo, useState } from 'react';
import {
    Calendar,
    ClassNames,
    DateRange,
    DefinedRange,
} from 'react-date-range';

import { GetDateValue, IsEmptyArray } from '@finnoto/core';

import { Typography } from '../../Data-display/Typography/typography.component';
import { Popover } from '../../Surfaces/Popover/popover.component';
import { Button } from '../Button/button.component';
import {
    DatePickerProps,
    defaultRanges,
    RenderDateProps,
} from './datePicker.types';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const DatePicker = ({
    value,
    minDate,
    maxDate,
    customRanges,
    rangeSelector,
    withRangeSelect,
    withRangeSelectOnly,
    children,
    offsetY,
    disabled,
    onChange,
    onRangeSelect,
    side,
    align,
}: DatePickerProps) => {
    let date: any = value;
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => setOpen(false);

    if (date && !date.startDate) {
        if (isNaN(GetDateValue(date))) {
            date = undefined;
        } else {
            date = GetDateValue(date);
        }
    }

    return (
        <Popover
            element={
                <RenderDatePicker
                    value={date || undefined}
                    onDateChange={onChange}
                    withRangeSelect={withRangeSelect}
                    onRangeSelect={onRangeSelect}
                    withRangeSelectOnly={withRangeSelectOnly}
                    minDate={GetDateValue(minDate)}
                    maxDate={GetDateValue(maxDate)}
                    customRanges={customRanges}
                    displayMode={rangeSelector === true ? 'dateRange' : 'date'}
                    {...{ handleClose }}
                />
            }
            visible={open}
            offsetY={offsetY}
            disabled={disabled}
            onVisibleChange={(visible) => {
                setOpen(visible);
            }}
            {...{ side, align }}
        >
            {children}
        </Popover>
    );
};

export const RenderDatePicker = ({
    value,
    withRangeSelect,
    withRangeSelectOnly,
    customRanges,
    displayMode,
    onRangeSelect = () => {},
    handleClose,
    ...props
}: RenderDateProps) => {
    const [enableCalander, setEnableCalander] = useState(false);
    const [localRange, setLocalRange] = useState<any>(null);

    const staticRanges = customRanges || defaultRanges;

    const isRangeSelector = useMemo(() => {
        return (withRangeSelect || withRangeSelectOnly) && !enableCalander;
    }, [enableCalander, withRangeSelect, withRangeSelectOnly]);

    return isRangeSelector ? (
        <WithRangeSelectCalender
            {...{
                withRangeSelect,
                staticRanges,
                withRangeSelectOnly,
                displayMode,
                setLocalRange,
                onRangeSelect,
                setEnableCalander,
                localRange,
                value,
                handleClose,
                ...props,
            }}
        />
    ) : (
        <CustomCalander
            value={value}
            localRange={localRange}
            displayMode={displayMode}
            setLocalRange={setLocalRange}
            setEnableCalander={setEnableCalander}
            onRangeSelect={onRangeSelect}
            {...{ handleClose }}
            {...props}
        />
    );
};

const WithRangeSelectCalender = ({
    withRangeSelect,
    staticRanges,
    withRangeSelectOnly,
    displayMode,
    setLocalRange,
    onRangeSelect,
    setEnableCalander,
    localRange,
    value,
    handleClose,
    ...props
}) => {
    return (
        <div className='row-flex'>
            <div
                className={`col-flex min-w-[190px] w-full text-xs ${
                    !withRangeSelectOnly ? 'border-r' : ''
                } `}
            >
                {!IsEmptyArray(staticRanges) &&
                    staticRanges.map((range, index: number) => (
                        <div
                            key={`range-selector-${range?.name}-${index}`}
                            className={`text-left py-2 px-4 cursor-pointer hover:bg-base-200`}
                            onClick={() => {
                                if (displayMode === 'dateRange') {
                                    return setLocalRange(range);
                                }

                                onRangeSelect(range);
                            }}
                        >
                            {range.name}
                        </div>
                    ))}
                {!IsEmptyArray(staticRanges) && withRangeSelectOnly && (
                    <div
                        className={`text-left py-2 px-4 cursor-pointer hover:bg-base-200`}
                        onClick={() => {
                            setEnableCalander(true);
                        }}
                    >
                        Custom
                    </div>
                )}
                <DefinedRange
                    ranges={[
                        {
                            key: 'range',
                            ...(localRange ||
                                value || {
                                    startDate: new Date(),
                                    endDate: new Date(),
                                }),
                        },
                    ]}
                    staticRanges={[]}
                    onChange={({ range }) => setLocalRange(range)}
                />
            </div>
            {!withRangeSelectOnly && (
                <CustomCalander
                    value={value}
                    localRange={localRange}
                    displayMode={displayMode}
                    setLocalRange={setLocalRange}
                    setEnableCalander={setEnableCalander}
                    onRangeSelect={onRangeSelect}
                    {...{ handleClose }}
                    {...props}
                />
            )}
        </div>
    );
};

export const CustomCalander = ({
    value,
    localRange,
    displayMode,
    setEnableCalander = () => {},
    onDateChange = () => {},
    onChange = () => {},
    onRangeSelect = () => {},
    setLocalRange,
    dateDisplayFormat,
    handleClose,
    ...props
}: RenderDateProps) => {
    const calanderClasses: ClassNames = {
        calendarWrapper: 'flex flex-1 !bg-base-100',
        dateDisplayWrapper: '!bg-base-200',
        dateDisplayItem: 'dark:bg-base-300 ',
        dateDisplayItemActive: 'dark:bg-base-200 dark:border-primary ',
        monthAndYearWrapper: 'h-auto !py-2',
        monthPicker: 'picker-month',
        yearPicker: 'picker-year',
        weekDays: 'bg-base-200 text-primary-content',
        nextPrevButton: 'dark:text-white dark:bg-white',
        selected: 'top-[3px] bottom-[3px] !text-primary',
        month: 'pb-0',
        day: 'h-8',
        dayNumber: 'after:!-top-[4px] after:!-bottom-[4px] picker-dayNumber',
        dayHovered: '!text-primary',
    };

    if (displayMode === 'dateRange') {
        return (
            <div className='col-flex '>
                <DateRange
                    ranges={[
                        {
                            key: 'range',
                            ...(localRange ||
                                value || {
                                    startDate: new Date(),
                                    endDate: new Date(),
                                }),
                        },
                    ]}
                    classNames={calanderClasses}
                    onChange={({ range }) =>
                        setLocalRange({
                            startDate: range?.startDate,
                            endDate: range?.endDate,
                        })
                    }
                    scroll={{ enabled: true }}
                    showPreview={true}
                    moveRangeOnFirstSelection={false}
                />
                {!props?.disabledApplyClear && (
                    <div className='justify-end gap-4 p-2 px-4 border-t row-flex '>
                        <Button
                            className='text-error'
                            appearance='ghost'
                            size='sm'
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            appearance='success'
                            outline
                            size='sm'
                            disabled={!localRange}
                            onClick={() => {
                                handleClose();
                                onRangeSelect(localRange);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className='col-flex'>
            <div className='p-2 px-5 text-sm border-b text-base-secondary '>
                {isDate(value) ? (
                    format(value as Date, dateDisplayFormat || 'MMM d, yyyy')
                ) : (
                    <Typography>No Date</Typography>
                )}
            </div>
            <Calendar
                date={value as any}
                classNames={calanderClasses}
                scroll={{ enabled: true }}
                showPreview={false}
                onChange={(date) => {
                    setEnableCalander(false);
                    handleClose();
                    onDateChange(date);
                }}
                {...props}
            />
        </div>
    );
};
