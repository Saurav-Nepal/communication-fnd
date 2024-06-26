import { ButtonHTMLAttributes } from 'react';

import { ButtonProps } from '../Button/button.types';

/**
 * IconButtonProps Interface
 *
 * The props for the IconButton component.
 */
export interface IconButtonProps
    extends Omit<
            ButtonHTMLAttributes<HTMLButtonElement>,
            'onClick' | 'onKeyDown'
        >,
        Pick<
            ButtonProps,
            | 'shape'
            | 'size'
            | 'onClick'
            | 'name'
            | 'appearance'
            | 'noHover'
            | 'outline'
            | 'disabled'
            | 'title'
        > {
    /**
     * The source of the icon to be displayed.
     */
    icon: string | any;
    className?: string;
    iconClass?: string;
    iconSize?: number;
}
