import { forwardRef, useCallback, useMemo } from 'react';

import {
    AccessNestedObject,
    BusinessType,
    Ellipsis,
    FINOPS_EMPLOYEE_DETAIL,
    IsFunction,
    ObjectDto,
    PRODUCT_IDENTIFIER,
    useApp,
} from '@finnoto/core';
import { cn, Icon, MenuLink, Modal, SlidingPane } from '@finnoto/design-system';

import {
    BusinessIconImage,
    EmployeeIconImage,
    VendorIconImage,
} from '@Components/BusinessImage/businessImage.component';

import { UserSolidSvgIcon } from 'assets';

interface VendorBusinessInfoCardInterface {
    name: string;
    redirect_url?: string;
    redirect_url_key?: string;
    gstin_key: string;
    hideSubLabel?: boolean;
    item: ObjectDto;
    linkOnlyClass?: string;
    navigateToDetailsModal?: boolean;
    iconSize?: number;
    iconClassName?: string;
}
export const VendorBusinessInfoCard = forwardRef(
    (
        {
            name,
            redirect_url,
            redirect_url_key,
            gstin_key,
            hideSubLabel,
            item,
            linkOnlyClass = 'table-link',
            navigateToDetailsModal = false,
            iconClassName,
            iconSize,
            ...rest
        }: VendorBusinessInfoCardInterface,
        ref: any
    ) => {
        const isInternationalVendor = useMemo(
            () => item?.vendor_type_id === BusinessType.INTERNATIONAL.value,
            [item?.vendor_type_id]
        );
        const renderSubLabel = useCallback(() => {
            if (hideSubLabel) return null;
            const gstin = AccessNestedObject(item, gstin_key);
            return (
                <div className='text-xs text-base-tertiary'>
                    {isInternationalVendor
                        ? 'International'
                        : gstin || 'Non GST Registered'}
                </div>
            );
        }, [gstin_key, hideSubLabel, isInternationalVendor, item]);
        const redirectId = useMemo(
            () => AccessNestedObject(item, redirect_url_key),
            [item, redirect_url_key]
        );

        const handleModalNavigation = useCallback(() => {
            if (!AccessNestedObject(item, redirect_url_key)) return;
        }, [item, redirect_url_key]);

        const renderCardTitle = useCallback(() => {
            if (navigateToDetailsModal)
                return (
                    <span
                        className='table-link'
                        onClick={handleModalNavigation}
                    >
                        <Ellipsis
                            text={AccessNestedObject(item, name)}
                            length={200}
                        />
                    </span>
                );
            if (redirectId)
                return (
                    <MenuLink
                        href={`${redirect_url}/${AccessNestedObject(
                            item,
                            redirect_url_key
                        )}`}
                        linkOnlyClass={linkOnlyClass}
                        onClick={() => {
                            Modal.closeAll();
                            SlidingPane.closeAll();
                        }}
                    >
                        <Ellipsis
                            text={AccessNestedObject(item, name)}
                            length={200}
                        />
                    </MenuLink>
                );
            return (
                <Ellipsis text={AccessNestedObject(item, name)} length={200} />
            );
        }, [
            handleModalNavigation,
            item,
            linkOnlyClass,
            name,
            navigateToDetailsModal,
            redirect_url,
            redirect_url_key,
            redirectId,
        ]);

        return (
            <div
                className='relative items-center gap-3 row-flex'
                ref={ref}
                {...rest}
            >
                <VendorIconImage className={iconClassName} size={iconSize} />
                <div className='col-flex'>
                    {renderCardTitle()}
                    {renderSubLabel()}
                </div>
            </div>
        );
    }
);
export const OrphanVendorInfoCard = forwardRef(
    (
        {
            name,
            gstin_key,
            item,
            hideSubLabel,
            iconSize,
            iconClassName,
            ...rest
        }: ObjectDto,
        ref: any
    ) => {
        const renderSubLabel = useCallback(() => {
            if (hideSubLabel) return null;
            const gstin: any = AccessNestedObject(
                item,
                gstin_key,
                'Non GST Registered'
            );
            return <div className='text-xs text-base-tertiary'>{gstin}</div>;
        }, [gstin_key, hideSubLabel, item]);
        return (
            <div
                className='relative items-center gap-3 row-flex'
                ref={ref}
                {...rest}
            >
                <VendorIconImage
                    className={cn('text-[#ed7014]', iconClassName)}
                    size={iconSize}
                />

                <div className='col-flex'>
                    <Ellipsis
                        text={AccessNestedObject(item, name)}
                        length={200}
                    />
                    {renderSubLabel()}
                </div>
            </div>
        );
    }
);
interface FinopsBusinessInfoCardInterface {
    name: string;
    redirect_url: string;
    redirect_url_key?: string;
    gstin_key: string;
    hideSubLabel?: boolean;
    item: ObjectDto;
    iconSize?: number;
    iconWrapperClassName?: string;
}

// building icon
export const FinopsBusinessInfoCard = forwardRef(
    (
        {
            name,
            redirect_url,
            redirect_url_key,
            gstin_key,
            hideSubLabel,
            item,
            iconSize,
            iconWrapperClassName,
            ...rest
        }: FinopsBusinessInfoCardInterface,
        ref: any
    ) => {
        const renderSubLabel = useCallback(() => {
            if (hideSubLabel) return null;
            const gstin = AccessNestedObject(item, gstin_key);
            return (
                <div className='text-xs text-base-tertiary'>
                    {!gstin ? 'Non GST Registered' : gstin}
                </div>
            );
        }, [gstin_key, hideSubLabel, item]);

        return (
            <div
                className='relative items-center gap-3 row-flex'
                ref={ref}
                {...rest}
            >
                <BusinessIconImage
                    size={iconSize}
                    className={iconWrapperClassName}
                />
                <div className='col-flex'>
                    <MenuLink
                        href={`${redirect_url}/${AccessNestedObject(
                            item,
                            redirect_url_key
                        )}`}
                        linkOnlyClass='table-link'
                    >
                        <div>
                            {' '}
                            <Ellipsis
                                text={AccessNestedObject(item, name)}
                                length={200}
                            />
                        </div>
                    </MenuLink>
                    {renderSubLabel()}
                </div>
            </div>
        );
    }
);

interface EmployeeBusinessInfoCardInterface {
    name?: string;
    sub_label_key?: string;
    hideSubLabel?: boolean;
    item: ObjectDto;
    image_url_key?: string;
    redirect_url?: string;
    redirect_key?: string;
    navigateToDetailsModal?: boolean;
    iconClassName?: string;
    iconSize?: number;
}

export const EmployeeBusinessInfoCard = forwardRef(
    (
        {
            name = 'employee_name',
            sub_label_key = 'employee_designation',
            hideSubLabel,
            item,
            redirect_url = FINOPS_EMPLOYEE_DETAIL,
            redirect_key = 'employee_id',
            image_url_key,
            navigateToDetailsModal = false,
            iconClassName,
            iconSize,
            ...rest
        }: EmployeeBusinessInfoCardInterface,
        ref: any
    ) => {
        const { product_id } = useApp();

        const renderSubLabel = useCallback(() => {
            if (hideSubLabel) return null;
            const label = AccessNestedObject(item, sub_label_key);
            return (
                <div className='text-xs text-base-tertiary'>{label || '-'}</div>
            );
        }, [hideSubLabel, item, sub_label_key]);

        const handleModalNavigation = useCallback(() => {
            if (!AccessNestedObject(item, redirect_key)) return;
            if (product_id !== PRODUCT_IDENTIFIER?.FINOPS) return;
        }, [product_id, redirect_key, item]);

        return (
            <div
                className='relative items-center gap-3 row-flex'
                ref={ref}
                {...rest}
            >
                <EmployeeIconImage
                    className={iconClassName}
                    size={iconSize}
                    img={AccessNestedObject(item, image_url_key)}
                />
                <div className='col-flex'>
                    {!navigateToDetailsModal ? (
                        <MenuLink
                            href={
                                product_id === PRODUCT_IDENTIFIER?.FINOPS
                                    ? `${redirect_url}/${AccessNestedObject(
                                          item,
                                          redirect_key
                                      )}`
                                    : null
                            }
                            onClick={() => {
                                Modal.closeAll();
                                SlidingPane.closeAll();
                            }}
                        >
                            <span>{AccessNestedObject(item, name)}</span>
                        </MenuLink>
                    ) : (
                        <span
                            className='table-link'
                            onClick={handleModalNavigation}
                        >
                            {AccessNestedObject(item, name)}
                        </span>
                    )}
                    {renderSubLabel()}
                </div>
            </div>
        );
    }
);
