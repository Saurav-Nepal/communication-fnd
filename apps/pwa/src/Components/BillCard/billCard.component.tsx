import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

import {
    GST_STATUS_TYPE,
    IsEmptyObject,
    Menu,
    Navigation,
    PRODUCT_IDENTIFIER,
    useApp,
} from '@finnoto/core';
import { Badge, cn, Ellipsis, Icon, MenuLink } from '@finnoto/design-system';

import {
    BuildingSvgIcon,
    CallSvgIcon,
    InputEmailIcon,
    LocationSvgIcon,
    VendorSvgIcon,
} from 'assets';

interface BillProps {
    name: string;
    gstin?: string;
    email?: string;
    badgeName?: string;
    colorClass?: string;
    className?: string;
    onClick?: () => void;
    icon?: any;
    navigationUrl?: string;
    isVendorOwned?: boolean;
    showDetail?: boolean;
    isVendorPortal?: boolean;
    showDetailData?: any;
    gstinStatus?: number;
    noLabel?: boolean;
    basicLabel?: boolean;
    cardNavigate?: boolean;
    canChange?: boolean;
    changeFunction?: () => void;
}

export const BillToCard = ({
    name,
    gstin,
    badgeName,
    gstinStatus,
    onClick,
    navigationUrl,
    basicLabel,
    className,
    cardNavigate,
    canChange,
    changeFunction,
    noLabel,
}: BillProps) => {
    return (
        <div
            className={cn(
                'relative p-1 overflow-hidden bg-base-100 col-flex gap-1',
                {
                    'active:bg-base-300':
                        cardNavigate &&
                        navigationUrl &&
                        Menu.isMenuAvailable(navigationUrl),
                },
                className
            )}
            aria-label='bill-to-card'
            onClick={() => {
                if (
                    cardNavigate &&
                    navigationUrl &&
                    Menu.isMenuAvailable(navigationUrl)
                ) {
                    Navigation.navigate({ url: navigationUrl });
                }
            }}
        >
            {basicLabel && (
                <div className='text-xs font-medium leading-[14px] uppercase'>
                    To
                </div>
            )}
            <div className='flex items-center gap-4'>
                {!basicLabel && !noLabel && (
                    <div className='p-2 bg-accent text-primary-content col-flex justify-center items-center text-xs h-full font-medium leading-[14px] rounded min-h-[64px]'>
                        <p>T</p>
                        <p>O</p>
                    </div>
                )}
                <div className='flex items-center justify-center rounded h-11 w-11 bg-[#02B9EF1A] text-[#02B9EF]'>
                    <Icon source={BuildingSvgIcon} isSvg size={24} />
                </div>
                <div className='flex-1 col-flex'>
                    <div className='flex items-center gap-2 text-sm font-medium'>
                        {navigationUrl ? (
                            <MenuLink
                                href={navigationUrl}
                                linkOnlyClass='table-link normal-link w-full'
                            >
                                <Ellipsis>{name}</Ellipsis>
                            </MenuLink>
                        ) : (
                            <Ellipsis>{name}</Ellipsis>
                        )}

                        {onClick && (
                            <a
                                className='ml-auto mr-2 text-xs font-normal link link-hover'
                                onClick={onClick}
                            >
                                Edit
                            </a>
                        )}

                        {canChange && (
                            <a
                                className='ml-auto mr-2 text-xs font-normal link link-hover'
                                onClick={changeFunction}
                            >
                                Edit
                            </a>
                        )}
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!gstin) return;
                            }}
                            className={cn('text-xs', gstin && 'table-link')}
                        >
                            {gstin || 'Non GST Registered'}
                        </span>
                        {(gstinStatus === GST_STATUS_TYPE.SUSPENDED ||
                            gstinStatus === GST_STATUS_TYPE.CANCELLED) && (
                            <>
                                <span className='inline-block w-1 h-1 bg-black rounded-full'></span>
                                <BillCardGstStatus
                                    status_id={gstinStatus}
                                    gstin={gstin}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export const BillFromVendorCard = ({
    name,
    gstin,
    badgeName,
    onClick,
    icon,
    colorClass,
    className,
    navigationUrl,
    isVendorOwned,
    gstinStatus,
    showDetail,
    showDetailData = {},
    noLabel,
    basicLabel,
    cardNavigate,
    isNotRegistered,
    isInternationalVendor,
}: BillProps & {
    isNotRegistered?: boolean;
    isInternationalVendor?: boolean;
}) => {
    const defaultClass = 'bg-[#A767061A] text-[#A76706] dark:text-[#ff9a00]';
    const { product_id } = useApp();

    const [expand, setExpand] = useState<boolean>(false);

    const { mobile, email, address } = showDetailData;

    const { state, city, gst_state_identifier } = address?.attributes || {};

    const information_props = [
        {
            label: 'Email',
            info: email || '-',
            icon: InputEmailIcon,
        },
        {
            label: 'Mobile Number',
            info: mobile,
            icon: CallSvgIcon,
        },
        {
            label: 'Address',
            info: `${state} ${city} ${address?.street_address} ${gst_state_identifier} ${address?.pincode} `,
            icon: LocationSvgIcon,
            visible: !IsEmptyObject(address?.attributes),
        },
    ];

    return (
        <div
            className={cn(
                'relative p-1 overflow-hidden bg-base-100 gap-1 col-flex',
                { 'active:bg-base-300': cardNavigate && navigationUrl },
                className
            )}
            aria-label='bill-from-card'
            onClick={() => {
                setExpand(!expand);
            }}
        >
            {basicLabel && (
                <div className='text-xs font-medium leading-[14px] uppercase'>
                    From
                </div>
            )}
            <div className='flex items-center gap-4'>
                {!noLabel && !basicLabel && (
                    <div className='p-2 bg-accent text-primary-content text-xs font-medium leading-[14px] rounded'>
                        <p>F</p>
                        <p>R</p>
                        <p>O</p>
                        <p>M</p>
                    </div>
                )}

                <div
                    className={`flex items-center justify-center rounded h-11 w-11 bg-[#02B9EF1A] text-[#02B9EF] ${
                        colorClass || defaultClass
                    }`}
                >
                    <Icon source={icon || VendorSvgIcon} isSvg size={24} />
                </div>
                <div className='flex-1 col-flex'>
                    <div className='flex items-center text-sm font-medium'>
                        <div className='flex-1 w-full'>
                            {navigationUrl && !isNotRegistered ? (
                                <MenuLink
                                    href={navigationUrl}
                                    linkOnlyClass='table-link normal-link w-full'
                                >
                                    <Ellipsis>{name}</Ellipsis>
                                </MenuLink>
                            ) : (
                                <Ellipsis>{name}</Ellipsis>
                            )}
                        </div>

                        {onClick && (
                            <a
                                className='ml-auto mr-2 text-xs font-normal link link-hover'
                                onClick={onClick}
                            >
                                Edit
                            </a>
                        )}
                    </div>
                    <div className='flex items-center gap-1.5'>
                        {gstin && (
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!gstin) return;
                                }}
                                className='text-xs table-link'
                            >
                                {gstin}
                            </span>
                        )}
                        {!gstin && !badgeName && !isInternationalVendor && (
                            <Badge
                                label='Non GST Registered'
                                appearance='base'
                                size='sm'
                            />
                        )}
                        {!gstin && isInternationalVendor && (
                            <Badge
                                label='International'
                                appearance='base'
                                size='sm'
                            />
                        )}
                        {badgeName && (
                            <Badge
                                label={badgeName}
                                appearance='base'
                                size='sm'
                            />
                        )}
                        {(gstinStatus === GST_STATUS_TYPE.SUSPENDED ||
                            gstinStatus === GST_STATUS_TYPE.CANCELLED) && (
                            <>
                                <span className='inline-block w-1 h-1 bg-black rounded-full'></span>
                                <BillCardGstStatus
                                    status_id={gstinStatus}
                                    gstin={gstin}
                                />
                            </>
                        )}
                        {isVendorOwned &&
                        product_id !== PRODUCT_IDENTIFIER.VENDOR ? (
                            <Badge
                                label='Vendor Managed'
                                appearance='warning'
                                size='sm'
                            />
                        ) : null}
                        {isNotRegistered ? (
                            <Badge
                                label='Anonymous'
                                appearance='base'
                                className='font-normal text-orange-500 bg-orange-100 '
                                size='xs'
                            />
                        ) : null}
                    </div>
                </div>
            </div>

            {showDetail && (
                <>
                    <AnimateHeight height={expand ? 'auto' : 0}>
                        <div className='pt-2 mt-2 border-t col-flex'>
                            {information_props.map((el) => {
                                if (el?.visible === false) return;
                                return <InfoCard key={el.label} {...el} />;
                            })}
                        </div>
                    </AnimateHeight>
                    <div
                        className={cn(
                            'absolute w-14 h-2 rounded transition-all ease-in-out delay-300 duration-300   bg-base-200 -bottom-[2%] left-[41%]'
                        )}
                    ></div>
                </>
            )}
        </div>
    );
};

const InfoCard = ({ label, info, icon }: any) => {
    if (!info) return;
    return (
        <div className='items-start justify-start w-full gap-4 py-1 text-sm hover:bg-base-200 row-flex '>
            {/* <div className='text-base-secondary'>{label}</div> */}
            <Icon source={icon} isSvg />
            <div className=' text-base-primary'>{info}</div>
        </div>
    );
};

export const BillFromNonVendorCard = ({
    name,
    gstin,
    badgeName,
    onClick,
    icon,
    colorClass,
    navigationUrl,
    className,
}: BillProps) => {
    return (
        <div
            className={cn(
                'rounded min-h-[72px] bg-base-100 flex gap-4 items-center p-1',
                className
            )}
        >
            <div className='p-2 bg-neutral text-primary-content text-xs font-medium leading-[14px] rounded'>
                <p>F</p>
                <p>R</p>
                <p>O</p>
                <p>M</p>
            </div>

            <div
                className={`flex items-center justify-center rounded h-11 w-11 bg-[#02B9EF1A] text-[#02B9EF] ${colorClass}`}
            >
                <Icon source={icon || VendorSvgIcon} isSvg size={24} />
            </div>
            <div className='flex-1 gap-1 col-flex'>
                <div className='flex items-center font-medium'>
                    {navigationUrl ? (
                        <MenuLink
                            href={navigationUrl}
                            linkOnlyClass='table-link normal-link w-full'
                        >
                            <Ellipsis>{name}</Ellipsis>
                        </MenuLink>
                    ) : (
                        <Ellipsis>{name}</Ellipsis>
                    )}
                    {onClick && (
                        <a
                            className='ml-auto mr-2 text-xs font-normal link link-hover'
                            onClick={onClick}
                        >
                            Edit
                        </a>
                    )}
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-xs text-base-tertiary'>{gstin}</span>
                    {badgeName && (
                        <Badge label={badgeName} size='xs' appearance='base' />
                    )}
                </div>
            </div>
        </div>
    );
};

export const BillCardGstStatus = ({
    status_id,
    gstin,
}: {
    status_id?: number;
    gstin?: any;
}) => {
    if (status_id === GST_STATUS_TYPE.SUSPENDED) {
        return <span className='text-xs text-warning'>Suspended GSTIN</span>;
    }

    if (status_id === GST_STATUS_TYPE.CANCELLED) {
        return <span className='text-xs text-error'>Cancelled GSTIN</span>;
    }
    return null;
};
