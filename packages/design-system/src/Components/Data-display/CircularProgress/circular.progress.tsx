import { cn } from '../../../Utils/common.ui.utils';
import { CircularProgressBarProps } from './circular.progress.types';

export const CircularProgress = ({
    percentage,
    svgClassName,
    percentageClassName,
    pathColor,
    radius = 30,
}: CircularProgressBarProps) => {
    const circumference = radius * 2 * Math.PI;

    return (
        <div className='relative flex items-center justify-center overflow-hidden rounded-full '>
            <svg className={cn('w-20 h-20', svgClassName)}>
                <circle
                    className='text-gray-300'
                    strokeWidth={5}
                    stroke='currentColor'
                    fill='transparent'
                    r={String(radius)}
                    cx='40'
                    cy='40'
                />
                <circle
                    className={cn('text-info', pathColor)}
                    strokeWidth={5}
                    strokeDashoffset={
                        circumference - (percentage / 100) * circumference
                    }
                    strokeDasharray={circumference}
                    strokeLinecap='round'
                    stroke='currentColor'
                    fill='transparent'
                    r={String(radius)}
                    cx='40'
                    cy='40'
                />
            </svg>
            <div
                className={cn(
                    'absolute flex flex-col  text-base-primary',
                    percentageClassName
                )}
            >
                <span>{percentage}%</span>
            </div>
        </div>
    );
};
