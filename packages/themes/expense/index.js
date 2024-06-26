const employeeLightTheme = require('./employee/light.theme');
const employeeDarkTheme = require('./employee/dark.theme');
const vendorLightTheme = require('./vendor/light.theme');
const vendorDarkTheme = require('./vendor/dark.theme');
const finopsLightTheme = require('./finops/light.theme');
const finopsDarkTheme = require('./finops/dark.theme');

module.exports = {
    //Employee portal theme
    'light-employee': employeeLightTheme,
    'dark-employee': employeeDarkTheme,

    //Vendor portal theme
    'light-vendor': vendorLightTheme,
    'dark-vendor': vendorDarkTheme,

    //Finnops portal theme
    'light-finops': finopsLightTheme,
    'dark-finops': finopsDarkTheme,
};
