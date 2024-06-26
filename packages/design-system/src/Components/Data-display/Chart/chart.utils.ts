import { ApexOptions } from 'apexcharts';

import { ObjectDto, RemoveEmptyObjectKeys } from '@finnoto/core';

import { IsUndefined } from '../../../Utils/common.ui.utils';
import { ChartDataSet, ChartOptions, ChartType } from './chart.types';

/**
 * Transforms the datasets for ApexCharts.
 * @param datasets The datasets to transform.
 * @returns The transformed datasets.
 */
export const TransformApexChartData = (datasets: ChartDataSet[]) => {
    return datasets;
};

/**
 * Transforms the options for ApexCharts.
 * @param type The type of the chart.
 * @param labels The chart labels.
 * @param options The chart options.
 * @param isDarkMode Indicates if dark mode is enabled.
 * @returns The transformed chart options.
 */
export const TransformApexChartOptions = (
    type: ChartType,
    labels: string[] | string[][],
    options: ChartOptions = {},
    isDarkMode?: boolean
) => {
    const newOptions: ApexOptions = {
        dataLabels: {
            enabled: options.enableDataLabels || false, // Default Disabled
        },
        colors: options.colors,
        stroke: {
            width: !IsUndefined(options.strokeWidth)
                ? options.strokeWidth
                : undefined,
            // color: '#ffffff',
            curve: options.strokeCurve || 'smooth',
            dashArray: !IsUndefined(options.strokeDashArray)
                ? options.strokeDashArray
                : undefined,
        },
        markers: {
            size: options.markersSize ?? 5,
        },
        chart: RemoveEmptyObjectKeys({
            events: {
                dataPointSelection: options.onClickToChart,
            },
            stacked: options.stacked,
            stackType: options.stackType,
            foreColor: isDarkMode ? '#ccc' : '#A8B2C1',
            fontFamily: 'Rubik, sans-serif',
            toolbar: {
                offsetX: options.toolbarOffsetX,
                offsetY: options.toolbarOffsetY,
                tools: {
                    download: options.customDownloadButton || undefined,
                    zoomin: options.customzoomInButton || undefined,
                    zoomout: options.customzoomOutButton || undefined,
                    reset: options.customResetButton || undefined,
                    pan: false,
                    zoom: false,
                },
            },
            sparkline: {
                enabled: options?.noPadding || false,
            },
        }),

        legend: RemoveEmptyObjectKeys({
            show: options.showLegend,
            position: options.legendPosition,
            formatter: options?.ledgendFormater || undefined,
            fontSize: options?.ledgendFontSize || undefined,
            offsetX: options?.ledgendOffSetX || undefined,
            offsetY: options?.ledgendOffSetY || undefined,
        }),

        tooltip: RemoveEmptyObjectKeys({
            enabled: options.showTooltip !== false, // Default Enabled
            followCursor: options.tooltipFollowCursor !== false, // Default Follow
            shared: options.tooltipShared,
            custom: options.tooltipCustom,
            theme: isDarkMode ? 'dark' : 'light',
            x: {
                show: options.tooltipTitleShow !== false, // Default Enabled
            },
            y: {
                formatter: options.tooltipValueFormatter,
            },
        }),

        xaxis: RemoveEmptyObjectKeys({
            title: { text: options.titleX },
            categories: labels,
            labels: {
                formatter: options.formatLabelX,
                show: options?.showXAxisLabel,
            },
            max: options.maxYAxisValue,
        }),

        yaxis: RemoveEmptyObjectKeys({
            title: { text: options.titleY },
            reversed: options.reversedY,
            labels: {
                formatter: options.formatLabelY,
            },
        }),

        grid: {
            show: options.showGrid !== false, // Default Enabled
            borderColor: isDarkMode
                ? '#535A6C'
                : options.gridBorderColor || '#e0e0e0',
            strokeDashArray: options.gridStrokeDashLength || 0,
            position: options.gridPosition || 'back',
            xaxis: {
                lines: {
                    show: options.showGridLinesXAxis || false, // Default Enabled
                },
            },
            yaxis: {
                lines: {
                    show: options.showGridLinesYAxis !== false, // Default Enabled
                },
            },
            padding: {
                bottom: options?.gridPaddingBottom || undefined,
                left: options?.gridPaddingLeft || undefined,
                right: options?.gridPaddingRight || undefined,
                top: options?.gridPaddingTop || undefined,
            },
        },
        fill: {
            type: options.fillType,
            gradient: options.fillGradient,
            opacity: options.fillOpacity,
        },
    };

    if (['bar'].includes(type)) {
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                bar: {
                    horizontal: options.barHorizontal || false,
                    columnWidth: options.barColumnWidth || '13px',
                    borderRadius: 0,
                    distributed: options.barDistributedColors || false,
                    barHeight: options.barColumnHeight,
                    borderRadiusApplication:
                        options.barBorderRadiusApply || 'around',
                },
            }),
        };
        newOptions.stroke.width = options.strokeWidth === 0 ? 0 : 3;
    }

    if (['pie', 'donut'].includes(type)) {
        newOptions.labels = labels as string[];
        newOptions.dataLabels.enabled = options.enableDataLabels !== false;
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                pie: {
                    startAngle: options.pieStartAngle || 0,
                    endAngle: options.pieEndAngle || 360,
                },
            }),
        };
    }

    if (['area'].includes(type)) {
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                area: {
                    fillTo: options.areaFillTo,
                    dataLabels: {
                        show: options?.areaShowDataLabel || false,
                    },
                },
            }),
        };
    }
    if (['radialBar'].includes(type)) {
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                radialBar: {
                    startAngle: 0,
                    endAngle: 270,
                    hollow: options?.radialBarHollow,
                    track: {
                        startAngle: 0,
                        endAngle: 360,
                        ...options?.radialBarTrack,
                    },
                },
            }),
        };
    }
    if (['polarArea'].includes(type)) {
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                polarArea: {
                    rings: {
                        strokeWidth: 0,
                    },
                    spokes: {
                        strokeWidth: 0,
                    },
                },
            }),
        };
    }
    if (['treemap'].includes(type)) {
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                treemap: {
                    distributed: options.treeMapDistributedColor,
                },
            }),
        };
    }

    return RemoveEmptyObjectKeys(newOptions);
};
