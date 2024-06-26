import { cn } from '../../../Utils/common.ui.utils';
import { Button } from '../../Inputs/Button/button.component';
import { SelectBox } from '../../Inputs/SelectBox/selectBox.component';
import { PaginationProps } from './pagination.interface';
import { usePagination } from './usePagination.hook';

export const ArcPagination = ({
    pagination,
    onPaginationChange = () => {},
    containerClass,
    showEntries = true,
    totalRecords = 0,
    buttonHideIcon,
    onlyShowPrevNext,
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
                'pagination-container flex justify-between p-2 items-center rounded-lg bg-polaris-bg-surface border',
                containerClass
            )}
            title='Pagination'
        >
            <SelectBox
                options={pageLimit}
                value={limit}
                size='sm'
                width={140}
                onChange={(option) =>
                    handlePaginationChange('limit', Number(option.value))
                }
                className='text-xs font-medium !w-[105px]'
                containerClassName='min-w-0'
                noBorder
            />
            {showEntries && total ? (
                <div className='text-xs'>
                    Showing{' '}
                    <span className='font-medium'>
                        {' '}
                        {endItemNumber < total ? endItemNumber : total}/{total}
                    </span>
                </div>
            ) : null}
            <div
                className={cn('items-center gap-2 row-flex ', {
                    'gap-0': onlyShowPrevNext,
                })}
            >
                <PaginationButton
                    type='previous'
                    disabled={page <= 1}
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

                <PaginationButton
                    type='next'
                    disabled={!total || page * limit >= total}
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
}) => {
    return (
        <Button
            className='pagination-number'
            onClick={onClick}
            size='xs'
            shape='square'
            appearance={isActive ? 'polaris-tertiary' : 'polaris-white'}
        >
            {number}
        </Button>
    );
};

const PaginationButton = ({
    type,
    disabled,
    onClick = () => {},
}: {
    type: 'next' | 'previous';
    disabled?: boolean;
    onClick?: Function;
}) => {
    const previousSvg = (
        <svg
            width='16'
            height='16'
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
    );

    const nextSvg = (
        <svg
            width='16'
            height='16'
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
    );

    return (
        <Button
            className={cn({
                'rounded-tl-none rounded-bl-none': type === 'next',
                'rounded-tr-none rounded-br-none': type === 'previous',
            })}
            appearance='polaris-tertiary'
            onClick={() => !disabled && onClick()}
            size='xs'
            shape='square'
            outline
            disabled={disabled}
        >
            {type === 'previous' && previousSvg}
            {/* {type} */}
            {type === 'next' && nextSvg}
        </Button>
    );
};
