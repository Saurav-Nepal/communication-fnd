'use client';

import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { cn, IsUndefinedOrNull } from '../../../Utils/common.ui.utils';
import { Icon } from '../Icon/icon.component';
import { CollapseProps } from './collapse.types';

import { SelectArrowDownSvg } from 'assets';

/**
 * Renders a collapsible section with a header and content.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {any} props.title - The main title of the collapsible section.
 * @param {string} [props.subtitle] - The subtitle of the collapsible section.
 * @param {boolean} [props.expand] - The current expand state of the collapsible section.
 * @param {boolean} [props.defaultExpand=false] - The default expand state of the collapsible section.
 * @param {boolean} [props.collapseDisabled] - Determines if the collapsible section is disabled for collapsing.
 * @param {any} props.children - The content to be rendered within the collapsible section.
 * @param {string} [props.className] - Additional CSS class for the collapsible section container.
 * @param {string} [props.titleClassName] - Additional CSS class for the title element.
 * @param {string} [props.headerClassName] - Additional CSS class for the header container.
 * @param {string} [props.subtitleClassName] - Additional CSS class for the subtitle element.
 * @param {function} [props.onExpandChange=() => {}] - Callback function invoked when the expand state changes.
 *                                                     It receives a boolean parameter representing the new expand state.
 * @param {any} [props.icon] - The icon to be displayed next to the collapsible section title.
 * @returns {JSX.Element} The rendered React component.
 *
 * @author @rumeshudash
 */
export const Collapse = ({
    title,
    subtitle,
    expand: propExpand,
    defaultExpand = false,
    children,
    collapseDisabled,
    hideCollapseIcon,
    className = '',
    titleClassName = '',
    headerClassName = '',
    subtitleClassName = '',
    collapseContainerClassName = '',
    onExpandChange = () => {},
    renderOnExpand,
    icon,
    footer,
    footerClassName,
    iconClassName,
    hideDefaultTitleStyle,
}: CollapseProps) => {
    const [expand, setExpand] = useState<boolean>(
        propExpand || defaultExpand || collapseDisabled === true
    );

    const iconExpandClass = 'rotate-180';
    const iconCollapsedClass = 'rotate-0';

    useEffect(() => {
        if (!IsUndefinedOrNull(propExpand)) {
            setExpand(propExpand || false);
        }
    }, [propExpand]);

    const handleExpand = (state: boolean) => {
        onExpandChange(state);
        setExpand(state);
    };

    return (
        <div className={cn('col-flex', className)}>
            <div
                className={cn(
                    'row-flex justify-between items-center cursor-pointer',
                    headerClassName
                )}
                onClick={() => {
                    !collapseDisabled && handleExpand(!expand);
                }}
            >
                <div className='flex-1 col-flex'>
                    <div
                        className={cn(
                            {
                                'text-base-secondary font-medium':
                                    !hideDefaultTitleStyle,
                            },
                            titleClassName
                        )}
                    >
                        {title}
                    </div>

                    {!expand && subtitle && (
                        <div
                            className={cn(
                                'text-base-secondary/80 font-medium',
                                subtitleClassName
                            )}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
                {!collapseDisabled && !hideCollapseIcon && (
                    <Icon
                        source={icon || SelectArrowDownSvg}
                        isSvg
                        size={14}
                        iconClass={cn(
                            'transition-transform duration-300',
                            {
                                [iconExpandClass]: expand,
                                [iconCollapsedClass]: !expand,
                            },
                            iconClassName
                        )}
                        iconColor='text-current'
                    />
                )}
            </div>
            <AnimateHeight
                className={collapseContainerClassName}
                height={expand ? 'auto' : 0}
            >
                {renderOnExpand && expand ? children : null}
                {!renderOnExpand ? children : null}
            </AnimateHeight>
            {footer && (
                <div
                    onClick={() => {
                        !collapseDisabled && handleExpand(!expand);
                    }}
                    className={cn(
                        'row-flex justify-between items-center cursor-pointer',
                        footerClassName
                    )}
                >
                    {footer}
                </div>
            )}
        </div>
    );
};
