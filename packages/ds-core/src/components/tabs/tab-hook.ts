import React, { useMemo } from 'react';

export interface TabProps {
    name: string;
    key: string;
    visible?: boolean;
    component?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export const useTabs = ({
    tabs,
    defaultActiveTabKey,
    onTabChange,
}: {
    tabs: TabProps[];
    defaultActiveTabKey: string;
    onTabChange: (key: string) => void;
}) => {
    const [activeKey, setActiveKey] = React.useState(defaultActiveTabKey);
    const filterTabs = useMemo(() => {
        return tabs.filter((tab) => tab.visible !== false);
    }, [tabs]);

    const handleTabChange = (key: string) => {
        onTabChange?.(key);
        setActiveKey(key);
    };

    return {
        tabs: filterTabs,
        activeTabKey: activeKey,
        onTabChange: handleTabChange,
    };
};
