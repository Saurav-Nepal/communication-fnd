/**
 * @description This are the properties that fits same in both light mode and dark mode.
 */
const commonThemeProperties = {
    'primary-content':
        '#ffffff' /* Foreground content color to use on primary color */,
    'secondary-content':
        '#ffffff' /* Foreground content color to use on secondary color */,
    'accent-content':
        '#ffffff' /* Foreground content color to use on accent color */,
    '--rounded-btn': '.25rem',
};

/**
 * @description This are the common theme that are used in all the 3 portals.
 */
export const commonLightThemeProperties = {
    ...commonThemeProperties,
    'neutral-content':
        '#ffffff' /* Foreground content color to use on neutral color */,
    'base-100': '#ffffff' /* Base color of page, used for blank backgrounds */,
    'base-200': '#F6F6F6' /* Base color, a little darker */,
    'base-300': '#DCDCDC' /* Base color, even more darker */,
    'base-content':
        '#1F2937' /* Foreground content color to use on base color */,

    info: '#1B76FF' /* Info */,
    'info-content': '#FFFFFF' /* Info content */,
    success: '#006443' /* Success */,
    'success-content': '#FFFFFF' /* Success content */,
    warning: '#FBBD23' /* Warning */,
    'warning-content': '#FFFFFF' /* Warning content */,
    error: '#a82c13' /* Error */,
    'error-content': '#FFFFFF' /* Error content */,
    '--text-base-primary': '16 24 40',
    '--text-base-secondary': '121 133 151',
    '--text-base-tertiary': '168 178 193',
    '--border-light-primary': '#DCDCDC',
    '--base-200-light': '241 241 241',
    'base-badge': '#A8B2C1',
};
/**
 * @description This are the common Dark theme that are used in all the 3 portals.
 */
export const commonDarkThemeProperties = {
    ...commonThemeProperties,
    'neutral-content':
        '#A6ADBA' /* Foreground content color to use on neutral color */,
    'base-100': '#2A303C' /* Base color of page, used for blank backgrounds */,
    'base-200': '#242933' /* Base color, a little darker */,
    'base-300': '#1F242D' /* Base color, even more darker */,
    'base-content':
        '#FFFFFF' /* Foreground content color to use on base color */,

    info: '#3ABFF8' /* Info */,
    'info-content': '#002B3D' /* Info content */,
    success: '#00b478' /* Success */,
    'success-content': '#FFFFFF' /* Success content */,
    warning: '#FBBD23' /* Warning */,
    'warning-content': '#382800' /* Warning content */,
    error: '#de4020' /* Error */,
    'error-content': '#FFFFFF' /* Error content */,
    '--text-base-primary': '255 255 255',
    '--text-base-secondary': '220 220 220',
    '--text-base-tertiary': '195 195 195',

    '--border-dark-primary': 'rgba(255, 255, 255, 0.1)',
    '--border-dark-hover': 'rgba(255, 255, 255, 0.55)',
};
