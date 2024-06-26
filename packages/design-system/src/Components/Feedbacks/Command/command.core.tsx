'use client';

import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

import { DialogProps } from '@radix-ui/react-dialog';

import { cn } from '../../../Utils/common.ui.utils';
import { Loading } from '../../Data-display/Loading/loading.component';
import { Dialog, DialogContent } from '../../Dialogs/Base/dialog.core';

const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            'flex h-full w-full flex-col overflow-hidden rounded-md bg-base-100 text-base-content',
            className
        )}
        {...props}
    />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({
    children,
    full,
    ...props
}: CommandDialogProps & { full?: boolean }) => {
    return (
        <Dialog {...props}>
            <DialogContent
                className='h-screen max-h-screen p-0 overflow-hidden shadow-2xl sm:h-auto'
                size={full ? 'full' : 'md'}
                closeable={full}
            >
                <Command
                    shouldFilter={false}
                    className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-base-secondary [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2'
                    loop
                >
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

interface CommandInputProps
    extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
    wrapperClassName?: string;
}
const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    CommandInputProps
>(({ className, wrapperClassName, ...props }, ref) => (
    <div
        className={cn('flex items-center px-3 border-b', wrapperClassName)}
        cmdk-input-wrapper=''
    >
        {/* <Search className='w-4 h-4 mr-2 opacity-50 shrink-0' /> */}
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                'flex h-11 w-full rounded-md bg-transparent py-3 text-sm font-light outline-none placeholder:text-base-secondary disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn(
            'max-h-full overflow-y-auto overflow-x-hidden',
            className
        )}
        {...props}
    />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className='py-6 text-sm text-center'
        {...props}
    />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            'overflow-hidden p-1 text-base-content [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-base-primary',
            className
        )}
        {...props}
    />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn('-mx-1 h-px bg-base-300', className)}
        {...props}
    />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center text-base-secondary rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-base-200 aria-selected:text-base-content data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        {...props}
    />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                'ml-auto text-xs tracking-widest text-base-secondary',
                className
            )}
            {...props}
        />
    );
};
CommandShortcut.displayName = 'CommandShortcut';

const CommandLoading = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Loading>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ ...props }, ref) => (
    <CommandPrimitive.Loading ref={ref} {...props}>
        <div className='flex items-center justify-center flex-1 h-full py-6'>
            <Loading color='accent' size='md' />
        </div>
    </CommandPrimitive.Loading>
));

CommandLoading.displayName = 'CommandLoading';

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading,
    CommandSeparator,
    CommandShortcut,
};
