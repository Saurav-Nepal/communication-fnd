import { FetchData, useQuery } from '@finnoto/core';
import { ScheduleBroadcastController } from '@finnoto/core/src/backend/communication/controller/schedule.broadcast.controller';

export const useScheduleBroadCastDetail = (id: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['schedule_detail'],
        queryFn: async () => {
            const { success, response } = await FetchData({
                className: ScheduleBroadcastController,
                method: 'show',
                methodParams: id,
            });

            if (success) return response;
            Promise.reject();
        },
    });

    return {
        data,
        isLoading,
    };
};
