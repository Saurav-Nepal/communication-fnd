import React from 'react';

import { Button, SelectBox } from '@slabs/ds-core';

import { Navigation } from '@/utils/navigation.utils';

type STAT_TYPE = {
    current_page?: number;
    records?: number;
    limit?: number;
};
interface ListingPaginationProps {
    stats: STAT_TYPE;
}

const pageRecordOptions = ['10', '20', '40', '75', '100'];

const ListingPagination = ({
    stats = { current_page: 1, records: 0, limit: 20 },
}: ListingPaginationProps) => {
    const redirectToPage = (count) => {
        const urlParams: any = Navigation.search();

        let page = parseInt(urlParams.page);

        if (page) {
            if (page >= 1) {
                page = page + count;
            }
        } else {
            page = 2;
        }

        if (page > 0) {
            urlParams.page = page;
        }

        Navigation.search(urlParams);
    };

    const changeLimit = (limit) => {
        Navigation.search({ limit });
    };

    return (
        <div className='flex gap-2 items-center p-2 listing-pagination'>
            <div className='btn-group'>
                <Button
                    disabled={!!stats.current_page && stats.current_page <= 1}
                    variant='plain'
                    className='rounded-r-none bg-muted hover:bg-muted-foreground'
                    size='sm'
                    onClick={(e) => {
                        redirectToPage(-1);
                    }}
                >
                    <i className='fa fa-chevron-left' />
                </Button>
                <Button
                    disabled={(stats.records || 0) < (stats.limit || 0)}
                    variant='plain'
                    className='rounded-l-none bg-muted hover:bg-muted-foreground'
                    size='sm'
                    onClick={(e) => {
                        redirectToPage(1);
                    }}
                >
                    <i className='fa fa-chevron-right' />
                </Button>
            </div>
            <div className='page-redirect-number'>
                <SelectBox
                    value={Number(stats.limit)}
                    options={pageRecordOptions.map((value) => ({
                        label: value,
                        value: parseInt(value),
                    }))}
                    variants={{
                        size: 'sm',
                    }}
                    onChange={changeLimit}
                    className='min-w-[100px]'
                    isSearchable={false}
                />
            </div>
        </div>
    );
};

export default ListingPagination;
