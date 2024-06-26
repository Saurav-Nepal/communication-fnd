import { GenericListingType, useCustomQueryList } from '@finnoto/core';
import { ReactNode } from 'react';
import { ReactElement } from 'react-imask/dist/mixin';

const GenericDetailListWrapper = ({
    title,
    children,
    showPagination,
    type,
    detail_id,
    detail_type,
    rightComponent,
}: {
    title: string | ReactNode;
    showPagination?: boolean;
    children: ({ data, pagination, setPagination }: any) => ReactElement;
    type: GenericListingType;
    detail_id: number;
    detail_type: string;
    rightComponent?: ReactNode;
}) => {
    const { data, pagination, setPagination } = useCustomQueryList({
        type: type,
        classParams: {
            [detail_type]: detail_id,
        },
    });
    return (
        <div className='flex flex-col items-center border rounded-lg bg-base-100'>
            <div className='row-flex'>
                <div className='font-medium border-b text-base-primary'>
                    {title}
                </div>
                {rightComponent}
            </div>
            {showPagination && (
                <div className='justify-between text-xs text-base-secondary '>
                    <div className=''>Recently Added</div>
                    <div>showing {data?.length / pagination?.total}</div>
                </div>
            )}
            {/* {children({ data, pagination, setPagination })} */}
        </div>
    );
};
export default GenericDetailListWrapper;
