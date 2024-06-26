import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import {
    Button,
    DropdownMenu,
    DropdownMenuActionProps,
    Icon,
} from '@finnoto/design-system';
import { buttonVariants } from '@finnoto/design-system/src/Components/Inputs/Button/button.types';

import { ChevronDownOutlineSvgIcon } from 'assets';

const ArcDropdownButton = ({
    actions,
    children,
    label,
    size = 'sm',
}: {
    actions: DropdownMenuActionProps[];
    children?: React.ReactNode;
    label?: string;
    size?: 'sm' | 'md' | 'lg' | 'xs';
}) => {
    return (
        <DropdownMenu actions={actions} align='end' hideOnNoAction={true}>
            {children || (
                <div>
                    <ArcDropdownButtonAction label={label} size={size} />
                </div>
            )}
        </DropdownMenu>
    );
};

type ButtonAppearance = VariantProps<typeof buttonVariants>;

export const ArcDropdownButtonAction = ({
    label,
    size,
    appearance = 'primary',
}: ButtonAppearance & {
    label: string;
}) => {
    return (
        <Button size={size} appearance={appearance}>
            {label ?? 'Actions'}
            <Icon source={ChevronDownOutlineSvgIcon} isSvg size={20} />
        </Button>
    );
};

export default ArcDropdownButton;
