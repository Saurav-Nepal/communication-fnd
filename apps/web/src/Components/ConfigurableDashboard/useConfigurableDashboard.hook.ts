import { useCallback, useMemo, useState } from 'react';

import {
    FetchData,
    IsEmptyArray,
    ObjectDto,
    useCustomQueryDetail,
    useQuery,
} from '@finnoto/core';
import { DashboardController } from '@finnoto/core/src/backend/common/controllers/dashboard.controller';
import {
    DndComponents,
    DndDefaultLayouts,
    DndLayout,
    DndLayouts,
    Toast,
} from '@finnoto/design-system';
import {
    getDefaultFinalLayouts,
    transformReactGridLayoutsToDndLayouts,
} from '@finnoto/design-system/src/Components/Layout/DndDashboard/dndDashboard.utils';

import {
    addNewLayout,
    parseApiComponentLayouts,
    resetLayoutsToDefault,
    sanitizeSaveLayouts,
} from './configurableDashboard.utils';

export const useConfigurableDashboard = ({
    identifier,
    defaultLayouts,
    components,
}: {
    identifier: string;
    defaultLayouts?: DndDefaultLayouts;
    components?: DndComponents;
}) => {
    const [layouts, setLayouts] = useState<DndLayouts>([]);

    const {
        isFetching: isDashboardDetailsLoading,
        data: dashboardDetails,
        refetch: refetchDashboardDetails,
    } = useCustomQueryDetail({
        queryKey: ['configurableDashboard', identifier],
        controller: DashboardController,
        method: 'getDashboardDetails',
        methodParams: identifier,
        queryOptions: {
            onSuccess(data) {
                if (IsEmptyArray(data.components)) {
                    if (!defaultLayouts) return;
                    return setLayouts(defaultLayouts);
                }

                const layouts = parseApiComponentLayouts(data.components);
                setLayouts(layouts);
            },
        },
    });

    const { isFetching: isReportsLoading, data: reports = [] } = useQuery({
        queryKey: ['configurableDashboardComponents'],
        enabled: !!dashboardDetails?.id,
        cacheTime: Infinity,
        staleTime: Infinity,
        retry: 5,
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: DashboardController,
                method: 'getAllReports',
            });

            if (!success) return Promise.reject(response);

            return response;
        },
    });

    const availableComponents = useMemo<DndComponents>(() => {
        if (!reports) return {};

        const newComponents: DndComponents = {};

        reports?.forEach((report: ObjectDto) => {
            const {
                identifier,
                name: report_name,
                image_url,
                ...rest
            } = report;
            const component = components?.[identifier];

            if (!component) return;
            newComponents[identifier] = {
                ...component,
                imageUrl: image_url,
                defaultConfigs: {
                    identifier,
                    report_name,
                    ...(component.defaultConfigs || {}),
                },
            } as any;
        });

        return newComponents;
    }, [components, reports]);

    const addLayouts = useCallback(
        (newLayouts: DndLayouts | DndLayout) => {
            if (!newLayouts) return;
            setLayouts(addNewLayout(layouts, newLayouts, true));
        },
        [layouts]
    );

    const resetLayouts = useCallback(() => {
        if (!defaultLayouts) return;
        setLayouts(resetLayoutsToDefault(layouts, defaultLayouts));
    }, [defaultLayouts, layouts]);

    const deleteLayout = useCallback(
        (identifier: string) => {
            if (IsEmptyArray(layouts)) return;

            setLayouts(
                layouts.filter((layout) => layout.identifier !== identifier)
            );
        },
        [layouts]
    );

    const cancelLayoutChanges = useCallback(() => {
        let newLayouts = defaultLayouts;

        if (!IsEmptyArray(dashboardDetails.components)) {
            newLayouts = parseApiComponentLayouts(dashboardDetails.components);
        }

        if (IsEmptyArray(newLayouts)) {
            newLayouts = transformReactGridLayoutsToDndLayouts(
                getDefaultFinalLayouts(availableComponents)
            );
        }

        setLayouts(resetLayoutsToDefault(layouts, newLayouts));
    }, [
        availableComponents,
        dashboardDetails.components,
        defaultLayouts,
        layouts,
    ]);

    const saveLayouts = useCallback(async () => {
        const { hide } = Toast.loading({
            description: 'Saving dashboard layouts',
        });

        const { success, response } = await FetchData({
            className: DashboardController,
            method: 'saveDashboardComponent',
            classParams: {
                dashboard_id: dashboardDetails?.id,
                components: sanitizeSaveLayouts(
                    layouts,
                    dashboardDetails?.components,
                    reports
                ),
            },
        });
        hide();

        if (!success) {
            Toast.error({ description: response.message });
            return false;
        }

        Toast.success({ description: 'Dashboard layouts saved successfully' });
        refetchDashboardDetails();
        return true;
    }, [
        dashboardDetails?.components,
        dashboardDetails?.id,
        layouts,
        refetchDashboardDetails,
        reports,
    ]);

    return {
        layouts,
        setLayouts,
        components: availableComponents,
        isLoading: isReportsLoading || isDashboardDetailsLoading,
        saveLayouts,
        addLayouts,
        deleteLayout,
        resetLayouts,
        cancelLayoutChanges,
    };
};
