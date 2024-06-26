import { useQuery } from '@tanstack/react-query';

import { LoggedUtilityController } from '../backend/ap/utility/controllers/logged.utility.controller';
import { FetchData } from './useFetchData.hook';

export const usePaymentModes = () => {
    const fetchPayments = async () => {
        const { success, response } = await FetchData({
            className: LoggedUtilityController,
            method: 'getLookupOfType',
            methodParams: 118,
        });

        if (success) return response;
        return [];
    };

    const { data: payment_modes, isLoading } = useQuery({
        queryKey: ['payment modes'],
        queryFn: fetchPayments,
    });

    return [payment_modes as any, isLoading];
};
