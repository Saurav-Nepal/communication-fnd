import { Icon } from '@finnoto/design-system';
import { VerifiedTickSvgIcon } from 'assets';

const DashboardStatsContainer = ({
    title,
    subTitle,
    children,
    isVerified = false,
}: {
    title: string;
    subTitle?: string;
    children?: any;
    isVerified?: boolean;
}) => {
    return (
        <div className='pb-3 overflow-hidden border rounded-lg border-base-300/50 bg-base-100 col-flex'>
            <div className='gap-1 p-3 col-flex'>
                <p className='text-sm font-medium text-base-primary'>{title}</p>
                <p className='flex items-center gap-2 text-sm text-base-secondary'>
                    {isVerified && (
                        <Icon source={VerifiedTickSvgIcon} isSvg size={18} />
                    )}{' '}
                    {/* {subTitle} */}
                </p>
            </div>
            {children}
        </div>
    );
};

export default DashboardStatsContainer;
