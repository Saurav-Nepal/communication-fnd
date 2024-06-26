import { ArrowUpRightFromCircle } from 'lucide-react';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import { Menu } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Tooltip } from '../../Data-display/Tooltip/Tooltip.component';

interface MenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    linkOnlyClass?: string;
    children: any;
    onClick?: (e: any) => void;
    replace?: boolean;
    [x: string]: any;
}

export const MenuLink = ({
    href,
    linkOnlyClass = 'table-link',
    children,
    className,
    replace,
    ...props
}: MenuLinkProps) => {
    if (!href || !Menu.isMenuAvailable(href)) {
        return children || null;
    }
    if (['blank', '_blank'].includes(props?.target)) {
        return (
            <div className={cn('items-center gap-2 row-flex')}>
                <Link
                    href={href}
                    className={cn(linkOnlyClass, className)}
                    replace={replace}
                    {...props}
                    target={
                        ['blank', '_blank'].includes(props?.target)
                            ? undefined
                            : props?.target
                    }
                >
                    {children || null}
                </Link>
                <Tooltip
                    className='text-base-primary'
                    message='Redirect To New Tab'
                >
                    <Link target='_blank' href={href} replace={replace}>
                        <ArrowUpRightFromCircle
                            className='text-base-tertiary'
                            size={14}
                        />
                    </Link>
                </Tooltip>
            </div>
        );
    }
    return (
        <Link
            href={href}
            className={cn(linkOnlyClass, className)}
            replace={replace}
            {...props}
        >
            {children || null}
        </Link>
    );
};
