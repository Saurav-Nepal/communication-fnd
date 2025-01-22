import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Button } from '../button/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
    title: 'Component/Card',
    component: Card,
    argTypes: {
        as: {
            type: 'string',
        },
        noBorder: {
            type: 'boolean',
        },
    },
};

export default meta;

export const Example: StoryFn<typeof Card> = ({
    className = 'max-w-[350px]',
    ...args
}) => {
    return (
        <Card className={className} {...args}>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eius consequatur sapiente cumque magni commodi mollitia
                    eaque dolor. Molestias ratione, sint pariatur dolorem
                    asperiores blanditiis ea facilis, deleniti error at et!
                </CardDescription>
            </CardContent>
            <CardFooter>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </CardFooter>
        </Card>
    );
};
export const Example2: StoryFn<typeof Card> = ({
    className = 'max-w-[350px]',
    ...args
}) => {
    return (
        <Card className={className} {...args}>
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                    Deploy your new project in one-click.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eius consequatur sapiente cumque magni commodi mollitia
                    eaque dolor. Molestias ratione, sint pariatur dolorem
                    asperiores blanditiis ea facilis, deleniti error at et!
                </CardDescription>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button variant='outline'>Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    );
};
export const ExampleWithImage: StoryFn<typeof Card> = ({
    className = 'max-w-[350px]',
    ...args
}) => {
    return (
        <Card className={className} {...args}>
            <img src='https://api.lorem.space/image/finance?w=400&h=225' />
            <CardHeader>
                <div className='flex justify-between'>
                    <CardTitle>Product Title</CardTitle>
                    <div className='leading-none tracking-tight text-green-500'>
                        Rs. 1000
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eius consequatur sapiente cumque magni commodi mollitia
                    eaque...
                </CardDescription>
            </CardContent>
            <CardFooter className='flex justify-end'>
                <Button>Add to cart</Button>
            </CardFooter>
        </Card>
    );
};
