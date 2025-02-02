import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ObjectDto } from '../backend/Dtos';

export const useFetchParams = (): {
    params: ObjectDto;
    queryParams: ObjectDto;
    queryString: ObjectDto;
    searchParams: ObjectDto;
    isRouteReady: boolean;
    [x: string]: any;
} => {
    const { isReady } = useRouter();
    const params = useParams();
    const urlSearchParams = useSearchParams();

    const searchParams = useMemo(() => {
        const params = {};
        for (const [key, value] of urlSearchParams.entries()) {
            params[key] = value;
        }
        return params;
    }, [urlSearchParams]);

    return {
        ...params,
        ...searchParams,
        params,
        searchParams,
        queryParams: { ...params, ...searchParams },
        queryString: { ...params, ...searchParams },
        isRouteReady: isReady,
    };
};
