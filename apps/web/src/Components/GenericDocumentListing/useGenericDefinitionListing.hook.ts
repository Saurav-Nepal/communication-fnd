import { useCallback, useMemo } from 'react';

import {
    AccessNestedObject,
    GetObjectFromArray,
    IsEmptyArray,
    IsValidString,
    useApp,
    useColumnDefinitions,
    useFetchParams,
} from '@finnoto/core';
import { getColumnType } from '@finnoto/core/src/Utils/genericDefinition.utils';
import { TableColumn, Toast } from '@finnoto/design-system';

import { GenericDefinitionListingProps } from './genericDefinitionListing.types';

export const useGenericDefinitionListing = ({
    definitionKey,
}: Pick<GenericDefinitionListingProps, 'definitionKey'>) => {
    const { basePath } = useApp();
    const { saved_filter } = useFetchParams();

    const {
        isLoading,
        refetch,
        column_definitions,
        savePreference,
        currentFilter,
        userPreferenceDefinitions,
        definitionDefaultLayout,
        currentPreference,
    } = useColumnDefinitions({ definitionKey, saved_filter });

    const allColumnsLayout = useMemo(() => {
        if (IsEmptyArray(column_definitions)) return [];
        return column_definitions.map((def) => ({
            name: def.name,
            key: def.identifier,
        }));
    }, [column_definitions]);

    const constructLayoutPreference = useCallback(
        (layoutList: any[]) => {
            const layouts: (TableColumn & {
                macro?: string;
                query_macro?: string;
                dynamicStatus?: string;
            })[] = [];

            layoutList?.forEach((layout) => {
                const columnKey = layout?.key || layout?.identifier;
                const def = GetObjectFromArray(
                    column_definitions,
                    'identifier',
                    columnKey
                );

                if (!def) return;

                const layoutObj: TableColumn & {
                    display_name?: string;
                    macro?: string;
                    dynamicStatus?: string;
                } = {
                    display_name: layout.display_name,
                    name: layout.display_name || def.name,
                    key: def.identifier,
                    filter_identifier: def.filter_identifier,
                    type: getColumnType(def.column_type_id, def.attributes),
                    macro: IsValidString(def.macro) ? def.macro : undefined,
                    sortable: def.is_sortable,
                    enableDbSort: def.is_db_sortable,
                    visible: def.visible,
                    ...(def.attributes || {}),
                };

                if (def.reference_url) {
                    layoutObj.url = (item) =>
                        `${basePath}${def.reference_url}${
                            !def.reference_url.endsWith('=') ? '/' : ''
                        }${AccessNestedObject(
                            item,
                            def?.reference_column || 'id'
                        )}`;
                }

                layouts.push(layoutObj);
            });

            return layouts;
        },
        [basePath, column_definitions]
    );

    const all_layouts_preference = useMemo(() => {
        return constructLayoutPreference(allColumnsLayout);
    }, [allColumnsLayout, constructLayoutPreference]);

    const layout_preference = useMemo(() => {
        let layoutList = definitionDefaultLayout;

        if (!IsEmptyArray(userPreferenceDefinitions))
            layoutList = userPreferenceDefinitions;

        return constructLayoutPreference(layoutList);
    }, [
        definitionDefaultLayout,
        userPreferenceDefinitions,
        constructLayoutPreference,
    ]);

    const saveLayout = async (
        layout: (TableColumn & { macro?: string })[],
        is_global: boolean = false
    ) => {
        const { success, response } = await savePreference({
            id: currentPreference?.id,
            identifier: currentFilter?.identifier || 'default',
            column_definition: layout,
            is_global,
        });

        if (!success) return Toast.error({ description: response.message });
        refetch();
    };

    return {
        isLoading,
        userPreferenceDefinitions,
        definitionDefaultLayout,
        layout_preference,
        column_definitions,
        all_layouts_preference,
        saveLayout,
    };
};
