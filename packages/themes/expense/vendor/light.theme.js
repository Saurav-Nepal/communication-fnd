const { commonLightThemeProperties } = require('../../common.theme');

module.exports = {
    primary: '#276F8E' /* Primary color */,
    'primary-focus': '#2588B3' /* Primary color - focused */,

    secondary: '#276F8E' /* Secondary color */,
    'secondary-focus': '#2588B3' /* Secondary color - focused */,

    accent: '#4CC3C7' /* Accent color */,
    'accent-focus': '#3CB6BA' /* Accent color - focused */,

    neutral: '#3D4451' /* Neutral color */,
    'neutral-focus': '#303640' /* Neutral color - focused */,

    ...commonLightThemeProperties, // This is the common dark theme property
};
