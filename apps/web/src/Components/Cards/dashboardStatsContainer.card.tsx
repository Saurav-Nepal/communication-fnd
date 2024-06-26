import { Icon, Tooltip } from '@finnoto/design-system';
import { CalendarSvgIcon, TimeSvgIcon, VerifiedTickSvgIcon } from 'assets';

const DashboardStatsContainer = ({
    title,
    subTitle,
    children,
    isConnectToDate = false,
}: {
    title: string;
    subTitle?: string;
    children?: any;
    isConnectToDate?: boolean;
}) => {
    return (
        <div className='overflow-hidden border rounded bg-base-100 col-flex'>
            <div className='flex justify-between p-4'>
                <p className='text-base font-medium text-base-primary'>
                    {title}
                </p>

                {isConnectToDate && (
                    <Tooltip
                        asChild={false}
                        className='w-[250px]'
                        message='This data is shown as per date selected in top'
                    >
                        <div className='w-10 h-10'>
                            <Icon
                                source={CalendarSvgIcon}
                                className={'text-primary'}
                                size={20}
                                isSvg
                            />
                        </div>
                    </Tooltip>
                )}
            </div>
            {children}
        </div>
    );
};

export default DashboardStatsContainer;
