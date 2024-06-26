import { Menu } from '@finnoto/core';

import { Modal, SlidingPane } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';
import { MenuLink } from '../../Navigation/MenuLink/menuLink.component';
import {
    typographyColors,
    TypographyProps,
    typographySizes,
    typographyTypes,
    typographyWeight,
} from './typography.types';
import { DynamicTagComponent } from './typography.utils';

/**
 * Typography component that renders text with customizable styling and behavior.
 *
 * @param className - Additional CSS class name(s) to be applied to the component.
 * @param textTransform - Text transformation style, such as 'uppercase', 'lowercase', or 'capitalize'.
 * @param link - The URL link to navigate to when clicked.
 * @param children - The content to be rendered inside the Typography component.
 * @param variant - The HTML tag name to be used for the Typography component (default: 'p').
 * @param color - The color style to be applied to the text (default: 'text-primary').
 * @param size - The size style to be applied to the text (default: 'normal').
 * @param weight - The font weight style to be applied to the text (default: 'normal').
 * @param type - The type style to be applied to the text (default: 'info').
 * @param target - The target destination for the link when clicked (default: '_self').
 * @param linkDecoration - The link decoration style (default: 'primary').
 *
 *
 *
 * @author Saurav Nepal
 * @returns The rendered Typography component.
 */
export const Typography = ({
    className,
    textTransform,
    link,
    children,
    variant = 'p',
    color = 'text-primary',
    size = 'normal',
    weight = 'normal',
    type,
    target = '_self',
    linkDecoration = 'primary',
    noStyle = false,
    download,
    forceLink,
    ...rest
}: TypographyProps) => {
    // Combine the class names based on the provided props
    const classNames = cn(
        typographySizes[size],
        typographyColors[color],
        typographyWeight[weight],
        typographyTypes[type],
        textTransform,
        className
    );
    const NoStyleClassName = cn(className);

    const stylesClass = noStyle ? NoStyleClassName : classNames;
    // Render the component as a link if a valid link is provided
    if (link && (forceLink || Menu.isMenuAvailable(link))) {
        return (
            <MenuLink
                href={link}
                target={target}
                download={download}
                linkOnlyClass={cn(
                    {
                        [`text-link text-link-${linkDecoration}`]: link,
                    },
                    stylesClass
                )}
                onClick={() => {
                    if (['blank', '_blank'].includes(target)) return;
                    Modal.closeAll();
                    SlidingPane.closeAll();
                }}
            >
                {children}
            </MenuLink>
        );
    }

    // Render the component with a dynamic HTML tag
    return (
        <DynamicTagComponent tag={variant} className={stylesClass} {...rest}>
            {children}
        </DynamicTagComponent>
    );
};
