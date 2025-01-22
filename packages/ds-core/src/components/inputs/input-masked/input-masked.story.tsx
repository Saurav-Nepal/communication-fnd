import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { InputMasked } from './input-mask';

/**
 * @description : The docs for  input masked cleave we are using is here https://github.com/nosir/cleave.js
 */

const meta: Meta<typeof InputMasked> = {
    title: 'Component/InputMask',
    component: InputMasked,
};

export default meta;

export const Example: StoryFn<typeof InputMasked> = (args) => {
    return (
        <div className='flex items-center justify-center w-full'>
            <InputMasked {...args} />
        </div>
    );
};

Example.args = {
    readOnly: false,
    options: {
        creditCard: true,
    },
    type: 'text',
    placeholder: '0000 0000 0000 0000',
    variant: 'flat-underline',
    color: 'success',
    size: 'lg',
};
