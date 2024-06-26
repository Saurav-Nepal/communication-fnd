'use client';

import { ChevronDown, SearchIcon, X } from 'lucide-react';
import {
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';

import { GetObjectFromArray, IsFunction, SelectBoxOption } from '@finnoto/core';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

import { cn, IsValidString } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Tooltip } from '../../Data-display/Tooltip/Tooltip.component';
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../Feedbacks/Command/command.core';
import {
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
} from '../../Surfaces/Popover/popover.core';

export interface SelectableDropdownMenuProps
    extends Pick<DropdownMenuContentProps, 'align' | 'side'> {
    options: SelectableDropdownMenuActionProps[];
    value?: string | number;
    children?:
        | React.ReactNode
        | ((options: {
              value: any;
              displayLabel: string;
              options: SelectableDropdownMenuActionProps[];
          }) => React.ReactNode);
    className?: string;
    searchPlaceholder?: string;
    customDisplay?: ReactNode | string;
    // autoWidth?: boolean;
    // onClick?: (val: any, data?: any) => void;

    params?: any; // If you want to send something while clicking to the action

    asChild?: boolean;
    autoFocus?: boolean;
    onChange?: (option: SelectableDropdownMenuActionProps) => void;
    placeholder?: string;
    footer?: ReactNode | string;
    isSearchDisable?: boolean;
    disableClear?: boolean;

    // trigger?: 'click' | 'hover' | 'focus';
    // usePortal?: boolean;
}

interface SelectableDropdownMenuActionProps extends SelectBoxOption {
    rightIcon?: React.ReactNode;
    tooltip?: boolean;
}

export const SelectableDropdownMenu = forwardRef(
    (
        {
            options = [],
            side,
            align,

            params,
            className,
            asChild = true,

            value,
            onChange,
            placeholder,
            footer,
            searchPlaceholder,
            isSearchDisable,
            customDisplay,
            disableClear,
            children,
        }: SelectableDropdownMenuProps,
        ref: any
    ) => {
        const [search, setSearch] = useState('');
        const [open, setOpen] = useState<boolean>();

        const filterOptions = useMemo(() => {
            if (!IsValidString(search)) return options;

            return options.filter((option) =>
                option?.label?.toLowerCase().includes(search.toLowerCase())
            );
        }, [search, options]);

        const handleOpen = (isOpen: boolean) => {
            setOpen(isOpen);
        };
        useImperativeHandle(
            ref,
            () => {
                return {
                    handleOpen,
                    handleClose: () => setOpen(false),
                };
            },
            []
        );
        const displayLabel = useMemo(() => {
            if (customDisplay) return customDisplay;
            if (!value) return value;
            return GetObjectFromArray(options, 'value', value)?.label;
        }, [customDisplay, options, value]);

        const renderChildren = useCallback(() => {
            if (IsFunction(children))
                return children({ value, displayLabel, options });
            return children;
        }, [children, value, displayLabel, options]);

        return (
            <PopoverRoot open={open} onOpenChange={handleOpen}>
                <PopoverTrigger asChild={asChild}>
                    {children ? (
                        renderChildren()
                    ) : (
                        <div
                            className={cn(
                                'items-center justify-between text-base-primary h-[42px] p-2 text-sm bg-base-100 border hover:border-neutral rounded gap-1 min-w-[200px] row-flex dark:border-dark-primary dark:hover:border-dark-hover transition-all',
                                className
                            )}
                        >
                            {displayLabel ? (
                                <div className='items-center gap-1 row-flex'>
                                    {displayLabel}
                                </div>
                            ) : (
                                <span className='text-base-secondary'>
                                    {placeholder || 'Select...'}
                                </span>
                            )}
                            <div className='items-center row-flex'>
                                {value && !disableClear && (
                                    <X
                                        size={20}
                                        className='cursor-pointer text-error'
                                        onClick={() => {
                                            onChange(undefined);
                                        }}
                                    />
                                )}
                                <div className='items-center gap-1 p-2 pr-0 row-flex'>
                                    <div className=' border-l-[1px] h-[20px] '></div>
                                    <ChevronDown className=' text-base-tertiary' />
                                </div>
                            </div>
                        </div>
                    )}
                </PopoverTrigger>
                <PopoverContent
                    className={cn('min-w-[220px] p-2 py-0 z-[49]')}
                    side={side}
                    align={align}
                >
                    <Command>
                        {!isSearchDisable && (
                            <div className='relative items-center row-flex '>
                                <SearchIcon
                                    size={20}
                                    className='absolute text-base-tertiary left-2'
                                />
                                <CommandInput
                                    className='px-4 pl-8 h-[40px] border '
                                    placeholder={
                                        searchPlaceholder || 'Search...'
                                    }
                                    value={search}
                                    onValueChange={setSearch}
                                    wrapperClassName='px-0 border-b-0 w-full '
                                />
                            </div>
                        )}
                        <CommandEmpty>No data found.</CommandEmpty>

                        <DropdownMenuItemList
                            onChange={(value) => {
                                setOpen(false);
                                onChange?.(value);
                            }}
                            options={filterOptions}
                            params={params}
                            selected={value}
                        />
                    </Command>

                    {footer && <div className='w-full'>{footer}</div>}
                </PopoverContent>
            </PopoverRoot>
        );
    }
);

const DropdownMenuItemList = ({
    options,
    params,
    onChange,
    selected,
}: {
    options: SelectableDropdownMenuActionProps[];
    params?: any;
    onChange?: (value: any) => void;
    selected?: string | number;
}) => {
    const renderRightIcon = useCallback(
        (option: SelectableDropdownMenuActionProps, isSelected?: boolean) => {
            if (!option?.rightIcon) return;
            if (option?.tooltip)
                return (
                    <Tooltip
                        asChild={false}
                        message={option?.tooltip}
                        className='text-base-primary'
                    >
                        <Icon
                            source={option.rightIcon as any}
                            size={option?.iconSize || 20}
                            isSvg={option?.isSvg || true}
                            className={cn(
                                'text-base-primary/20 group-hover:text-base-primary group-aria-selected:text-base-primary ',
                                {
                                    'text-white group-hover:text-white group-aria-selected:text-white aria-selected:text-base-primary':
                                        isSelected,
                                }
                            )}
                        />
                    </Tooltip>
                );
            return (
                <Icon
                    source={option.rightIcon as any}
                    size={option?.iconSize || 20}
                    isSvg={option?.isSvg || true}
                    className={cn(
                        'text-base-300 group-hover:text-base-primary group-aria-selected:text-base-primary ',
                        {
                            'text-base-primary group-hover:text-base-100 aria-selected:text-base-primary':
                                isSelected,
                        }
                    )}
                />
            );
        },
        []
    );

    return (
        <CommandList className='py-2 rounded  col-flex min-w-[150px] max-h-[500px] overflow-y-auto'>
            {options.map((option) => {
                const isSelected = option?.value === selected;

                return (
                    <CommandItem
                        className={cn(
                            'items-center  hover:bg-base-200  cursor-pointer p-2 text-base-primary  rounded justify-between group row-flex',
                            {
                                'bg-primary  aria-selected:bg-primary aria-selected:text-primary-content text-primary-content ':
                                    isSelected,
                            }
                        )}
                        key={option?.value}
                        value={option.value as string}
                        onSelect={() => {
                            if (isSelected) return;
                            onChange?.(option);
                        }}
                    >
                        <span> {option?.label}</span>
                        {renderRightIcon(option, isSelected)}
                    </CommandItem>
                );
            })}
        </CommandList>
    );
};
