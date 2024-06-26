import { ObjectDto } from '../../../backend/Dtos';
import { ChartDataSet, ChartType, ChartOptions } from '../../../Types';
import { IsUndefined, RemoveEmptyObjectKeys } from '../../common.utils';

export const TransformApexChartData = (datasets: ChartDataSet[]) => {
    return datasets;
};

export const TransformApexChartOptions = (
    type: ChartType,
    labels: string[] | string[][],
    options: ChartOptions = {},
    isDarkMode?: boolean
) => {
    const newOptions: ObjectDto = {
        dataLabels: {
            enabled: options.enableDataLabels || false, // Default Disabled
        },
        colors: options.colors,
        stroke: {
            width: !IsUndefined(options.strokeWidth)
                ? options.strokeWidth
                : undefined,
        },
        chart: RemoveEmptyObjectKeys({
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
        }),

        legend: RemoveEmptyObjectKeys({
            show: options.showLegend,
            position: options.legendPosition,
            formatter: options?.ledgendFormater || undefined,
            fontSize: options?.ledgendFontSize || undefined,
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
            },
        },
        fill: {
            type: options.fillType,
            gradient: options.fillGradient,
        },
    };

    if (['bar'].includes(type)) {
        newOptions.plotOptions = {
            ...newOptions.plotOptions,
            ...RemoveEmptyObjectKeys({
                bar: {
                    horizontal: options.barHorizontal || false,
                    columnWidth: options.barColumnWidth,
                    borderRadius: options.barBorderRadius,
                    distributed: options.barDistributedColors || false,
                    barHeight: options.barColumnHeight,
                    borderRadiusApplication:
                        options.barBorderRadiusApply || 'around',
                },
            }),
        };
    }

    if (['pie', 'donut'].includes(type)) {
        newOptions.labels = labels;
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

    return RemoveEmptyObjectKeys(newOptions);
};
