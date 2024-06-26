import { useCallback } from 'react';

import { SlabsController } from '../../backend/meta/controllers/slabs.controller';
import { FormBuilderAsyncValidationType } from '../../Types';
import { FetchData } from '../useFetchData.hook';

export const useGstinValidate = (
    className?: any,
    method?: string,
    options?: {
        display_name_add?: boolean;
    }
) => {
    const { display_name_add = true } = options || {};
    const validateGstin: FormBuilderAsyncValidationType = useCallback(
        async (code: string, _, handleFormData) => {
            const { success, response } = await FetchData({
                className: className || SlabsController,
                method: method || 'getGstin',
                methodParams: code,
            });
            if (success && response?.id) {
                handleFormData('gstin', response.gstin);
                display_name_add &&
                    handleFormData('display_name', response?.trade_name);
                handleFormData('gstin_detail', response);
                return;
            }
            handleFormData('gstin_detail', undefined);
            return 'Invalid Gstin Number ';
        },
        [className, display_name_add, method]
    );
    return {
        validateGstin,
    };
};
