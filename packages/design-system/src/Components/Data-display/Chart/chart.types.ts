import { ApexOptions } from 'apexcharts';
import { ReactNode } from 'react';
import { Props as ApexChartProps } from 'react-apexcharts';

import { ObjectDto } from '@finnoto/core';

/**
 * Represents the type of a chart.
 */
export type ChartType = ApexChartProps['type'];

/**
 * Props for the Chart component.
 */
export interface ChartComponentProps {
    type: ChartType;
    datasets: ChartDataSet[] | number[];
    labels: string[] | string[][];
    options?: ChartOptions;
    height?: string | number;
    width?: string | number;
}

/**
 * Represents a dataset for a chart.
 */
export interface ChartDataSet {
    name?: string;
    color?: string;
    data:
        | (number | null)[]
        | [number, number | null][]
        | [number, (number | null)[]][]
        | number[][];
    type?: string;
}

/**
 * Represents the options for a chart.
 */
export interface ChartOptions {
    enableDataLabels?: boolean;
    colors?: string[];
    strokeWidth?: number;
    strokeDashArray?: number | number[];
    titleX?: string;
    titleY?: string;
    reversedY?: boolean;
    showXAxisLabel?: boolean;
    formatLabelX?: (value: number) => string;
    formatLabelY?: (value: number) => string;
    areaShowDataLabel?: boolean;
    maxYAxisValue?: number;
    customzoomInButton?: string;
    customzoomOutButton?: string;
    customResetButton?: string;
    fillGradient?: {
        shadeIntensity: number;
        inverseColors: boolean;
        opacityFrom: number;
        opacityTo: number;
    };
    customDownloadButton?: string;
    fillType?: 'gradient' | 'solid';
    toolbarOffsetX?: number;
    toolbarOffsetY?: number;
    onClickToChart?: (event?: any, chartContext?: any, config?: any) => void;
    stacked?: boolean;
    stackType?: 'normal' | '100%';

    // Legend Options
    showLegend?: boolean;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    ledgendFormater?: any;
    ledgendFontSize?: string[];
    ledgendOffSetX?: number;
    ledgendOffSetY?: number;
    fillOpacity?: number;

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
    gridPaddingBottom?: number;
    gridPaddingLeft?: number;
    gridPaddingRight?: number;
    gridPaddingTop?: number;
    gridPadding?: number;
    noPadding?: boolean;
    hideLabelLines?: boolean;
    hideAllLines?: boolean;

    // Pie / Donut Options
    pieStartAngle?: number;
    pieEndAngle?: number;

    // Bar Options
    barHorizontal?: boolean;
    barDistributedColors?: boolean;
    barColumnWidth?: string;
    barColumnHeight?: string;
    barBorderRadius?: number;
    barBorderRadiusApply?: 'around' | 'end';

    // Area Options
    areaFillTo?: 'origin' | 'end';

    //Radial Bar
    radialBarHollow?: {
        margin?: number;
        size?: string;
        background?: string;
    };

    radialBarTrack?: {
        startAngle?: number;
        endAngle?: number;
        background?: string;
        strokeWidth?: string; // '70%'
        margin?: number;
    };

    // Heatmap Options

    // Treemap Options
    treeMapDistributedColor?: boolean;

    //line options
    markersSize?: number;
    strokeCurve?: 'stepline' | 'straight' | 'smooth';
}
