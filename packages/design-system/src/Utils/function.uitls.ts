import { Authentication, LOGIN_ROUTE, Navigation } from '@finnoto/core';

export const logout = async () => {
    await Authentication.logout();
    Navigation.navigate({ url: LOGIN_ROUTE });
};
