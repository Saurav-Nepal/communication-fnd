import { Avatar, cn, Icon } from '@finnoto/design-system';

import { BuildingSvgIcon, EmployeeSvgIcon, VendorSvgIcon } from 'assets';

export const EmployeeIconImage = ({
    size = 24,
    isSvg = true,
    img,
    className,
    imageWrapperClassName,
}: {
    size?: number;
    isSvg?: boolean;
    img?: string;
    className?: string;
    imageWrapperClassName?: string;
}) => {
    return (
        <Avatar
            className={cn('w-11 h-11', className)}
            imageWrapperClassName={cn(
                'bg-success/10 employee-text-color w-full',
                imageWrapperClassName
            )}
            icon={EmployeeSvgIcon}
            source={img}
            size={null}
            iconSize={size}
            alt='Employee avatar'
        />
        // <div
        //     className={cn(
        //         'flex items-center justify-center rounded w-11 h-11 bg-success/10 shrink-0 employee-text-color',
        //         className
        //     )}
        // >
        //     <Icon source={EmployeeSvgIcon} isSvg={isSvg} size={size} />
        // </div>
    );
};
export const VendorIconImage = ({
    size = 24,
    isSvg = true,
    className,
}: {
    size?: number;
    isSvg?: boolean;
    className?: string;
}) => (
    <div
        className={cn(
            'flex items-center justify-center rounded h-11 w-11 bg-[#A767061A] text-[#A76706] dark:text-[#ff9a00]',
            className
        )}
    >
        <Icon source={VendorSvgIcon} isSvg={isSvg} size={size} />
    </div>
);

export const BusinessIconImage = ({
    size = 24,
    isSvg = true,
    className,
}: {
    size?: number;
    isSvg?: boolean;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center rounded h-11 w-11 bg-[#02B9EF1A] text-[#02B9EF]',
                className
            )}
        >
            <Icon source={BuildingSvgIcon} isSvg={isSvg} size={size} />
        </div>
    );
};
