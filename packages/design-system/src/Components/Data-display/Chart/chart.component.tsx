import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { useTheme } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { ChartComponentProps } from './chart.types';
import {
    TransformApexChartData,
    TransformApexChartOptions,
} from './chart.utils';

// Dynamically import the ChartComponent from 'react-apexcharts'
const ChartComponent = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

/**
 * The Chart component renders a chart using the 'react-apexcharts' library.
 * It allows you to display various types of charts with customizable options.
 *
 * @author Saurav Neppal
 *
 */
export const Chart = ({
    type,
    datasets,
    labels,
    options,
    height,
    width,
}: ChartComponentProps) => {
    // Retrieve the current theme from the useTheme hook
    const { isDarkMode } = useTheme();

    // Transform the chart data using the TransformApexChartData utility function
    const series = useMemo(
        () => TransformApexChartData(datasets as any),
        [datasets]
    );

    // Transform the chart options using the TransformApexChartOptions utility function
    const chartOptions = useMemo(
        () => TransformApexChartOptions(type, labels, options, isDarkMode),
        [type, labels, options, isDarkMode]
    );

    return (
        // Render the ChartComponent with the specified props
        <ChartComponent
            type={type}
            series={series}
            options={chartOptions}
            height={height}
            width={width}
            className={cn({
                'chart-hide-grid': options.hideLabelLines,
                'chart-hide-all-lines': options.hideAllLines,
            })}
        />
    );
};
