const { commonLightThemeProperties } = require('../common.theme');

module.exports = {
    primary: '#303030' /* Primary color */,
    'primary-focus': '#1a1a1a' /* Primary color - focused */,

    secondary: '#213f99' /* Secondary color */,
    'secondary-focus': '#253e8c' /* Secondary color - focused */,

    accent: '#4CC3C7' /* Accent color */,
    'accent-focus': '#3CB6BA' /* Accent color - focused */,

    neutral: '#1A1A1A' /* Neutral color */,
    'neutral-focus': '#44445A' /* Neutral color - focused */,

    ...commonLightThemeProperties, // This is the common light theme property
};
