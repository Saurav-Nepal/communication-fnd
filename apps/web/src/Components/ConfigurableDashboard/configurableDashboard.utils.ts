import {
    GetObjectFromArray,
    groupBy,
    IndexOfObjectInArray,
    IsArray,
    ObjectDto,
    SortArrayObjectBy,
} from '@finnoto/core';
import { AddDashboardComponentDto } from '@finnoto/core/src/backend/common/dtos/add.dashboard.component.dto';
import { DndLayout, DndLayouts } from '@finnoto/design-system';

export const sanitizeSaveLayouts = (
    layouts: DndLayouts,
    apiComponents: AddDashboardComponentDto[],
    reports: ObjectDto[]
): AddDashboardComponentDto[] => {
    const newDashboardComponents: AddDashboardComponentDto[] = [];

    const groupedLayout = groupBy(layouts, 'identifier');

    Object.values(groupedLayout).forEach((group) => {
        let newLayout: AddDashboardComponentDto;

        group.forEach((layout) => {
            if (newLayout) {
                return newLayout.properties.push({
                    width: layout.width,
                    height: layout.height,
                    posX: layout.posX,
                    posY: layout.posY,
                    breakpoint: layout.breakpoint,
                });
            }

            const report = reports.find(
                (report) => report.identifier === layout.identifier
            );
            
            newLayout = {
                id: layout.id,
                identifier: layout.identifier,
                properties: [
                    {
                        width: layout.width,
                        height: layout.height,
                        posX: layout.posX,
                        posY: layout.posY,
                        breakpoint: layout.breakpoint,
                    },
                ],
                custom_report_id: report.id,
            };
        });

        newDashboardComponents.push(newLayout);
    });

    (apiComponents || []).forEach((component) => {
        if (!GetObjectFromArray(newDashboardComponents, 'id', component.id)) {
            newDashboardComponents.push({ ...component, active: false });
        }
    });

    return newDashboardComponents;
};

export const parseApiComponentLayouts = (
    components: ObjectDto[]
): DndLayouts => {
    if (!components) return [];
    const newComponents: DndLayouts = [];

    components.forEach((component) => {
        if (!IsArray(component.properties)) return;
        if (!component.active) return;

        component.properties?.forEach((props: ObjectDto) => {
            newComponents.push({
                id: component.id,
                identifier: component.identifier,
                active: component.active,
                width: props.width,
                height: props.height,
                posX: props.posX,
                posY: props.posY,
                breakpoint: props.breakpoint,
                configs: props.configs,
            });
        });
    });

    return newComponents;
};

export const getLastComponent = (layouts: DndLayouts) => {
    if (!layouts) return;

    return SortArrayObjectBy(layouts, 'posY', 'desc')[0];
};

export const addNewLayout = (
    layouts: DndLayouts,
    newLayouts: DndLayouts | DndLayout,
    withNewDimensions?: boolean
) => {
    if (Array.isArray(newLayouts)) {
        if (!layouts) return newLayouts;

        let updatedLayouts = layouts;
        newLayouts.forEach((layout) => {
            updatedLayouts = addNewLayout(
                updatedLayouts,
                layout,
                withNewDimensions
            );
        });
        return updatedLayouts;
    }

    if (!layouts) return [newLayouts];

    const addableLayout = { ...newLayouts };

    if (withNewDimensions) {
        const lastComponent = getLastComponent(layouts);

        addableLayout.posX = 0;
        addableLayout.posY = lastComponent.posY + lastComponent.height + 1;
    }

    const previousIndex = IndexOfObjectInArray(
        layouts,
        'identifier',
        addableLayout.identifier
    );

    if (previousIndex > -1) {
        return [
            ...layouts.slice(0, previousIndex),
            { id: layouts[previousIndex].id, ...addableLayout },
            ...layouts.slice(previousIndex + 1),
        ];
    }

    return [...layouts, addableLayout];
};

export const resetLayoutsToDefault = (
    layouts: DndLayouts,
    defaultLayouts: DndLayouts
) => {
    if (!layouts) return defaultLayouts;

    return layouts
        .map((layout) => {
            const defaultLayout = defaultLayouts.find(
                (defaultLayout) =>
                    defaultLayout.identifier === layout.identifier &&
                    defaultLayout.breakpoint === layout.breakpoint
            );
            if (!defaultLayout) return null;

            return { ...layout, ...defaultLayout };
        })
        .filter(Boolean) as DndLayouts;
};
