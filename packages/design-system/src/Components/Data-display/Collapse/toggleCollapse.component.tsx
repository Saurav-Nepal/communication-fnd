'use client';

import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { IsUndefinedOrNull, cn } from '../../../Utils/common.ui.utils';
import { ToggleCollapseProps } from './collapse.types';

/**
 * Renders a collapsible section with a toggle button to expand or collapse its content.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the collapsible section.
 * @param {string} [props.subtitle] - The subtitle of the collapsible section.
 * @param {boolean} [props.expand] - Determines whether the section is expanded or collapsed. If provided, overrides the defaultExpand prop.
 * @param {boolean} [props.defaultExpand=false] - Determines the initial expand state when the component is mounted.
 * @param {React.ReactNode} props.children - The content of the collapsible section.
 * @param {boolean} [props.collapseDisabled] - Determines whether the collapse functionality is disabled.
 * @param {string} [props.className] - Additional CSS class names to apply to the collapsible section container.
 * @param {string} [props.titleClassName] - Additional CSS class names to apply to the title element.
 * @param {string} [props.headerClassName] - Additional CSS class names to apply to the header container.
 * @param {string} [props.subtitleClassName] - Additional CSS class names to apply to the subtitle element.
 * @param {Function} [props.onExpandChange=() => {}] - The callback function invoked when the expand state changes.
 * @param {boolean} [props.hideCollapseIcon=false] - Determines whether to hide the collapse icon.
 * @returns {React.ReactNode} The rendered ToggleCollapse component.
 *
 * @author @rumeshudash
 */
export const ToggleCollapse = ({
    title,
    subtitle,
    expand: propExpand,
    defaultExpand = false,
    children,
    collapseDisabled,
    className,
    titleClassName,
    headerClassName,
    subtitleClassName,
    onExpandChange = () => {},
    hideCollapseIcon = false,
}: ToggleCollapseProps) => {
    const [expand, setExpand] = useState<boolean>(
        propExpand || defaultExpand || collapseDisabled === true
    );

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
                    'row-flex justify-between items-center',
                    headerClassName
                )}
            >
                <div className='col-flex'>
                    <div
                        className={cn(
                            'text-base-primary font-medium',
                            titleClassName
                        )}
                    >
                        {title}
                    </div>

                    {!expand && (
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
                    <input
                        type='checkbox'
                        className='toggle toggle-primary toggle-sm'
                        checked={expand}
                        onClick={() => {
                            !collapseDisabled && handleExpand(!expand);
                        }}
                    />
                )}
            </div>
            <AnimateHeight height={expand ? 'auto' : 0}>
                {children}
            </AnimateHeight>
        </div>
    );
};
