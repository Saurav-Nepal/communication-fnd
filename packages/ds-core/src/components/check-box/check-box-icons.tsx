import React, { SVGProps } from 'react';

export function CheckIcon({
    style,
    ...props
}: Readonly<SVGProps<SVGSVGElement>>) {
    return (
        <svg
            width='1.2em'
            viewBox='0 0 12 10'
            style={{
                fill: 'none',
                strokeWidth: 2,
                stroke: 'currentColor',
                strokeDasharray: 16,
                ...style,
            }}
            {...props}
        >
            <polyline points='1.5 6 4.5 9 10.5 1' />
        </svg>
    );
}
const IndeterminateIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width='1.2em'
            viewBox='0 0 24 24'
            style={{ stroke: 'currentColor', strokeWidth: 4, ...props.style }}
            // {...props}
        >
            <line x1='21' x2='3' y1='12' y2='12' />
        </svg>
    );
};

export interface CheckboxIconProps {
    /**
     * @default false
     */
    isIndeterminate?: boolean;
    /**
     * @default false
     */
    isChecked?: boolean;
    Icon?: React.ReactElement;
    style?: React.CSSProperties;
}

export function CheckboxIcon(props: CheckboxIconProps) {
    const { isIndeterminate, isChecked, Icon: customIcon, ...rest } = props;

    let BaseIcon;
    BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;

    return isChecked || isIndeterminate ? (
        <div className='flex flex-row items-center w-[100%] h-[100%] justify-center '>
            {customIcon ? (
                <div className='flex flex-row items-center flex-1 w-full h-full'>
                    {React.cloneElement(customIcon, {
                        style: {
                            ...customIcon.props.style,
                            ...rest.style,
                        },
                    })}
                </div>
            ) : (
                <BaseIcon {...rest} />
            )}
        </div>
    ) : null;
}
