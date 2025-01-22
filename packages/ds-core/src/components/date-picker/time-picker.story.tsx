import React, { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { format } from 'date-fns';

import { TimePicker } from './time-picker';

const meta: Meta<typeof TimePicker> = {
    title: 'Component/TimePicker',
    component: TimePicker,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof TimePicker> = ({ ...args }) => {
    const [value, setValue] = useState<any>(format(new Date(), 'HH:mm'));
    return (
        <div className='max-w-fit'>
            <TimePicker
                {...args}
                value={value}
                onChange={(value) => setValue(value)}
            />
        </div>
    );
};
