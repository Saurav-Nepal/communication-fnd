import { ReactNode, useMemo, useState } from 'react';

import {
    EmptyFunction,
    FINOPS_CONFIGURATION_ROUTE,
    GetObjectFromArray,
    ObjectDto,
    TitleRoutePayload,
    useApp,
    useFetchParams,
} from '@finnoto/core';
import { AnimatedTabs, FilterContextInterface } from '@finnoto/design-system';

import GenericDefinitionListing from './genericDefinitionListing.component';
import { GenericDefinitionListingProps } from './genericDefinitionListing.types';
import GenericDocumentListing from './genericDocumentListing.component';
import { GenericDocumentListingProps } from './genericDocumentListing.types';

export interface GenericAnimatedTabListingProps {
    onTabChange?: (__: any) => void;
    tabs_item?: {
        tabName: string;
        tabKey: string;
        tabVisible?: boolean;
        listingProps:
            | GenericDefinitionListingProps
            | GenericDocumentListingProps;
    }[];
    defaultActiveTab?: string;
    disableNav?: boolean;
    queryKey?: string;
    name?: string;
    subName?: string;
    isFilterClearInTabChange?: boolean;
    renderRightActionComponent?: ReactNode;
    noContainer?: boolean;
}
const GenericAnimatedTabListing = ({
    tabs_item,
    queryKey = 'tab',
    disableNav,
    defaultActiveTab,
    onTabChange = EmptyFunction,
    name,
    subName,
    isFilterClearInTabChange,
    renderRightActionComponent,
    noContainer,
}: GenericAnimatedTabListingProps) => {
    const { basePath } = useApp();
    const { [queryKey]: activeTab } = useFetchParams();

    const [activeTabKey, setActiveTabKey] = useState(
        activeTab || defaultActiveTab || tabs_item[0]?.tabKey
    );

    const { customBreadcrumbData, name: currentTabName } = useMemo(() => {
        const { listingProps } =
            GetObjectFromArray(tabs_item, 'tabKey', activeTabKey) || {};
        return {
            customBreadcrumbData: listingProps?.customBreadcrumbData,
            name: listingProps?.name,
        };
    }, [activeTabKey, tabs_item]);
    const breadcrumbData: Array<TitleRoutePayload> = [
        {
            name: 'Home',
            link: basePath,
            className: 'text-base-tertiary',
        },
        {
            name: 'Configurations',
            link: FINOPS_CONFIGURATION_ROUTE,
            className: 'text-base-tertiary',
        },

        {
            name,
            className: 'text-base-tertiary',
        },
        {
            name: currentTabName,
            className: 'text-base-primary',
        },
    ];

    const IsDefinitionListingProps = (
        props: ObjectDto
    ): props is GenericDefinitionListingProps => {
        return !!props.definitionKey;
    };

    const tabs = useMemo(() => {
        return tabs_item?.map((tab) => {
            const { tabName, tabKey, tabVisible } = tab;
            return {
                title: tabName,
                key: tabKey,
                visible: tabVisible,
            };
        });
    }, [tabs_item]);

    const currentTabProps = useMemo(() => {
        return GetObjectFromArray(tabs_item, 'tabKey', activeTabKey)
            ?.listingProps;
    }, [tabs_item, activeTabKey]);

    const handleTabChangeFilter = (
        key: string,
        clearAllFilter: FilterContextInterface['clearAllFilter']
    ) => {
        onTabChange(key);
        setActiveTabKey(key);

        if (!isFilterClearInTabChange) return;

        clearAllFilter({ [queryKey]: key });
    };

    if (!currentTabProps) return null;

    if (IsDefinitionListingProps(currentTabProps)) {
        return (
            <GenericDefinitionListing
                name={name}
                {...currentTabProps}
                customBreadcrumbData={customBreadcrumbData ?? breadcrumbData}
                renderContentBeforeTable={({ clearAllFilter }) => (
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
                renderRightActionComponent={renderRightActionComponent}
            />
        );
    }

    return (
        <GenericDocumentListing
            name={name}
            {...currentTabProps}
            renderContentBeforeTable={({ clearAllFilter }) => (
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
            renderRightActionComponent={renderRightActionComponent}
        />
    );
};

export default GenericAnimatedTabListing;

const RenderTabs = ({
    tabs,
    queryKey,
    disableNav,
    activeTabKey,
    handleTabChangeFilter,
}) => {
    return (
        <AnimatedTabs
            onTabChange={handleTabChangeFilter}
            disableNav={disableNav}
            tabs={tabs}
            querykey={queryKey}
            active={activeTabKey}
            containerClassName='flex-1 gap-0'
            contentContainerClass='p-0 bg-transparent shadow-none'
        />
    );
};
