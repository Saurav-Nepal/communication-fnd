import { useQuery } from '@tanstack/react-query';

import { FetchData } from '../useFetchData.hook';

export const useGetGenericDocuments = (
    id: number,
    { controller }: { controller: any }
) => {
    const { data: document, isLoading: documentLoading } = useQuery({
        queryKey: ['document', id],
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: controller,
                method: 'getDocuments',
                methodParams: id,
            });

            if (success) return response;
            return Promise.reject('Something Went Wrong');
        },
    });

    return { documentLoading, document };
};
