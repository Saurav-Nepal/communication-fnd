import { Menu, Navigation } from '@finnoto/core';
import { Ellipsis, Icon, MenuLink, cn } from '@finnoto/design-system';
import { VendorSvgIcon } from 'assets';

interface EmployeeCardProps {
    name: string;
    identifier?: string;
    email?: string;
    designation?: string;
    navigationUrl?: string;
    colorClass?: string;
    onClick?: () => void;
    icon?: any;
    basicLabel?: boolean;
    cardNavigate?: boolean;
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
    navigationUrl,
    basicLabel,
    cardNavigate,
    className,
}: EmployeeCardProps) => {
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
            aria-label='bill-from-card'
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
                    From
                </div>
            )}
            <div className='flex items-center gap-4'>
                {!basicLabel && (
                    <div className='p-2 bg-accent text-primary-content text-xs font-medium leading-[14px] rounded'>
                        <p>F</p>
                        <p>R</p>
                        <p>O</p>
                        <p>M</p>
                    </div>
                )}

                <div
                    className={`flex items-center justify-center rounded h-11 w-11 bg-[#02B9EF1A] employee-text-color ${colorClass}`}
                >
                    <Icon source={icon || VendorSvgIcon} isSvg size={24} />
                </div>
                <div className='flex-1 col-flex'>
                    <div className='flex items-center font-medium'>
                        {navigationUrl ? (
                            <MenuLink
                                linkOnlyClass='text-sm w-full'
                                href={navigationUrl}
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

                    <div className='flex items-center gap-1'>
                        {email ? <div className='text-xs '>{email}</div> : null}

                        {/* <div className='flex items-center gap-1'>
                        {!!email && !!identifier && (
                            <span className='w-1 h-1 bg-black rounded-full'></span>
                        )}
                        {!!identifier && (
                            <span className='text-xs'>{identifier}</span>
                        )}
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
