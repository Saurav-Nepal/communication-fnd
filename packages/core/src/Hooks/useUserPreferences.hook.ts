import { useCallback, useMemo } from 'react';
import { useToggle } from 'react-use';

import { GetObjectFromArray } from '@finnoto/design-system';

import { useQuery } from '@tanstack/react-query';

import { UserPreferenceController } from '../backend/ap/business/controllers/user.preference.controller';
import { IsEmptyArray, parseJSONString } from '../Utils/common.utils';
import { FetchData } from './useFetchData.hook';

export const useUserPreferences = (property_keys: string | string[]) => {
    const [isSavingPreference, toggleSavingPreference] = useToggle(false);

    const fetchPreferences = async () => {
        const { success, response } = await FetchData({
            className: UserPreferenceController,
            method: 'getAll',
        });

        if (!success)
            return Promise.reject(
                new Error(
                    response?.message ||
                        'Something went wrong while fetching use preferences!'
                )
            );
        return response;
    };

    const { data, refetch, isLoading } = useQuery({
        queryFn: fetchPreferences,
        queryKey: ['user-preferences'],
    });

    const accessPreference = useCallback(
        (key: string) => {
            const preferenceString = GetObjectFromArray(
                data,
                'name',
                key
            )?.preference;

            if (!preferenceString) return;

            return parseJSONString(preferenceString);
        },
        [data]
    );

    const preferences = useMemo(() => {
        if (isLoading) return [];
        if (IsEmptyArray(data)) return [];

        if (!Array.isArray(property_keys)) {
            return [accessPreference(property_keys)];
        }

        return property_keys.map((key) => {
            return accessPreference(key);
        });
    }, [accessPreference, data, isLoading, property_keys]);

    const setPreference = async (key: string, value: any) => {
        toggleSavingPreference(true);
        const { success } = await FetchData({
            className: UserPreferenceController,
            method: 'create',
            methodParams: key,
            classParams: { preference: value },
        });

        toggleSavingPreference(false);

        if (!success) return false;

        refetch();
        return true;
    };

    return [
        preferences,
        { refetch, isLoading, isSavingPreference, setPreference },
    ] as const;
};
