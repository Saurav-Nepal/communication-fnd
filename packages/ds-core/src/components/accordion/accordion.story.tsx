import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Accordion } from './accordion';

import '@storybook/react';

const meta: Meta<typeof Accordion> = {
    title: 'Component/Accordion',
    component: Accordion,
    argTypes: {},
};

export default meta;

export const Single: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

Single.args = {
    defaultValue: 'item-1',
    collapsible: true,
    type: 'single',
    showArrowIcon: true,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is accordion content</p>,
            trigger: <p>This is an accordion trigger</p>,
        },
        {
            key: 'item-2',
            content: <p>This is accordion content</p>,
            trigger: <p>This is an accordion trigger</p>,
        },
        {
            key: 'item-3',
            content: <p>This is accordion content</p>,
            trigger: <p>This is an accordion trigger</p>,
        },
    ],
    onValueChange: () => {},
};

export const Multiple: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

Multiple.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: true,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is a multiple accordion content</p>,
            trigger: <p>This is multiple accordion trigger</p>,
        },
        {
            key: 'item-2',
            content: <p>This is a multiple accordion content</p>,
            trigger: <p>This is multiple accordion trigger</p>,
        },
        {
            key: 'item-3',
            content: <p>This is a multiple accordion content</p>,
            trigger: <p>This is multiple accordion trigger</p>,
        },
    ],
    onValueChange: () => {},
};

export const Connected: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

Connected.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: true,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is a connected accordion content</p>,
            trigger: <p>This is connected accordion trigger</p>,
        },
        {
            key: 'item-2',
            content: <p>This is a connected accordion content</p>,
            trigger: <p>This is connected accordion trigger</p>,
        },
        {
            key: 'item-3',
            content: <p>This is a connected accordion content</p>,
            trigger: <p>This is connected accordion trigger</p>,
        },
    ],
    onValueChange: () => {},
    variant: 'connected',
};

export const Unstyled: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

Unstyled.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: true,
    className: 'w-96',
    isUnstyled: true,
    items: [
        {
            key: 'item-1',
            content: <p>This is a unstyled accordion content</p>,
            trigger: <p>This is unstyled accordion trigger</p>,
        },
        {
            key: 'item-2',
            content: <p>This is a unstyled accordion content</p>,
            trigger: <p>This is unstyled accordion trigger</p>,
        },
        {
            key: 'item-3',
            content: <p>This is a unstyled accordion content</p>,
            trigger: <p>This is unstyled accordion trigger</p>,
        },
    ],
    onValueChange: () => {},
    variant: 'connected',
};

export const HiddenArrow: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

HiddenArrow.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: false,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is a accordion content with hidden arrow</p>,
            trigger: <p>This is accordion trigger with hidden arrow</p>,
        },
        {
            key: 'item-2',
            content: <p>This is a accordion content with hidden arrow</p>,
            trigger: <p>This is accordion trigger with hidden arrow</p>,
        },
        {
            key: 'item-3',
            content: <p>This is a accordion content with hidden arrow</p>,
            trigger: <p>This is accordion trigger with hidden arrow</p>,
        },
    ],
    onValueChange: () => {},
    variant: 'connected',
};

export const Separated: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

Separated.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: true,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is a separated accordion content</p>,
            trigger: <p>This is separated accordion trigger</p>,
        },
        {
            key: 'item-2',
            content: <p>This is a separated accordion content</p>,
            trigger: <p>This is separated accordion trigger</p>,
        },
        {
            key: 'item-3',
            content: <p>This is a separated accordion content</p>,
            trigger: <p>This is separated accordion trigger</p>,
        },
    ],
    onValueChange: () => {},
    variant: 'separated',
};

export const WithImage: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

WithImage.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: true,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is a accordion content with image</p>,
            trigger: (
                <div className='flex items-center gap-3'>
                    <img
                        src='https://via.placeholder.com/16'
                        alt='placeholder'
                    />
                    <p>This is accordion trigger with image</p>
                </div>
            ),
        },
        {
            key: 'item-2',
            content: <p>This is a accordion content with image</p>,
            trigger: (
                <div className='flex items-center gap-3'>
                    <img
                        src='https://via.placeholder.com/16'
                        alt='placeholder'
                    />
                    <p>This is accordion trigger with image</p>
                </div>
            ),
        },
        {
            key: 'item-3',
            content: <p>This is a accordion content with image</p>,
            trigger: (
                <div className='flex items-center gap-3'>
                    <img
                        src='https://via.placeholder.com/16'
                        alt='placeholder'
                    />
                    <p>This is accordion trigger with image</p>
                </div>
            ),
        },
    ],
    onValueChange: () => {},
    variant: 'separated',
};

export const IsRounded: StoryFn<typeof Accordion> = (args) => {
    return <Accordion {...args} />;
};

IsRounded.args = {
    defaultValue: ['item-1'],
    type: 'multiple',
    showArrowIcon: true,
    className: 'w-96',
    items: [
        {
            key: 'item-1',
            content: <p>This is a rounded accordion content </p>,
            trigger: <p>This is rounded accordion trigger</p>,
        },
        {
            key: 'item-2',
            content: <p>This is a rounded accordion content </p>,
            trigger: <p>This is rounded accordion trigger</p>,
        },
        {
            key: 'item-3',
            content: <p>This is a rounded accordion content </p>,
            trigger: <p>This is rounded accordion trigger</p>,
        },
    ],
    onValueChange: () => {},
    variant: 'separated',
    isRounded: true,
};
