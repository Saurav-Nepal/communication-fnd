import React, { useEffect, useRef, useState } from 'react';
import { VariantProps } from 'class-variance-authority';

import { cn } from '@slabs/ds-utils';

import { listVariants, triggerVariants } from './animated-tabs';
import { TabProps, useTabs } from './tab-hook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

export interface NormalTabsProps extends VariantProps<typeof triggerVariants> {
    tabData: TabProps[];
    onChange?: (key: string) => void;
    contentContainerClass?: string;
    needBorder?: boolean;
    listClassName?: string;
    triggerClassName?: string;
    fullWidth?: boolean;
    [key: string]: any;
}

const NormalTabs: React.FC<NormalTabsProps> = ({
    tabData,
    onChange,
    contentContainerClass,
    needBorder = false,
    listClassName,
    triggerClassName,
    fullWidth = false,
    size,
    ...props
}) => {
    const { tabs, onTabChange, activeTabKey } = useTabs({
        tabs: tabData,
        defaultActiveTabKey: tabData[0]?.key ?? '',
        onTabChange: onChange as any,
    });

    const [activePosition, setActivePosition] = useState({ width: 0, left: 0 });
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const updateActivePosition = () => {
            const activeTabIndex = tabs.findIndex(
                (tab) => tab.key === activeTabKey
            );
            const activeTab = tabsRef.current[activeTabIndex];
            if (activeTab) {
                setActivePosition({
                    width: activeTab.offsetWidth,
                    left: activeTab.offsetLeft,
                });
            }
        };

        updateActivePosition();
        window.addEventListener('resize', updateActivePosition);

        return () => window.removeEventListener('resize', updateActivePosition);
    }, [activeTabKey, tabs]);

    const sizeClass = triggerVariants({ size });
    const listSizeClass = listVariants({ size });
    return (
        <Tabs defaultValue={tabs[0]?.key} value={activeTabKey} {...props}>
            <TabsList
                className={cn(
                    'relative mb-4 bg-transparent border-input ',
                    {
                        'border-b border-t-0 border-l-0 border-r-0 rounded-none':
                            !needBorder,
                        'w-full justify-start': fullWidth,
                    },

                    listSizeClass,
                    listClassName
                )}
            >
                {tabs.map((tab, index) => (
                    <TabsTrigger
                        key={tab.key}
                        value={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={cn(
                            'px-4 py-2 text-sm font-medium transition-colors duration-200 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:text-primary',
                            'hover:text-primary',
                            {
                                'flex items-center gap-2': tab.icon,
                            },
                            sizeClass
                        )}
                        ref={(el) => (tabsRef.current[index] = el) as any}
                    >
                        {tab.icon}
                        {tab.name}
                    </TabsTrigger>
                ))}
                <div
                    className='absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out'
                    style={{
                        width: `${activePosition.width}px`,
                        left: `${activePosition.left}px`,
                    }}
                />
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

export { NormalTabs };
