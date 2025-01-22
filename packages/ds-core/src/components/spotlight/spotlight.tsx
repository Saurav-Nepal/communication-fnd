import React, { forwardRef, useMemo } from 'react';
import { MoveRight } from 'lucide-react';

import { useUncontrolled } from '@slabs/ds-hooks';
import { cn } from '@slabs/ds-utils';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../core/command';
import { Typography } from '../typography/typography';
import { useSpotlight } from './use-spotlight';

type SpotlightProps = {
    children: React.ReactNode;
    trigger?: React.ReactNode;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    disableFilter?: boolean;
    keys?: string[];
    onOpen?: (e: KeyboardEvent) => void;
    onClose?: () => void;
};

export const Spotlight = React.forwardRef(
    (
        {
            children,
            trigger,
            isOpen,
            setIsOpen,
            disableFilter,
            keys = ['mod+k'],
            onClose,
            onOpen,
        }: SpotlightProps,
        ref
    ) => {
        const props = useSpotlight({
            isOpen,
            setIsOpen,
            keys,
            onOpen,
            onClose,
        });

        return (
            <>
                {trigger}
                <CommandDialog
                    shouldFilter={!disableFilter}
                    open={props.isOpen}
                    onOpenChange={(open) => {
                        props.setIsOpen(open);

                        if (open && onOpen)
                            onOpen(new KeyboardEvent('keydown'));

                        if (!open && onClose) onClose();
                    }}
                    ref={ref}
                    modal
                >
                    {children}
                </CommandDialog>
            </>
        );
    }
);

export const SpotlightInput = ({
    placeholder = 'What do you need?',
    onChange,
    value,
}: {
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
}) => {
    const [search, setSearch] = useUncontrolled({
        defaultValue: '',
        value,
        onChange,
    });

    return (
        <CommandInput
            {...{ placeholder }}
            value={search}
            onValueChange={setSearch}
        />
    );
};

export const SpotlightList = forwardRef(
    ({ children }: { children: React.ReactNode }, ref: any) => {
        return <CommandList ref={ref}>{children}</CommandList>;
    }
);

export const SpotlightGroup = ({
    children,
    heading,
}: {
    children: React.ReactNode;
    heading: string;
}) => {
    return <CommandGroup heading={heading}>{children}</CommandGroup>;
};

export const SpotlightItem = ({
    onClick,
    title,
    subtitle,
    icon = MoveRight,
    iconSize = 20,
}: {
    onClick: () => void;
    title: string | React.ReactNode | string[];
    subtitle?: string;
    icon?: any;
    iconSize?: number;
}) => {
    const Icon = icon;

    const nestedTitle = useMemo(() => {
        if (Array.isArray(title)) {
            return title.map((t, i) => (
                <span className='flex items-center'>
                    {i > 0 && (
                        <Icon
                            className='mr-1.5'
                            width={iconSize - 4}
                            height={iconSize - 4}
                        />
                    )}
                    <Typography key={i} size='md'>
                        {t}
                    </Typography>
                </span>
            ));
        }

        return <Typography size='md'>{title}</Typography>;
    }, [title]);

    return (
        <CommandItem
            className={cn({ 'py-1.5': !!subtitle })}
            onSelect={onClick}
        >
            <Icon className='mr-2' width={iconSize} height={iconSize} />
            <div>
                <div className='flex gap-2'>{nestedTitle}</div>
                {subtitle && <Typography size='sm'>{subtitle}</Typography>}
            </div>
        </CommandItem>
    );
};

export const SpotlightEmpty = ({
    hidden = false,
    text,
}: {
    hidden?: boolean;
    text?: string;
}) => {
    return (
        <CommandEmpty hidden={hidden}>
            {text || 'No results found.'}
        </CommandEmpty>
    );
};
