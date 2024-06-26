import { cn } from '../../../../../../Utils/common.ui.utils';

export const FilterItemWrapper = ({
    children,
    className,
    onClick = () => {},
    isClearable = true,
}: any) => {
    return (
        <div
            onClick={isClearable ? onClick : undefined}
            className={cn(
                'px-4 text-xs text-base-primary transition-all border-r border-black last:border-r-0 break-word filter-item-wrapper text-left inline-flex',
                {
                    'hover:text-error hover: cursor-pointer':
                        isClearable !== false,
                },
                className
            )}
        >
            {children}
        </div>
    );
};
