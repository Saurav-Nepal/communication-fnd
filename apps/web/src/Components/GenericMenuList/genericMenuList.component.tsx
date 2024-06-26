import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { IsEmptyArray, useApp, useLocalSearch } from '@finnoto/core';
import {
    ArcBreadcrumbs,
    Breadcrumbs,
    cn,
    Container,
    Icon,
    InputField,
    NoDataFound,
    TextareaField,
} from '@finnoto/design-system';
import { BreadcrumbsProps } from '@finnoto/design-system/src/Components/Navigation/Breadcrumbs/breadcrumbs.types';

import * as Icons from 'assets';

interface ListingMenuProps {
    display_name: string;
    description: string;
    path: string;
    image?: string;
}

export interface GenericMenuListingProps {
    lists: ListingMenuProps[];
    name: string;
    disableSearch?: boolean;
    showHiddenMenu?: boolean;
    isArc?: boolean;
}
const GenericMenuList = ({
    lists,
    name,
    disableSearch = false,
    showHiddenMenu = false,
    isArc = false,
}: GenericMenuListingProps) => {
    const { basePath } = useApp();

    const sanitizedLists = useMemo(() => {
        if (showHiddenMenu) return lists;
        return lists?.filter((val: any) => val?.visibility);
    }, [lists, showHiddenMenu]);

    const { searchQuery, searchResult, setSearchQuery } = useLocalSearch(
        sanitizedLists,
        {
            display_name: 0.3,
            description: 0.2,
        }
    );

    const breadCrumbsProps: BreadcrumbsProps = useMemo(
        () => ({
            title: name,
            route: [{ name: 'Home', link: basePath }, { name: name }],
        }),
        [basePath, name]
    );

    return (
        <Container
            className={cn('gap-8 py-5 rounded col-flex ', {
                'gap-3': isArc,
            })}
        >
            {isArc ? (
                <ArcBreadcrumbs {...breadCrumbsProps} />
            ) : (
                <Breadcrumbs {...breadCrumbsProps} />
            )}

            <div
                className={cn('gap-4 col-flex', {
                    'gap-2': isArc,
                })}
            >
                {!disableSearch && (
                    <div
                        className={cn('flex', {
                            'p-2 bg-polaris-bg-surface rounded-lg': isArc,
                        })}
                    >
                        {isArc ? (
                            <ArcReportsSearch
                                val={searchQuery}
                                onChange={setSearchQuery}
                            />
                        ) : (
                            <InputField
                                placeholder='Search For the Menu'
                                type='search'
                                value={searchQuery}
                                onChange={(val) => setSearchQuery(val)}
                                addonStart={
                                    <Icon source={'search'} size={24} />
                                }
                            />
                        )}
                    </div>
                )}
                <div
                    className={cn(
                        'py-4 rounded border border-base-300 bg-base-100',
                        {
                            'bg-transparent shadow-none border border-polaris-border p-4 ':
                                isArc,
                        }
                    )}
                >
                    {IsEmptyArray(searchResult) ? (
                        <div className='centralize'>
                            <NoDataFound title='No Menus found' />
                        </div>
                    ) : (
                        <div
                            className={cn(
                                'grid grid-cols-2 gap-3 px-4 lg:grid-cols-3 xl:grid-cols-4',
                                {
                                    'px-0': isArc,
                                }
                            )}
                        >
                            {searchResult.map((val, index) => (
                                <ReportsMenuCard key={index} {...val} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

const ReportsMenuCard = ({
    description,
    display_name,
    path,
    image,
}: ListingMenuProps) => {
    const link = (Icons as any)[image];

    const { isArc } = useApp();

    if (isArc) {
        return (
            <Link
                href={path}
                className='flex items-start p-3 transition-all border rounded-lg cursor-pointer hover:bg-polaris-bg-surface-hover hover:border-polaris-border-hover bg-polaris-bg-surface gap-x-3 border-polaris-border'
            >
                <div className='flex flex-col w-[calc(100%-32px)]'>
                    <div className='w-8 h-8 mb-3 rounded bg-polaris-bg-surface-tertiary centralize'>
                        <Icon
                            source={link || Icons.ArcActionCenterSvgIcon}
                            isSvg
                            size={20}
                            iconColor='text-polaris-icon'
                        />
                    </div>
                    <p className='mb-1 text-sm font-semibold text-polaris-text'>
                        {display_name}
                    </p>
                    <p className='text-xs font-normal break-words text-polaris-text-secondary'>
                        {description}
                    </p>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={path}
            className='gap-x-3 py-2 px-4 transition-all border border-base-300 rounded cursor-pointer hover:border-[--text-base-primary] hover:bg-base-200/40 hover flex items-start'
        >
            {image && link ? <Icon source={link} isSvg size={20} /> : null}
            <div className='flex flex-col w-[calc(100%-32px)]'>
                <p className='mb-1 text-sm font-medium text-base-primary'>
                    {display_name}
                </p>
                <p className='text-xs font-normal break-words text-base-secondary'>
                    {description}
                </p>
            </div>
        </Link>
    );
};

const ArcReportsSearch = ({ val, onChange, className }: any) => {
    return (
        <label
            className={cn(
                'flex flex-1 items-center gap-2 outline-none input focus-within:input-bordered hover:bg-polaris-bg-surface-hover input-sm focus-within:outline-0 focus-within:border-base-primary',
                className
            )}
        >
            <SearchIcon className='w-4 h-4 text-base-tertiary' />
            <input
                name='filter search'
                className='flex-1 hover:bg-polaris-bg-surface-hover h-7'
                value={val}
                onChange={(e) => onChange(e.target.value)}
                placeholder={'Search ( min: 3 characters )'}
                type='search'
            />
        </label>
    );
};

export default GenericMenuList;
