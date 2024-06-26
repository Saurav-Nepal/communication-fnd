import {
    AccessManager,
    IsProduction,
    PRODUCT_IDENTIFIER,
    useApp,
} from '@finnoto/core';
import React, { useMemo } from 'react';

const UATBanner = () => {
    const { product_id, menuDetails } = useApp();

    const menuDetailUrl = useMemo(() => {
        if (product_id === PRODUCT_IDENTIFIER.RECO) {
            return `https://f-admin.vercel.app/application-menu/${menuDetails?.id}`;
        }
        return `https://f-expense-admin.vercel.app/application-menu/${menuDetails?.id}`;
    }, [menuDetails?.id, product_id]);

    if (!IsProduction()) {
        return (
            <div className='fixed top-0 left-1/2 -translate-x-1/2 z-[9999999]'>
                <div className='items-center gap-1 px-4 py-1 text-xs rounded-b-lg shadow col-flex bg-warning/20 text-warning min-w-[100px]'>
                    <div>UAT Mode</div>
                    {!!menuDetails?.id && AccessManager.isAuthUser(1) && (
                        <a
                            href={menuDetailUrl}
                            target='_blank'
                            className='!text-white link link-hover'
                        >
                            Menu Detail
                        </a>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export default UATBanner;
