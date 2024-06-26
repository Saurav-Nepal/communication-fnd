import { useMemo } from 'react';
import { CircularProgress } from './circular.progress';
import { RangeCircularProgressProps } from './circular.progress.types';

export const RangeCircularProgress = ({
    percentage,
    ranges,
    ...rest
}: RangeCircularProgressProps) => {
    const pathColor = useMemo(() => {
        const range = ranges.find((range) => {
            return percentage >= range.min && percentage <= range.max;
        });
        return range?.color;
    }, [percentage, ranges]);
    return <CircularProgress {...{ percentage, pathColor, ...rest }} />;
};

export const SimilarityScore = ({
    ranges = [
        {
            min: 0,
            max: 69,
            color: 'text-error',
        },
        {
            min: 70,
            max: 89,
            color: 'text-warning',
        },
        {
            min: 90,
            max: 100,
            color: 'text-success',
        },
    ],
    percentage = 0,
    ...rest
}: RangeCircularProgressProps) => {
    //minimum 10 percentage should be show
    const percentageValue = useMemo(() => {
        const data = Number(percentage.toFixed());

        return data < 1 ? 0 : data;
    }, [percentage]);

    return (
        <RangeCircularProgress
            ranges={ranges}
            percentage={percentageValue}
            {...rest}
        />
    );
};
