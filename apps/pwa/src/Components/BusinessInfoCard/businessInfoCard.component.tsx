import { forwardRef, useCallback } from 'react';

import {
    AccessNestedObject,
    Ellipsis,
    FINOPS_EMPLOYEE_DETAIL,
    ObjectDto,
    PRODUCT_IDENTIFIER,
    useApp,
} from '@finnoto/core';
import { MenuLink } from '@finnoto/design-system';

import {
    BusinessIconImage,
    EmployeeIconImage,
    VendorIconImage,
} from '@Components/BusinessImage/businessImage.component';

interface VendorBusinessInfoCardInterface {
    name: string;
    redirect_url: string;
    redirect_url_key?: string;
    gstin_key: string;
    hideSubLabel?: boolean;
    item: ObjectDto;
    linkOnlyClass?: string;
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
            ...rest
        }: VendorBusinessInfoCardInterface,
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
                <VendorIconImage />
                <div className='col-flex'>
                    <MenuLink
                        href={`${redirect_url}/${AccessNestedObject(
                            item,
                            redirect_url_key
                        )}`}
                        linkOnlyClass={linkOnlyClass}
                    >
                        <Ellipsis
                            text={AccessNestedObject(item, name)}
                            length={200}
                        />
                    </MenuLink>
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
                <BusinessIconImage />
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
    redirect_url?: string;
    redirect_key?: string;
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
            ...rest
        }: EmployeeBusinessInfoCardInterface,
        ref: any
    ) => {
        const { product_id } = useApp();

        const renderSubLabel = useCallback(() => {
            if (hideSubLabel) return null;
            const label = AccessNestedObject(item, sub_label_key);
            return <div className='text-xs '>{label || '-'}</div>;
        }, [hideSubLabel, item, sub_label_key]);

        return (
            <div
                className='relative items-center gap-3 row-flex'
                ref={ref}
                {...rest}
            >
                <EmployeeIconImage />
                <div className='font-medium col-flex'>
                    <span
                    // href={
                    //     product_id === PRODUCT_IDENTIFIER?.FINOPS
                    //         ? `${redirect_url}/${AccessNestedObject(
                    //               item,
                    //               redirect_key
                    //           )}`
                    //         : null
                    // }
                    >
                        <span>{AccessNestedObject(item, name)}</span>
                    </span>
                    {renderSubLabel()}
                </div>
            </div>
        );
    }
);
