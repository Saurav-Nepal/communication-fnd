import { DEFAULT_DATE_FORMAT, GetDateValue } from '@finnoto/core';
import { DatePicker, InputField, Toast } from '@finnoto/design-system';
import { format, isDate } from 'date-fns';
import { useEffect, useState } from 'react';

const DateRangeFilter = ({ value, onChange = () => {} }: any) => {
    const [range, setRange] = useState<any>({});

    useEffect(() => {
        setRange(value || {});
    }, [value]);

    const handleRangeChange = (callback: any) => {
        setRange((prev: any) => {
            const newData = callback(prev);
            if (newData.min && newData.max) {
                onChange(newData);
            } else {
                onChange(undefined);
            }
            return newData;
        });
    };

    return (
        <div className='relative items-center mt-2 row-flex'>
            <DatePicker
                value={range.min || null}
                withRangeSelect={true}
                onChange={(date: any) => {
                    handleRangeChange((prev: any) => ({
                        ...prev,
                        min: date,
                    }));
                }}
                onRangeSelect={(range: any) => {
                    setRange(() => {
                        const newData = {
                            min: range.startDate,
                            max: range.endDate,
                        };
                        onChange(newData);
                        return newData;
                    });
                    // CloseAllPoppers();
                }}
            >
                <InputField
                    inputClassName='input input-ghost-primary w-[108px] px-2 input-sm'
                    placeholder={'Start Date'}
                    value={
                        range.min
                            ? format(
                                  GetDateValue(range.min),
                                  DEFAULT_DATE_FORMAT
                              )
                            : ''
                    }
                    onBlur={(value) => {
                        if (value && value.length) {
                            if (isDate(GetDateValue(value))) {
                                handleRangeChange((prev: any) => ({
                                    ...prev,
                                    min: GetDateValue(value),
                                }));
                            } else {
                                Toast.error({
                                    description:
                                        'Start Date must be valid date',
                                });
                            }
                        } else {
                            handleRangeChange((prev: any) => ({
                                ...prev,
                                min: undefined,
                            }));
                        }
                    }}
                />
            </DatePicker>
            <span className='mx-4'>To</span>
            <DatePicker
                withRangeSelect={true}
                value={range.max || null}
                minDate={range.min}
                onChange={(date: any) => {
                    handleRangeChange((prev: any) => ({
                        ...prev,
                        max: date,
                    }));
                    // CloseAllPoppers();
                }}
                onRangeSelect={(range: any) => {
                    setRange(() => {
                        const newData = {
                            min: range.startDate,
                            max: range.endDate,
                        };
                        onChange(newData);
                        return newData;
                    });
                    // CloseAllPoppers();
                }}
            >
                <InputField
                    inputClassName='input input-ghost-primary w-[108px] px-2 input-sm'
                    placeholder={'End Date'}
                    value={
                        range.max
                            ? format(
                                  GetDateValue(range.max),
                                  DEFAULT_DATE_FORMAT
                              )
                            : ''
                    }
                    onBlur={(value) => {
                        if (value && value.length) {
                            if (isDate(GetDateValue(value))) {
                                handleRangeChange((prev: any) => ({
                                    ...prev,
                                    max: GetDateValue(value),
                                }));
                            } else {
                                Toast.error({
                                    description: 'End Date must be valid date',
                                });
                            }
                        } else {
                            handleRangeChange((prev: any) => ({
                                ...prev,
                                max: undefined,
                            }));
                        }
                    }}
                />
            </DatePicker>
        </div>
    );
};

export default DateRangeFilter;
