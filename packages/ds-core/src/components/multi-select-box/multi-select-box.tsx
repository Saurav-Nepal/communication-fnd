import * as React from 'react';
import { CommandLoading } from 'cmdk';

import { useUncontrolled } from '@slabs/ds-hooks';
import { cn, isFunction } from '@slabs/ds-utils';

import { CaretSortIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '../core/command';
import { inputVariants } from '../inputs/input/input.types';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import {
    GroupOptionsType,
    SelectBoxOptionType,
    SelectBoxValueType,
    SuffixPrefixOptionType,
} from '../select-box/select-box.types';
import { Tooltip } from '../tooltip/tooltip';
import { MultiSelectBoxProps } from './multi-select-box.types';

export const MultiSelectBox = React.forwardRef<
    HTMLDivElement,
    MultiSelectBoxProps
>(
    (
        {
            disabled,
            options,
            value: valueProps,
            defaultValue,
            className,
            onChange,
            onOptionChange,
            placeholder = 'select options ...',
            isSearchable = true,
            onSearchValue,
            size,
            isSearchLoading,
            displayLimit = 1,
            suffix,
            searchValue,
            isClearable,
            variants = {
                variant: 'bordered',
                size: 'md',
                radius: 'sm',
                color: 'default',
            },
            formatGroupLabel,
            hasError,
        },
        ref
    ) => {
        const [isOpen, setOpen] = React.useState<boolean>();
        const [searchTerm, setSearchTerm] = React.useState<string>('');

        const getSelectedOptions = React.useCallback(
            (value: typeof valueProps) => {
                if (!value) return [];

                // Flatten the options array to handle both grouped and ungrouped options
                const flattenedOptions =
                    options?.flatMap((option) =>
                        'options' in option ? option.options : [option]
                    ) || [];

                return (value
                    ?.map((val: SelectBoxValueType) =>
                        flattenedOptions.find((option) => option.value === val)
                    )
                    .filter((option) => !!option?.value) ||
                    []) as SelectBoxOptionType[];
            },
            [options] // Add options to the dependency array
        );

        const onHandleChange = React.useCallback(
            (value: typeof valueProps) => {
                onChange?.(value);
                const changeOptions: any = getSelectedOptions(value);
                onOptionChange?.(changeOptions);
            },
            [onChange, onOptionChange]
        );

        const [value, onValueChange] = useUncontrolled({
            value: valueProps ?? [],
            defaultValue: defaultValue,
            onChange: onHandleChange,
        });

        const onHandleOptionChange = React.useCallback(
            (option: SelectBoxOptionType, isSelected: boolean) => {
                if (isSelected) {
                    return onValueChange(
                        value.filter((value) => value !== option?.value)
                    );
                }
                onValueChange([...value, option.value]);
            },
            [value]
        );
        const selectedOptions = React.useMemo(
            () => getSelectedOptions(value),
            [getSelectedOptions, value]
        );

        const renderSuffixPrefix = React.useCallback(
            ({
                option,
                suffixOrPrefix,
            }: {
                option: SelectBoxOptionType;
                suffixOrPrefix: SuffixPrefixOptionType;
            }) => {
                if (isFunction(suffixOrPrefix)) return suffixOrPrefix(option);
                return suffixOrPrefix;
            },
            []
        );
        const displayValue = React.useMemo(() => {
            if (selectedOptions?.length) {
                const displayOptions = selectedOptions.slice(0, displayLimit);
                const moreSelectedOptions = [...(selectedOptions || [])].splice(
                    displayLimit,
                    selectedOptions?.length
                );
                return (
                    <div className='flex items-center w-full gap-1'>
                        {displayOptions?.map((option, index) => (
                            <div
                                className={cn(
                                    ' font-normal flex gap-2 items-center border rounded h-6 px-1',
                                    {
                                        'cursor-pointer hover:line-through hover:text-error':
                                            !disabled,
                                    }
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (disabled) return;
                                    onHandleOptionChange(option, true);
                                    setOpen(true);
                                }}
                                key={option?.value + '' + index}
                            >
                                {option?.label}{' '}
                                {renderSuffixPrefix({
                                    option,
                                    suffixOrPrefix: suffix,
                                })}
                            </div>
                        ))}
                        {moreSelectedOptions?.length > 0 && (
                            <Tooltip
                                message={moreSelectedOptions
                                    ?.map((option) => option?.label)
                                    .join(', ')}
                                arrow
                            >
                                <Badge
                                    size={'sm'}
                                    radius={'sm'}
                                    variant={'primary'}
                                    type={'bordered'}
                                >
                                    +{moreSelectedOptions?.length}
                                </Badge>
                            </Tooltip>
                        )}
                    </div>
                );
            }
        }, [value]);
        const canClear = React.useMemo(() => {
            return isClearable && selectedOptions?.length > 0;
        }, [isClearable, selectedOptions]);

        const filteredOptions = React.useMemo(() => {
            const searchFilter = (option: SelectBoxOptionType) =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase());

            return options?.reduce(
                (acc, option) => {
                    if ('options' in option) {
                        const filteredSubOptions =
                            option.options.filter(searchFilter);

                        if (filteredSubOptions.length > 0) {
                            acc.push({
                                ...option,
                                options: filteredSubOptions,
                            });
                        }
                    } else if (searchFilter(option)) {
                        acc.push(option);
                    }
                    return acc;
                },
                [] as (SelectBoxOptionType | GroupOptionsType)[]
            );
        }, [options, searchTerm]);

        const totalOptions = React.useMemo(() => {
            return filteredOptions?.reduce((acc, option) => {
                if ('options' in option) {
                    return acc + option.options.length;
                }
                return acc + 1;
            }, 0);
        }, [filteredOptions]);
        return (
            <Popover open={isOpen} onOpenChange={setOpen}>
                <PopoverTrigger disabled={disabled} asChild>
                    <Button
                        variant={'ghost'}
                        role='input-list'
                        aria-expanded={isOpen}
                        className={cn(
                            'justify-between w-full focus:border-secondary-foreground  hover:border-secondary-foreground border border-input hover:text-secondary-foreground',
                            inputVariants({
                                variant: variants.variant,
                                color: variants.color,
                                size: variants.size,
                                radius: variants.radius,
                                hasError,
                            }),
                            'hover:bg-transparent',
                            className
                        )}
                        disabled={disabled}
                        size={size}
                    >
                        {displayValue ?? (
                            <span className='text-muted-foreground'>
                                {placeholder}
                            </span>
                        )}
                        <div className='flex items-center '>
                            {canClear && (
                                <Cross1Icon
                                    className='w-4 font-bold opacity-50 hover:text-destructive hover:opacity-100'
                                    onClick={() => onValueChange([])}
                                />
                            )}
                            <CaretSortIcon className='h-4 ml-1 opacity-50 shrink-0' />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    ref={ref}
                    className='p-0 w-[var(--radix-popover-trigger-width)]'
                >
                    <Command>
                        {isSearchable && (
                            <CommandInput
                                placeholder='Search option...'
                                className='h-9'
                                onValueChange={(val) => {
                                    setSearchTerm(val);
                                    onSearchValue?.(val);
                                }}
                                value={searchValue}
                            />
                        )}

                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandList>
                            {isSearchLoading && <CommandLoading />}
                            <CommandGroup>
                                {filteredOptions?.map((option, index) => {
                                    if ('options' in option) {
                                        return (
                                            <div key={index}>
                                                {formatGroupLabel?.(option) ?? (
                                                    <span className='text-sm text-primary'>
                                                        {option.label}
                                                    </span>
                                                )}
                                                {option.options.map(
                                                    (opt, optIndex) => {
                                                        const isSelected =
                                                            value.includes(
                                                                opt.value
                                                            );
                                                        return (
                                                            <MultiSelectItemsCard
                                                                key={
                                                                    opt.value +
                                                                    '' +
                                                                    optIndex
                                                                }
                                                                item={opt}
                                                                onHandleOptionChange={
                                                                    onHandleOptionChange
                                                                }
                                                                isSelected={
                                                                    isSelected
                                                                }
                                                                suffix={suffix}
                                                                renderSuffixPrefix={
                                                                    renderSuffixPrefix
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        );
                                    } else {
                                        const isSelected = value.includes(
                                            option.value
                                        );
                                        return (
                                            <MultiSelectItemsCard
                                                key={option.value + '' + index}
                                                item={option}
                                                onHandleOptionChange={
                                                    onHandleOptionChange
                                                }
                                                isSelected={isSelected}
                                                suffix={suffix}
                                                renderSuffixPrefix={
                                                    renderSuffixPrefix
                                                }
                                            />
                                        );
                                    }
                                })}
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <div
                            className={cn(
                                'items-center justify-between p-3 text-sm border-t flex'
                            )}
                        >
                            <div
                                onClick={() => onValueChange([])}
                                className='cursor-pointer hover:underline '
                            >
                                Clear All
                            </div>

                            <div>
                                {value?.length || 0} of {totalOptions}
                            </div>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);

const MultiSelectItemsCard = ({
    item: option,
    index,
    onHandleOptionChange,
    isSelected,
    suffix,
    renderSuffixPrefix,
}: any) => {
    return (
        <CommandItem
            key={option.value + '' + index}
            value={option?.label}
            onSelect={() => onHandleOptionChange(option, isSelected)}
        >
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <div
                        className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                        )}
                    >
                        <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    <div className='flex flex-col'>
                        <span>{option?.label}</span>
                        <span className='text-xs text-muted-foreground'>
                            {option?.subLabel?.(option)}
                        </span>
                    </div>
                </div>
            </div>
            {!!suffix && (
                <div className='flex items-center ml-auto '>
                    {renderSuffixPrefix({
                        option,
                        suffixOrPrefix: suffix,
                    })}
                </div>
            )}
        </CommandItem>
    );
};
