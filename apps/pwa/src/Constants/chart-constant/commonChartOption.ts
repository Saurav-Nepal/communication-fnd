import {
    ChartOptions,
    formatAmountForMatrix,
    IsUndefined,
    MetrixItemType,
} from '@finnoto/core';

import employeeLightTheme from '../../../../../packages/themes/expense/employee/light.theme';
import finopsLightTheme from '../../../../../packages/themes/expense/finops/light.theme';
import vendorLightTheme from '../../../../../packages/themes/expense/vendor/light.theme';
import recoLightTheme from '../../../../../packages/themes/reco/light.theme';
import {
    customChartDownloadButton,
    customChartResetButton,
    customChartZoomInButton,
    customChartZoomOutButton,
} from './CustomChartComponent/customChart.component';

export const customChartOptions: ChartOptions = {
    customDownloadButton: customChartDownloadButton,
    customzoomInButton: customChartZoomInButton,
    customzoomOutButton: customChartZoomOutButton,
    customResetButton: customChartResetButton,
    toolbarOffsetY: -20,
    toolbarOffsetX: -10,
    barBorderRadius: 4,
};

/**
 *
 * @description This function will evaluate the active user (i.e Vendor || employee || finops  || reco) and returns the theme pallete.
 *
 * @returns current theme color
 */
export const colorAccordingToTheme = () => {
    const route = window.location.pathname;
    const name = route.split('/')[2];

    switch (name) {
        case 'v':
            return vendorLightTheme;
        case 'e':
            return employeeLightTheme;
        case 'f':
            return finopsLightTheme;
        default:
            return recoLightTheme;
    }
};

/**
 *
 * @param lables This takes an chart label
 * @param param1 This takes an values from custom tooltip
 *
 *
 * @description This function create an custom tooltip
 * @returns string
 */
export const customChartTooltip = (
    labels: any,
    { dataPointIndex, seriesIndex, series },
    type?: 'pie' | 'bar',
    count?: number,
    matrixType: MetrixItemType = 'currency',
    amount?: number
) => {
    const indexValue = (() => {
        if (IsUndefined(type)) return seriesIndex;
        return type === 'pie' ? seriesIndex : dataPointIndex;
    })();

    const seriesValues = (() => {
        if (type === 'pie' || IsUndefined(type)) return series;
        return series[0];
    })();

    const formateCurrencyValue = formatAmountForMatrix(
        amount || seriesValues[indexValue],
        matrixType
    );

    return `<div class="p-2 rounded shadow col-flex"><span class="text-base font-medium text-base-primary">${formateCurrencyValue}</span><span class="text-xs text-base-tertiary">${
        labels[indexValue] || 'Bank Transfer'
    } <span class="text-xs text-base-tertiary">${
        count ? `(${count})` : ''
    }</span></span></div>`;
};
