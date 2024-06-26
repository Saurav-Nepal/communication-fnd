import { useCallback } from 'react';

import {
    GST_STATUS_TYPE,
    IsUndefinedOrNull,
    Navigation,
    PRODUCT_IDENTIFIER,
    useApp,
} from '@finnoto/core';
import {
    Badge,
    cn,
    Ellipsis,
    Icon,
    MenuLink,
    Modal,
} from '@finnoto/design-system';

import {
    BuildingSvgIcon,
    LocationSvgIcon,
    MobileSvgIcon,
    OutlineEmailSvgIcon,
    VendorSvgIcon,
} from 'assets';

interface BillProps {
    name: string;
    gstin?: string;
    email?: string;
    badgeName?: string;
    colorClass?: string;
    onClick?: () => void;
    onCardClick?: () => void;
    icon?: any;
    navigationUrl?: string;
    isVendorOwned?: boolean;
    showDetail?: boolean;
    isVendorPortal?: boolean;
    showDetailData?: any;
    gstinStatus?: number;
    canChange?: boolean;
    changeFunction?: () => void;
    hideTo?: boolean;
    className?: string;
    onNavigationClick?: () => void;
    disableOnClick?: boolean;
}

export const BillToCard = ({
    name,
    gstin,
    badgeName,
    canChange,
    gstinStatus,
    onClick,
    navigationUrl,
    changeFunction,
    hideTo,
    className,
    icon,
}: BillProps) => {
    return (
        <div
            className={cn(
                'rounded bg-base-100 border border-base-300 ',
                className
            )}
            aria-label='bill-to-card'
        >
            <div className='min-h-[76px] h-full flex gap-3 items-center p-0.5 '>
                {!hideTo && (
                    <div className='p-2 bg-neutral text-primary-content col-flex justify-center items-center text-xs h-full font-medium leading-[14px] rounded rounded-tr-none rounded-br-none'>
                        <p>T</p>
                        <p>O</p>
                    </div>
                )}
                <div className='flex items-center justify-center rounded h-10 w-10 bg-[#02B9EF1A] text-[#02B9EF]'>
                    <Icon source={icon || BuildingSvgIcon} isSvg size={20} />
                </div>
                <div className='flex-1 gap-1 pr-3 col-flex'>
                    <div className='flex items-center font-medium'>
                        {navigationUrl ? (
                            <MenuLink
                                href={navigationUrl}
                                linkOnlyClass='table-link w-full'
                            >
                                <Ellipsis className='text-base'>
                                    {name}
                                </Ellipsis>
                            </MenuLink>
                        ) : (
                            <Ellipsis className='text-base'>{name}</Ellipsis>
                        )}

                        {onClick && (
                            <a
                                className='ml-auto text-xs font-normal link link-hover'
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
                    <div className='flex items-center gap-2'>
                        {gstin ? (
                            <span
                                className={
                                    'text-xs text-base-tertiary hover:underline cursor-pointer'
                                }
                            >
                                {gstin}
                            </span>
                        ) : (
                            <Badge
                                label='Non GST Registered'
                                appearance='base'
                                size='sm'
                            />
                        )}
                        {badgeName && (
                            <>
                                <Divider />
                                <Badge
                                    label={badgeName}
                                    size='sm'
                                    appearance='base'
                                />
                            </>
                        )}
                        <BillCardGstStatus status_id={gstinStatus} />
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
    navigationUrl,
    isVendorOwned,
    isNotRegistered,
    isInternationalVendor,
    gstinStatus,
    showDetail,
    showDetailData = {},
    onCardClick,
    className,
    disableOnClick = false,
    hideTo = false,
}: BillProps & {
    isNotRegistered?: boolean;
    isInternationalVendor?: boolean;
}) => {
    const defaultClass = 'bg-[#A767061A] text-[#A76706] dark:text-[#ff9a00]';
    const { product_id } = useApp();

    const isVendor = product_id === PRODUCT_IDENTIFIER.VENDOR;

    const { mobile, email, address } = showDetailData;

    const { state, city, gst_state_identifier } = address?.attributes || {};

    const handleNavigationDetail = useCallback(() => {
        if (disableOnClick) return;
        if (IsUndefinedOrNull(onCardClick) && IsUndefinedOrNull(navigationUrl))
            return;

        if (onCardClick && !isVendor) {
            return onCardClick();
        }
        if (navigationUrl) {
            Navigation.navigate({ url: navigationUrl });
        }
    }, [disableOnClick, onCardClick, navigationUrl, isVendor]);

    return (
        <div
            className={cn(
                'bg-base-100 rounded overflow-hidden min-h-[68px] border border-base-300',
                className
            )}
            aria-label='bill-from-card'
        >
            <div className='min-h-[76px] h-full flex gap-3 items-center p-0.5 '>
                {!hideTo && (
                    <div className='p-2 bg-neutral text-primary-content col-flex justify-center items-center text-xs h-full font-medium leading-[14px] rounded rounded-tr-none rounded-br-none'>
                        <p>F</p>
                        <p>R</p>
                        <p>O</p>
                        <p>M</p>
                    </div>
                )}

                <div
                    className={`flex items-center justify-center rounded h-10 w-10 bg-[#02B9EF1A] text-[#02B9EF] ${
                        colorClass || defaultClass
                    }`}
                >
                    <Icon
                        source={icon || VendorSvgIcon}
                        isSvg
                        iconColor={cn({
                            'text-[#ed7014]': isNotRegistered,
                        })}
                        size={20}
                    />
                </div>
                <div className='flex-1 gap-1 col-flex'>
                    <div className='flex items-center font-medium'>
                        <div
                            className={cn('flex-1 group', {
                                'cursor-pointer':
                                    !disableOnClick &&
                                    (!IsUndefinedOrNull(onCardClick) ||
                                        !IsUndefinedOrNull(navigationUrl)),
                            })}
                            onClick={handleNavigationDetail}
                        >
                            <Ellipsis
                                className={cn('text-base text-base-primary', {
                                    'group-hover:underline':
                                        !disableOnClick &&
                                        (!IsUndefinedOrNull(onCardClick) ||
                                            !IsUndefinedOrNull(navigationUrl)),
                                })}
                            >
                                {name}
                            </Ellipsis>
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
                    <div className='flex items-center gap-2'>
                        {gstin && (
                            <>
                                <span
                                    className={
                                        'text-xs text-base-tertiary hover:underline cursor-pointer'
                                    }
                                >
                                    {gstin}
                                </span>
                            </>
                        )}

                        {!gstin && !badgeName && !isInternationalVendor && (
                            <>
                                <Divider />
                                <Badge
                                    label='Non GST Registered'
                                    appearance='base'
                                    size='sm'
                                />
                            </>
                        )}
                        {!gstin && isInternationalVendor && (
                            <>
                                <Divider />
                                <Badge
                                    label='International'
                                    appearance='base'
                                    size='sm'
                                />
                            </>
                        )}

                        {badgeName && (
                            <>
                                <Divider />
                                <Badge
                                    label={badgeName}
                                    appearance='base'
                                    size='sm'
                                />
                            </>
                        )}

                        <BillCardGstStatus status_id={gstinStatus} />

                        {isVendorOwned &&
                        product_id !== PRODUCT_IDENTIFIER.VENDOR ? (
                            <>
                                <Divider />
                                <Badge
                                    label='Vendor Managed'
                                    appearance='warning'
                                    size='sm'
                                />
                            </>
                        ) : null}
                        {isNotRegistered ? (
                            <>
                                <Divider />
                                <Badge
                                    label='Anonymous'
                                    appearance='base'
                                    className='font-normal text-orange-500 bg-orange-100 '
                                    size='sm'
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            {showDetail && (
                <div className='flex flex-wrap gap-4 px-2 py-3 mx-2 mt-2 border-t border-dashed '>
                    <ShortInfo icon={OutlineEmailSvgIcon} label={email} />
                    <ShortInfo icon={MobileSvgIcon} label={mobile} />
                    {state && (
                        <ShortInfo
                            icon={LocationSvgIcon}
                            label={`${state} ${city} ${address?.street_address} ${gst_state_identifier} ${address?.pincode} `}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export const Divider = () => <div className='h-4 w-[1px] bg-base-300'></div>;

const ShortInfo = ({
    icon,
    label,
    icon_size = 20,
    iconColor = 'text-base-secondary',
    labelClassName,
}: any) => {
    if (!label) return null;
    return (
        <div className='items-center w-5/12 gap-2 text-xs font-normal row-flex'>
            <Icon size={icon_size} source={icon} isSvg iconColor={iconColor} />
            <div className={cn('text-base-primary', labelClassName)}>
                {label}
            </div>
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
}: BillProps) => {
    return (
        <div className='rounded min-h-[66px] bg-base-100 flex gap-4 items-center p-1'>
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
                            linkOnlyClass='table-link w-full'
                        >
                            <Ellipsis className='text-sm'>{name}</Ellipsis>
                        </MenuLink>
                    ) : (
                        <Ellipsis className='text-sm'>{name}</Ellipsis>
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
                        <>
                            <Divider />
                            <Badge
                                label={badgeName}
                                size='xs'
                                appearance='base'
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export const BillCardGstStatus = ({ status_id }: { status_id?: number }) => {
    if (status_id === GST_STATUS_TYPE.SUSPENDED) {
        return (
            <>
                <Badge label='Suspended' size='sm' appearance='warning' />;
                <Divider />
            </>
        );
    }

    if (status_id === GST_STATUS_TYPE.CANCELLED) {
        return (
            <>
                <Badge label='Cancelled' size='sm' appearance='error' />
                <Divider />
            </>
        );
    }

    return null;
};
