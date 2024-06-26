import { SlabsController } from '../../backend/meta/controllers/slabs.controller';
import { FormBuilderAsyncValidationType } from '../../Types';
import { IsEmptyObject } from '../../Utils/common.utils';
import { FetchData } from '../useFetchData.hook';

export const useValidatateIfscCode = (
    className?: any,
    method?: string,
    classParams?: any
) => {
    const validateIfscCode: FormBuilderAsyncValidationType = async (
        code: string,
        _,
        handleFormData
    ) => {
        const { success, response } = await FetchData({
            className: className || SlabsController,
            method: method || 'getIfscCode',
            methodParams: code,
            classParams,
        });

        if (success && !IsEmptyObject(response)) {
            handleFormData('branch', response.branch);
            return;
        }
        handleFormData('branch', undefined);
        return 'Invalid IFSC Code';
    };
    return {
        validateIfscCode,
    };
};
