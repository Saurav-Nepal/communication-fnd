import { useCallback } from 'react';

import { SlabsController } from '../../backend/meta/controllers/slabs.controller';
import { FetchData } from '../useFetchData.hook';

export const usePostalCodeValidate = (className?: any, method?: string) => {
    const validatePostalCode = useCallback(
        async (code: string, _, handleFormData) => {
            if (!code) return;
            const { success, response } = await FetchData({
                className: className || SlabsController,
                method: method || 'getPostalCode',
                methodParams: code,
            });
            if (success && response?.id) {
                const { city, state } = response || {};
                handleFormData('pincode_address', `${city}, ${state}`);
                return;
            }
            handleFormData('pincode_address', undefined);
            return 'Invalid Pincode number';
        },
        [className, method]
    );
    return {
        validatePostalCode,
    };
};
