import React, { useRef } from 'react';

import {
    ArcBreadcrumbs,
    Button,
    cn,
    Container,
    DndLayout,
    DndLayouts,
    IconButton,
    IsFunction,
    SlidingPane,
    useFilterContext,
    withFilterProviderExport,
} from '@finnoto/design-system';

import ConfigurableDashboard, {
    ConfigurableDashboardRef,
} from '@Components/ConfigurableDashboard/configurableDashboard.component';
import OuterFilterList from '@Components/GenericDocumentListing/Components/outerFilter.list.component';

import AddGenericDashboardReport from './Components/addGenericDashboardReport.component';
import { GenericDashboardProps } from './genericDashboard.types';

import { ChartConfig, PlusSvgIcon } from 'assets';

const GenericDashboard = ({
    name,
    identifier,
    defaultLayouts,
    components,
    gap,
    rowHeight,
    renderRightComponent,
    debug,
}: GenericDashboardProps) => {
    const dashboardRef = useRef<ConfigurableDashboardRef>(null);
    const [dndMode, setDndMode] = React.useState('view');

    const { listFilters, filterData, handleFilterData, clearAllFilter } =
        useFilterContext();

    const handleSaveLayout = async (next = () => {}) => {
        const result = await dashboardRef.current.saveLayouts();
        if (!result) return next();

        setDndMode('view');
        next();
    };

    const addDashboardReport = () => {
        SlidingPane.open({
            component: AddGenericDashboardReport,
            size: 'lg',
            props: {
                layouts: dashboardRef.current.layouts,
                components: dashboardRef.current.components,
                addLayouts: (layout: DndLayout | DndLayouts) =>
                    dashboardRef.current.addLayouts(layout),
            },
        });
    };

    return (
        <Container
            className={cn('h-full gap-3 py-4 pb-10 col-flex', {
                'pb-28': dndMode === 'edit',
            })}
        >
            <div className='items-center justify-between gap-4 row-flex'>
                <ArcBreadcrumbs
                    mainClassName='w-auto'
                    route={[{ name: 'Home' }, { name }]}
                    title={name}
                />

                {dndMode === 'view' && (
                    <div className='flex items-center gap-2'>
                        {IsFunction(renderRightComponent)
                            ? renderRightComponent({
                                  clearAllFilter,
                              })
                            : renderRightComponent}
                        <OuterFilterList
                            {...{ listFilters, filterData, handleFilterData }}
                            showAllFilters
                        />
                        <IconButton
                            icon={ChartConfig}
                            appearance='polaris-white'
                            size='md'
                            name='Configure Dashboard'
                            onClick={() => setDndMode('edit')}
                        />
                    </div>
                )}
                {dndMode === 'edit' && (
                    <div className='flex items-center gap-2'>
                        <Button
                            appearance='polaris-error'
                            onClick={() => {
                                dashboardRef.current.cancelLayoutChanges();
                                setDndMode('view');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            appearance='polaris-white'
                            defaultMinWidth
                            onClick={handleSaveLayout}
                            progress
                        >
                            Save
                        </Button>
                        <IconButton
                            icon={PlusSvgIcon}
                            appearance='polaris-white'
                            size='md'
                            name='Add Components'
                            onClick={() => addDashboardReport()}
                        />
                    </div>
                )}
            </div>
            <ConfigurableDashboard
                identifier={identifier}
                defaultLayouts={defaultLayouts}
                components={components}
                gap={gap}
                rowHeight={rowHeight}
                params={filterData}
                isEditing={dndMode === 'edit'}
                ref={dashboardRef}
                debug={debug}
            />
        </Container>
    );
};

export default withFilterProviderExport(GenericDashboard);
