import React from 'react';

import {
    Button,
    DropdownMenu,
    DropdownMenuActionProps,
    dropdownMenuSizes,
    Icon,
} from '@finnoto/design-system';

import { ActionArrowDownSvgIcon } from 'assets';

const DropdownActionButton = ({
    actions,
    searchable,
    hideOnNoAction = false,
    align,
    isSortable,
    size = 'sm',
}: {
    actions: DropdownMenuActionProps[];
    searchable?: boolean;
    hideOnNoAction?: boolean;
    align?: 'center' | 'start' | 'end';
    isSortable?: boolean;
    size?: keyof typeof dropdownMenuSizes;
}) => {
    return (
        <DropdownMenu
            actions={actions}
            className='gap-2 mt-2'
            searchable={searchable}
            hideOnNoAction={hideOnNoAction}
            align={align}
            isSortable={isSortable}
            size={size === 'sm' ? 'md' : size}
        >
            <Button size={size} appearance='primary'>
                Actions{' '}
                <Icon
                    source={ActionArrowDownSvgIcon}
                    isSvg
                    className='ml-2'
                    size={20}
                />
            </Button>
        </DropdownMenu>
    );
};

export default DropdownActionButton;
