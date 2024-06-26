import { IsFunction, useApp } from '@finnoto/core';
import { MenuLink, Typography, cn } from '@finnoto/design-system';
import { useMemo } from 'react';

const PwaBreadCrumbs = ({
    routes = [],
    className,
}: {
    routes: {
        name: string;
        link?: string;
        action?: () => void;
    }[];
    className?: string;
}) => {
    const { basePath } = useApp();

    const combinedRoute = useMemo(() => {
        const homeRoute = {
            name: 'home',
            link: basePath,
        };
        return [homeRoute, ...routes];
    }, [basePath, routes]);

    return (
        <div
            className={cn(
                'flex items-center gap-2 px-4 py-2 border-b breadcrumbs bg-base-100 border-base-300/50',
                className
            )}
        >
            <ul className='flex-wrap gap-y-2'>
                {combinedRoute
                    .filter((route) => !!route.name)
                    ?.map((route: any, index, routeArray) => {
                        let routeName = route?.name;

                        if (
                            routeArray.length > 3 &&
                            index > 0 &&
                            index < routeArray.length - 2
                        ) {
                            routeName = `...`;
                        }

                        if (IsFunction(route?.action))
                            return (
                                <li key={routeName}>
                                    <Typography
                                        onClick={route?.action}
                                        className='capitalize table-link text-base-secondary'
                                    >
                                        {routeName}
                                    </Typography>
                                </li>
                            );
                        return (
                            <li key={index}>
                                <MenuLink
                                    href={route?.link}
                                    className='capitalize text-base-secondary'
                                    linkOnlyClass='table-link'
                                    replace
                                >
                                    {routeName}
                                </MenuLink>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default PwaBreadCrumbs;
