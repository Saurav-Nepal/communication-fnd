import { useCallback, useMemo } from 'react';

import {
    AccessNestedObject,
    BusinessType,
    Ellipsis,
    FINOPS_EMPLOYEE_DETAIL,
    FINOPS_VENDOR_DETAIL_ROUTE,
    ObjectDto,
    PRODUCT_IDENTIFIER,
    SOURCEHASH,
    useApp,
    useCurrentBusiness,
    VENDOR_CLIENT_DETAIL_ROUTE,
} from '@finnoto/core';
import { Badge, cn, Icon, MenuLink } from '@finnoto/design-system';

import { EmployeeIconImage } from '@Components/BusinessImage/businessImage.component';

import {
    BuildingSvgIcon,
    MobileSvgIcon,
    OutlineEmailSvgIcon,
    SidebarHrSvgIcon,
    VendorSvgIcon,
    WarningSvgIcon,
} from 'assets';

const HoverableInformation = ({
    item,
    gstin_check = 'from_id',
    gstin_detail_url,
    gstin_label_key = 'business_name',
    gstin_key = 'business_gstin',
    data,
    isVendorSide = false,
    not_registered,
}: ObjectDto) => {
    const { product_id } = useApp();

    const { owner_type, owner_id } = data?.vendor_account || {};
    const isInternationalVendor = useMemo(
        () => item?.vendor_type_id === BusinessType.INTERNATIONAL.value,
        [item?.vendor_type_id]
    );
    const renderVendorType = useCallback(() => {
        if (isInternationalVendor)
            return (
                <Badge
                    label='International'
                    size='sm'
                    appearance='info'
                    className='font-normal  !text-[10px] !p-1 !px-2'
                />
            );
        return item[gstin_key] ? (
            <Badge
                label='GST Registered'
                className='font-normal  !text-[10px] !p-1 !px-2'
                appearance='success'
                size='sm'
            />
        ) : (
            <Badge
                label='Non GST Registered'
                className='font-normal  !text-[10px] !p-1 !px-2'
                appearance='error'
                size='sm'
            />
        );
    }, [gstin_key, isInternationalVendor, item]);

    if (item?.employee_id) {
        return <HoverEmployeeInformationCard data={data} />;
    }

    if (item[gstin_check]) {
        return (
            <ShowInformationWrapper>
                <div className='items-center gap-4 pb-2 row-flex '>
                    {isVendorSide ? (
                        <div className='flex items-center justify-center rounded h-10 w-10 bg-[#A767061A] text-[#A76706] dark:text-[#ff9a00]'>
                            <Icon source={VendorSvgIcon} isSvg size={24} />
                        </div>
                    ) : (
                        <div className='flex items-center justify-center rounded h-10 w-10 bg-[#02B9EF1A] text-[#02B9EF]'>
                            <Icon source={BuildingSvgIcon} isSvg size={24} />
                        </div>
                    )}
                    <div className='gap-1 col-flex'>
                        <MenuLink
                            href={`${gstin_detail_url}/${item[gstin_check]}`}
                            linkOnlyClass='text-sm cursor-pointer hover:underline text-info'
                        >
                            {data[gstin_label_key || 'name'] ||
                                data?.vendor_account?.name}
                        </MenuLink>

                        <div className='items-center gap-2 row-flex'>
                            {item[gstin_key] && (
                                <div className='text-[10px] bg-base-200 px-2 rounded-sm font-normal text-base-tertiary'>
                                    {item[gstin_key]}
                                </div>
                            )}

                            {renderVendorType()}

                            {IsBusinessManaged({
                                owner_id: owner_id,
                                owner_type: owner_type,
                            })}
                        </div>
                    </div>
                </div>
                <div className='gap-4 py-4 pb-0 border-t border-dashed col-flex'>
                    <div className='gap-4 row-flex'>
                        <ShortInfo
                            icon={MobileSvgIcon}
                            label={data?.vendor_account?.mobile}
                        />
                        <ShortInfo
                            icon={OutlineEmailSvgIcon}
                            label={data?.vendor_account?.email}
                            labelClassName='!lowercase'
                            icon_size={18}
                        />
                    </div>
                </div>
            </ShowInformationWrapper>
        );
    }

    if (not_registered) {
        return (
            <ShowInformationWrapper>
                <div className='items-center gap-4 pb-2 row-flex '>
                    <div className='flex items-center justify-center relative rounded h-10 w-10 bg-[#A767061A] text-[#ed7014]'>
                        <Icon source={VendorSvgIcon} isSvg size={24} />
                        {/* <Icon
                    source={WarningSvgIcon}
                    isSvg
                    size={40}
                    iconClass='absolute top-2 left-0 '
                    className='text-warning'
                /> */}
                    </div>
                    <div className='gap-1 col-flex'>
                        <Ellipsis
                            text={AccessNestedObject(
                                item,
                                'attributes.gstin.name'
                            )}
                            length={200}
                        />

                        <div className='items-center gap-2 row-flex'>
                            <div className='text-[10px] bg-base-200 px-2 rounded-sm font-normal text-base-tertiary'>
                                {item?.attributes?.gstin?.gstin}
                            </div>
                            {item?.attributes?.gstin?.gstin ? (
                                <Badge
                                    label='GST Registred'
                                    className='font-normal  !text-[10px] !p-1 !px-2'
                                    appearance='success'
                                    size='sm'
                                />
                            ) : (
                                <Badge
                                    label='Non GST Registered'
                                    className='font-normal  !text-[10px] !p-1 !px-2'
                                    appearance='error'
                                    size='sm'
                                />
                            )}
                            <Badge
                                label='Anonymous'
                                className='text-[10px] font-normal text-orange-500 bg-orange-100 '
                                appearance='warning'
                                size='sm'
                            />
                        </div>
                    </div>
                </div>
                {/* <div className='gap-4 py-4 pb-0 border-t border-dashed col-flex'>
            <div className='gap-4 row-flex'>
                <ShortInfo icon={TeamSvgIcon} label={'Sales Department'} />
                <ShortInfo
                    icon={CallSvgIcon}
                    label={'Sales Department'}
                    icon_size={18}
                />
            </div>
            <ShortInfo icon={InputEmailIcon} label={'Sales Department'} />
            <ShortInfo icon={LocationSvgIcon} label={'Sales Department'} />
        </div> */}
            </ShowInformationWrapper>
        );
    }
    return (
        <ShowInformationWrapper>
            <div className='items-center gap-4 pb-2 row-flex '>
                <div className='flex items-center justify-center relative rounded h-10 w-10 bg-[#A767061A] text-[#A76706] dark:text-[#ff9a00]'>
                    <Icon source={VendorSvgIcon} isSvg size={24} />
                    <Icon
                        source={WarningSvgIcon}
                        isSvg
                        size={40}
                        iconClass='absolute top-2 left-0 '
                        className='text-warning'
                    />
                </div>
                <div className='gap-1 col-flex'>
                    <MenuLink
                        linkOnlyClass={
                            'text-sm cursor-pointer hover:underline text-info'
                        }
                        href={
                            PRODUCT_IDENTIFIER.FINOPS === product_id
                                ? item?.from_id &&
                                  `${FINOPS_VENDOR_DETAIL_ROUTE}/${item?.from_id}`
                                : item?.to_id &&
                                  `${VENDOR_CLIENT_DETAIL_ROUTE}/${item?.to_id}`
                        }
                    >
                        {item?.attributes?.gstin?.name}
                    </MenuLink>

                    <div className='items-center gap-2 row-flex'>
                        <div className='text-[10px] bg-base-200 px-2 rounded-sm font-normal text-base-tertiary'>
                            {item?.attributes?.gstin?.gstin}
                        </div>
                        {item?.attributes?.gstin?.gstin ? (
                            <Badge
                                label='GST Registred'
                                className='font-normal  !text-[10px] !p-1 !px-2'
                                appearance='success'
                                size='sm'
                            />
                        ) : (
                            <Badge
                                label='Non GST Registered'
                                className='font-normal  !text-[10px] !p-1 !px-2'
                                appearance='error'
                                size='sm'
                            />
                        )}
                        {/* <Badge
                            label='Business Managed'
                            className='font-normal  !text-[10px] !p-1 !px-2'
                            appearance='error'
                            size='sm'
                        /> */}
                    </div>
                </div>
            </div>
            {/* <div className='gap-4 py-4 pb-0 border-t border-dashed col-flex'>
                <div className='gap-4 row-flex'>
                    <ShortInfo icon={TeamSvgIcon} label={'Sales Department'} />
                    <ShortInfo
                        icon={CallSvgIcon}
                        label={'Sales Department'}
                        icon_size={18}
                    />
                </div>
                <ShortInfo icon={InputEmailIcon} label={'Sales Department'} />
                <ShortInfo icon={LocationSvgIcon} label={'Sales Department'} />
            </div> */}
        </ShowInformationWrapper>
    );
};

export const HoverEmployeeInformationCard = ({ data }: any) => {
    return (
        <ShowInformationWrapper>
            <div className='items-center gap-4 pb-2 row-flex '>
                <EmployeeIconImage
                    className='w-10 h-10'
                    size={18}
                    img={data?.user?.image_url}
                />
                {/* <div className='flex items-center justify-center w-10 h-10 rounded bg-success/10 employee-text-color'>
                    <Icon source={EmployeeSvgIcon} isSvg size={18} />
                </div> */}
                <div className='gap-1 col-flex'>
                    <MenuLink
                        href={`${FINOPS_EMPLOYEE_DETAIL}/${data?.id}`}
                        linkOnlyClass='link link-hover'
                    >
                        <span className='text-sm '>{data?.name}</span>
                    </MenuLink>

                    <div className='items-center gap-2 row-flex'>
                        <Badge
                            label={data?.identifier}
                            appearance='base'
                            size='xs'
                            className='font-normal  !text-[10px] !p-1 !px-2'
                        />
                        {!!data?.designation?.name && (
                            <Badge
                                label={data?.designation?.name}
                                appearance='base'
                                size='xs'
                                className='font-normal  !text-[10px] !p-1 !px-2'
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-4 py-4 pb-0 border-t border-dashed '>
                <ShortInfo
                    icon={OutlineEmailSvgIcon}
                    label={data?.user?.email}
                    labelClassName='!lowercase'
                    icon_size={18}
                />
                <ShortInfo
                    icon={SidebarHrSvgIcon}
                    label={data?.department?.name}
                />
            </div>
        </ShowInformationWrapper>
    );
};

export const ShowInformationWrapper = ({ children }: any) => {
    return <div className='w-full'>{children}</div>;
};

export const ShortInfo = ({
    icon,
    label,
    icon_size = 20,
    iconColor = 'text-base-secondary',
    labelClassName,
}: any) => {
    if (!label) return null;
    return (
        <div className='items-center gap-2 text-xs font-normal row-flex'>
            <Icon size={icon_size} source={icon} isSvg iconColor={iconColor} />
            <div className={cn('capitalize text-base-primary', labelClassName)}>
                {label}
            </div>
        </div>
    );
};

export default HoverableInformation;

const IsBusinessManaged = ({
    owner_type,
    owner_id,
}: {
    owner_type: string;
    owner_id: number;
}) => {
    const {
        currentBusiness: { id: userBusiness_id },
    } = useCurrentBusiness();

    const check = !(
        owner_type === SOURCEHASH.finops_business &&
        owner_id === userBusiness_id
    );

    if (check) {
        return (
            <Badge
                label='Vendor Managed'
                className='font-normal  !text-[10px] !p-1 !px-2'
                appearance='warning'
                size='sm'
            />
        );
    }
    return '';
};
