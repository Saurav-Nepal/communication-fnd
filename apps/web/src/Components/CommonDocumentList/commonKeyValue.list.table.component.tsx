import { PaginationType, useQuery } from '@finnoto/core';
import {
    ModalBody,
    ModalContainer,
    Table,
    TableColumn,
} from '@finnoto/design-system';
import { useState } from 'react';

export type CommonKeyValueTableQueryFnType = <TData>(
    pagination?: PaginationType
) => Promise<{
    column: TableColumn[];
    data: TData[];
}>;

const CommonKeyValueListTable = ({
    title = 'Values',
    queryFn,
}: {
    title?: string;
    queryFn?: CommonKeyValueTableQueryFnType;
}) => {
    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        limit: 10,
    });
    const { data: queryData, isLoading } = useQuery({
        queryKey: ['commonKeyValueListTable', title, pagination],
        queryFn: () => queryFn(pagination),
    });

    const { column, data } = queryData || {};

    return (
        <ModalContainer title={title}>
            <ModalBody className='p-2'>
                <Table
                    column={column}
                    data={data}
                    loading={isLoading}
                    pagination={{
                        pagination,
                        onPaginationChange: setPagination,
                    }}
                />
            </ModalBody>
        </ModalContainer>
    );
};

export default CommonKeyValueListTable;
