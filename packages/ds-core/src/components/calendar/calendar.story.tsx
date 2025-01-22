import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { CustomCalendar } from './calendar';

const meta: Meta<typeof CustomCalendar> = {
    title: 'Component/Calendar',
    component: CustomCalendar,
    argTypes: {
        tag: {
            type: 'string',
            table: {
                defaultValue: { summary: 'button' },
            },
        },
    },
};

export default meta;

export const Example: StoryFn<typeof CustomCalendar> = ({ ...args }) => {
    const [date, setDate] = React.useState<Date>();
    const onDateChange = (date: Date) => {
        setDate(date);
    };

    return (
        <div className='max-w-fit'>
            <CustomCalendar
                showTimeInput={true}
                {...args}
                value={date}
                onDateChange={onDateChange}
            />
        </div>
    );
};
