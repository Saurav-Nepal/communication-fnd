import { IsFunction, Toast } from '@finnoto/design-system';
import { useMutation } from '@tanstack/react-query';
import { ObjectDto } from '../../backend/Dtos';
import { toastBackendError } from '../../Utils/common.utils';
import { FetchData } from '../useFetchData.hook';

export const useAttachBankAccount = (controller: any) => {
    const className = controller;

    const { mutate: attachBank, isLoading } = useMutation({
        mutationFn: async ({
            bank_id,
            account_id,
            callback,
        }: {
            bank_id: number;
            account_id: number;
            callback: (__: ObjectDto) => void;
        }) => {
            const { success, response } = await FetchData({
                className,
                method: 'attachBankAccount',
                methodParams: { bankId: bank_id, accountId: account_id },
            });

            if (success) {
                IsFunction(callback) && callback(response);
                Toast.success({ description: 'Bank Account is attached' });
                return response;
            }
            if (!success) {
                toastBackendError(response);
            }

            throw new Error('Something went wrong');
        },
    });

    return {
        attachBank,
        isLoading,
    };
};
