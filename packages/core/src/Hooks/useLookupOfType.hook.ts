import { useQuery } from '@tanstack/react-query';

import { LoggedUtilityController } from '../backend/ap/utility/controllers/logged.utility.controller';
import { FetchData } from './useFetchData.hook';

/**
 * Returns an array with the lookup value of the given type ID.
 *
 * @param type_id - The ID of the lookup type to retrieve data from.
 * @param name - (Optional) The name(s) of the lookup data for react-query key.
 *
 * @returns An array with the retrieved data, or an empty array if there was an error.
 */
export const useLookupOfType = (
    type_id: number,
    name: string | string[] = 'lookup',
    isEnabled: boolean = true
) => {
    const { data } = useQuery({
        queryKey: [name, type_id],
        staleTime: 10 * 60 * 1000, // 10 mins
        cacheTime: 15 * 60 * 1000, // 15 mins
        enabled: isEnabled,
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: LoggedUtilityController,
                method: 'getLookupOfType',
                methodParams: type_id,
            });

            if (!success) return [];

            return response;
        },
    });

    return [data];
};
