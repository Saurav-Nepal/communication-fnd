import { useMemo, useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { useQueryState } from '@finnoto/core';

import { TabsProps } from './commonTab.types';

/**
 *
 * @description This can be use for any tabs in the system
 *
 * @param tabs An array of tab items.
 * @param active The initially active tab.
 * @param disableNav Indicates whether tab navigation should be disabled.
 * @param onTabChange A callback function triggered when a tab is changed.
 * @param querykey The query parameter key used for tab navigation in the URL.
 * @returns An object containing the sanitized tabs, the active tab, and a function to change the active tab.
 *
 * @author Saurav Nepal
 */
export const useTabs = ({
    tabs,
    active: defActive,
    disableNav = false,
    onTabChange,
    querykey = 'tab',
}: TabsProps) => {
    const [isComponentRendered, setIsComponentRendered] = useState(false);

    const [{ [querykey]: active }, setQuery] = useQueryState({
        defaultQueries: { [querykey]: defActive },
        disableQuery: disableNav,
    });

    useUpdateEffect(() => {
        if (!disableNav) return;
        handleNavigation(defActive);
    }, [defActive]);

    // Sanitize tabs by filtering out items with visible set to false
    const sanitizedTabs = useMemo(() => {
        return tabs?.filter((val) => val?.visible !== false);
    }, [tabs]);

    const onChangeTab = (key: string) => {
        handleNavigation(key);
        onTabChange?.(key);
    };

    const handleNavigation = (key: string) => {
        setQuery({
            [querykey]: key,
        });
    };

    useEffectOnce(() => {
        setTimeout(() => {
            setIsComponentRendered(true);
        }, 200);
    });

    // Perform initial setup when the component mounts
    useEffectOnce(() => {
        if (active) return;
        if (defActive) return;

        handleNavigation(sanitizedTabs?.[0]?.key);
    });

    return {
        tabs: sanitizedTabs,
        onChangeTab,
        isComponentRendered,
        active,
    };
};
