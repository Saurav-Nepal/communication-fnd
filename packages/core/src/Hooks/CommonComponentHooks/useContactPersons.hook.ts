import { useCallback, useMemo } from 'react';
import { GenericListingType } from '../../Types';
import { useCustomQueryList } from '../useCustomQueryList.hook';
import { LISTING_CONTROLLER_ROUTER } from '../../Constants';
import { FetchData } from '../useFetchData.hook';
import { Toast } from '../../Utils/toast.utils';

export const useContactPersons = ({
    sourceId,
    type,
    disableNetwork,
}: {
    sourceId: number;
    type: GenericListingType;
    disableNetwork?: boolean;
}) => {
    const className = useMemo(() => LISTING_CONTROLLER_ROUTER[type], [type]);

    const { data, pagination, setPagination, isLoading, refetch } =
        useCustomQueryList({
            controller: className,
            method: 'getContactPersons',
            methodParams: sourceId,
            disableNetwork: disableNetwork,
        });

    const onRemove = useCallback(
        async (contactPersonId: number) => {
            const { success, response } = await FetchData({
                className,
                method: 'deleteContactPerson',
                methodParams: {
                    sourceId,
                    id: contactPersonId,
                },
            });
            if (!success)
                return Toast.error({
                    description: response?.message,
                });
            Toast.success({
                description: 'Successfully deleted!!',
            });
        },
        [className, sourceId]
    );

    return {
        data,
        pagination,
        setPagination,
        isLoading,
        refetchList: refetch,
        onRemove,
    };
};
