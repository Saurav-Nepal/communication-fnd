import { useQuery } from '@tanstack/react-query';
import { FetchData } from './useFetchData.hook';

/**
 *
 * @param param0 it takes and id of the data want to fetch
 * @param param1 it takes an controller
 *
 * @description this will be used while showing data in hover box
 * @returns
 */
export const useHoverBox = ({
    id,
    controller,
    method = 'show',
    disabledNetwork,
}: {
    id: any;
    controller: any;
    method?: string;
    disabledNetwork?: boolean;
}) => {
    const {
        data: hoverBoxDetail,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['hoverbox', id],
        queryFn: async () => {
            if (disabledNetwork) return {};
            const { success, response } = await FetchData({
                className: controller,
                method,
                methodParams: id,
            });

            if (!success) return {};

            return response;
        },
    });

    return {
        hoverBoxDetail,
        isLoading,
        isSuccess,
    };
};
