import { useEffect } from 'react';

import {
    GENERIC_LISTING_REFETCH,
    GenericListingType,
    IsFunction,
    ObjectDto,
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
    useCustomQueryList,
} from '@finnoto/core';
import {
    Table,
    TableColumn,
    TablemenuActionFunctionProps,
    TablemenuActionProps,
} from '@finnoto/design-system';
import { NoDataFoundProps } from '@finnoto/design-system/src/Components/Data-display/NoDataFound/noDataFound.types';

export interface DataTableProps {
    type: GenericListingType;
    method?: string;
    methodParams?: number | ObjectDto;
    classParams?: ObjectDto;
    columns: TableColumn[];
    rowActions?: TablemenuActionProps[] | TablemenuActionFunctionProps;
    disablePagination?: boolean;
    disableNetwork?: boolean;
    noDataFound?: NoDataFoundProps;
}

const DataTable = ({
    type,
    method = 'list',
    methodParams,
    columns,
    rowActions,
    classParams = {},
    disablePagination,
    disableNetwork,
    ...rest
}: DataTableProps) => {
    const {
        data,
        isLoading,
        pagination,
        setPagination,
        handleStatus,
        refetch,
    } = useCustomQueryList({
        type,
        methodParams,
        method,
        disableNetwork,
        classParams,
    });

    return (
        <Table
            data={data}
            column={columns}
            rowAction={{
                display:
                    IsFunction(rowActions) ||
                    rowActions?.some((action) => action.visible !== false),
                menuActions: rowActions,
            }}
            loading={isLoading}
            {...{
                pagination: {
                    display: !disablePagination,
                    pagination,
                    onPaginationChange: setPagination,
                },
                preferences: {
                    bordered: true,
                    roundedCorners: true,
                    fullHeight: true,
                },
                handleStatus,
            }}
            {...rest}
        />
    );
};

export default DataTable;
