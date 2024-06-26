import { useMemo } from 'react';

import { GetObjectFromArray, IsFunction } from '@finnoto/core';
import { PageLoader } from '@finnoto/design-system';

import ColumnConfigurator from '@Components/LayoutConfigurator/column.configurator.component';

import { GenericDefinitionListingProps } from './genericDefinitionListing.types';
import GenericDocumentListing from './genericDocumentListing.component';
import { GenericDocumentListingProps } from './genericDocumentListing.types';
import { useGenericDefinitionListing } from './useGenericDefinitionListing.hook';
import * as GenericMacro from './Utils/genericDefinitionMacros.utils';

const GenericDefinitionListing = ({
    definitionKey,
    macros,
    query_macros,
    status_macros,
    hideTableConfiguration = false,
    configurationClass,
    hideListingSlug,
    visibleFunctions,
    containerClassName,
    ...rest
}: GenericDefinitionListingProps) => {
    const {
        isLoading,
        layout_preference,
        column_definitions,
        all_layouts_preference,
        saveLayout,
        definitionDefaultLayout,
    } = useGenericDefinitionListing({
        definitionKey,
    });
    const allColumns = useMemo(() => {
        return processPreferences(
            all_layouts_preference,
            macros,
            query_macros,
            status_macros,
            visibleFunctions
        );
    }, [
        all_layouts_preference,
        macros,
        query_macros,
        status_macros,
        visibleFunctions,
    ]);

    const table: GenericDocumentListingProps['table'] = useMemo(() => {
        return processPreferences(
            layout_preference,
            macros,
            query_macros,
            status_macros,
            visibleFunctions
        );
    }, [
        layout_preference,
        macros,
        query_macros,
        status_macros,
        visibleFunctions,
    ]);
    if (isLoading) return <PageLoader />;
    return (
        <GenericDocumentListing
            {...{ table }}
            {...rest}
            definitionKey={definitionKey}
            allColumns={allColumns}
            containerClassName={containerClassName}
            defaultClassParams={{
                ...(rest?.defaultClassParams || {}),
                ...(hideListingSlug ? {} : { listing_slug: definitionKey }),
            }}
            renderRightFilterComponent={
                <>
                    {!hideTableConfiguration && (
                        <ColumnConfigurator
                            {...{
                                preferences: layout_preference,
                                definitions: visibleFunctions
                                    ? column_definitions.filter((def) => {
                                          const preference = GetObjectFromArray(
                                              allColumns,
                                              'key',
                                              def?.identifier
                                          );

                                          return !!preference;
                                      })
                                    : column_definitions,
                                defaultLayout: definitionDefaultLayout,
                                saveLayout,
                                configurationClass,
                            }}
                        />
                    )}
                    {rest?.renderRightFilterComponent}
                </>
            }
        />
    );
};

export default GenericDefinitionListing;

function processPreferences(
    preferences,
    macros,
    query_macros,
    status_macros,
    visibleFunctions = {}
) {
    return preferences
        .map((preference) => {
            const newPref = { ...preference };

            if (preference?.visibleFunc) {
                const func = visibleFunctions[preference.visibleFunc];
                newPref.visible = IsFunction(func) ? func?.() : func;
            }

            if (preference.macro) {
                if (macros?.[preference.macro]) {
                    newPref.renderValue = macros[preference.macro];
                } else if (GenericMacro[preference.macro]) {
                    newPref.renderValue = GenericMacro[preference.macro];
                }
            }
            if (preference?.dynamicStatus) {
                if (status_macros && status_macros[preference?.dynamicStatus]) {
                    newPref.dynamicStatus = status_macros[
                        preference.dynamicStatus
                    ] as any;
                } else if (GenericMacro[preference.dynamicStatus]) {
                    newPref.dynamicStatus = GenericMacro[
                        preference.dynamicStatus
                    ] as any;
                }
            }
            if (preference?.query_macro) {
                if (query_macros && query_macros[preference?.query_macro]) {
                    newPref.getRightClickCustomQuery = query_macros[
                        preference.query_macro
                    ] as any;
                } else if (GenericMacro[preference.query_macro]) {
                    newPref.getRightClickCustomQuery = GenericMacro[
                        preference.query_macro
                    ] as any;
                }
            }

            return newPref;
        })
        .filter((obj) => obj.visible !== false);
}
