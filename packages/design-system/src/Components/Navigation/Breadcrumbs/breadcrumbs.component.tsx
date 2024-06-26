import { memo } from 'react';

import { cn, IsValidString } from '../../../Utils/common.ui.utils';
import { Typography } from '../../Data-display/Typography/typography.component';
import { PageTitle } from '../Page-Title/pageTitle.component';
import { BreadcrumbsProps } from './breadcrumbs.types';

/**
 *
 * @description This component work as a breadcrumbs, that takes array of objects and render the breadcrumbs.
 *
 * @param route TitleRoutePayload[]
 */
export const Breadcrumbs = memo(
    ({ route, className, title, pageTitle, detailTitle }: BreadcrumbsProps) => {
        return (
            <div
                className={cn(
                    'breadcrumbs text-base-primary py-0 text-sm flex gap-3',
                    className
                )}
            >
                {(pageTitle || IsValidString(title)) && (
                    <PageTitle title={pageTitle || title}></PageTitle>
                )}
                <ul>
                    {route.map((routes, index) => {
                        return (
                            <li key={index} className='text-base-secondary'>
                                {routes.link ? (
                                    <Typography
                                        link={routes.link}
                                        linkDecoration='secondary'
                                    >
                                        {routes.name}
                                    </Typography>
                                ) : (
                                    <Typography>{routes.name}</Typography>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <Typography role='heading' variant='h1' weight='bold'>
                    {detailTitle}
                </Typography>
            </div>
        );
    }
);
