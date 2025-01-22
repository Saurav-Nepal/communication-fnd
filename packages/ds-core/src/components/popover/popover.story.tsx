import React from 'react';

import { Meta } from '@storybook/react';

import { Button } from '../button/button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta: Meta<typeof Popover> = {
    title: 'Component/Popover',
    component: Popover,
    argTypes: {},
};

export const Example = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
    );
};

export default meta;
