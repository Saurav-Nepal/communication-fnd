import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import {
    PolymorphicComponent,
    polymorphicFactory,
} from './polymorphic-component';

const meta: Meta<typeof PolymorphicComponent> = {
    title: 'Others/PolymorphicComponent',
    component: PolymorphicComponent,
    argTypes: {
        as: {
            type: 'string',
        },
    },
};

export default meta;

export const Example: StoryFn<typeof PolymorphicComponent> = ({
    as = 'div',
    ...args
}) => {
    return <PolymorphicComponent as={as} {...args} />;
};

Example.args = {
    className: 'p-2 bg-red-400',
    children: 'Div Example',
};

const Button = polymorphicFactory<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }
>(({ as = 'button', ...props }, ref) => {
    return <PolymorphicComponent as={as} {...props} ref={ref} />;
});

export const PolymorphicButton: StoryFn<typeof Button> = ({ ref, ...args }) => {
    return <Button ref={ref as any} {...args} />;
};

PolymorphicButton.args = {
    className: 'py-2 px-4 bg-primary text-primary-foreground',
    children: 'Button Example',
};
