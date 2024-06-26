import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';

import {
    Capitalize,
    EmptyFunction,
    FetchData,
    FINOPS_EXPENSE_DASHBOARD_ROUTE,
    GetObjectFromArray,
    LISTING_CONTROLLER_ROUTER,
    ObjectDto,
    toastBackendError,
    useFetchParams,
    useQuery,
} from '@finnoto/core';
import { CustomFieldController } from '@finnoto/core/src/backend/ap/business/controllers/custom.field.controller';
import {
    AnimatedTabs,
    Breadcrumbs,
    Button,
    Container,
    DropdownMenuActionProps,
    Icon,
    TAB_ITEM,
    Table,
    TableColumn,
    TableProps,
    Toast,
} from '@finnoto/design-system';

interface filterListItem extends Omit<TAB_ITEM, 'component'> {
    type?: string;
    query_key?: string;
    action_key?: string;
    customFilterValue?: ObjectDto;
    column?: TableColumn[];
}

interface FilterAnimatedTabTableListInterface extends Omit<TableProps, 'data'> {
    name: string;
    type: string;
    filters: filterListItem[];
    onFilterChange?: (filterProps: ObjectDto, filterValue?: string) => void;
    tabFilterKey?: string;
    defaultFilter?: string;
    actions?: DropdownMenuActionProps[];
    onAddAction?: (
        title: string,
        options: {
            type_id: number;
            className: any;
            callback?: () => void;
        }
    ) => void;
}

const FilterAnimatedTabTableList = forwardRef(
    (
        {
            name,
            type,
            filters,
            onFilterChange,
            tabFilterKey = 'tab',
            actions = [],
            defaultFilter,
            onAddAction,
            ...rest
        }: FilterAnimatedTabTableListInterface,
        ref
    ) => {
        const { [tabFilterKey]: tab } = useFetchParams();
        const [pagination, setPagination] = useState<any>({
            page: 1,
            limit: 20,
        });

        const currentTab = useMemo(
            () => GetObjectFromArray(filters, 'key', tab || defaultFilter),
            [filters, tab, defaultFilter]
        );
        const typeId = useMemo(() => {
            return currentTab?.action_key || currentTab?.key;
        }, [currentTab?.action_key, currentTab?.key]);

        const currentType = useMemo(
            () => currentTab?.type || type,
            [currentTab?.type, type]
        );

        const className = useMemo(
            () => LISTING_CONTROLLER_ROUTER[type],
            [type]
        );

        const fetchTabList = useCallback(async () => {
            if (!typeId) return {};
            const { success, response } = await FetchData({
                className,
                method: 'list',
                classParams: {
                    ...pagination,
                    type_id: typeId,
                },
            });
            if (success) return response;
            return {};
        }, [className, pagination, typeId]);

        const {
            data,
            isLoading: loading,
            refetch: fetchList,
        } = useQuery({
            queryKey: [`${name} list `, pagination, currentType, typeId],
            queryFn: fetchTabList,
            enabled: !!typeId,
        });

        const column = useMemo(() => {
            return currentTab?.column || rest?.column || [];
        }, [currentTab?.column, rest?.column]);

        const getTabTitle = useCallback(() => {
            return currentTab?.title;
        }, [currentTab?.title]);
        useImperativeHandle(
            ref,
            () => {
                return {
                    fetchList,
                    getTabTitle,
                };
            },
            [fetchList, getTabTitle]
        );

        const bread_crumbs = useMemo(
            () => [
                {
                    name: 'Home',
                    link: FINOPS_EXPENSE_DASHBOARD_ROUTE,
                },
                {
                    name: getTabTitle(),
                },
            ],
            [getTabTitle]
        );
        const handleStatus = async (
            id: number,
            isActivate = true,
            fn_method = 'activate',
            callback = EmptyFunction
        ) => {
            const { success, response } = await FetchData({
                className: CustomFieldController,
                methodParams: id,
                method: isActivate ? `${fn_method}` : `de${fn_method}`,
            });
            if (!success) return toastBackendError(response);
            Toast.success({ description: 'Status Changed' });
            fetchList();
            callback();
        };

        return (
            <Container className='gap-4 py-5 col-flex h-content-screen'>
                <div className='items-center justify-between row-flex'>
                    <Breadcrumbs
                        title={Capitalize(name)}
                        route={bread_crumbs}
                    />
                    <div className='flex items-center justify-between mb-3'>
                        {actions?.map((action) => {
                            return (
                                <Button
                                    onClick={() =>
                                        onAddAction(getTabTitle(), {
                                            type_id: typeId,
                                            className,
                                            callback: fetchList,
                                        })
                                    }
                                    className='gap-2 row-flex'
                                    appearance='primary'
                                    key={action?.key}
                                >
                                    <Icon source={'add_circle_outline'} />{' '}
                                    <span>{action?.name}</span>
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <AnimatedTabs tabs={filters} contentContainerClass='hidden' />
                <Table
                    {...{
                        column,
                        data: data?.records || [],
                        preferences: {
                            stickyHeader: true,
                        },
                        loading,
                        pagination: {
                            pagination: {
                                ...(data?.stats || {}),
                            },
                            onPaginationChange: (value) => setPagination(value),
                        },
                    }}
                    handleStatus={handleStatus}
                    {...rest}
                />
            </Container>
        );
    }
);

export default FilterAnimatedTabTableList;
