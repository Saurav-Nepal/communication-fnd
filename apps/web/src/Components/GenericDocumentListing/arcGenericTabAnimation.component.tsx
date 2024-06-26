import { ReactNode, useMemo, useState } from 'react';

import {
    EmptyFunction,
    GetObjectFromArray,
    IsEmptyArray,
    IsEmptyObject,
    Navigation,
    ObjectDto,
    TitleRoutePayload,
    useApp,
    useFetchParams,
} from '@finnoto/core';
import {
    AnimatedTabs,
    ArcBreadcrumbs,
    Breadcrumbs,
    Container,
} from '@finnoto/design-system';
import PolarisTab from '@finnoto/design-system/src/Components/Navigation/Tabs/PolarisTab/polarisTab.component';

import GenericDefinitionListing from './genericDefinitionListing.component';
import { GenericDefinitionListingProps } from './genericDefinitionListing.types';
import GenericDocumentListing, {
    renderListingActionButton,
} from './genericDocumentListing.component';
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
}
const ArcGenericAnimatedTabListing = ({
    tabs_item,
    queryKey = 'tab',
    disableNav,
    defaultActiveTab,
    onTabChange = EmptyFunction,
    name,
    subName,
    isFilterClearInTabChange,
    renderRightActionComponent,
}: GenericAnimatedTabListingProps) => {
    const { basePath } = useApp();
    const { [queryKey]: activeTab, queryString } = useFetchParams();

    const [activeTabKey, setActiveTabKey] = useState(
        activeTab || defaultActiveTab || tabs_item[0]?.tabKey
    );

    const {
        customBreadcrumbData,
        actions,
        arcBreadcrumbActions,
        name: currentTabName,
        tabFilterKey,
    } = useMemo(() => {
        const { listingProps } =
            GetObjectFromArray(tabs_item, 'tabKey', activeTabKey) || {};

        return {
            customBreadcrumbData: listingProps?.customBreadcrumbData,
            actions: listingProps?.actions,
            arcBreadcrumbActions: listingProps?.arcBreadcrumbActions,
            name: listingProps?.name,
            tabFilterKey: listingProps?.tabFilterKey,
        };
    }, [activeTabKey, tabs_item]);
    const { tab, queryParams, status, approval } = useFetchParams();

    const breadcrumbData: Array<TitleRoutePayload> = [
        {
            name: 'Home',
            link: basePath,
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

    const showAddAction = useMemo(
        () =>
            (!queryParams?.[tabFilterKey] && !queryParams?.saved_filter) ||
            ['all', 'active', 'open'].includes(queryParams?.[tabFilterKey]),
        [queryParams, tabFilterKey]
    );

    const sanitizedActions = useMemo(() => {
        const tempActions = actions || arcBreadcrumbActions;

        if (IsEmptyArray(tempActions)) return [];

        if (!showAddAction)
            return [...tempActions]?.filter(
                (action) => action.type !== 'create'
            );

        return tempActions;
    }, [actions, arcBreadcrumbActions, showAddAction]);

    const tabs = useMemo(() => {
        return tabs_item?.map((tab) => {
            const { tabName, tabKey, tabVisible, listingProps } = tab;
            if (IsDefinitionListingProps(listingProps)) {
                return {
                    title: tabName,
                    key: tabKey,
                    visible: tabVisible,
                    component: (
                        <GenericDefinitionListing
                            key={tabKey}
                            {...listingProps}
                            asInnerTable
                            tableClass='min-h-[80vh]'
                            containerClassName='pt-2'
                        />
                    ),
                };
            }

            return {
                title: tabName,
                key: tabKey,
                visible: tabVisible,
                component: (
                    <GenericDocumentListing
                        key={tabKey}
                        {...listingProps}
                        asInnerTable
                        tableClass='min-h-[80vh]'
                    />
                ),
            };
        });
    }, [tabs_item]);

    const handleTabChangeFilter = (key: string) => {
        onTabChange(key);
        setActiveTabKey(key);

        if (isFilterClearInTabChange) {
            queryString.filter = undefined;
            queryString.filter_query = undefined;
        } else {
            let jsonObject;
            jsonObject = JSON.parse(queryString.filter || '{}');
            jsonObject.page = 1;
            queryString.filter = JSON.stringify(jsonObject);
        }

        Navigation.search({
            ...queryString,
            [queryKey]: key,
        });
    };

    return (
        <Container className='container h-full py-4 col-flex'>
            <div className='flex items-center justify-between mb-2'>
                <ArcBreadcrumbs
                    title={
                        (
                            <span className='flex items-center gap-3'>
                                {name || currentTabName}{' '}
                                {subName && (
                                    <span className='text-base text-base-secondary'>
                                        {subName}
                                    </span>
                                )}
                            </span>
                        ) as any
                    }
                    route={customBreadcrumbData || breadcrumbData}
                    rightComponent={
                        <div>{renderListingActionButton(sanitizedActions)}</div>
                    }
                />
            </div>
            <PolarisTab
                onTabChange={handleTabChangeFilter}
                disableNav={true}
                tabs={tabs}
                querykey={queryKey}
                active={activeTabKey}
                listContainerClass='rounded-lg bg-polaris-bg-surface p-2 border border-polaris-border'
            />
        </Container>
    );
};

export default ArcGenericAnimatedTabListing;
