import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@slabs/ds-utils';

import { type DialogProps } from '@radix-ui/react-dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Dialog, DialogContent } from './dialog';

const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
    return (
        <CommandPrimitive
            ref={ref}
            className={cn(
                'flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground',
                className
            )}
            {...props}
        />
    );
});
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps
    extends DialogProps,
        Pick<
            React.ComponentProps<typeof CommandPrimitive>,
            'shouldFilter' | 'className'
        > {}

const CommandDialog = React.forwardRef(
    (
        { children, shouldFilter, className, ...props }: CommandDialogProps,
        ref: any
    ) => {
        return (
            <Dialog {...props}>
                <DialogContent
                    className={cn('p-0 overflow-hidden max-w-3xl', className)}
                >
                    <Command
                        className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3'
                        shouldFilter={shouldFilter}
                        ref={ref}
                    >
                        {children}
                    </Command>
                </DialogContent>
            </Dialog>
        );
    }
);

const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div className='flex items-center px-3 border-b' cmdk-input-wrapper=''>
        <MagnifyingGlassIcon className='w-4 h-4 mr-2 opacity-50 shrink-0' />
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                'flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
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
            'max-h-[300px] overflow-y-auto overflow-x-hidden [&_[cmdk-list-sizer]>[cmdk-item]]:mx-1 first:[&_[cmdk-list-sizer]>[cmdk-item]]:mt-1 last:[&_[cmdk-list-sizer]>[cmdk-item]]:mb-1',
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
            'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
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
        className={cn('-mx-1 h-px bg-border', className)}
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
            'relative flex cursor-default aria-selected:bg-secondary/25 items-center px-2 py-1.5 text-sm outline-none aria-selected:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-sm',
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
                'ml-auto text-xs tracking-widest text-muted-foreground',
                className
            )}
            {...props}
        />
    );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
};
