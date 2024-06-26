'use client';

import { useRouter } from 'next/router';
import { useMemo } from 'react';

import {
    Navigation,
    OpenSpotlight,
    PRODUCT_IDENTIFIER,
    useApp,
    useAppProducts,
    useOperatingSystem,
} from '@finnoto/core';
import {
    Button,
    HamburgerButton,
    Icon,
    IconButton,
    InputField,
    Popover,
} from '@finnoto/design-system';

import ProductSwitchSelector from '@Modules/AuthPage/Components/productSwitchSelector.component';

import HeaderUser from './header.user.component';
import HeaderNotification from './headerNotification.component';

import { AppsSvgIcon } from 'assets';

const Header = () => {
    const { isExpense, product_id, isProductAvailable, basePath } = useApp();
    const { products } = useAppProducts();
    const { pathname } = useRouter();

    const isInsideExpenseCreation = useMemo(() => {
        if (pathname === `${basePath}/expense/c`) return true;
        return false;
    }, [basePath, pathname]);

    // useShortCutPanel();

    const { type: osType } = useOperatingSystem();

    const isRaiseInvoice = product_id === PRODUCT_IDENTIFIER.VENDOR;

    const openInvoiceExpenseCreation = (_: any, event: any) => {
        let path = basePath;
        if (isRaiseInvoice) {
            path = `${path}/invoice/c`;
        } else {
            path = `${path}/expense/c`;
        }

        Navigation.navigate({ url: path }, event);
    };

    return (
        <nav className='sticky top-0 justify-between py-2 pr-8 navbar bg-neutral text-neutral-content'>
            <div className='flex flex-1 gap-4'>
                <HamburgerButton />

                <InputField
                    inputClassName='bg-neutral-focus header-search text-white'
                    addonStart={
                        <Icon
                            iconColor='text-base-tertiary'
                            source={'search'}
                            size={20}
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

                {isExpense ? (
                    <Button
                        appearance='accent'
                        size='md'
                        onClick={openInvoiceExpenseCreation}
                        disabled={isInsideExpenseCreation}
                    >
                        <div className='items-center gap-1 row-flex'>
                            <Icon source={'add_circle_outline'} />
                            {isRaiseInvoice ? 'Raise Invoice' : 'Raise Expense'}
                        </div>
                    </Button>
                ) : null}
            </div>
            <div className='gap-4 row-flex'>
                <HeaderNotification />
                {isProductAvailable && products?.length > 1 && (
                    <Popover
                        element={<ProductSwitchSelector />}
                        offsetX={40}
                        offsetY={10}
                        id='product-selector'
                    >
                        <IconButton
                            icon={AppsSvgIcon}
                            size='md'
                            shape='square'
                            outline
                            appearance='ghost'
                            className='text-base-300 dark:text-base-content'
                            iconSize={24}
                        />
                    </Popover>
                )}
                <HeaderUser />
            </div>
        </nav>
    );
};

export default Header;
