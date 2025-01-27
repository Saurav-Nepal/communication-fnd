import * as React from 'react';

import { useUncontrolled } from '@slabs/ds-hooks';
import { cn, isEmptyArray, isFunction } from '@slabs/ds-utils';

import { CaretSortIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

import { Button } from '../button/button';
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../core/command';
import { inputVariants } from '../inputs/input/input.types';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import {
    GroupOptionsType,
    selectBoxHoverStyles,
    selectBoxItemsSize,
    SelectBoxOptionType,
    SelectBoxProps,
    SuffixPrefixOptionType,
} from './select-box.types';

export const SelectBox = React.forwardRef<HTMLDivElement, SelectBoxProps>(
    (
        {
            id,
            disabled,
            options,
            value: valueProps,
            defaultValue,
            className,
            onChange,
            onOptionChange,
            placeholder = 'Select options...',
            isSearchable = true,
            onSearchValue,
            searchValue,
            suffix,
            prefix,
            onCreateNew,
            isClearable,
            createNewLabel = 'Create New',
            variants = {
                variant: 'bordered',
                size: 'md',
                radius: 'sm',
                color: 'default',
            },
            isUnSelectable,
            formatGroupLabel,
            isLoading,
            footerComponent,
            hasError,
            noDataComponent,
            labelClassName,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = React.useState<boolean>(false);
        const [searchTerm, setSearchTerm] = React.useState<string>(
            searchValue ?? ''
        );

        const onHandleChange = React.useCallback(
            (value: typeof valueProps) => {
                onChange?.(value);
                const selectedOption = options
                    ?.flatMap((option) =>
                        'options' in option ? option.options : [option]
                    )
                    .find((option) => option.value === value);
                onOptionChange?.(selectedOption);
            },
            [onChange, onOptionChange, options]
        );

        const inputRef = React.useCallback((node: any) => {
            if (node !== null) {
                setTimeout(() => node.focus(), 50);
            }
        }, []);

        const [value, onValueChange] = useUncontrolled({
            value: valueProps,
            defaultValue,
            onChange: onHandleChange,
        });

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

        const canClear = React.useMemo(() => {
            return isClearable && !!value;
        }, [isClearable, value]);

        const displayValue = React.useMemo(() => {
            if (value) {
                const option = options
                    ?.flatMap((opt) => ('options' in opt ? opt.options : [opt]))
                    .find((option) => option.value === value);

                if (!option) return;
                return option.label;
            }
        }, [value, options]);

        const filteredOptions = React.useMemo(() => {
            const searchFilter = (option: SelectBoxOptionType) =>
                option.label?.toLowerCase().includes(searchTerm.toLowerCase());

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

        return (
            <Popover
                open={isOpen}
                onOpenChange={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) setSearchTerm('');
                }}
            >
                <PopoverTrigger disabled={disabled} asChild>
                    <Button
                        variant={'ghost'}
                        role='input-list'
                        aria-expanded={isOpen}
                        className={cn(
                            'justify-between w-full border border-input ',
                            inputVariants({
                                variant: variants.variant,
                                color: variants.color,
                                size: variants.size,
                                radius: variants.radius,
                                hasError,
                            }),
                            'hover:bg-transparent disabled:bg-inherit',
                            selectBoxHoverStyles[variants.color ?? 'default'],
                            className
                        )}
                        disabled={disabled}
                        id={id}
                    >
                        {displayValue ?? (
                            <span
                                className={cn('text-muted-foreground', {
                                    'text-error': hasError,
                                })}
                            >
                                {placeholder}
                            </span>
                        )}
                        <div className='flex items-center'>
                            {canClear && (
                                <Cross1Icon
                                    className='w-4 font-bold opacity-50 hover:text-error hover:opacity-100'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onValueChange('');
                                    }}
                                />
                            )}
                            <CaretSortIcon className='ml-2 w-4 h-4 opacity-50 shrink-0' />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    ref={ref}
                    className='w-[var(--radix-popover-trigger-width)] p-0'
                >
                    <Command className='rounded-md'>
                        {isSearchable && (
                            <CommandInput
                                placeholder='Search Option...'
                                className='h-9'
                                onValueChange={(val) => {
                                    setSearchTerm(val);
                                    onSearchValue?.(val);
                                }}
                                autoFocus
                                ref={inputRef}
                                value={searchTerm}
                            />
                        )}

                        {!isLoading && isEmptyArray(filteredOptions) && (
                            <>
                                {noDataComponent ?? (
                                    <span className='flex justify-center p-4 text-sm text-secondary-foreground'>
                                        No Data Found.
                                    </span>
                                )}
                            </>
                        )}
                        {isLoading && (
                            <span className='flex justify-center p-4 text-sm text-secondary'>
                                Loading ...
                            </span>
                        )}

                        {!isLoading && (
                            <CommandList>
                                {filteredOptions?.map((option, index) =>
                                    'options' in option ? (
                                        <CommandGroup
                                            key={`${index}+${option.label}`}
                                            className='overflow-y-auto'
                                            heading={
                                                formatGroupLabel?.(option) ?? (
                                                    <span className='text-sm text-primary'>
                                                        {option.label}
                                                    </span>
                                                )
                                            }
                                        >
                                            {option.options.map(
                                                (opt, optIndex) => (
                                                    <ItemsCard
                                                        key={
                                                            opt.value +
                                                            '' +
                                                            optIndex
                                                        }
                                                        item={opt}
                                                        index={optIndex}
                                                        value={value}
                                                        onValueChange={
                                                            onValueChange
                                                        }
                                                        renderSuffixPrefix={
                                                            renderSuffixPrefix
                                                        }
                                                        prefix={prefix}
                                                        suffix={suffix}
                                                        setIsOpen={setIsOpen}
                                                        isUnSelectable={
                                                            isUnSelectable
                                                        }
                                                        isClearable={
                                                            isClearable
                                                        }
                                                        size={variants.size}
                                                        labelClassName={
                                                            labelClassName
                                                        }
                                                    />
                                                )
                                            )}
                                        </CommandGroup>
                                    ) : (
                                        <ItemsCard
                                            key={option.value + '' + index}
                                            item={option}
                                            index={index}
                                            value={value}
                                            onValueChange={onValueChange}
                                            renderSuffixPrefix={
                                                renderSuffixPrefix
                                            }
                                            prefix={prefix}
                                            suffix={suffix}
                                            setIsOpen={setIsOpen}
                                            isUnSelectable={isUnSelectable}
                                            isClearable={isClearable}
                                            size={variants.size}
                                            labelClassName={labelClassName}
                                        />
                                    )
                                )}
                            </CommandList>
                        )}

                        {isFunction(onCreateNew) ? (
                            <div
                                className={cn(
                                    'flex justify-center p-2 w-full text-sm text-center border-t hover:cursor-pointer hover:bg-muted'
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCreateNew();
                                    setIsOpen(false);
                                }}
                            >
                                + {createNewLabel}
                            </div>
                        ) : (
                            footerComponent
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);
const ItemsCard = ({
    item: opt,
    index: optIndex,
    isUnSelectable = false,
    value,
    onValueChange,
    renderSuffixPrefix,
    prefix,
    suffix,
    setIsOpen,
    isClearable = true,
    size,
    labelClassName,
}: any) => {
    return (
        <CommandItem
            key={opt.value + '' + optIndex}
            value={opt.label}
            onSelect={() => {
                if (isUnSelectable && value === opt.value && isClearable) {
                    onValueChange('');
                    return;
                }
                onValueChange(opt.value);
                setIsOpen(false);
            }}
            className={cn(
                {
                    'bg-primary text-primary-foreground aria-selected:bg-primary  w-fit aria-selected:text-primary-foreground':
                        value === opt.value,
                },
                selectBoxItemsSize[size as 'sm' | 'md' | 'lg' | 'xl']
            )}
            disabled={opt?.disabled}
        >
            {renderSuffixPrefix({
                option: opt,
                suffixOrPrefix: prefix,
            })}
            <div className='flex flex-col'>
                <span className={labelClassName}>{opt.label}</span>
                {!!opt.subLabel && (
                    <span className='text-xs text-muted-foreground'>
                        {opt.subLabel?.(opt)}
                    </span>
                )}
            </div>
            <div className='flex items-center ml-auto'>
                <CheckIcon
                    className={cn(
                        'h-4 w-4',
                        value === opt.value ? 'opacity-100' : 'opacity-0'
                    )}
                />
                {renderSuffixPrefix({
                    option: opt,
                    suffixOrPrefix: suffix,
                })}
            </div>
        </CommandItem>
    );
};
