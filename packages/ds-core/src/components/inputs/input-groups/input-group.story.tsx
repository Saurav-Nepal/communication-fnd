import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { MailIcon, SearchIcon, X } from 'lucide-react';

import {
    InputGroup,
    InputGroupButton,
    InputGroupElement,
    InputGroupInput,
} from './input-group';

const meta: Meta<typeof InputGroup> = {
    title: 'Component/Input-Group',
    component: InputGroup,
};

export default meta;

export const Example: StoryFn<typeof InputGroup> = () => {
    return (
        <div className='space-y-4'>
            <InputGroup>
                <InputGroupElement>
                    <MailIcon className='w-4 h-4' />
                </InputGroupElement>
                <InputGroupInput placeholder='Enter your email' />
                <InputGroupButton>Subscribe</InputGroupButton>
            </InputGroup>
            <InputGroup
                color='primary'
                size='lg'
                radius='lg'
                variant='bordered'
            >
                <InputGroupElement>
                    <SearchIcon className='w-5 h-5' />
                </InputGroupElement>
                <InputGroupInput placeholder='Search...' />
                <InputGroupButton color='primary'>Search</InputGroupButton>
            </InputGroup>

            <InputGroup color='info' size='md' radius='md' variant='ghost'>
                <InputGroupElement>
                    <SearchIcon className='w-4 h-4' />
                </InputGroupElement>
                <InputGroupInput placeholder='Search...' />
            </InputGroup>

            <InputGroup hasError>
                <InputGroupInput placeholder='Search...' />
                <InputGroupElement bordered>
                    <SearchIcon className='w-4 h-4' />
                </InputGroupElement>
            </InputGroup>

            <InputGroup
                color='warning'
                size='sm'
                radius='sm'
                variant='underline'
                hasError={true}
            >
                <InputGroupInput placeholder='Search...' />
                <InputGroupButton variant='ghost'>Go</InputGroupButton>
            </InputGroup>
            <InputGroup size='xl'>
                <InputGroupInput placeholder='Search...' />
                <InputGroupElement>
                    <X className='w-4 h-4' />
                </InputGroupElement>
                <InputGroupElement>
                    <SearchIcon className='w-4 h-4' />
                </InputGroupElement>
            </InputGroup>
            <InputGroup
                size='md'
                hasError
                variant={'flat-underline'}
                radius={'lg'}
            >
                <InputGroupInput placeholder='Search...' />
                <InputGroupElement>
                    <SearchIcon className='w-4 h-4' />
                </InputGroupElement>
            </InputGroup>

            <InputGroup>
                <InputGroupInput placeholder='Search...' />
                <InputGroupButton>Go</InputGroupButton>
            </InputGroup>
        </div>
    );
};
