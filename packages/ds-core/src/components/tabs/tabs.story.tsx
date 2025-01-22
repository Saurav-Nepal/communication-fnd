import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Label } from '@radix-ui/react-dropdown-menu';

import { Button } from '../button/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../card/card';
import { Input } from '../core/input';
import { AnimatedTabs } from './animated-tabs';
import { NormalTabs } from './normal-tabs';
import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
    title: 'Component/Tabs',
    component: Tabs,
};

export default meta;

export const Example2: StoryFn<typeof Tabs> = () => {
    return <TabsDemo />;
};

export function TabsDemo() {
    const tabData = [
        {
            key: 'tab1',
            name: 'Account',
            component: (
                <Card className='w-[500px]'>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when
                            you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <div className='space-y-1'>
                            <Label>Name</Label>
                            <Input id='name' defaultValue='Pedro Duarte' />
                        </div>
                        <div className='space-y-1'>
                            <Label>UserName</Label>
                            <Input id='username' defaultValue='@peduarte' />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            ),
        },
        {
            key: 'tab2',
            name: 'Password',
            component: (
                <Card className='w-[500px]'>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <div className='space-y-1'>
                            <Label>Password </Label>
                            <Input id='current' type='password' />
                        </div>
                        <div className='space-y-1'>
                            <Label>New password</Label>
                            <Input id='new' type='password' />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            ),
        },
    ];
    const handleTabChange = (key: string) => {
        // eslint-disable-next-line no-console
        console.log(`Tab changed to:`, key);
    };
    return <AnimatedTabs tabData={tabData} onChange={handleTabChange} />;
}

export const NormalTabExample: React.FC = () => {
    const tabData = [
        { key: 'tab1', name: 'Tab 1', component: <div>Content for Tab 1</div> },
        { key: 'tab2', name: 'Tab 2', component: <div>Content for Tab 2</div> },
        { key: 'tab3', name: 'Tab 3', component: <div>Content for Tab 3</div> },
    ];

    const handleTabChange = (key: string) => {
        // eslint-disable-next-line no-console
        console.log(`Tab changed to: ${key}`);
    };

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-2xl font-bold'>Normal Tabs Example</h1>
            <NormalTabs
                tabData={tabData}
                onChange={handleTabChange}
                contentContainerClass='bg-gray-100 p-4 rounded'
            />
        </div>
    );
};
export const NormalTabWithBorderExample: React.FC = () => {
    const tabData = [
        { key: 'tab1', name: 'Tab 1', component: <div>Content for Tab 1</div> },
        { key: 'tab2', name: 'Tab 2', component: <div>Content for Tab 2</div> },
        { key: 'tab3', name: 'Tab 3', component: <div>Content for Tab 3</div> },
    ];

    const handleTabChange = (key: string) => {
        // eslint-disable-next-line no-console
        console.log(`Tab changed to: ${key}`);
    };

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-2xl font-bold'>Normal Tabs Example</h1>
            <NormalTabs
                tabData={tabData}
                onChange={handleTabChange}
                contentContainerClass='bg-card p-4 rounded'
                needBorder
            />
        </div>
    );
};
