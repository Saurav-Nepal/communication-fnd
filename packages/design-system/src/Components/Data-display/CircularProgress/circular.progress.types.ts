export interface CircularProgressBarProps {
    percentage: number;
    svgClassName?: string;
    percentageClassName?: string;
    pathColor?: string;
    radius?: number;
}

type rangeType = {
    min: number;
    max: number;
    color?: string;
};
export interface RangeCircularProgressProps extends CircularProgressBarProps {
    ranges?: rangeType[];
}
