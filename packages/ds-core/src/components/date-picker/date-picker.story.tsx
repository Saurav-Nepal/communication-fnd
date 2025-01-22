import React, { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
    title: 'Component/DatePicker',
    component: DatePicker,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof DatePicker> = ({ ...args }) => {
    const [value, setValue] = useState<Date>(new Date());
    return (
        <div className='max-w-fit'>
            <DatePicker
                {...args}
                value={value}
                onChange={(value) => setValue(value)}
            />
        </div>
    );
};
