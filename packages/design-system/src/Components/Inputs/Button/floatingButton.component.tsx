import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { IsEmptyArray, SortArrayObjectBy } from '@finnoto/core';

import { cn, IsUndefined } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { DropdownMenuActionProps } from '../DropdownMenu/dropdownMenu.types';
import { Button } from './button.component';

interface FloatingButtonProps {
    className?: string;
    buttonClassName?: string;
    icon?: string | (() => any);
    actions?: DropdownMenuActionProps[];
    changePos?: boolean;
}
export const FloatingButton = ({
    className = '',
    buttonClassName = '',
    icon,
    actions,
}: FloatingButtonProps) => {
    const [showAction, setShowAction] = useState(false);

    const isAllActionVisible = useMemo(() => {
        const visibleActions = actions?.filter((val) => val?.visible !== false);
        return !IsEmptyArray(visibleActions);
    }, [actions]);

    const sortedActions = useMemo(() => {
        return SortArrayObjectBy(actions, 'name');
    }, [actions]);

    if (!isAllActionVisible) return;
    return (
        <div
            className={cn(
                'fixed col-flex items-center right-0 bottom-0 p-4 z-40',
                className
            )}
        >
            <div
                className={cn(
                    'absolute bottom-0 right-0 ease-in duration-200',
                    { hidden: !showAction }
                )}
                onClick={() => setShowAction(!showAction)}
            >
                <div className='w-screen h-screen bg-base-100/90'></div>
            </div>
            <div className={cn('float-animation', { hidden: !showAction })}>
                {sortedActions &&
                    sortedActions.map(
                        (el: DropdownMenuActionProps, index: number) => {
                            if (!(IsUndefined(el.visible) || el.visible))
                                return null;
                            if (el.url) {
                                if (el.url.includes('blob:')) {
                                    return (
                                        <a
                                            href={el.url}
                                            onClick={() =>
                                                setShowAction(!showAction)
                                            }
                                            key={index}
                                            className='items-center justify-end cursor-pointer row-flex'
                                            {...el.urlProps}
                                        >
                                            <ActionItem el={el} />
                                        </a>
                                    );
                                }

                                return (
                                    <Link href={el.url} key={index}>
                                        <a
                                            onClick={() =>
                                                setShowAction(!showAction)
                                            }
                                            key={index}
                                            className='items-center justify-end cursor-pointer row-flex'
                                            {...el.urlProps}
                                        >
                                            <ActionItem el={el} />
                                        </a>
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    onClick={() => {
                                        el.action && el.action();
                                        setShowAction(!showAction);
                                    }}
                                    key={index}
                                    className='items-center justify-end row-flex'
                                >
                                    <ActionItem el={el} />
                                </div>
                            );
                        }
                    )}
            </div>

            <Button
                appearance={showAction ? 'error' : 'primary'}
                className={cn(
                    'h-12 w-12 rounded-full z-10 swap swap-rotate items-center justify-center',
                    { 'swap-active': showAction },
                    buttonClassName
                )}
                onClick={() => setShowAction(!showAction)}
            >
                <div className='flex items-center justify-center swap-off'>
                    <Menu size={26} />
                </div>
                <Icon
                    source={icon ? icon : 'add'}
                    size={36}
                    className={cn('swap-on', { '!rotate-45': !icon })}
                    iconColor='text-primary-content'
                />
            </Button>
        </div>
    );
};

const ActionItem = ({ el }: { el: DropdownMenuActionProps }) => {
    return (
        <div className={'py-1 whitespace-nowrap z-40 row-flex items-center'}>
            <span
                className={cn(
                    'absolute right-full font-medium text-sm',
                    {
                        'mr-5': el.icon,
                        'text-error': el.isCancel,
                    },
                    el?.className
                )}
            >
                {el.name}
            </span>
            {el.icon ? (
                <div className='items-center justify-center w-8 h-8 rounded-lg shadow bg-base-100 row-flex'>
                    <Icon
                        source={el.icon}
                        isSvg={el.isSvg}
                        size={el?.iconSize || 20}
                        iconColor={el.isCancel ? 'text-error' : 'text-primary'}
                    />
                </div>
            ) : (
                <div className='h-8'></div>
            )}
        </div>
    );
};
