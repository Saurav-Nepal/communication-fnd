const { commonLightThemeProperties } = require('../../common.theme');

module.exports = {
    primary: '#c7964c' /* Primary color */,
    'primary-focus': '#DCA44F' /* Primary color - focused */,

    secondary: '#c7964c' /* Secondary color */,
    'secondary-focus': '#DCA44F' /* Secondary color - focused */,

    accent: '#4CC3C7' /* Accent color */,
    'accent-focus': '#3CB6BA' /* Accent color - focused */,

    ...commonLightThemeProperties, // This is the common dark theme property
    neutral: '#2E2E33' /* Neutral color */,
    'neutral-focus': '#42424C' /* Neutral color - focused */,
};
