import { useCallback, useMemo } from 'react';

import {
    IsUndefinedOrNull,
    Menu,
    Navigation,
    PRODUCT_IDENTIFIER,
    useApp,
} from '@finnoto/core';
import { Badge, cn, Ellipsis, Icon, MenuLink } from '@finnoto/design-system';

import { EmployeeIconImage } from '@Components/BusinessImage/businessImage.component';

import { Divider } from './billCard.component';

import { EmployeeSvgIcon } from 'assets';

interface EmployeeCardProps {
    name: string;
    identifier?: string;
    email?: string;
    designation?: string;
    navigationUrl?: string;
    colorClass?: string;
    onClick?: () => void;
    icon?: any;
    image_url?: string;
    hideFrom?: boolean;
    onCardClick?: () => void;
    className?: string;
}

const EmployeeCard = ({
    name,
    identifier,
    email,
    designation,
    onClick,
    icon,
    colorClass,
    image_url,
    navigationUrl,
    hideFrom = false,
    onCardClick,
    className,
}: EmployeeCardProps) => {
    const { product_id } = useApp();

    const isFinops = product_id === PRODUCT_IDENTIFIER.FINOPS;

    const isNavigate = useMemo(() => {
        return (
            (navigationUrl && Menu.isMenuAvailable(navigationUrl)) ||
            !IsUndefinedOrNull(onCardClick)
        );
    }, [navigationUrl, onCardClick]);

    const handleDetailsUrl = useCallback(() => {
        if (IsUndefinedOrNull(onCardClick) && IsUndefinedOrNull(navigationUrl))
            return;
        if (onCardClick) {
            return onCardClick();
        }
        if (navigationUrl && Menu.isMenuAvailable(navigationUrl)) {
            Navigation.navigate({ url: navigationUrl });
        }
    }, [navigationUrl, onCardClick]);

    return (
        <div
            className={cn(
                'rounded min-h-[68px] bg-base-100 flex gap-3 items-center border border-base-300',
                {
                    'px-4 py-1': hideFrom,
                    'p-0.5': !hideFrom,
                },
                className
            )}
            aria-label='bill-from-card'
        >
            {!hideFrom && (
                <div className='py-2 px-2 bg-neutral text-primary-content text-xs font-medium leading-[14px] rounded rounded-tr-none rounded-br-none'>
                    <p>F</p>
                    <p>R</p>
                    <p>O</p>
                    <p>M</p>
                </div>
            )}

            <EmployeeIconImage
                img={image_url}
                className='w-10 h-10'
                size={20}
            />
            {/* <div
                className={`flex items-center justify-center rounded h-11 w-11 bg-[#02B9EF1A] employee-text-color ${colorClass}`}
            >
                <Icon source={icon || EmployeeSvgIcon} isSvg size={24} />
            </div> */}
            <div className='flex-1 gap-1 pr-3 col-flex '>
                <div className='flex items-center text-sm font-medium text-base-primary'>
                    <div className='flex-1 group' onClick={handleDetailsUrl}>
                        <Ellipsis
                            className={cn({
                                'group-hover:underline cursor-pointer text-base':
                                    isNavigate,
                            })}
                        >
                            {name}
                        </Ellipsis>
                    </div>
                    {onClick && (
                        <a
                            className='ml-auto text-xs font-normal link link-hover'
                            onClick={onClick}
                        >
                            Edit
                        </a>
                    )}
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                    {email ? (
                        <>
                            <Badge label={email} size='sm' appearance='base' />
                            <Divider />
                        </>
                    ) : null}
                    <Badge label={identifier} size='sm' appearance='base' />
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
