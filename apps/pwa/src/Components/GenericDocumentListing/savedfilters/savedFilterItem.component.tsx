import { useMemo, useState } from 'react';
import { useToggle } from 'react-use';

import { AccessManager } from '@finnoto/core';
import {
    cn,
    DropdownMenu,
    Icon,
    IconButton,
    Tooltip,
} from '@finnoto/design-system';

import {
    DeleteSvgIcon,
    GlobalSvgIcon,
    HeartLinearSvgIcon,
    HeartSvgIcon,
    MoreIcon,
    UserSquareSvgIcon,
} from 'assets';

export type makeItProps = {
    id: number;
    method: 'makeGlobal' | 'makePersonal' | 'makeFavorite' | 'removeFavorite';
};
const SavedFilterItem = ({
    makeItSome,
    data,
    onRemove,
    isDeletable,
    onApply,
}: {
    data: any;
    makeItSome: (data: makeItProps) => void;
    onRemove: () => void;
    isDeletable?: boolean;
    onApply?: () => void;
}) => {
    const [isChecked, setIsChecked] = useState(data?.is_favourite);
    const actions = useMemo(() => {
        return [
            {
                name: 'Apply',
                key: 'apply',
                action: onApply,
            },
            {
                name: 'Make it global',
                key: 'make-global',
                visible:
                    !!data?.user_id &&
                    AccessManager.hasRoleIdentifier('ua_listing_overrider'),
                action: () => {
                    makeItSome({
                        id: data?.id as number,
                        method: 'makeGlobal',
                    });
                },
            },
            {
                name: 'Make it personal',
                key: 'make-personal',
                visible: !data?.user_id && isDeletable,
                action: () => {
                    makeItSome({
                        id: data?.id as number,
                        method: 'makePersonal',
                    });
                },
            },
        ];
    }, [data?.id, data?.user_id, isDeletable, makeItSome, onApply]);

    const [isActive, toggleActive] = useToggle(false);

    return (
        <div
            className={cn(
                'flex justify-between px-3 py-2 mb-1 border rounded border-base-300 bg-[#f7f8fa] hover:bg-base-100 group',
                {
                    'bg-base-100': isActive,
                }
            )}
        >
            <div className='flex items-center gap-3'>
                <Icon
                    source={isChecked ? HeartSvgIcon : HeartLinearSvgIcon}
                    isSvg
                    className={cn('cursor-pointer text-primary ')}
                    onClick={() => {
                        setIsChecked(!isChecked);
                        makeItSome({
                            id: data?.id as number,
                            method: isChecked
                                ? 'removeFavorite'
                                : 'makeFavorite',
                        });
                    }}
                />
                <Tooltip
                    asChild={false}
                    message={data?.user_id ? 'Personal' : 'Global'}
                >
                    <Icon
                        source={
                            data?.user_id ? UserSquareSvgIcon : GlobalSvgIcon
                        }
                        isSvg
                        className={cn(
                            'text-base-300 group-hover:text-base-primary',
                            {
                                'text-base-primary': isActive,
                            }
                        )}
                    />
                </Tooltip>
                <p className='text-sm capitalize'>{data?.identifier}</p>
            </div>
            <div className='flex'>
                {isDeletable && (
                    <Icon
                        source={DeleteSvgIcon}
                        onClick={onRemove}
                        isSvg
                        className={cn(
                            'mr-2 cursor-pointer text-base-300 group-hover:text-base-primary hover:!text-error ',
                            {
                                'text-base-primary': isActive,
                            }
                        )}
                    />
                )}
                <DropdownMenu
                    actions={actions}
                    onOpenChangeCallback={(isOpen) => toggleActive(isOpen)}
                >
                    <IconButton
                        icon={MoreIcon}
                        appearance='plain'
                        size='xs'
                        className={cn(
                            'text-base-300 group-hover:text-base-primary',
                            {
                                'text-base-primary': isActive,
                            }
                        )}
                    />
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SavedFilterItem;
