import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
    title: 'Component/Slider',
    component: Slider,
};

export default meta;

export const Example2: StoryFn<typeof Slider> = () => {
    return <Slider defaultValue={[50]} max={100} step={1} />;
};
