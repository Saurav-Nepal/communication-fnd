const recoLightTheme = require('./reco/light.theme');
const recoDarkTheme = require('./reco/dark.theme');
const arcLightTheme = require('./arc/light.theme');
const arcDarkTheme = require('./arc/dark.theme');
const paymentLightTheme = require('./payment/light.theme');
const paymentDarkTheme = require('./payment/dark.theme');
const expenseThemes = require('./expense/index');
const defaultTheme = require('./default.theme');
const defaultDarkTheme = require('./defaultDark.theme');

module.exports = {
    // Default Theme Outside the Portal
    'light-default': defaultTheme,
    'dark-default': defaultDarkTheme,

    //reco portal theme
    'light-reco': recoLightTheme,
    'dark-reco': recoDarkTheme,

    //ar collection portal theme
    'light-arc': arcLightTheme,
    'dark-arc': arcDarkTheme,

    //payment portal theme
    'light-payment': paymentLightTheme,
    'dark-payment': paymentDarkTheme,

    //expense themes
    ...expenseThemes,
};
