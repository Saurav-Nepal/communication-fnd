import { useUncontrolled } from '@slabs/ds-hooks';
import { ObjectDto } from '@slabs/ds-utils';

import { useFetchParams } from '../../hooks/use-fetch-params.hook';
import { Navigation, NavigationType } from '../../utils/navigation.utils';

export const useQueryState = <TQuery extends ObjectDto>({
    defaultQueries,
    queries,
    onQueryChange,
    disableQuery = false,
    navMethod = 'replace',
    clearFilter,
}: {
    defaultQueries?: TQuery;
    queries?: TQuery;
    onQueryChange?: (query: TQuery) => void;
    disableQuery?: boolean;
    navMethod?: NavigationType;
    clearFilter?: boolean;
}) => {
    const fetchParams = useFetchParams();
    const { params, searchParams } = fetchParams;

    const searchParamsValue = (
        !disableQuery ? { ...(defaultQueries || {}), ...searchParams } : {}
    ) as TQuery;

    const [query, setQuery] = useUncontrolled<TQuery>({
        value: !disableQuery ? searchParamsValue : queries,
        defaultValue: defaultQueries,
        finalValue: {} as TQuery,
        onChange: onQueryChange,
    });

    const handleQueryChange = (queries: TQuery, reset?: boolean) => {
        if (disableQuery) {
            if (reset) return setQuery(queries);
            return setQuery({ ...query, ...queries });
        }
        const filter: ObjectDto = {};

        if (clearFilter) {
            const jsonFilter = JSON.parse(queries?.filter ?? '{}');
            filter['filter'] = JSON.stringify({
                ...jsonFilter,
                page: 1,
            });
        }

        Navigation.search(
            { ...params, ...queries, ...filter },
            { reset, method: navMethod }
        );
    };

    return [query, handleQueryChange] as const;
};
