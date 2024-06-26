const { commonDarkThemeProperties } = require('../common.theme');

module.exports = {
    primary: '#213f99' /* Primary color */,
    'primary-focus': '#253e8c' /* Primary color - focused */,

    secondary: '#213f99' /* Secondary color */,
    'secondary-focus': '#253e8c' /* Secondary color - focused */,

    accent: '#4CC3C7' /* Accent color */,
    'accent-focus': '#3CB6BA' /* Accent color - focused */,

    neutral: '#181F37' /* Neutral color */,
    'neutral-focus': '#14182D' /* Neutral color - focused */,

    ...commonDarkThemeProperties, // This is the common dark theme property
};
