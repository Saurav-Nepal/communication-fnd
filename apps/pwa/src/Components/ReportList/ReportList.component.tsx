import { ListActionButton } from '@Components/GenericDocumentListing/genericDocumentListing.component';
import { IsEmptyArray, useLocalSearch } from '@finnoto/core';
import {
    Icon,
    IconButton,
    InputField,
    NoDataFound,
} from '@finnoto/design-system';
import { ArrowRightSvgIcon } from 'assets';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ReportCardProps {
    title: string;
    subTitle: string;
    path: string;
}

interface ReportCardListProps {
    heading: string;
    lists: ReportCardProps[];
}

interface ReportListing {
    data: ReportCardListProps[];
}
const ReportListComponent = ({ data }: ReportListing) => {
    const [enableSearch, setEnableSearch] = useState<boolean>(false);

    const { searchQuery, searchResult, setSearchQuery } = useLocalSearch(
        data[0].lists,
        {
            title: 0.3,
            subTitle: 0.2,
        }
    );

    return (
        <div className='relative pb-10 col-flex'>
            {enableSearch && (
                <div className='fixed top-0 p-2 z-50 items-center w-full gap-2 bg-base-100 row-flex animate-in slide-in-from-top-1/4 fade-in-90 h-[var(--header-height)] border-b'>
                    <InputField
                        className='flex-1'
                        type='text'
                        placeholder={'Search ( min: 3 characters )'}
                        addonStart={
                            <Icon source={'search'} iconColor='text-primary' />
                        }
                        addonEnd={
                            <IconButton
                                shape='square'
                                icon={() => <XCircle />}
                                appearance='plain'
                                size='xs'
                                className='text-error'
                                onClick={() => {
                                    setEnableSearch((prev) => !prev);
                                    setSearchQuery(undefined);
                                }}
                            />
                        }
                        value={searchQuery || ''}
                        onDebounceChange={(value: string) => {
                            if (value.length >= 3) {
                                setSearchQuery(value);
                                return;
                            }

                            if (searchQuery && !value.length) {
                                setSearchQuery(value);
                            }
                        }}
                        autoFocus
                    />
                </div>
            )}
            <div className='rounded '>
                {IsEmptyArray(searchResult) ? (
                    <div className='centralize'>
                        <NoDataFound title='There is no any report list found' />
                    </div>
                ) : (
                    <div className='gap-4 p-4 pt-0 col-flex'>
                        {searchResult.map((val, index) => (
                            <ReportCard key={index} {...val} />
                        ))}
                    </div>
                )}
            </div>

            <div className='fixed z-10 gap-4 -translate-x-1/2 row-flex actions left-1/2 bottom-8'>
                {' '}
                <ListActionButton
                    icon={'search'}
                    onClick={() => setEnableSearch(true)}
                />
            </div>
        </div>
    );
};

const ReportCard = ({ subTitle, title, path }: ReportCardProps) => {
    return (
        <Link
            href={path}
            className='items-center p-4 rounded-lg row-flex bg-base-100'
        >
            <div className='gap-2 col-flex'>
                <p className='text-sm font-medium '>{title}</p>
                <p className='text-xs text-base-tertiary'>{subTitle}</p>
            </div>
            <Icon size={30} source={ArrowRightSvgIcon} isSvg />
        </Link>
    );
};

export default ReportListComponent;
