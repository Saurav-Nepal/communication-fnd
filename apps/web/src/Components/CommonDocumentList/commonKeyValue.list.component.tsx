import {
    ArrowDownUp,
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
} from 'lucide-react';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import {
    AccessNestedObject,
    GetObjectFromArray,
    SortArrayObjectBy,
    useQuery,
} from '@finnoto/core';
import {
    cn,
    Ellipsis,
    ModalBody,
    ModalContainer,
    TableColumn,
} from '@finnoto/design-system';
import {
    handleTableItemDisplay,
    SelectableMenu,
    SelectableMenuProps,
} from '@finnoto/design-system/src/Components/Data-display/Table/table.utils';

import headerComponent from '@Components/AdminWrappers/Components/header.component';

export type CommonKeyValueQueryFnType = <TData>() => Promise<{
    column: TableColumn[];
    data: TData[];
    headerComponent?: JSX.Element;
}>;

const CommonKeyValueList = ({
    title = 'Values',
    isDefination,
    queryFn,
    handleStatus,
    topColumnKey = 'row_num',
}: {
    title?: string;
    isDefination?: boolean;
    queryFn?: CommonKeyValueQueryFnType;
    handleStatus?: any;
    topColumnKey?: string;
}) => {
    const { data: queryData, isLoading } = useQuery({
        queryKey: ['commonKeyValueList', title],
        queryFn,
    });

    const { column, data, headerComponent } = queryData || {};

    const [columnSort, setColumnSort] = useState('asc');

    const tableSortingFilter = [
        {
            name: 'Ascending',
            key: 'asc',
            icon: <ArrowUpNarrowWide size={14} />,
            action: (value) => setColumnSort(value),
        },
        {
            name: 'Descending',
            key: 'desc',
            icon: <ArrowDownWideNarrow size={14} />,
            action: (value) => setColumnSort(value),
        },
    ];

    const sortedColumns = useMemo(() => {
        const sortColumn = column ? [...column] : [];
        if (columnSort === 'asc') {
            return SortArrayObjectBy(sortColumn, 'name', 'asc');
        } else if (columnSort === 'desc') {
            return SortArrayObjectBy(sortColumn, 'name', 'desc');
        } else {
            return sortColumn;
        }
    }, [column, columnSort]);
    const renderTopColumn = useCallback(() => {
        try {
            if (isLoading) return;
            const column = GetObjectFromArray(
                sortedColumns,
                'key',
                topColumnKey
            );
            if (!column) return <span></span>;
            return (
                <span className='pl-2 text-sm'>
                    {column?.name} : {data[column?.key]}
                </span>
            );
        } catch (error) {
            return <span></span>;
        }
    }, [data, isLoading, sortedColumns, topColumnKey]);

    return (
        <ModalContainer title={title}>
            <ModalBody className='gap-2 p-2'>
                {!isLoading && headerComponent}
                <Title
                    activeSort={columnSort}
                    leftSide={renderTopColumn()}
                    tableSortingFilter={tableSortingFilter}
                    handleClear={() => setColumnSort('default')}
                />
                <div className='p-2 rounded col-flex bg-base-100'>
                    {!isLoading &&
                        sortedColumns
                            .filter((item) => topColumnKey !== item?.key)
                            ?.map((col, colIndex) => {
                                const value = AccessNestedObject(data, col.key);

                                return (
                                    <div
                                        key={col.key}
                                        className='grid grid-cols-2 px-2 py-2 text-sm transition-all rounded-sm hover:bg-base-300 hover:shadow even:bg-base-200'
                                    >
                                        <span>{col.name} </span>

                                        <div className='flex justify-end flex-1 text-right '>
                                            {isDefination
                                                ? handleTableItemDisplay(
                                                      data,
                                                      col,
                                                      handleStatus,
                                                      colIndex,
                                                      0
                                                  )
                                                : value !== undefined &&
                                                  value !== null
                                                ? value
                                                : '-'}
                                        </div>
                                    </div>
                                );
                            })}
                    {isLoading && <CommonKeyValueListLoading />}
                </div>
            </ModalBody>
        </ModalContainer>
    );
};

export default CommonKeyValueList;

const CommonKeyValueListLoading = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((number: number) => (
                <div key={number} className='grid grid-cols-2 px-2 py-2'>
                    <div
                        className={cn('animate-pulse rounded-md bg-primary/10')}
                        style={{
                            height: '20px',
                            width: '220px',
                        }}
                    />
                    <div
                        className={cn('animate-pulse rounded-md bg-primary/10')}
                        style={{
                            height: '20px',
                            width: '250px',
                        }}
                    />
                </div>
            ))}
        </>
    );
};

const Title = ({
    activeSort,
    tableSortingFilter,
    handleClear,
    leftSide,
}: {
    activeSort?: string;
    tableSortingFilter?: SelectableMenuProps['menus'];
    handleClear?: () => void;
    leftSide?: ReactNode;
}) => {
    const icon = useMemo(() => {
        return (
            tableSortingFilter?.find((item) => item.key === activeSort)
                ?.icon || <ArrowDownUp size={14} />
        );
    }, [activeSort, tableSortingFilter]);

    return (
        <div className='flex items-center justify-between'>
            {leftSide || <span></span>}
            <div className='cursor-pointer '>
                <SelectableMenu
                    menus={tableSortingFilter}
                    active={activeSort}
                    onClickToClear={handleClear}
                    menubarTriggerClassName='cursor-pointer'
                    menubarContentClassName='-translate-x-3'
                >
                    <div className='flex gap-2 px-3 py-2 border rounded'>
                        <span>Sort By Name</span>
                        {icon}
                    </div>
                </SelectableMenu>
            </div>
        </div>
    );
};
