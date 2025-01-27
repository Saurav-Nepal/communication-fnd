import { useEffectOnce } from 'react-use';

import { useMutation } from '@tanstack/react-query';

import { CommunicationTemplateEndPoint } from '../constants/api.constants';
import { BUSINESS_API_HOST } from '../constants/global.constants';
import { Get, Post } from '../services';

const defaultPagination = {
    limit: 10,
    page: 1,
    total: 20,
};
export const useFetchData = () => {
    const {
        mutate: fetchData,
        isPending,
        data,
    } = useMutation({
        mutationKey: ['listing'],
        mutationFn: async (values: any = {}) => {
            const { pagination } = values;

            const { response, success } = await Get({
                urlPrefix: BUSINESS_API_HOST,
                url: CommunicationTemplateEndPoint,
                params: {
                    ...pagination,
                },
            });

            if (success) return response; // Ensure to return the response for further use
            return Promise.reject();
        },
    });

    const onPaginationChange = (pagination) => {
        fetchData({ pagination });
    };

    useEffectOnce(() => {
        fetchData({
            pagination: defaultPagination,
        });
    });

    return {
        data: data?.records || [],
        isLoading: isPending,
        onPaginationChange,
        pagination: data?.stats || defaultPagination,
    };
};
