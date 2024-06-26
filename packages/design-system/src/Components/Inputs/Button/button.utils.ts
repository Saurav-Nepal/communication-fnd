import { ButtonProps } from './button.types';

/**
 * Returns the icon size based on the button size
 */
export const getIconSizeForButton = (size: ButtonProps['size']) => {
    switch (size) {
        case 'lg':
            return 20;
        case 'md':
            return 18;
        case 'sm':
            return 14;
        case 'xs':
            return 8;
        default:
            return 12;
    }
};
