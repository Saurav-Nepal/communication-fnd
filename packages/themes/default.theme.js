const { commonLightThemeProperties } = require('./common.theme');

module.exports = {
    primary: '#0B0924' /* Primary color */,
    'primary-focus': '#0B0924' /* Primary color - focused */,

    secondary: '#4CC3C7' /* Secondary color */,
    'secondary-focus': '#4CC3C7' /* Secondary color - focused */,

    accent: '#4CC3C7' /* Accent color */,
    'accent-focus': '#3CB6BA' /* Accent color - focused */,

    neutral: '#0F445E' /* Neutral color */,
    'neutral-focus': '#0A3144' /* Neutral color - focused */,

    ...commonLightThemeProperties, // This is the common dark theme property
};
