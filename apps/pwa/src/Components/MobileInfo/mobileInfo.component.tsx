import { EmptyFunction } from '@finnoto/core';
import { cn } from '@finnoto/design-system';
import { ReactNode } from 'react';

export const MobileDetailInfo = ({
    name,
    value,
    right,
    onClick = EmptyFunction,
    isNotHide,
}: any) => {
    if (!isNotHide && !value) return <></>;
    return (
        <div
            className={cn('col-flex flex-1', {
                'text-right': right,
            })}
            onClick={onClick}
        >
            <div className='text-xs text-base-secondary'>{name}</div>
            <div className='text-sm'>{value}</div>
        </div>
    );
};
type dataType = {
    name: string;
    value: string | ReactNode | any;
    className?: string;
    onClick?: () => void;
};
export const MobileInfo = ({
    data = [],
    className,
}: {
    data?: dataType[];
    className?: string;
}) => {
    return (
        <div className={cn(' w-full p-4  grid grid-cols-2 gap-4', className)}>
            {data?.map((el, index) => (
                <MobileDetailInfo
                    key={el?.name}
                    {...el}
                    right={(index + 1) % 2 == 0}
                />
            ))}
        </div>
    );
};
export default MobileInfo;
