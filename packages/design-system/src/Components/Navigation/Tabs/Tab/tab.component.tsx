'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { GetObjectFromArray, IsFunction } from '@finnoto/core';

import { cn } from '../../../../Utils/common.ui.utils';
import { Icon } from '../../../Data-display/Icon/icon.component';
import { Button } from '../../../Inputs/Button/button.component';
import { DropdownMenu } from '../../../Inputs/DropdownMenu/dropdownMenu.component';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tab.core';
import { isCurrentActive } from '../tab.utils';
import { useTabs } from '../useTab.hook';
import { BorderTabProps } from './tab.types';

import { ChevronDownOutlineSvgIcon } from 'assets';

/**
 * The Tab component displays a set of tabs with associated content.
 * It uses the `@radix-ui/react-tabs` library for the tab functionality.
 *
 * @component
 * @example
 * return (
 *   <Tab
 *     contentContainerClass="custom-content"
 *     tabs={[
 *       { key: 'tab1', title: 'Tab 1', component: <TabContent1 /> },
 *       { key: 'tab2', title: 'Tab 2', component: <TabContent2 /> },
 *     ]}
 *   />
 * );
 *
 * @author Saurav Nepal
 */
export const Tab = ({
    containerClassName,
    contentContainerClass,
    tabListClassName,
    actions = [],
    tabTriggerClassName,
    animationClassName,
    tabChangecallback,
    globalAction,
    ...props
}: BorderTabProps) => {
    // Retrieve necessary data and functions from the useTabs hook
    const { tabs, onChangeTab, active, isComponentRendered } = useTabs(props);

    // State for tracking the active tab position to add animation
    const [activePosition, setActivePosition] = useState(null);

    // Ref for the active tab
    const activeRef = useRef(null);

    // Handle the side effect of the component
    useEffect(() => {
        if (!activeRef.current) return;

        setActivePosition({
            width: activeRef.current?.clientWidth + 4,
            left: activeRef.current?.offsetLeft,
        });
    }, [active]);
    const renderAction = useCallback(() => {
        if (IsFunction(globalAction)) return globalAction();
        const activeAction = GetObjectFromArray(actions, 'key', active);
        if (!activeAction || !activeAction?.visible) return null;

        if (activeAction?.type === 'dropdown')
            return (
                <div className='flex justify-end flex-1'>
                    <DropdownMenu actions={activeAction?.actions}>
                        <Button size='xs' appearance='polaris-tertiary'>
                            Actions
                            <Icon
                                source={ChevronDownOutlineSvgIcon}
                                isSvg
                                size={20}
                            />
                        </Button>
                    </DropdownMenu>
                </div>
            );

        return (
            <div className='flex justify-end flex-1'>
                <Button
                    onClick={activeAction?.action}
                    appearance={activeAction?.appearance || 'primary'}
                    size='xs'
                >
                    {activeAction?.name}
                </Button>
            </div>
        );
    }, [actions, active, globalAction]);

    return (
        <Tabs
            value={active}
            className={cn(
                'overflow-hidden rounded col-flex bg-base-100',
                containerClassName
            )}
        >
            <TabsList
                className={cn(
                    'relative flex gap-3 px-4 py-2',
                    tabListClassName
                )}
            >
                {/* Render the active tab indicator */}
                {isComponentRendered && (
                    <div
                        style={{
                            width: `${activePosition?.width}px`,
                            left: `${activePosition?.left}px`,
                        }}
                        className={cn(
                            `absolute rounded-l-none rounded h-[3px] opacity-100 bottom-2 z-10 transition-all duration-200 bg-neutral dark:bg-neutral-content`,
                            animationClassName
                        )}
                    ></div>
                )}
                {/* Render the tabs */}
                {tabs.map((value) => {
                    return (
                        <TabsTrigger
                            ref={
                                isCurrentActive(active, value.key)
                                    ? activeRef
                                    : null
                            }
                            key={value.key}
                            value={value.key}
                            onClick={() => {
                                onChangeTab(value.key);
                                IsFunction(tabChangecallback) &&
                                    tabChangecallback(value?.key);
                            }}
                            className={cn(
                                'text-sm pb-2 pl-[2px] transition-all',
                                tabTriggerClassName,
                                isCurrentActive(active, value.key)
                                    ? 'text-extrabold'
                                    : 'text-bold text-base-tertiary',
                                {
                                    'flex items-center gap-1': value.icon,
                                }
                            )}
                        >
                            {value?.icon && (
                                <Icon isSvg source={value.icon} size={18} />
                            )}
                            {value.title}
                        </TabsTrigger>
                    );
                })}
                {renderAction()}
            </TabsList>

            {/* Render the tab content */}
            {tabs.map((value) => {
                return (
                    <TabsContent
                        className={cn('h-full flex-1', contentContainerClass)}
                        key={value.key}
                        value={value.key}
                    >
                        {value.component}
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};
