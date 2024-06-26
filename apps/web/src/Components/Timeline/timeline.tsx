import { format } from 'date-fns';

import { EmptyFunction } from '@finnoto/core';
import {
    Avatar,
    cn,
    VerticalTimeline,
    VTimelineItem,
} from '@finnoto/design-system';

import DashboardChartWrapper from '@Components/Dashboard/dashboard.chart.wrapper';

const TimeLine = ({
    data,
    title,
    tooltipDescription,
}: {
    data: any[];
    title: string;
    tooltipDescription: string;
}) => {
    return (
        <DashboardChartWrapper
            title={title}
            titleTooltipDescription={tooltipDescription}
            slug=''
            refetchFn={EmptyFunction}
        >
            <VerticalTimeline className='flex-1 overflow-y-auto col-flex scrollbar-none'>
                {data.map((step, index) => (
                    <VTimelineItem
                        key={index}
                        contentClassName={cn(
                            'w-auto pb-8 group-last-of-type:pb-0'
                        )}
                        title={
                            <div className='flex'>
                                <Avatar
                                    icon={step.icon}
                                    color={step.appearance}
                                    size='28'
                                    iconSize={20}
                                />
                            </div>
                        }
                        align='start'
                        titleLeftComponent={
                            <p className='mr-10 text-polaris-text-secondary w-[45px]'>
                                {format(new Date(step.date), 'd MMM')}
                            </p>
                        }
                    >
                        <div className='gap-1 col-flex'>
                            <div className='font-medium text-polaris-text'>
                                {step.title}
                            </div>
                            <p>{step.content}</p>
                        </div>
                    </VTimelineItem>
                ))}
            </VerticalTimeline>
        </DashboardChartWrapper>
    );
};

export default TimeLine;
