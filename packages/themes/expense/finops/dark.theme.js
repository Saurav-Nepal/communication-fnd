const { commonDarkThemeProperties } = require('../../common.theme');

module.exports = {
    primary: '#c502ae' /* Primary color */,
    'primary-focus': '#c551b7' /* Primary color - focused */,

    secondary: '#6F3368' /* Secondary color */,
    'secondary-focus': '#894081' /* Secondary color - focused */,

    accent: '#4CC3C7' /* Accent color */,
    'accent-focus': '#3CB6BA' /* Accent color - focused */,

    neutral: '#353546' /* Neutral color */,
    'neutral-focus': '#44445A' /* Neutral color - focused */,

    ...commonDarkThemeProperties, // This is the common dark theme property
};
