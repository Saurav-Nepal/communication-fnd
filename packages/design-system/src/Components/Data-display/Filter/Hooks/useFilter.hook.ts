import { useCallback, useMemo, useRef } from 'react';

import { IsEmptyArray, useToggle, useUncontrolled } from '@finnoto/core';
import { useUncontrolledList } from '@finnoto/core/src/Hooks/useUncontrolledList.hook';

import { FilterHookProps } from '../filter.types';

export const useFilter = ({
    tabs,
    filters,
    searchString,
    defaultSearchString,
    onSearchChange,
    appliedFilters,
    defaultAppliedFilters,
    onFiltersChange,
    onTabChange,
    hasNoQueryFilters,
    hideFilter,
}: FilterHookProps) => {
    const tabElementRef = useRef(null);
    const filterElementRef = useRef(null);

    const [searchQuery, handleSearchQueryChange] = useUncontrolled({
        value: searchString,
        defaultValue: defaultSearchString,
        finalValue: '',
        onChange: onSearchChange,
    });

    const [
        currentFilters,
        {
            set: setCurrentFilters,
            push: pushFilter,
            removeAt: removeFilterAt,
            clear: clearFilters,
            updateAt: updateFilterAt,
        },
    ] = useUncontrolledList({
        value: appliedFilters,
        defaultValue: defaultAppliedFilters,
        finalValue: [],
        onChange: onFiltersChange,
    });

    const [currentMode, toggleMode] = useToggle<'tab' | 'filter'>([
        'tab',
        'filter',
    ]);

    const sanitizedTabs = useMemo(() => {
        let availableTabs = (tabs ?? []).filter((tab) => tab.visible !== false);

        if (!availableTabs.some((tab) => tab.key === 'all'))
            availableTabs.unshift({
                title: 'All',
                isStatic: true,
                key: 'all',
            });

        return availableTabs.sort((a, b) =>
            a.isStatic === b.isStatic ? 0 : a.isStatic ? -1 : 1
        );
    }, [tabs]);

    const isFiltersAvailable = useMemo(() => {
        const isHasNoFilters =
            (!filters || IsEmptyArray(filters)) && hasNoQueryFilters;
        if (isHasNoFilters || hideFilter) return false;

        return true;
    }, [filters, hasNoQueryFilters, hideFilter]);

    const handleToggleMode: typeof toggleMode = useCallback(
        (value) => {
            // if (!isFiltersAvailable) return toggleMode('tab');

            toggleMode(value);
        },
        [toggleMode]
    );

    const handleTabChange = useCallback(
        (key: string | number) => {
            const activeTab = sanitizedTabs.find((tab) => tab.key === key);
            onTabChange?.(activeTab);
        },
        [onTabChange, sanitizedTabs]
    );

    // useIsomorphicLayoutEffect(() => {
    //     if (isFiltersAvailable) return;

    //     toggleMode('tab');
    // }, [isFiltersAvailable]);

    return {
        tabElementRef,
        filterElementRef,
        currentMode,
        handleToggleMode,
        tabs: sanitizedTabs,
        onTabChange: handleTabChange,
        searchQuery,
        handleSearchQueryChange,
        currentFilters,
        isFiltersAvailable,
        filterListActions: {
            setCurrentFilters,
            pushFilter,
            removeFilterAt,
            clearFilters,
            updateFilterAt,
        },
    };
};
