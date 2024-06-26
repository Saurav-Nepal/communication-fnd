import { cn } from '@finnoto/design-system';

import { EmployeeIconImage } from '@Components/BusinessImage/businessImage.component';

const EmployeeInfoCard = ({
    email,
    name,
    identifier,
    className,
    isIconShow,
}: any) => {
    if (!name) return <></>;
    return (
        <div
            className={cn(
                'items-center w-full gap-2 px-4 py-2 mt-2 border rounded row-flex bg-base-100 border-base-300',
                className
            )}
        >
            {isIconShow && <EmployeeIconImage />}
            <div className='w-full text-xs'>
                <div className='w-full text-xs font-medium text-base-primary'>
                    {name}
                </div>
                <div className='items-center text-xs font-normal row-flex text-base-primary'>
                    {email}
                    {identifier ? ` - ${identifier}` : ''}
                </div>
            </div>
        </div>
    );
};

export default EmployeeInfoCard;
