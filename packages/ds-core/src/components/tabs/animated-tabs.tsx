import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@slabs/ds-utils';

import { NormalTabsProps } from './normal-tabs';
import { useTabs } from './tab-hook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

interface AnimatedTabsProps
    extends Omit<NormalTabsProps, 'needBorder'>,
        VariantProps<typeof triggerVariants> {}

export const triggerVariants = cva('', {
    variants: {
        size: {
            sm: 'text-sm h-6 px-1',
            md: 'text-sm h-7 px-2',
            lg: 'text-base h-8 px-3',
            xs: 'text-xs h-5 px-0.5',
            xl: 'text-lg h-10 px-4',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export const listVariants = cva('', {
    variants: {
        size: {
            sm: 'h-9 px-3',
            lg: 'h-11 px-[18px]  ',
            xl: 'h-13  px-6  ',
            md: 'py-1  px-2',
            xs: 'h-8  px-2',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const AnimatedTabs = ({
    tabData,
    onChange,
    contentContainerClass,
    listClassName,
    triggerClassName,
    fullWidth = true,
    size,
}: AnimatedTabsProps) => {
    const { tabs, onTabChange, activeTabKey } = useTabs({
        tabs: tabData,
        defaultActiveTabKey: tabData[0]?.key ?? '',
        onTabChange: onChange,
    });

    const sizeClass = triggerVariants({ size });
    const listSizeClass = listVariants({ size });

    return (
        <Tabs value={activeTabKey}>
            <TabsList
                className={cn(
                    { 'justify-start w-full': fullWidth },
                    listSizeClass,
                    listClassName
                )}
            >
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.key}
                        value={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={cn(
                            {
                                'flex items-center gap-2 ': tab.icon,
                            },
                            sizeClass,
                            triggerClassName
                        )}
                    >
                        {tab.icon}
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent
                    key={tab.key}
                    value={tab.key}
                    className={cn('mt-4', contentContainerClass)}
                >
                    {tab.component}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export { AnimatedTabs };
