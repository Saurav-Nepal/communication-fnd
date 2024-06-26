import { useMemo, useState } from 'react';

import {
    GetObjectFromArray,
    Navigation,
    ParseToSelectBoxOption,
    useFetchParams,
} from '@finnoto/core';
import {
    FilterContextInterface,
    SelectableDropdownMenu,
    SelectBox,
} from '@finnoto/design-system';
import PolarisTab from '@finnoto/design-system/src/Components/Navigation/Tabs/PolarisTab/polarisTab.component';

import GenericDashboardComponent from './genericDashboard.component';
import { GenericTabDashboardProps } from './genericTabDashboard.types';

const GenericTabDashboard = ({
    tabItems,
    queryKey = 'tab',
    disableNav,
    defaultActiveTab,
    isFilterClearInTabChange = true,
}: GenericTabDashboardProps) => {
    const { [queryKey]: activeTab } = useFetchParams();
    const [activeTabKey, setActiveTabKey] = useState(
        activeTab || defaultActiveTab || tabItems[0]?.tabKey
    );

    const tabs = useMemo(() => {
        return tabItems?.map((tab) => {
            const { tabName, tabKey, tabVisible } = tab;
            return {
                title: tabName,
                key: tabKey,
                visible: tabVisible,
            };
        });
    }, [tabItems]);

    const currentTabProps = useMemo(() => {
        return GetObjectFromArray(tabItems, 'tabKey', activeTabKey)
            ?.dashboardProps;
    }, [tabItems, activeTabKey]);

    const handleTabChangeFilter = (
        key: string,
        clearAllFilter: FilterContextInterface['clearAllFilter']
    ) => {
        setActiveTabKey(key);

        if (!isFilterClearInTabChange) return;
        clearAllFilter({ [queryKey]: key });
    };

    if (!currentTabProps) return null;

    return (
        <GenericDashboardComponent
            {...currentTabProps}
            renderRightComponent={({ clearAllFilter }) => (
                <RenderTabs
                    {...{
                        tabs,
                        queryKey,
                        disableNav,
                        activeTabKey,
                        handleTabChangeFilter: (key) =>
                            handleTabChangeFilter(key, clearAllFilter),
                    }}
                />
            )}
        />
    );
};

export default GenericTabDashboard;

const RenderTabs = ({
    tabs,
    queryKey,
    disableNav,
    activeTabKey,
    handleTabChangeFilter,
}) => {
    if (tabs.length >= 4) {
        return (
            <SelectBox
                value={activeTabKey}
                options={ParseToSelectBoxOption(tabs, 'key', 'title')}
                size='sm'
                onChange={(option) => {
                    if (!disableNav) {
                        Navigation.search(
                            { [queryKey]: option.value },
                            { method: 'replace' }
                        );
                    }
                    handleTabChangeFilter(option.value);
                }}
                className='min-w-[150px]'
            />
        );
    }

    return (
        <PolarisTab
            tabs={tabs}
            disableNav={disableNav}
            active={activeTabKey}
            querykey={queryKey}
            onTabChange={handleTabChangeFilter}
            disableMeasurement
            listContainerClass='bg-polaris-bg-surface p-[1px] rounded border border-polaris-border'
        />
    );
};
