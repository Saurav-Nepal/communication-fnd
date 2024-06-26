'use client';

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
    ArrowRightSvgIcon,
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
            <ModalBody>
                <div className='gap-4 col-flex'>
                    <h2 className='pb-2 text-lg font-medium text-center border-b border-dashed'>
                        Select Portal
                    </h2>
                    <div className='gap-4 col-flex'>
                        {loading ? (
                            <PageLoader className='h-[30vh]' />
                        ) : (
                            !IsEmptyArray(products) &&
                            products.map((product, index) => (
                                <PortalSelectCard
                                    id={'pro-' + (index + 1)}
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
                            ))
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
    id,
}: {
    name: string;
    icon: any;
    onClick: () => void;
    isActive?: boolean;
    color?: string;
    desc?: string;
    size?: 'md' | 'sm';
    id: string;
}) => {
    const productIcon = getProductIcons(icon);

    return (
        <div
            onClick={onClick}
            className={
                'text-base-primary cursor-pointer rounded hover-initial-productcard mx-2 transition-all border border-base-300 group'
            }
            id={id}
        >
            <div className='flex gap-6 p-4'>
                {productIcon && (
                    <Icon
                        source={productIcon}
                        isSvg
                        size={32}
                        iconColor='text-primary'
                        iconClass='group-hover:text-secondary'
                    />
                )}
                <div className='gap-1 col-flex'>
                    <p className='text-lg font-medium hover-productcard-color '>
                        {name}
                    </p>
                    <span className='text-sm text-base-secondary hover-productcard-desc-color '>
                        {desc}
                    </span>
                </div>
                <div className='flex items-center ml-auto'>
                    <Icon
                        source={ArrowRightSvgIcon}
                        isSvg
                        size={24}
                        iconColor='text-transparent'
                        iconClass='group-hover:text-secondary'
                    />
                </div>
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
        case PRODUCT_IDENTIFIER.ARC:
            return ProductFinopsSvgIcon;
        case PRODUCT_IDENTIFIER.PAYMENT:
            return ProductFinopsSvgIcon;
    }
};
export default NewProductSelector;
