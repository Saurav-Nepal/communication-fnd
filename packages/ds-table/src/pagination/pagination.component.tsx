import React from 'react';

import { Button, SelectBox } from '@slabs/ds-core';
import { cn } from '@slabs/ds-utils';

import { PaginationProps } from './pagination.types';
import { usePagination } from './use-pagination.hook';

export const Pagination = ({
    pagination,
    onPaginationChange = () => {},
    containerClass,
    showEntries = true,
    totalRecords = 0,
    buttonHideIcon,
    onlyShowPrevNext,
    selectedCount,
}: PaginationProps) => {
    const {
        pageLimit,
        limit,
        handlePaginationChange,
        endItemNumber,
        paginationData,
        total,
        page,
    } = usePagination({ onPaginationChange, pagination, totalRecords });

    const { initial_pages, last_pages, middle_pages } = paginationData;

    return (
        <div
            className={cn(
                'pagination-container flex justify-between px-3 py-2 items-center bg-base-100 border-t border-base-300',
                containerClass
            )}
            title='Pagination'
        >
            <SelectBox
                options={pageLimit}
                value={limit}
                onChange={(option: any) =>
                    handlePaginationChange('limit', Number(option?.value))
                }
                isSearchable={false}
                className='w-fit'
                size='sm'
            />

            {showEntries && total ? (
                <div className='flex items-center gap-1 text-sm'>
                    <div className='flex items-center gap-1'>
                        Showing{' '}
                        <span className='font-medium'>
                            {' '}
                            {endItemNumber < total ? endItemNumber : total}/
                            {total}
                        </span>
                    </div>
                    {Number(selectedCount) > 0 && (
                        <div className='flex items-center '>
                            {' >> '} Selected{' '}
                            <span className='pl-1 font-medium'>
                                {selectedCount}/{limit < total ? limit : total}
                            </span>
                        </div>
                    )}
                </div>
            ) : null}
            <div className='items-center gap-2 row-flex '>
                <PaginationButton
                    text='Previous'
                    onlyIcon={buttonHideIcon}
                    disabled={page <= 1 || !totalRecords}
                    onClick={() =>
                        page > 1 && handlePaginationChange('page', page - 1)
                    }
                />
                {!onlyShowPrevNext &&
                    initial_pages.map((value) => (
                        <PaginationNumberButton
                            key={value}
                            number={value}
                            isActive={value === page}
                            onClick={() =>
                                handlePaginationChange('page', value)
                            }
                        />
                    ))}
                {!onlyShowPrevNext &&
                    initial_pages?.length <= last_pages?.length &&
                    !!initial_pages?.length && <span>....</span>}

                {!onlyShowPrevNext &&
                    middle_pages.map((value) => (
                        <PaginationNumberButton
                            key={value}
                            number={value}
                            isActive={value === page}
                            onClick={() =>
                                handlePaginationChange('page', value)
                            }
                        />
                    ))}

                {!onlyShowPrevNext &&
                    initial_pages?.length >= last_pages?.length &&
                    !!last_pages?.length && <span>....</span>}

                {!onlyShowPrevNext &&
                    last_pages.map((value) => (
                        <PaginationNumberButton
                            key={value}
                            number={value}
                            isActive={value === page}
                            onClick={() =>
                                handlePaginationChange('page', value)
                            }
                        />
                    ))}

                {onlyShowPrevNext && (
                    <PaginationNumberButton
                        onClick={() => {}}
                        number={page}
                        isActive
                    />
                )}

                <PaginationButton
                    onlyIcon={buttonHideIcon}
                    text='Next'
                    disabled={
                        (page * limit >= total && !!total) || !totalRecords
                    }
                    onClick={() => handlePaginationChange('page', page + 1)}
                />
            </div>
        </div>
    );
};

const PaginationNumberButton = ({
    number,
    isActive,
    onClick = () => {},
}: {
    number: number;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
}) => {
    return (
        <Button
            className='pagination-number'
            onClick={onClick}
            variant='default'
            size='sm'
        >
            {number}
        </Button>
    );
};

const PaginationButton = ({
    text,
    disabled,
    onClick = () => {},
    onlyIcon,
}: {
    text: 'Next' | 'Previous';
    disabled?: boolean;
    onClick?: Function;
    onlyIcon?: boolean;
}) => {
    const previousSvg = (
        <div className='flex items-center gap-2 '>
            <svg
                width='14'
                height='14'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M9.99998 13.2797L5.65331 8.93306C5.13998 8.41973 5.13998 7.57973 5.65331 7.06639L9.99998 2.71973'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
            {!onlyIcon && <span>Previous</span>}
        </div>
    );

    const nextSvg = (
        <div className='flex items-center gap-2 '>
            {!onlyIcon && <span>Next</span>}

            <svg
                width='14'
                height='14'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M5.93994 13.2797L10.2866 8.93306C10.7999 8.41973 10.7999 7.57973 10.2866 7.06639L5.93994 2.71973'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );

    const normalClass =
        'text-gray-500 bg-white hover:border-primary transition-all dark:hover:bg-gray-400  cursor-pointer text-primary';
    const disabledClass =
        'bg-background dark:bg-gray-500 text-base-secondary cursor-not-allowed font-normal';

    return (
        <div
            className={`flex items-center gap-2 px-3 py-[3px] text-xs font-medium border border-base-300  rounded-md  ${
                disabled ? disabledClass : normalClass
            }`}
            onClick={() => !disabled && onClick()}
        >
            {text === 'Previous' && previousSvg}
            {/* {text} */}
            {text === 'Next' && nextSvg}
        </div>
    );
};
