import { IsValidString } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { Typography } from '../../Data-display/Typography/typography.component';
import { Button } from '../../Inputs/Button/button.component';
import { DropdownMenu } from '../../Inputs/DropdownMenu/dropdownMenu.component';
import { PageTitle } from '../Page-Title/pageTitle.component';
import { BreadcrumbsProps } from './breadcrumbs.types';

import { ChevronDownOutlineSvgIcon } from 'assets';

export const ArcBreadcrumbs: React.FC<BreadcrumbsProps> = ({
    title,
    route,
    pageTitle,
    className,
    mainClassName,
    rightComponent,
    actions,
}) => {
    return (
        <div
            className={cn(
                'row-flex justify-between  items-center w-full',
                mainClassName
            )}
        >
            <div
                className={cn(
                    'arc-breadcrumbs breadcrumbs justify-between flex-1 py-0 text-sm flex transition-all min-h-[28px] overflow-hidden',
                    className
                )}
            >
                {(pageTitle || IsValidString(title)) && (
                    <PageTitle title={pageTitle || title}></PageTitle>
                )}
                <ul>
                    {route.map((routes, index) => {
                        return (
                            <li key={index}>
                                {routes.link ? (
                                    <Typography
                                        link={routes.link}
                                        className='text-xs text-polaris-text-inverse-secondary hover:text-polaris-text-brand-hover'
                                    >
                                        {routes.name}
                                    </Typography>
                                ) : (
                                    <Typography className='text-xs text-polaris-text-secondary'>
                                        {routes.name}
                                    </Typography>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div className='flex gap-2'>
                    {rightComponent}
                    {actions && (
                        <DropdownMenu
                            actions={actions}
                            align='end'
                            hideOnNoAction={true}
                        >
                            <Button size='sm' appearance='primary'>
                                Actions
                                <Icon
                                    source={ChevronDownOutlineSvgIcon}
                                    isSvg
                                    size={20}
                                />
                            </Button>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </div>
    );
};
