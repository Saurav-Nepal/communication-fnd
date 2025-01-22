import '@storybook/react';

import React from 'react';

import type { Meta } from '@storybook/react';

import { ColorPickerInput } from './color-picker-input';

const meta: Meta<typeof ColorPickerInput> = {
    title: 'Component/ColorPickerInput',
    component: ColorPickerInput,
};

export default meta;

export const Default = () => <ColorPickerInput />;
