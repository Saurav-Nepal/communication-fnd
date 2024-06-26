import { cn } from '@finnoto/design-system';

const EmployeeInfoCard = ({ email, name, identifier, className }: any) => {
    if (!name) return <></>;
    return (
        <div
            className={cn(
                'px-4 py-2 mt-2 text-xs rounded col-flex bg-base-100 ',
                className
            )}
        >
            <div className='text-xs font-medium text-base-primary'>{name}</div>
            <div className='items-center text-xs font-normal row-flex text-base-primary'>
                {email}
                {identifier ? ` - ${identifier}` : ''}
            </div>
        </div>
    );
};

export default EmployeeInfoCard;
