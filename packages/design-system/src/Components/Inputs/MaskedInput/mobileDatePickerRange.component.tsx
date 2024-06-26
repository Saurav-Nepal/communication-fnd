import { useCallback, useMemo, useState } from 'react';

import { EmptyFunction, ParseToSelectBoxOption } from '@finnoto/core';

import { ListSelectItem } from '../../../Composites';
import { Modal } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import {
    ModalBody,
    ModalContainer,
} from '../../Dialogs/Base/modal.container.component';
import { Button } from '../Button/button.component';
import { CustomCalander, defaultRanges } from '../DatePicker';
import { DateRangeFilterUtils } from '../DateRangeFilter';

import { CalendarSvgIcon } from 'assets';

export const MobileDatePickerRange = ({
    value = {},
    onRangeSelect,
    className,
}: any) => {
    const openMobileDatePickerSheet = () => {
        Modal.open({
            component: DateRangeList,
            props: {
                rangeSelector: true,
                withRangeSelect: true,
                label: 'Dashboard Date',
                value,
                onRangeSelect: (range) => {
                    onRangeSelect(range);
                    Modal.close();
                },
            },
        });
    };
    const dateLabel = useMemo(() => {
        const data = DateRangeFilterUtils.getUtcDisplayDateRange(value);
        if (data?.min && data?.max) return 'Customize';
        return data;
    }, [value]);

    return (
        <div
            onClick={openMobileDatePickerSheet}
            className={cn(
                'items-center gap-2 px-3 py-2 border rounded-lg row-flex',
                className
            )}
        >
            <Icon
                source={CalendarSvgIcon}
                className={'text-primary'}
                size={20}
                isSvg
            />
            {dateLabel ? (
                <span className={cn(' text-base-primary')}>{dateLabel}</span>
            ) : null}
        </div>
    );
};

const DateRangeList = ({ onRangeSelect = EmptyFunction, value }: any) => {
    const staticRanges = defaultRanges;

    const isActiveDate = useCallback(
        (date) => {
            if (value[date?.valueKey]) return true;

            if (
                value?.range?.min &&
                value?.range?.max &&
                date?.value === 'customize'
            )
                return true;
        },
        [value]
    );

    const isNotAnyDefinedDateActive = useCallback(() => {
        for (let range of staticRanges) {
            if (isActiveDate(range)) return false;
        }
        return true;
    }, [isActiveDate, staticRanges]);

    const rangeOptions = useMemo(() => {
        const options = ParseToSelectBoxOption(
            staticRanges,
            'valueKey',
            'name'
        );
        return [
            ...options,
            {
                label: 'Custom Date',
                value: 'customize',
                data: {
                    value: 'customize',
                },
            },
        ];
    }, [staticRanges]);

    const openCustomCalendar = useCallback(() => {
        return Modal.open({
            component: CustomDateRange,
            props: {
                value: DateRangeFilterUtils.absoluteValue(value),
                onRangeSelect: (data) => {
                    onRangeSelect(data);
                    Modal.close();
                    Modal.close();
                },
            },
        });
    }, [onRangeSelect, value]);

    return (
        <ModalContainer title='Select Date Range'>
            <ModalBody className='flex-1 gap-2 px-3 pb-3 overflow-y-auto col-flex bg-base-200'>
                {rangeOptions.map((option) => {
                    return (
                        <ListSelectItem
                            key={option?.value}
                            option={option}
                            onSelect={() => {
                                if (option?.value === 'customize')
                                    return openCustomCalendar();

                                onRangeSelect({ [option?.value]: true });
                            }}
                            isActiveDefault={isActiveDate(option?.data)}
                        />
                    );
                })}
            </ModalBody>
        </ModalContainer>
    );
};
const CustomDateRange = ({
    onRangeSelect = EmptyFunction,
    value = {},
}: any) => {
    const [date, setDate] = useState<any>(
        value || {
            startDate: new Date(),
            endDate: new Date(),
        }
    );

    return (
        <ModalContainer title='Custom Date Range'>
            <ModalBody>
                <CustomCalander
                    value={date}
                    onChange={(range) => {
                        setDate(range);
                    }}
                    {...{
                        localRange: date,
                        setLocalRange: setDate,
                    }}
                    disabledApplyClear={true}
                    displayMode='dateRange'
                />
                <div className='items-center gap-4 mt-4 row-flex'>
                    <Button
                        onClick={() => {
                            return onRangeSelect({
                                startDate: undefined,
                                endDate: undefined,
                            });
                        }}
                        appearance='error'
                        outline
                        className='flex-1'
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={() => {
                            return onRangeSelect({
                                startDate: date.startDate,
                                endDate: date.endDate,
                            });
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
