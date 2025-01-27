'use client';

import { BreadCrumb, Button } from '@slabs/ds-core';
import { DropdownMenuActionsProps } from '@slabs/ds-core/lib/components/dropdown-action/drop-down-action.types';

import { DataTable } from '../../../components/table/table';
import { WHATSAPP_TEMPLATE_CREATION_ROUTE } from '../../../constants/routeName.constants';
import { useFetchData } from '../../../hooks/useFetchData.hook';
import { Navigation } from '../../../utils/navigation.utils';

const YourTemplatesListModule = () => {
    const { data, isLoading, onPaginationChange, pagination } = useFetchData();
    // Define your columns
    const columns: any = [
        {
            header: 'Template Name',
            accessorKey: 'name',
            link: (row: any) =>
                `${WHATSAPP_TEMPLATE_CREATION_ROUTE}?id=${row.id}`,
        },
        {
            header: 'category',
            accessorKey: 'category',
        },
        {
            header: 'status',
            accessorKey: 'status',
        },
        {
            header: 'Language',
            accessorKey: 'language',
        },
        {
            header: 'Last Updated',
            accessorKey: 'updated_at',
        },
    ];

    const rowAction: DropdownMenuActionsProps = {
        actions: [
            {
                name: 'Edit',
                key: 'edit',
                action: (row: any) => {
                    Navigation.navigate({
                        url: WHATSAPP_TEMPLATE_CREATION_ROUTE,
                        queryParam: { id: row?.id },
                    });
                },
            },
        ],
    };

    const navigateToCreationPage = () => {
        Navigation.navigate({ url: WHATSAPP_TEMPLATE_CREATION_ROUTE });
    };

    return (
        <div className='container p-6 mx-auto h-full'>
            <div className='flex justify-between items-center'>
                <BreadCrumb title='Your Templates'>
                    {[<p>Home</p>, <p>Your Template</p>]}
                </BreadCrumb>
                <div>
                    <Button onClick={navigateToCreationPage}>
                        + Add Template
                    </Button>
                </div>
            </div>
            <div className='mt-6 h-full'>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                    rowActionProps={rowAction}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default YourTemplatesListModule;
