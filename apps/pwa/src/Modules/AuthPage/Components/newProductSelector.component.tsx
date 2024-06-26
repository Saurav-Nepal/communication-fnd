'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { IsEmptyArray, ObjectDto, PRODUCT_IDENTIFIER } from '@finnoto/core';
import {
    Icon,
    ModalBody,
    ModalContainer,
    PageLoader,
} from '@finnoto/design-system';

import {
    ProductDescription,
    ProductThemesColor,
} from './productSwitchSelector.component';

import {
    ProductEmployeeSvgIcon,
    ProductFinopsSvgIcon,
    ProductRecoSvgIcon,
    ProductVendorSvgIcon,
} from 'assets';

const NewProductSelector = ({
    products,
    callback,
}: {
    products: ObjectDto[];
    callback: (_: any, func: () => void) => {};
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ModalContainer className='overflow-hidden'>
            <ModalBody className='p-4'>
                <div className='gap-4 col-flex'>
                    <h2 className='pb-2 text-lg font-medium text-center border-b border-dashed'>
                        Select Portal
                    </h2>
                    <div className='gap-3 col-flex'>
                        {loading ? (
                            <PageLoader className='h-[100vh]' />
                        ) : (
                            !IsEmptyArray(products) &&
                            products.map((product) => {
                                if (product?.id === PRODUCT_IDENTIFIER.RECO)
                                    return null;
                                return (
                                    <PortalSelectCard
                                        key={product.id}
                                        name={product.name}
                                        icon={product.id}
                                        onClick={() => {
                                            setLoading(true);

                                            callback(product, () =>
                                                setLoading(false)
                                            );
                                        }}
                                        color={ProductThemesColor[product.id]}
                                        desc={ProductDescription[product.id]}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </ModalBody>
        </ModalContainer>
    );
};

const PortalSelectCard = ({
    name,
    icon,
    onClick,
    isActive,
    color,
    desc,
    size = 'md',
}: {
    name: string;
    icon: any;
    onClick: () => void;
    isActive?: boolean;
    color?: string;
    desc?: string;
    size?: 'md' | 'sm';
}) => {
    const productIcon = getProductIcons(icon);

    return (
        <div
            onClick={onClick}
            className={
                'text-base-primary overflow-hidden flex gap-3 items-center px-4 py-5  cursor-pointer border rounded hover-initial-productcard transition-all'
            }
        >
            {productIcon && (
                <Icon
                    source={productIcon}
                    isSvg
                    size={28}
                    iconColor='text-secondary'
                />
            )}
            <div className='flex items-center flex-1 gap-2'>
                <div className='flex-1 col-flex'>
                    <p className='text-sm font-medium hover-productcard-color '>
                        {name}
                    </p>
                    <span className='text-xs text-base-secondary hover-productcard-desc-color '>
                        {desc}
                    </span>
                </div>
                <ChevronRight
                    className='hover-productcard-desc-color'
                    size={16}
                />
            </div>
        </div>
    );
};

export const getProductIcons = (id: number) => {
    switch (id) {
        case PRODUCT_IDENTIFIER.RECO:
            return ProductRecoSvgIcon;
        case PRODUCT_IDENTIFIER.VENDOR:
            return ProductVendorSvgIcon;
        case PRODUCT_IDENTIFIER.EMPLOYEE:
            return ProductEmployeeSvgIcon;
        case PRODUCT_IDENTIFIER.FINOPS:
            return ProductFinopsSvgIcon;
    }
};
export default NewProductSelector;
