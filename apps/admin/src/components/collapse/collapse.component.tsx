import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { cn, isUndefinedOrNull } from '@slabs/ds-utils';

const Collapse = ({
    title,
    openIcon = 'fa-plus',
    closeIcon = 'fa-minus',
    expand: propExpand,
    defaultExpand = false,
    children,
    collapseDisabled,
    className = '',
    headerClassName = '',
    onExpandChange = () => {},
}: {
    title: any;
    openIcon?: string;
    closeIcon?: string;
    expand?: boolean;
    defaultExpand?: boolean;
    collapseDisabled?: boolean;
    children: any;
    className?: string;
    headerClassName?: string;
    onExpandChange?: (_: boolean) => void;
}) => {
    const [expand, setExpand] = useState<boolean>(
        propExpand || defaultExpand || collapseDisabled === true
    );

    useEffect(() => {
        if (!isUndefinedOrNull(propExpand)) {
            setExpand(propExpand || false);
        }
    }, [propExpand]);

    const handleExpand = (state: boolean) => {
        onExpandChange(state);
        setExpand(state);
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <div
                className={`flex flex-row justify-between items-center cursor-pointer ${headerClassName}`}
                onClick={() => {
                    !collapseDisabled && handleExpand(!expand);
                }}
            >
                {title}
                <div>
                    <i
                        className={cn(`fa ${openIcon}`, { '!hidden': expand })}
                        aria-hidden='true'
                    />
                    <i
                        className={cn(`fa ${closeIcon}`, {
                            '!hidden': !expand,
                        })}
                        aria-hidden='true'
                    />
                </div>
            </div>
            <AnimateHeight height={expand ? 'auto' : 0}>
                {children}
            </AnimateHeight>
        </div>
    );
};

export default Collapse;
