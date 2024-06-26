import {
    DASHBOARD_ROUTE,
    EMPLOYEE_EXPENSE_DASHBOARD_ROUTE,
    FINOPS_EXPENSE_DASHBOARD_ROUTE,
    IsFunction,
    Navigation,
    VENDOR_EXPENSE_DASHBOARD_ROUTE,
} from '@finnoto/core';
import { NavHome, NavHomeActive } from 'assets';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Icon } from '../../Components/Data-display/Icon/icon.component';
import { cn } from '../../Utils/common.ui.utils';
import {
    BottomNavigationActions,
    BottomNavigationProps,
} from './bottomNavigation.types';

export const BottomNavigation = ({ actions = [] }: BottomNavigationProps) => {
    const pathname = usePathname();

    // Function to check if a route is active
    const isActiveRoute = useCallback(
        (route: string) => {
            if (route === pathname) return true;

            return (
                pathname.startsWith(route) &&
                route !== '/' + DASHBOARD_ROUTE &&
                route !== VENDOR_EXPENSE_DASHBOARD_ROUTE &&
                route !== EMPLOYEE_EXPENSE_DASHBOARD_ROUTE &&
                route !== FINOPS_EXPENSE_DASHBOARD_ROUTE
            );
        },
        [pathname]
    );

    const handleAction = (action: BottomNavigationActions) => {
        return (e: any) => {
            if (IsFunction(action.action)) {
                return action.action();
            }

            if (!action.url) return;
            Navigation.navigate(
                {
                    url: action.url,
                    queryParam: action.urlProps,
                },
                e
            );
        };
    };

    return (
        <div className='fixed bottom-0 left-0 z-10 w-full px-4 py-2 shadow-2xl bg-base-100'>
            <div className='flex justify-around gap-2'>
                {actions.map((action, index) => (
                    <NavItem
                        key={`${action.name}-${index}`}
                        name={action.name}
                        icon={action.icon || NavHome}
                        activeIcon={action.activeIcon || NavHomeActive}
                        active={action.url ? isActiveRoute(action.url) : false}
                        isMain={action.isMain}
                        onClick={handleAction(action)}
                    />
                ))}
            </div>
        </div>
    );
};

const NavItem = ({
    name,
    icon,
    activeIcon,
    active = false,
    isMain = false,
    onClick = () => {},
}: {
    name?: string;
    icon: any;
    activeIcon?: any;
    active?: boolean;
    isMain?: boolean;
    onClick?: (e: any) => void;
}) => {
    return (
        <div
            className={cn('relative  cursor-pointer select-none text-primary', {
                'text-accent': isMain,
            })}
            title={name}
            onClick={onClick}
        >
            {isMain ? (
                <div className='w-16 h-16 p-4 -mt-6 rounded-full bg-base-100 centralize'>
                    <Icon
                        source={active ? activeIcon || icon : icon}
                        size={isMain ? 52 : 32}
                        isSvg
                    />
                </div>
            ) : (
                <Icon
                    source={active ? activeIcon || icon : icon}
                    size={32}
                    isSvg
                />
            )}

            {active && !isMain && (
                <div className='absolute inline-block w-1 h-1 -translate-x-1/2 rounded-full left-1/2 bottom-1 bg-primary' />
            )}
        </div>
    );
};
