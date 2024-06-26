import { renderToString } from 'react-dom/server';
import employeeDarkTheme from 'themes/expense/employee/dark.theme';
import employeeLightTheme from 'themes/expense/employee/light.theme';
import finopsDarkTheme from 'themes/expense/finops/dark.theme';
import finopsLightTheme from 'themes/expense/finops/light.theme';
import vendorDarkTheme from 'themes/expense/vendor/dark.theme';
import vendorLightTheme from 'themes/expense/vendor/light.theme';
import recoDarkTheme from 'themes/reco/dark.theme';
import recoLightTheme from 'themes/reco/light.theme';

import {
    Capitalize,
    ChartOptions,
    formatAmountForMatrix,
    IsUndefined,
    MetrixItemType,
    useTheme,
} from '@finnoto/core';
import { FormatCurrencyStyled } from '@finnoto/design-system';

import { DashboardChartLabelItem } from '@Components/Dashboard/dashboard.chart.labels';

import {
    customChartDownloadButton,
    customChartResetButton,
    customChartZoomInButton,
    customChartZoomOutButton,
} from './CustomChartComponent/customChart.component';
import CustomChartTooltip from './CustomChartComponent/customChartTooltip.component';

export const customChartOptions: ChartOptions = {
    customDownloadButton: customChartDownloadButton,
    customzoomInButton: customChartZoomInButton,
    customzoomOutButton: customChartZoomOutButton,
    customResetButton: customChartResetButton,
    toolbarOffsetY: -20,
    toolbarOffsetX: -10,
    barBorderRadius: 4,
};

const CHART_THEME_COLORS = {
    light: {
        v: vendorLightTheme,
        e: employeeLightTheme,
        f: finopsLightTheme,
        reco: recoLightTheme,
    },
    dark: {
        v: vendorDarkTheme,
        e: employeeDarkTheme,
        f: finopsDarkTheme,
        reco: recoDarkTheme,
    },
};

/**
 *
 * @description This function will evaluate the active user (i.e Vendor || employee || finops  || reco) and returns the theme pallete.
 *
 * @returns current theme color
 */
export const ColorAccordingToTheme = () => {
    const { isDarkMode } = useTheme();

    const route = window.location.pathname;
    const name = route.split('/')[2];
    const themeKey = isDarkMode ? 'dark' : 'light';

    switch (name) {
        case 'v':
            return CHART_THEME_COLORS[themeKey].v;
        case 'e':
            return CHART_THEME_COLORS[themeKey].e;
        case 'f':
            return CHART_THEME_COLORS[themeKey].f;
        default:
            return CHART_THEME_COLORS[themeKey].reco;
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
    { dataPointIndex, seriesIndex, series, w }: any,
    type?: 'pie' | 'bar',
    count?: number | string,
    matrixType: MetrixItemType = 'currency',
    amount?: number,
    customLabelIndex?: number,
    customLabel?: string,
    headingRight?: React.ReactNode
) => {
    const indexValue = (() => {
        if (IsUndefined(type)) return seriesIndex;
        if (!IsUndefined(customLabelIndex)) return customLabelIndex;
        return type === 'pie' ? seriesIndex : dataPointIndex;
    })();

    const seriesValues = (() => {
        if (type === 'pie' || IsUndefined(type)) return series;
        return series[0];
    })();

    const formateCurrencyValue = formatAmountForMatrix(
        amount ?? seriesValues[indexValue],
        matrixType
    );
    const capitalizeCustomLabel = Capitalize(customLabel);

    return renderToString(
        <CustomChartTooltip
            amount={formateCurrencyValue}
            title={capitalizeCustomLabel || labels[indexValue]}
            count={count}
            color={w?.config?.colors?.[indexValue] || ''}
            headingRight={headingRight}
        />
    );
};

/**
 *
 * @description - Returns colors for chart
 * @returns - Array of colors
 */

export const chartColors = [
    '#708090',
    '#E9967A',
    '#F5CDA7',
    '#C9DBBA',
    '#E5C1BD',
    '#D2D0BA',
    '#D7D9CE',
    '#7CA5B8',
    '#AF9BB6',
    '#BCAF9C',
    '#A8B2C1',
    '#F0F8FF',
    '#FAEBD7',
    '#FFE4C4',
    '#B0E0E6',
];

export const arcChartColors = {
    warning: '#FFB400',
    success: '#2acc97',
    info: '#4C5EFF',
    error: '#FF4C51',
    lightInfo: '#4CD4FF',
    darkInfo: '#4C69FF',
};

export const arcChartBgColors = {
    warning: 'bg-[#FFB400]',
    success: 'bg-[#2acc97]',
    info: 'bg-[#4C5EFF]',
    error: 'bg-[#FF4C51]',
};

export const arcChartColorList = [
    '#072448',
    '#54D2D2',
    '#FFCB00',
    ...Object.values(arcChartColors),
];

export const arcChartBgColorList = [
    'bg-[#072448]',
    'bg-[#54D2D2]',
    'bg-[#FFCB00]',
    'bg-[#FFB400]',
    'bg-[#56CA00]',
    'bg-[#4C5EFF]',
    'bg-[#FF4C51]',
];

export const chartBackgroundColor = [
    'bg-[#708090]',
    'bg-[#E9967A]',
    'bg-[#F5CDA7]',
    'bg-[#C9DBBA]',
    'bg-[#E5C1BD]',
    'bg-[#D2D0BA]',
    'bg-[#D7D9CE]',
    'bg-[#7CA5B8]',
    'bg-[#AF9BB6]',
    'bg-[#BCAF9C]',
    'bg-[#A8B2C1]',
    'bg-[#F0F8FF]',
    'bg-[#FAEBD7]',
    'bg-[#FFE4C4]',
    'bg-[#B0E0E6]',
];

export const INVOICE_STATUS_COLORS = {
    Open: '#C0C0C0',
    Overdue: '#ffadaf',
    'Partially Paid': '#348CB9',
    Disputed: '#B3851A',
    'Fully Paid': arcChartColors.success,
    'Bad Debt': '#E51C00',
};
