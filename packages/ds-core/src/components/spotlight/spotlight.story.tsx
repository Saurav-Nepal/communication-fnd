import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { ArrowRight, SearchIcon } from 'lucide-react';

import { useBoolean, useOs } from '@slabs/ds-hooks';

import {
    InputGroup,
    InputGroupElement,
    InputGroupInput,
} from '../inputs/input-groups/input-group';
import {
    Spotlight,
    SpotlightEmpty,
    SpotlightGroup,
    SpotlightInput,
    SpotlightItem,
    SpotlightList,
} from './spotlight';

const meta: Meta<typeof Spotlight> = {
    title: 'Component/Spotlight',
    component: Spotlight,
};

export default meta;

const List = () => {
    return (
        <SpotlightList>
            <SpotlightEmpty />
            <SpotlightGroup heading='Menus'>
                <SpotlightItem
                    icon={ArrowRight}
                    title={['Appliation Modules 1', 'Subtitle', 'Subtitle 4']}
                    onClick={() => {}}
                />
                <SpotlightItem
                    icon={ArrowRight}
                    title='Appliation Modules 2'
                    onClick={() => {}}
                />
                <SpotlightItem
                    icon={ArrowRight}
                    title='Appliation Modules 3'
                    onClick={() => {}}
                />
                <SpotlightItem
                    icon={ArrowRight}
                    title='Appliation Modules 4'
                    onClick={() => {}}
                />
            </SpotlightGroup>
        </SpotlightList>
    );
};

export const Example: StoryFn<typeof Spotlight> = () => {
    const [isOpen, setIsOpen] = useBoolean(false);
    const os = useOs();

    return (
        <Spotlight
            trigger={
                <InputGroup
                    onClick={() => setIsOpen(true)}
                    className='w-[300px]'
                >
                    <InputGroupElement>
                        <SearchIcon size={12} />
                    </InputGroupElement>
                    <InputGroupInput placeholder='Search...' />
                    <InputGroupElement className='text-xs text-muted-foreground'>
                        {os === 'macos' ? '⌘' : 'Ctrl'} + K
                    </InputGroupElement>
                </InputGroup>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <SpotlightInput placeholder='What do you need?' />
            <List />
        </Spotlight>
    );
};

Example.args = {};

export const WithoutTrigger: StoryFn<typeof Spotlight> = () => {
    const [isOpen, setIsOpen] = useBoolean(false);

    return (
        <Spotlight isOpen={isOpen} setIsOpen={setIsOpen}>
            <SpotlightInput placeholder='What do you need?' />
            <List />
        </Spotlight>
    );
};

export const CustomKeys: StoryFn<typeof Spotlight> = () => {
    const [isOpen, setIsOpen] = useBoolean(false);
    const os = useOs();

    return (
        <Spotlight
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
                <InputGroup
                    onClick={() => setIsOpen(true)}
                    className='w-[300px]'
                >
                    <InputGroupElement>
                        <SearchIcon size={12} />
                    </InputGroupElement>
                    <InputGroupInput placeholder='Search...' />
                    <InputGroupElement className='text-xs text-muted-foreground'>
                        {os === 'macos' ? '⌘' : 'Ctrl'} + Shift + K
                    </InputGroupElement>
                </InputGroup>
            }
            keys={['mod+shift+k']}
        >
            <SpotlightInput placeholder='What do you need?' />
            <List />
        </Spotlight>
    );
};
