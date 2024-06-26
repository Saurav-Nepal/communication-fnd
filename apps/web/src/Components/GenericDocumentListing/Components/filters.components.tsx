import { DEFAULT_DATE_FORMAT, GetDateValue, IsEmptyArray } from '@finnoto/core';
import { Button, Collapse, Icon, InputField } from '@finnoto/design-system';
import { format } from 'date-fns';
import { MainFilterProp } from '../genericDocumentListing.types';
import DateRangeFilter from './dateRangeFilter';

const Filters = ({
    data,
    filters,
    amountFilter,
    toggleFilter,
    handleData = () => {},
    setToggleFilter = () => {},
}: {
    data: any;
    // filters?: FilterListItemInterface[];
    filters?: any;
    amountFilter?: any | false;
    toggleFilter?: boolean;
    handleData?: any;
    setToggleFilter?: any;
}) => {
    const handleAmountChange = (key: string, value: number) => {
        const amount = data.amount || {};
        handleData('amount', { ...amount, [key]: value });
    };

    const handleCheckboxOptionChange = (
        filterKey: string,
        option: string,
        value: boolean
    ) => {
        const prevData = data[filterKey] || {};
        handleData(filterKey, { ...prevData, [option]: value || undefined });
        handleData('page', 1);
    };

    const handleInputChange = (key: string, value: number) => {
        handleData(key, value);
    };

    const getFilter = (filter: MainFilterProp, index: number) => {
        if (filter.type === 'checkbox') {
            if (filter.options && !IsEmptyArray(filter.options)) {
                return (
                    <Collapse
                        key={index}
                        title={filter.name}
                        titleClassName='font-semibold'
                    >
                        <div className='gap-1 pt-2 pl-2 col-flex'>
                            {filter.options.map(
                                (option: any, index: number) => (
                                    <div
                                        className='row-flex'
                                        key={index + option.key}
                                    >
                                        <label className='items-center gap-2 cursor-pointer row-flex hover:text-primary'>
                                            <input
                                                type='checkbox'
                                                className='checkbox checkbox-xs checkbox-primary'
                                                checked={
                                                    data[filter.key] &&
                                                    data[filter.key][option.key]
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxOptionChange(
                                                        filter.key,
                                                        option.key,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span className='text-sm'>
                                                {option.name}
                                            </span>
                                        </label>
                                    </div>
                                )
                            )}
                        </div>
                    </Collapse>
                );
            }

            return (
                <div className='row-flex' key={index}>
                    <label className='items-center gap-2 cursor-pointer row-flex hover:text-primary'>
                        <input
                            type='checkbox'
                            className='text-sm checkbox checkbox-xs checkbox-primary'
                            checked={data[filter.key]}
                            onChange={(e) =>
                                handleData(
                                    filter.key,
                                    e.target.checked || undefined
                                )
                            }
                        />
                        <span className='text-sm'>{filter.name}</span>
                    </label>
                </div>
            );
        }

        if (filter.type === 'date_range') {
            return (
                <Collapse
                    title={filter.name}
                    titleClassName='font-semibold'
                    collapseDisabled
                    key={index}
                >
                    <DateRangeFilter
                        value={data[filter.key]?.range}
                        onChange={(range: any) => {
                            handleData(filter.key, {
                                range: range && {
                                    min: format(
                                        GetDateValue(range.min),
                                        DEFAULT_DATE_FORMAT
                                    ),
                                    max: format(
                                        GetDateValue(range.max),
                                        DEFAULT_DATE_FORMAT
                                    ),
                                },
                            });
                        }}
                    />
                </Collapse>
            );
        }

        if (filter.type == 'input') {
            return (
                <div key={filter.key}>
                    <InputField
                        value={data.key}
                        onChange={(val: any) =>
                            handleInputChange(filter.key, val)
                        }
                        placeholder={filter.placeholder}
                        label={filter.label}
                    />
                </div>
            );
        }

        if (filter.type == 'selectbox') {
            return (
                <div key={index}>
                    <span className='label label-text-alt text-base-primary'>
                        {filter.name}
                    </span>
                </div>
            );
        }

        return null;
    };

    const filterToggleClass = toggleFilter ? 'w-0' : 'w-[300px] border-r';

    return (
        <div
            className={`absolute top-14 z-30 col-flex h-full mt-2 bg-base-100 border-t border-base-300 rounded-tr overflow-x-hidden overflow-y-auto transition-width ${filterToggleClass}`}
        >
            <div className='col-flex p-4 w-[300px] gap-6'>
                <div className='items-center justify-between row-flex'>
                    <span>Filters</span>
                    <Button
                        shape='square'
                        size='sm'
                        appearance='ghost'
                        onClick={() =>
                            setToggleFilter((prev: boolean) => !prev)
                        }
                    >
                        <Icon source={'arrow_back'} />
                    </Button>
                </div>

                {amountFilter !== false && (
                    <Collapse
                        title={amountFilter?.name || `Invoice Amount (₹)`}
                        titleClassName='font-semibold'
                        collapseDisabled
                    >
                        <div className='relative items-center gap-2 row-flex label'>
                            <InputField
                                inputClassName='max-w-[108px] input-sm input-number'
                                placeholder='0'
                                type='number'
                                min={0}
                                defaultValue={data?.amount?.min || ''}
                                onDebounceChange={(value) =>
                                    handleAmountChange('min', value)
                                }
                            />
                            <span>To</span>
                            <InputField
                                inputClassName='max-w-[108px] input-sm input-number'
                                placeholder='0'
                                type='number'
                                min={1}
                                defaultValue={data?.amount?.max || ''}
                                onDebounceChange={(value) =>
                                    handleAmountChange(
                                        'max',
                                        value || undefined
                                    )
                                }
                            />
                        </div>
                    </Collapse>
                )}

                {filters &&
                    !IsEmptyArray(filters) &&
                    filters.map((filter: any, index: number) => {
                        return getFilter(filter, index);
                    })}
            </div>
        </div>
    );
};

export default Filters;
