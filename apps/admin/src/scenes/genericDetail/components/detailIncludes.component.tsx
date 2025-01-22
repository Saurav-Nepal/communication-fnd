import { useMemo } from 'react';

import {
    AnimatedTabs,
    Card,
    CardContent,
    NormalTabs,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@slabs/ds-core';

import { GenericListingScene } from '@/scenes/genericListing/genericListing.scenes';

interface DetailIncludesProps {
    callback: (options?: { withoutIdentifier?: boolean }) => void;
    propageDataToParent?: (object, numner) => void;
    parentData: object;
    clearTabsData?: boolean;
    portlet: any;
    tabs?: any;
}

const DetailIncludes = ({
    tabs: propTabs,
    parentData,
    portlet,
}: DetailIncludesProps) => {
    const tabs = useMemo(() => {
        const tabList: any[] = [];
        Object.keys(propTabs).forEach((tabKey: any) => {
            const tab = { ...propTabs[tabKey] };

            const isAlreadyModalAlias = tab.uiActions.some(
                (uiAction) => uiAction.identifier == 'redirectGeneric'
            );

            if (!isAlreadyModalAlias) {
                const modelAliasRedirect = {
                    // @TODO add model alias rediect method
                    as_header: true,
                    image: 'fa-outdent',
                    parameter: '/alias/' + tab.menuId,
                    active: true,
                    method: 'redirectGeneric',
                    identifier: 'redirectGenericModel',
                    name: 'Redirect Model Alias',
                    base: tab.base,
                };

                const modelRedirect = {
                    // @TODO add model alias rediect method
                    as_header: true,
                    image: 'fa-database',
                    parameter: '/model/' + tab.modelId,
                    active: true,
                    method: 'redirectGeneric',
                    identifier: 'redirectGenericModel',
                    name: 'Redirect Model',
                    base: tab.base,
                };

                tab.uiActions.push(modelAliasRedirect);
                tab.uiActions.push(modelRedirect);
            }

            tabList.push({ ...tab, index: tabKey });
        });

        return tabList;
    }, [propTabs]);

    const tabItemList = useMemo(
        () =>
            tabs.map((tab) => ({
                name: tab.pageName,
                key: tab.index,
                component: (
                    <GenericListingScene
                        key={tab.index}
                        parentData={parentData}
                        menuDetail={tab}
                        source='modelAlias'
                        pageBarClassName='px-0'
                        // genericData={tabsGenericData[key]}
                        // propageGenericDataToParent={
                        //     this.storeTabGenericData
                        // }
                        index={tab.index}
                        portlet={portlet}
                    />
                ),
            })),
        [tabs]
    );

    return (
        <Card className='detail-includes'>
            <CardContent className='p-2'>
                <AnimatedTabs
                    tabData={tabItemList}
                    contentContainerClass='mt-2'
                    triggerClassName='data-[state=active]:bg-background data-[state=active]:text-card-foreground data-[state=active]:font-semibold bg-transparent'
                    fullWidth
                />
            </CardContent>
        </Card>
    );
};

export default DetailIncludes;
