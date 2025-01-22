import React, { useState } from 'react';
import { SunIcon } from 'lucide-react';

import { Meta, StoryFn } from '@storybook/react';

import { SelectBoxValueType } from '../select-box/select-box.types';
import { Typography } from '../typography/typography';
import { SelectBox } from './select-box';

const meta: Meta<typeof SelectBox> = {
    title: 'Component/SelectBox',
    component: SelectBox,
    argTypes: {
        options: [
            {
                value: 1,
                label: 'Next.js',
                // subLabel: 'Great React framework',
            },
            {
                value: 2,
                label: 'SvelteKit',
            },
            {
                value: 3,
                label: 'Nuxt.js',
            },
            {
                value: 4,
                label: 'Remix',
            },
            {
                value: 5,
                label: 'Astro',
            },
        ],
    },
};

export default meta;

export const Example: StoryFn<typeof SelectBox> = ({ ...args }) => {
    const [value, setValue] = useState<SelectBoxValueType>();
    const [searchValue, setSearchValue] = useState<string>();
    return (
        <div className='flex flex-col w-full gap-1 '>
            <Typography variant={'info'} weight={'medium'}>
                Your favorite libraries
            </Typography>
            <SelectBox
                className='max-w-[300px]'
                {...args}
                value={value}
                onChange={(value) => setValue(value)}
                searchValue={searchValue}
                onSearchValue={setSearchValue}
                isSearchable
                isClearable
                options={[
                    {
                        value: 333,
                        label: 'SvelteKit2',
                    },
                    {
                        options: [
                            {
                                value: 1,
                                label: 'Next.js',
                            },
                            {
                                value: 2,
                                label: 'SvelteKit',
                            },
                        ],
                        label: 'Frontend',
                        // subLabel: 'Great React framework',
                    },
                    {
                        options: [
                            {
                                value: 7,
                                label: 'Nuxt.js',
                            },
                            {
                                value: 8,
                                label: 'Nest Js',
                            },
                            {
                                value: 9,
                                label: 'Django',
                            },
                        ],
                        label: 'Backend',
                        // subLabel: 'Great React framework',
                    },
                ]}
                isUnSelectable={true}
            />
        </div>
    );
};
export const SearchableExample: StoryFn<typeof SelectBox> = ({ ...args }) => {
    const [value, setValue] = useState<SelectBoxValueType>();
    const [searchValue, setSearchValue] = useState<string>();
    return (
        <div className='flex flex-col w-full gap-1 '>
            <Typography variant={'info'} weight={'medium'}>
                Searchable Example
            </Typography>
            <SelectBox
                searchValue={searchValue}
                onSearchValue={setSearchValue}
                isSearchable
                className='max-w-[300px]'
                {...args}
                value={value}
                onChange={(value) => setValue(value)}
                options={[
                    {
                        value: 1,
                        label: 'Next.js',
                        // subLabel: 'Great React framework',
                    },
                    {
                        value: 2,
                        label: 'SvelteKit',
                    },
                    {
                        value: 3,
                        label: 'Nuxt.js',
                    },
                    {
                        value: 4,
                        label: 'Remix',
                    },
                    {
                        value: 5,
                        label: 'Astro',
                    },
                ]}
            />
        </div>
    );
};
export const ExampleWithIcon: StoryFn<typeof SelectBox> = ({ ...args }) => {
    const [value, setValue] = useState<SelectBoxValueType>();
    const [searchValue, setSearchValue] = useState<string>();
    return (
        <div className='flex flex-col w-full gap-1 '>
            <Typography variant={'info'} weight={'medium'}>
                Searchable Example
            </Typography>
            <SelectBox
                suffix={<SunIcon />}
                prefix={() => <SunIcon />}
                searchValue={searchValue}
                onSearchValue={setSearchValue}
                isSearchable
                className='max-w-[300px]'
                {...args}
                value={value}
                onChange={(value) => setValue(value)}
                options={[
                    {
                        value: 1,
                        label: 'Next.js',
                        // subLabel: 'Great React framework',
                    },
                    {
                        value: 2,
                        label: 'SvelteKit',
                    },
                    {
                        value: 3,
                        label: 'Nuxt.js',
                    },
                    {
                        value: 4,
                        label: 'Remix',
                    },
                    {
                        value: 5,
                        label: 'Astro',
                    },
                ]}
            />
        </div>
    );
};
