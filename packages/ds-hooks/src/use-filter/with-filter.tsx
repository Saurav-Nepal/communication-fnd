import React from 'react';

import { FilterContextType, FilterProvider, useFilter } from './use-filter';

interface WithFilterConfig {
    defaultFilters?: { [key: string]: string | number | boolean };
    isSyncWithQueryString?: boolean;
}

export function withFilter<TComponentProps extends FilterContextType>(
    WrappedComponent: React.ComponentType<TComponentProps>,
    config: WithFilterConfig = {}
) {
    const WithFilter: React.FC<
        Omit<TComponentProps, keyof FilterContextType>
    > = (props) => {
        return (
            <FilterProvider
                defaultFilters={config.defaultFilters}
                options={{
                    isSyncWithQueryString: config.isSyncWithQueryString,
                }}
            >
                <WrappedComponentWithHook {...(props as TComponentProps)} />
            </FilterProvider>
        );
    };

    const WrappedComponentWithHook: React.FC<
        Omit<TComponentProps, keyof FilterContextType>
    > = (props) => {
        const filterProps = useFilter();
        return (
            <WrappedComponent
                {...(props as TComponentProps)}
                {...filterProps}
            />
        );
    };

    const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithFilter.displayName = `withFilter(${wrappedComponentName})`;

    return WithFilter;
}
