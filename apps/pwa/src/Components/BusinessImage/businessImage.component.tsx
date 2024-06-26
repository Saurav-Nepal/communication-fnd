import { cn, Icon } from '@finnoto/design-system';

import { BuildingSvgIcon, EmployeeSvgIcon, VendorSvgIcon } from 'assets';

export const EmployeeIconImage = ({
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
                'flex items-center justify-center rounded w-10 h-10 bg-success/10 employee-text-color',
                className
            )}
        >
            <Icon source={EmployeeSvgIcon} isSvg={isSvg} size={size} />
        </div>
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
            'flex items-center justify-center rounded h-10 w-10 bg-[#A767061A] text-[#A76706] dark:text-[#ff9a00]',
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
                'flex items-center justify-center w-10 h-10 rounded bg-accent/10 text-accent',
                className
            )}
        >
            <Icon source={BuildingSvgIcon} isSvg={isSvg} size={size} />
        </div>
    );
};
