import { forwardRef, useMemo, useState } from 'react';

import { IsEmptyArray, IsFunction } from '@finnoto/core';

import { cn } from '../../../../Utils/common.ui.utils';
import { Icon } from '../../../Data-display/Icon/icon.component';
import { Button } from '../../../Inputs/Button/button.component';
import { IconButton } from '../../../Inputs/Icon-Button/iconButton.component';
import { WidthMeasurer } from '../../../Layout/WidthMeasurer/widthMeasurer.component';
import {
    CloseAllPopovers,
    Popover,
} from '../../../Surfaces/Popover/popover.component';
import { TAB_ITEM } from '../commonTab.types';
import {
    ActionsProps,
    PolarisTabsItem,
    PolarisTabsProps,
} from './polarisTab.types';
import { usePolarisTab } from './usePolarisTab.hook';

import * as ICONS from 'assets';
import { ActionArrowDownSvgIcon, AddSvgIcon } from 'assets';

const PolarisTab = (props: PolarisTabsProps) => {
    const {
        tabs,
        visibleTabItems,
        hiddenTabItems,
        onChangeTab,
        active,
        handleMeasurement,
    } = usePolarisTab(props);

    const { onClickToAddNew, listContainerClass, listInnerContainerClass } =
        props;

    const getActiveTab = useMemo(() => {
        return tabs.find((val) => val.key === active);
    }, [active, tabs]);

    const discloserButton = (
        <TabDisclosureButton
            actions={hiddenTabItems.map((tab) => ({
                name: tab.title,
                onClick: () => onChangeTab(tab.key),
            }))}
        />
    );

    const disclosureActivatorVisible =
        !props.disableMeasurement && visibleTabItems.length < tabs.length;

    return (
        <>
            <div
                className={cn(
                    'flex items-center gap-1 w-full',
                    listContainerClass
                )}
            >
                <div className={cn('flex flex-col flex-1')}>
                    <WidthMeasurer
                        className={listInnerContainerClass}
                        discloserButton={discloserButton}
                        handleMeasurement={handleMeasurement}
                        disabled={props.disableMeasurement}
                    >
                        <TabList
                            tabs={tabs}
                            disclosureActivatorVisible={false}
                            active={active}
                            discloserButton={discloserButton}
                            onChangeTab={onChangeTab}
                            buttonSize={props.buttonSize || 'sm'}
                        />
                    </WidthMeasurer>
                    <div
                        className={cn(
                            'flex items-center gap-1',
                            listInnerContainerClass
                        )}
                        role='tablist'
                    >
                        <TabList
                            tabs={
                                props.disableMeasurement
                                    ? tabs
                                    : visibleTabItems
                            }
                            disclosureActivatorVisible={
                                disclosureActivatorVisible
                            }
                            active={active}
                            discloserButton={discloserButton}
                            onChangeTab={onChangeTab}
                            buttonSize={props.buttonSize || 'sm'}
                        />
                    </div>
                </div>
                {IsFunction(onClickToAddNew) && (
                    <IconButton
                        icon={AddSvgIcon}
                        onClick={onClickToAddNew}
                        size='md'
                        appearance='polaris-tertiary'
                    />
                )}
            </div>
            {getActiveTab?.component}
        </>
    );
};

export default PolarisTab;

const TabList = ({
    tabs,
    disclosureActivatorVisible,
    active,
    discloserButton,
    onChangeTab,
}: {
    tabs: TAB_ITEM[];
    disclosureActivatorVisible: boolean;
    active: string;
    onChangeTab: (key: string) => void;
    discloserButton: React.ReactNode;
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
    return (
        <>
            {tabs.map((tab: PolarisTabsItem, index) => {
                const isActive = tab.key === active;

                if (!IsEmptyArray(tab.actions)) {
                    return (
                        <TabActionButton
                            key={tab.key || index}
                            id={tab.key}
                            isActive={isActive}
                            title={tab.title}
                            badge={tab.badge}
                            data={tab.data}
                            onChangeTab={onChangeTab}
                            actions={tab.actions}
                        />
                    );
                }
                return (
                    <TabButton
                        key={tab.key || index}
                        id={tab.key}
                        isActive={isActive}
                        title={tab.title}
                        badge={tab.badge}
                        onChangeTab={onChangeTab}
                        isActionable={false}
                    />
                );
            })}
            {disclosureActivatorVisible ? discloserButton : null}
        </>
    );
};

export const TabActionButton = ({
    isActive,
    id,
    title,
    badge,
    data,
    onChangeTab,
    fitted,
    actions,
    size,
}: any) => {
    const [isActiveOpen, setIsActiveOpen] = useState(false);
    const handleOnTabChange = (key: string) => {
        onChangeTab?.(key);
    };

    const handlePopoverVisibility = (state: boolean) => {
        if (!isActive) return setIsActiveOpen(false);
        setIsActiveOpen(state);
    };

    return (
        <Popover
            visible={isActiveOpen}
            onVisibleChange={handlePopoverVisibility}
            element={<RenderActionButton actions={actions} data={data} />}
            align='center'
            side='bottom'
            className='p-1 border-none rounded-lg shadow'
        >
            <TabButton
                {...{
                    isActive,
                    id,
                    title,
                    badge,
                    onChangeTab: handleOnTabChange,
                    isActionable: true,
                    fitted: fitted,
                    size,
                }}
            />
        </Popover>
    );
};
export const TabDisclosureButton = ({ data, actions }: any) => {
    const [isActiveOpen, setIsActiveOpen] = useState(false);

    const handlePopoverVisibility = (state: boolean) => {
        setIsActiveOpen(state);
    };

    return (
        <Popover
            visible={isActiveOpen}
            onVisibleChange={handlePopoverVisibility}
            element={<RenderActionButton actions={actions} data={data} />}
            align='center'
            side='bottom'
            className='p-1 border-none rounded-lg shadow'
        >
            <Button
                appearance={
                    isActiveOpen ? 'polaris-tertiary' : 'polaris-transparent'
                }
                size='sm'
                className='font-normal'
                role='tab'
            >
                <div className='flex items-center gap-2'>
                    <span>More filters</span>
                    <Icon source={ActionArrowDownSvgIcon} isSvg size={16} />
                </div>
            </Button>
        </Popover>
    );
};

export const RenderActionButton = ({
    actions,
    data,
}: {
    actions: any;
    data?: any;
}) => {
    if (!actions?.length) return;
    return (
        <div className='gap-1 col-flex'>
            {actions.map((action) => (
                <ActionButton
                    key={action.name}
                    {...action}
                    onClick={() => {
                        action.onClick?.(data);
                        CloseAllPopovers();
                    }}
                />
            ))}
        </div>
    );
};

const ActionButton = ({
    icon,
    name,
    type = 'normal',
    visible = true,
    onClick,
    rightComponent,
    disabled,
}: ActionsProps) => {
    if (!visible) return;
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className={cn(
                'flex items-center transition-all gap-2 px-2 py-1 cursor-pointer rounded-lg text-polaris-size-325',
                {
                    '!text-error hover:bg-error/20': type === 'error',
                    '!text-base-primary hover:bg-base-300/40':
                        type === 'normal',
                    '!text-warning hover:bg-warning/20': type === 'warning',
                    '!text-primary hover:bg-primary/20': type === 'primary',
                    '!text-success hover:bg-success/20': type === 'success',
                    'text-polaris-text-disabled': disabled,
                }
            )}
        >
            {!!icon && <Icon source={ICONS[icon]} isSvg size={16} />}
            <span>{name}</span>
            {rightComponent}
        </div>
    );
};

export const TabButton = forwardRef<HTMLButtonElement, any>(
    (
        {
            isActive,
            id,
            title,
            badge,
            onChangeTab,
            onClick,
            isActionable,
            size,
        },
        ref
    ) => {
        return (
            <Button
                className={cn('font-normal !text-xs', {
                    'bg-polaris-bg-fill-transparent-active font-medium':
                        isActive,
                })}
                appearance='polaris-transparent'
                onClick={(e) => {
                    onChangeTab?.(id);
                    onClick?.(e);
                }}
                ref={ref}
                size={size || 'sm'}
                role='tab'
            >
                <div className='flex items-center gap-2'>
                    <span>{title}</span>
                    {badge && (
                        <span className='w-5 h-5 bg-polaris-bg-fill-transparent-secondary ml-1 rounded-full centralize pr-0.5'>
                            {badge}
                        </span>
                    )}
                    {isActionable && isActive && (
                        <Icon source={ActionArrowDownSvgIcon} isSvg size={16} />
                    )}
                </div>
            </Button>
        );
    }
);

export const PolarisTabContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'px-3 py-2 border rounded-lg bg-polaris-bg-surface border-polaris-border',
                className
            )}
        >
            {children}
        </div>
    );
};
