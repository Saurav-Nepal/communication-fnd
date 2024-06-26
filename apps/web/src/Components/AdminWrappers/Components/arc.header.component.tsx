'use client';

import React, { useCallback, useMemo } from 'react';

import {
    authenticateBusiness,
    Navigation,
    OpenSpotlight,
    PRODUCT_IDENTIFIER,
    storeProductPathState,
    useApp,
    useAppProducts,
    useCurrentBusiness,
    useOperatingSystem,
    useUserHook,
} from '@finnoto/core';
import {
    Avatar,
    DropdownMenu,
    DropdownMenuActionProps,
    Icon,
    IconButton,
    InputField,
    Popover,
    SidebarBanner,
} from '@finnoto/design-system';

import ProductSwitchSelector from '@Modules/AuthPage/Components/productSwitchSelector.component';

import { ArcHeaderPopover } from './header.user.component';
import HeaderNotification from './headerNotification.component';

import {
    ApProductSvgIcon,
    AppsSvgIcon,
    ArcProductSvgIcon,
    ArProductSvgIcon,
    EmployeeProductSvgIcon,
} from 'assets';

export const ProductIcons = {
    [PRODUCT_IDENTIFIER.RECO]: ArProductSvgIcon,
    [PRODUCT_IDENTIFIER.VENDOR]: ApProductSvgIcon,
    [PRODUCT_IDENTIFIER.EMPLOYEE]: EmployeeProductSvgIcon,
    [PRODUCT_IDENTIFIER.FINOPS]: ApProductSvgIcon,
    [PRODUCT_IDENTIFIER.ARC]: ArcProductSvgIcon,
    [PRODUCT_IDENTIFIER.PAYMENT]: ArcProductSvgIcon,
};

const ArcHeader = () => {
    const { isProductAvailable, isArc } = useApp();
    const { products } = useAppProducts();

    const { type: osType } = useOperatingSystem();
    const checkAvailableProduct = isProductAvailable && products?.length > 1;

    return (
        <nav className='sticky top-0 justify-between py-4 pl-0 pr-8 navbar bg-polaris-bg-inverse text-polaris-text-inverse'>
            <SidebarBanner className='w-[var(--sidebar-expand-width)] pl-4' />
            <div className='flex justify-between flex-1'>
                <div className='flex justify-center flex-1'>
                    <InputField
                        className='rounded-lg bg-polaris-bg-surface-inverse hover:bg-polaris-bg-surface-hover text-polaris-text-inverse '
                        inputClassName='bg-polaris-bg-fill-inverse header-search text-polaris-text-inverse'
                        addonStart={
                            <Icon
                                iconColor='text-base-tertiary'
                                source={'search'}
                                size={24}
                            />
                        }
                        addonEnd={
                            <span className='text-xs bg-transparent border-0 text-base-tertiary whitespace-nowrap'>
                                {osType === 'mac' ? '⌘' : 'Ctrl'} + K
                            </span>
                        }
                        placeholder={'Search here...'}
                        readOnly
                        onClick={() => OpenSpotlight()}
                        size='sm'
                    />
                </div>
                <div className='items-center gap-4 row-flex'>
                    <HeaderNotification />
                    {checkAvailableProduct && !isArc ? (
                        <Popover
                            element={<ProductSwitchSelector />}
                            offsetX={40}
                            offsetY={10}
                            id='product-selector'
                        >
                            <IconButton
                                icon={AppsSvgIcon}
                                size='sm'
                                shape='square'
                                outline
                                appearance='ghost'
                                className='text-base-300 dark:text-base-content bg-[var(--p-color-bg-fill-inverse)] hover:bg-[var(--p-color-bg-fill-inverse-hover)] rounded-lg'
                                iconSize={20}
                            />
                        </Popover>
                    ) : (
                        checkAvailableProduct && <ArcProductSwitchSelector />
                    )}
                    <ArcHeaderPopover>
                        <ArcHeaderAvatar />
                    </ArcHeaderPopover>
                </div>
            </div>
        </nav>
    );
};

const ArcHeaderAvatar = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    const { currentBusiness } = useCurrentBusiness();
    const { user } = useUserHook();

    return (
        <div
            className='items-center gap-4 py-0.5 rounded-lg cursor-pointer select-none row-flex bg-polaris-bg-fill-inverse text-polaris-text-inverse hover:bg-polaris-bg-fill-inverse-hover transition-all pl-3 pr-0.5'
            ref={ref}
            {...props}
        >
            <span>{currentBusiness?.name}</span>

            <Avatar
                source={user?.image_url}
                alt={user?.name}
                size='xs'
                shape='rounded'
                color='polaris'
            />
        </div>
    );
});

const ArcProductSwitchSelector = () => {
    const { product_id } = useApp();
    const { user } = useUserHook();
    const { products } = useAppProducts();

    const onClick = useCallback(
        (product) => {
            storeProductPathState(product_id, Navigation.currentRoute().path);
            authenticateBusiness(user.business || user.vendor, {
                product,
            });
        },
        [product_id, user]
    );

    const sanitizedProducts: DropdownMenuActionProps[] = useMemo(() => {
        return products.map((product) => {
            return {
                name: product.name,
                icon: ProductIcons[product.id],
                action: () => onClick(product),
                iconSize: 20,
                isSvg: true,
            };
        });
    }, [onClick, products]);

    return (
        <DropdownMenu
            actions={sanitizedProducts}
            searchable={false}
            align='end'
            className='min-w-[180px]'
        >
            <IconButton
                icon={AppsSvgIcon}
                size='sm'
                shape='square'
                outline
                appearance='ghost'
                className='text-base-300 dark:text-base-content bg-[var(--p-color-bg-fill-inverse)] hover:bg-[var(--p-color-bg-fill-inverse-hover)] rounded-lg'
                iconSize={20}
            />
        </DropdownMenu>
    );
};

export default ArcHeader;
