import { createTheme } from '../packages/ds-core';

const apTheme = createTheme({
    color: {
        primary: '250 92% 70%',
    },
});
const apDarkTheme = createTheme({
    color: {},
});

export { apDarkTheme };
export default { finops: apTheme };
