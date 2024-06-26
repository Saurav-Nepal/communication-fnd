import { useQuery, useQueryClient } from '@tanstack/react-query';

import { FetchData } from '../useFetchData.hook';

export const useGetNotes = (
    id: number,
    { controller }: { controller: any }
) => {
    const queryClient = useQueryClient();
    const { data: notes, isLoading: notedLoading } = useQuery({
        queryKey: ['note', id],
        queryFn: async () => {
            if (!id) return;

            const { success, response } = await FetchData({
                className: controller,
                method: 'getComments',
                methodParams: id,
            });

            if (success) return response;
            return Promise.reject('Something Went Wrong');
        },
    });

    const deleteNote = async (dataId?: number) => {
        const { success, response } = await FetchData({
            className: controller,
            methodParams: { id, dataId },
            method: 'deleteComment',
        });

        if (!success) return;

        queryClient.invalidateQueries({ queryKey: ['note', id] });

        return response;
    };

    return { notedLoading, notes, deleteNote };
};
