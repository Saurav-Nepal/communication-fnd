import React, { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { RadioGroupItem } from './radio';
import { RadioGroup } from './radio-group';
import { RadioIcon } from './radio-icon';

const meta: Meta<typeof RadioGroup> = {
    title: 'Component/radioGroup',
    component: RadioGroup,
    argTypes: {
        options: {
            control: {
                type: 'object',
            },
        },
        value: {
            control: {
                type: 'text',
            },
        },
        onChange: {
            action: 'onChange',
        },
    },
};

export default meta;

export const Example: StoryFn<typeof RadioGroup> = ({ ...args }) => {
    const [value, setValue] = useState(args.value);

    const handleChange = (newValue: any) => {
        console.debug(newValue);
        setValue(newValue);
    };

    return <RadioGroup {...args} value={value} onChange={handleChange} />;
};

Example.args = {
    options: [
        {
            label: 'NFT ',
            value: '1212',
            description: 'This is a description for Nfts',
            error: 'default value should be 1212',
        },
        {
            label: 'Metaverse',
            value: '121222',
            description: 'This is a description',
        },
    ],
    defaultValue: '121222',
    name: 'radio',
    variant: 'error',
    composition: true,
    label: 'Select a category',
    required: true,
};

export const RadioExample: StoryFn<typeof RadioGroupItem> = ({ ...args }) => {
    const [isChecked, setChecked] = useState(false);
    const handleChange = (e: any) => {
        console.debug(e);
        setChecked(e.target.checked);
    };

    return (
        <RadioGroupItem {...args} onChange={handleChange} checked={isChecked} />
    );
};

RadioExample.args = {
    label: 'NFT ',
    value: '1212',
    description: 'This is a description for Nfts',
    error: 'default value should be 1212',
    icon: RadioIcon,
};
