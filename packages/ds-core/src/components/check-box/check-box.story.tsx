import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { CheckBox } from './check-box';

const meta: Meta<typeof CheckBox> = {
    title: 'Component/CheckBox',
    component: CheckBox,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof CheckBox> = ({ ...args }) => {
    const [isChecked, setIsChecked] = React.useState(args.checked);
    const [isCheck2, setIsCheck2] = React.useState(args.checked);
    const handleChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const handleChange2 = (checked: boolean) => {
        setIsCheck2(checked);
    };

    return (
        <div className='flex flex-col gap-3 '>
            {' '}
            <CheckBox
                {...args}
                checked={isChecked}
                onChange={handleChange}
            />{' '}
            <CheckBox
                {...args}
                checked={isCheck2}
                onChange={handleChange2}
                type='filled'
                variant='success'
            />{' '}
            <CheckBox {...args} isIndeterminate={true} variant='default' />
        </div>
    );
};
Example.args = {
    variant: 'error',
    size: 'md',
};
