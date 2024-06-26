'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
    groupBusiness,
    IsEmptyArray,
    LOGIN_ROUTE,
    ObjectDto,
    useUserHook,
} from '@finnoto/core';
import { Icon, Modal, PageLoader } from '@finnoto/design-system';

import { OnBoardingImgSvg, OnBoardingSolidImgSvg } from 'assets';

const BusinessSelector = ({
    businesses,
    callback,
}: {
    businesses: ObjectDto[];
    callback: (_: any, func: () => void) => void;
}) => {
    const { user } = useUserHook();

    return (
        <div className='px-4 py-6 gap-4 col-flex w-full max-h-[100vh] '>
            <div className='flex items-center justify-center w-full'>
                <div className='flex items-center justify-center h-16 w-16 rounded-full bg-[#4CC3C733] '>
                    <Icon
                        iconClass='flex items-center justify-center'
                        source={OnBoardingImgSvg}
                        isSvg
                        size={32}
                    />
                </div>
            </div>
            <div className='gap-8 col-flex'>
                <div className='gap-2 text-center col-flex'>
                    <p className='text-xl font-medium text-base-primary'>
                        Select Organization
                    </p>
                    <p className='text-sm '>
                        Please select the organization you would like to connect
                        with
                    </p>
                </div>
            </div>
            <div className='h-full py-4 overflow-y-auto hide-scrollbar-business'>
                <RenderBusinessSelector {...{ businesses, callback }} />
            </div>
            {!user?.id && (
                <div className='text-center'>
                    <Link
                        href={LOGIN_ROUTE}
                        className='text-sm text-info link-hover'
                        onClick={() => {
                            Modal.close();
                        }}
                    >
                        Login with different user
                    </Link>
                </div>
            )}
        </div>
    );
};

export const RenderBusinessSelector = ({
    businesses,
    callback,
}: {
    businesses: ObjectDto[];
    callback: (_: any, func: () => void) => void;
}) => {
    // const [activeBusiness, setActiveBusiness] = useState();
    const [loading, setLoading] = useState<boolean>(false);

    const groupedBusinesses: any[] = useMemo(() => {
        return groupBusiness(businesses);
    }, [businesses]);

    return (
        <>
            {loading ? (
                <PageLoader className='h-60' screenHeight={false} />
            ) : null}
            {!loading && !IsEmptyArray(groupedBusinesses) ? (
                <div className='gap-3 col-flex'>
                    {groupedBusinesses.map((business, index) => (
                        <div
                            key={business.id}
                            id={'org-' + (index + 1)}
                            className='items-center justify-between gap-3 px-4 py-3 transition-all border rounded cursor-pointer select-none bg-base-100 row-flex'
                            onClick={() => {
                                // setActiveBusiness(business?.id);
                                callback(business, () => setLoading(false));
                                setLoading(true);
                            }}
                        >
                            <div className='items-center flex-1 gap-3 row-flex'>
                                <div className='w-6 h-6 overflow-hidden rounded centralize bg-accent/20 text-accent'>
                                    <Icon
                                        source={OnBoardingSolidImgSvg}
                                        isSvg
                                        size={20}
                                    />
                                </div>
                                <div className='flex items-center flex-1'>
                                    <span className='flex-1 block text-sm text-base-primary'>
                                        {business.name}
                                    </span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                            {/* <Icon
                                    source={
                                        activeBusiness === business?.id
                                            ? VerifiedTickSvgIcon
                                            : UnVerifiedTickSvgIcon
                                    }
                                    size={24}
                                    iconColor={
                                        activeBusiness === business?.id
                                            ? 'text-primary'
                                            : 'text-base-tertiary/20'
                                    }
                                    isSvg
                                /> */}
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default BusinessSelector;
