import { Card, CardContent, CardDescription } from '@slabs/ds-core';
import { Modal } from '@slabs/ds-dialog';
import { cn, isEmptyObject } from '@slabs/ds-utils';

import { TableConfigurator } from '@/components/configurator/tableConfigurator/tableConfigurator.component';
import CustomAction from '@/components/customAction/customAction.component';
import { useGenericDetail } from '@/hooks/useGenericDetail.hook';
import { GENERIC_DETAIL_PROPS } from '@/types';
import { Navigation } from '@/utils/navigation.utils';

import DetailIncludes from './components/detailIncludes.component';
import DetailPortlet from './components/detailPortlet.component';

const GenericDetailScene = (props: GENERIC_DETAIL_PROPS) => {
    const { menuDetail, CustomDetailPortlet } = props;
    const {
        isLoading,
        parentData,
        portlet = {},
        tabDetail,
        currentUser,
        resetGenericDetail,
    } = useGenericDetail(props);

    const {
        finalColumns = [],
        data = {},
        formPreference = {},
        starter,
        formPreferences = [],
    } = portlet;

    const genericDataForCustomColumn = {
        formPreference,
        formPreferences,
        starter,
        columns: portlet.portletColumns,
        url: menuDetail.url ? menuDetail.url.split('/:')[0] : '',
        model: portlet.model,
        modelId: portlet.model && portlet.model.id,
        methods: portlet.methods,
        preDefinedmethods: portlet.preDefinedmethods,
        modelHash: portlet.modelHash,
    };

    const rowOptions = [
        {
            id: 0,
            name: 'Redirect Menu Detail',
            icon: 'fa-deaf',
            subMenu: false,
            onClick: () => {
                const pageUrl = '/menu/' + menuDetail.menuId;
                Navigation.navigate({ url: pageUrl });
            },
        },
        {
            id: 1,
            name: 'Redirect Model Detail',
            icon: 'fa-info-circle',
            subMenu: false,
            onClick: () => {
                const url = '/model/' + portlet.model.id;
                Navigation.navigate({ url });
            },
        },
        {
            id: 0,
            name: 'Edit Menu',
            icon: 'fa-pencil',
            subMenu: false,
            onClick: () => {
                if (
                    portlet.preDefinedmethods &&
                    portlet.preDefinedmethods.editMenu
                ) {
                    portlet.preDefinedmethods.editMenu(menuDetail.menuId);
                }
            },
        },
        {
            id: 0,
            name: 'Preferences Settings',
            icon: 'fa-gift',
            subMenu: false,
            // disabled: this.preferenceObj ? true : false,
            onClick: () => {
                const preferenceObj = {
                    // used for editing preferences
                    name: menuDetail.pageName, // preference name to be shown on modal
                    role: true,
                };
                if (
                    portlet.preDefinedmethods &&
                    portlet.preDefinedmethods.preferenceSetting
                ) {
                    portlet.preDefinedmethods.preferenceSetting(
                        menuDetail.preference,
                        preferenceObj
                    );
                }
            },
        },
    ];

    const onLayoutChanges = () => {
        resetGenericDetail();
        Modal.close();
    };

    return (
        <div
            className={cn('generic-detail-container', {
                '2xl:container pt-2': props.mode === 'boxed',
            })}
        >
            {/* <RightClick rowOptions={rowOptions}> */}
            <Card
                className={cn(
                    'flex justify-end items-center px-2 h-10 border-b header',
                    {
                        'rounded border mx-2 2xl:mx-0': props.mode === 'boxed',
                    }
                )}
                radius='none'
                noBorder
            >
                <div className='flex gap-2'>
                    <CustomAction
                        position='header'
                        menuDetail={menuDetail}
                        genericData={genericDataForCustomColumn}
                        actions={portlet.nextActions || []}
                        listingRow={data}
                        placement='as_record'
                        callback={resetGenericDetail}
                        portlet={portlet}
                    />

                    {portlet.portletColumns ? (
                        <TableConfigurator
                            className='bg-base-200'
                            source='menu'
                            onSubmit={onLayoutChanges}
                            listName={portlet.listName}
                            layout={menuDetail.layout}
                            columns={portlet.portletColumns}
                            menuId={menuDetail.menuId}
                            userId={currentUser?.id}
                            isDetailConfigurator
                            // finalColumns={finalColumns}
                        />
                    ) : null}

                    {/* <CustomAction
                                menuDetail={menuDetail}
                                genericData={genericDataForCustomColumn}
                                actions={portlet.nextActions || []}
                                listingRow={data}
                                placement='as_dropdown'
                                callback={resetGenericDetail}
                            /> */}
                </div>
            </Card>
            {/* </RightClick> */}

            <div
                className={cn('p-2 detail-content', {
                    '2xl:px-0': props.mode === 'boxed',
                })}
            >
                {isLoading ? (
                    <div className='loading-text text-color-tertiary'>
                        <h6>Loading content</h6>
                    </div>
                ) : (
                    <div className='flex flex-col gap-2 detail-container'>
                        {!!CustomDetailPortlet && (
                            <CustomDetailPortlet
                                listingRow={data}
                                finalColumns={finalColumns}
                                starter={starter}
                            />
                        )}

                        {!CustomDetailPortlet && finalColumns.length > 0 && (
                            <Card>
                                <CardContent className='p-1'>
                                    <DetailPortlet
                                        listingRow={data}
                                        genericData={genericDataForCustomColumn}
                                        finalColumns={finalColumns}
                                        starter={starter}
                                        callback={resetGenericDetail}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {!CustomDetailPortlet && !finalColumns.length && (
                            <Card className='noListMessage' variant='compact'>
                                <CardContent>
                                    <CardDescription>
                                        Looks like no columns are selected,
                                        Configure it by pressing the settings
                                        icon.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )}

                        {tabDetail && !isEmptyObject(tabDetail.tabs) ? (
                            <DetailIncludes
                                // propageDataToParent={this.callParent}
                                portlet={portlet}
                                tabs={tabDetail.tabs}
                                parentData={parentData}
                                callback={resetGenericDetail}
                                // clearTabsData={clearTabsData}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export { GenericDetailScene };
