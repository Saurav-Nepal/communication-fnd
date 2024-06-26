import { useMutation } from '@tanstack/react-query';
import { FetchData } from './useFetchData.hook';

interface options {
    method?: 'activate' | 'deactivate';
    callback?: (__?: any) => void;
    id?: number;
    methodParams?: any;
}
export const useMultiRowStatus = ({
    controller,
    id,
}: {
    controller: any;
    id?: number;
}) => {
    const className = controller;

    const { mutate: handleStatus } = useMutation({
        mutationFn: async ({ methodParams, id, method, callback }: options) => {
            const { success, response } = await FetchData({
                className,
                methodParams: methodParams,
                method: method,
            });
            if (success) {
                callback(response);
                return response;
            }
            throw new Error('Something Went Wrong..');
        },
    });

    return {
        handleStatus,
    };
};
