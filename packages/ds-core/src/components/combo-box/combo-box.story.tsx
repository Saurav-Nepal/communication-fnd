import React from 'react';

import { cn } from '@slabs/ds-utils';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Meta } from '@storybook/react';

import { Button } from '../button/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '../core/command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';

const meta: Meta<typeof Command> = {
    title: 'Component/ComboBox',
    component: Command,
    argTypes: {},
};

const frameworks = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
];

export const Example = () => {
    const [isOpen, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    return (
        <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={isOpen}
                    className='w-[200px] justify-between'
                >
                    {value
                        ? frameworks.find(
                              (framework) => framework.value === value
                          )?.label
                        : 'Select framework...'}
                    <CaretSortIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder='Search framework...'
                        className='h-9'
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ''
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}
                            >
                                {framework.label}
                                <CheckIcon
                                    className={cn(
                                        'ml-auto h-4 w-4',
                                        value === framework.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default meta;
