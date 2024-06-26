import { ObjectDto } from '../backend/Dtos';
import { Navigation, NavigationType } from '../Utils/navigation.utils';
import { useFetchParams } from './useFetchParams.hook';
import { useUncontrolled } from './useUncontrolled.hook';

export const useQueryState = <TQuery extends ObjectDto>({
    defaultQueries,
    queries,
    onQueryChange,
    disableQuery = false,
    navMethod = 'replace',
}: {
    defaultQueries?: TQuery;
    queries?: TQuery;
    onQueryChange?: (query: TQuery) => void;
    disableQuery?: boolean;
    navMethod?: NavigationType;
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

        Navigation.search(
            { ...params, ...queries },
            { reset, method: navMethod }
        );
    };

    return [query, handleQueryChange] as const;
};
