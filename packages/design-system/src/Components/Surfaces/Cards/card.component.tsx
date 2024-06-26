import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import { CardProps } from './card.types';

export const Card = ({
    title,
    titleClassName,
    children,
    icon,
    isSvgIcon = true,
    className,
    noBorder,
    onClick,
}: CardProps) => {
    return (
        <div
            className={cn(
                'col-flex',
                { 'shadow rounded': !noBorder, 'cursor-pointer': !!onClick },
                className
            )}
            onClick={onClick}
        >
            {title ? (
                <div
                    className={`row-flex text-base items-center font-medium border-b border-dashed gap-4 mx-4 py-3 ${
                        titleClassName ?? ''
                    }`}
                >
                    {icon ? (
                        <Icon source={icon} isSvg={isSvgIcon} size={20} />
                    ) : null}
                    {title}
                </div>
            ) : null}
            {children}
        </div>
    );
};

export const CardBody = ({
    children,
    className,
}: {
    className?: string;
    children: any;
}) => {
    return (
        <div className={cn('col-flex overflow-y-auto p-4 pt-0', className)}>
            {children}
        </div>
    );
};
