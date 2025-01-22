import { ReactNode } from 'react';

import { ObjectDto } from './common.types';

export type ChartType =
    | 'line'
    | 'area'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar';

export interface ChartComponentProps {
    type: ChartType;
    datasets: ChartDataSet[] | number[];
    labels: string[] | string[][];
    options?: ChartOptions;
    height?: string | number;
    width?: string | number;
}

export interface ChartDataSet {
    name?: string;
    color?: string;
    data:
        | (number | null)[]
        | [number, number | null][]
        | [number, (number | null)[]][]
        | number[][];
}

/**
 * @param showTooltip testing
 */
export interface ChartOptions {
    enableDataLabels?: boolean;
    colors?: string[];
    strokeWidth?: number;

    titleX?: string;
    titleY?: string;
    reversedY?: boolean;

    formatLabelX?: (value: number) => string;
    formatLabelY?: (value: number) => string;

    stacked?: boolean;
    stackType?: 'normal' | '100%';

    // Legend Options
    showLegend?: boolean;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';

    // Tooltip Options
    showTooltip?: boolean;
    tooltipFollowCursor?: boolean;
    tooltipIntersect?: boolean;
    tooltipShared?: boolean;
    tooltipTitleShow?: boolean;
    tooltipValueFormatter?: (
        value: number,
        data: ObjectDto
    ) => string | ReactNode;
    tooltipCustom?: (data: {
        series: ChartDataSet;
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
    }) => ReactNode;

    // Grid Options
    showGrid?: boolean;
    gridBorderColor?: string;
    gridStrokeDashLength?: number;
    gridPosition?: 'back' | 'front';
    showGridLinesXAxis?: boolean;
    showGridLinesYAxis?: boolean;

    // Bar Options
    barHorizontal?: boolean;
    barDistributedColors?: boolean;
    barColumnWidth?: string;
    barColumnHeight?: string;
    barBorderRadius?: number;
    barBorderRadiusApply?: 'around' | 'end';
    // Pie Options

    // Area Options
    areaFillTo?: 'origin' | 'end';

    // Heatmap Options
    // Treemap Options
}

export interface DetailChartLabelItem {
    name: string;
    date?: Date | null;
    amount?: number;
    visible?: boolean;
}
