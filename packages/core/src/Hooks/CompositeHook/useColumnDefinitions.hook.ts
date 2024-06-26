import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ListingController } from '../../backend/ap/business/controllers/listing.controller';
import { ListingPreferenceController } from '../../backend/ap/business/controllers/listing.preference.controller';
import { AddListingPreferenceDto } from '../../backend/ap/business/dtos/add.listing.preference.dto';
import {
    GetObjectFromArray,
    IsEmptyArray,
    SortArrayObjectBy,
} from '../../Utils/common.utils';
import { FetchData } from '../useFetchData.hook';

export const useColumnDefinitions = ({
    definitionKey,
    saved_filter,
}: {
    definitionKey: string;
    saved_filter?: string;
}) => {
    const {
        data: definitions,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['column_definitions', definitionKey],
        queryFn: async () => {
            const { response } = await FetchData({
                className: ListingController,
                method: 'show',
                methodParams: definitionKey,
            });

            return response || {};
        },
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled: !!definitionKey,
    });

    const { definition = [], preferences: userPreferences = [] } =
        definitions || {};

    const column_definitions = useMemo(
        () => definition.filter((el) => el?.active),
        [definition]
    );

    /**
     * @description This is for the filter columns
     */
    const filter_column_definitions = useMemo(() => {
        const filteredData = definition.filter(
            (el) => el?.is_visible && el?.filter_identifier
        );
        return SortArrayObjectBy(filteredData, 'name', 'asc');
    }, [definition]);

    const filterPreferences = useMemo(() => {
        return userPreferences?.filter(
            (pref) => pref?.identifier?.toLowerCase() !== 'default'
        );
    }, [userPreferences]);

    const currentFilterId = useMemo(() => {
        if (saved_filter) return saved_filter;
        return null;
    }, [saved_filter]);

    const currentFilter = useMemo(() => {
        if (!currentFilterId) return null;
        const preference = GetObjectFromArray(
            filterPreferences,
            'id',
            Number(currentFilterId)
        );
        return preference || null;
    }, [currentFilterId, filterPreferences]);

    const currentPreference = useMemo(() => {
        return GetObjectFromArray(
            userPreferences,
            'identifier',
            currentFilter?.identifier || 'default'
        );
    }, [currentFilter?.identifier, userPreferences]);

    const userPreferenceDefinitions = useMemo(() => {
        if (!userPreferences || IsEmptyArray(userPreferences)) return [];
        if (
            currentPreference?.column_definition &&
            !IsEmptyArray(currentPreference?.column_definition)
        )
            return currentPreference.column_definition;
        return [];
    }, [currentPreference?.column_definition, userPreferences]);

    const definitionDefaultLayout = useMemo(() => {
        if (IsEmptyArray(column_definitions)) return [];
        return column_definitions
            .filter((def) => def.default)
            .map((def) => ({ name: def.name, key: def.identifier }));
    }, [column_definitions]);

    const savePreference = (data: Partial<AddListingPreferenceDto>) => {
        return FetchData({
            className: ListingPreferenceController,
            method: 'create',
            methodParams: definitionKey,
            classParams: data,
        });
    };

    return {
        isLoading,
        refetch,
        column_definitions,
        filter_column_definitions,
        userPreferences,
        savePreference,
        currentFilterId,
        filterPreferences,
        currentFilter,
        userPreferenceDefinitions,
        definitionDefaultLayout,
        currentPreference,
    };
};
