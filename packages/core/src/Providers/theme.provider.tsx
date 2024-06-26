'use client';

import React, { createContext, useMemo, useState } from 'react';
import { useLocation } from 'react-use';

import { VENDOR_REGISTER_ROUTE } from '../Constants';
import { useCustomEffect } from '../Hooks/useCustomEffect.hook';
import { useUserHook } from '../Hooks/user.hook';
import { ExpenseRouteUtils } from '../Utils/expenseRoute.utils';
import { GetItem, SetItem } from '../Utils/localStorage.utils';

const THEME_MODE_STORE_KEY = 'mode'; // Localstorage key to store theme mode value.

export interface ThemeContextProps {
    mode: ModeOptions;
    isDarkMode: boolean;
    setMode: (mode: ModeOptions) => void;
}

export type ModeOptions = 'sync' | 'light' | 'dark';

/**
 * Theme Context.
 */
export const ThemeContext = createContext<ThemeContextProps>({
    mode: 'light',
    isDarkMode: false,
    setMode: () => {},
});

/**
 * Theme Context Provider.
 *
 * @param mode string
 * @param children ReactNode
 * @returns ReactNode
 */
export const ThemeContextProvider = ({
    mode: propMode = 'light',
    children,
}: {
    mode?: ModeOptions;
    children: React.ReactNode;
}) => {
    const { pathname } = useLocation();

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [mode, setMode] = useState<ModeOptions>(
        GetItem(THEME_MODE_STORE_KEY, true) || propMode
    );
    const { user } = useUserHook();

    const isInside = pathname?.startsWith('/e') || pathname?.startsWith('/r');
    const isLoggedin = user?.loginCheckDone && user?.id && isInside;

    useCustomEffect(() => {
        handleTheme();

        if (mode === 'sync') {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', handleTheme);
        }
        return () => {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', handleTheme);
        };
    }, [mode, pathname, isLoggedin]);

    const getModeSuffix = () => {
        if (!ExpenseRouteUtils.CheckExpenseRoute(pathname)) {
            if (ExpenseRouteUtils.CheckARCRoute(pathname)) {
                return 'arc';
            }
            if (ExpenseRouteUtils.CheckPaymentRoute(pathname)) {
                return 'payment';
            }
            if (pathname?.includes(VENDOR_REGISTER_ROUTE) || !isLoggedin) {
                return 'default';
            }
            return 'reco';
        }
        return ExpenseRouteUtils.GetPortalType(pathname);
    };

    const handleTheme = () => {
        const html = document.getElementsByTagName('html')[0];

        if (mode !== 'sync') {
            html.classList.remove('light', 'dark');
            html.classList.add(mode);
            html.setAttribute('data-theme', `${mode}-${getModeSuffix()}`);
            setIsDarkMode(mode === 'dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.setAttribute('class', 'dark');
                html.classList.remove('light', 'dark');
                html.classList.add('dark');
                html.setAttribute('data-theme', `dark-${getModeSuffix()}`);
                setIsDarkMode(true);
            } else {
                html.classList.remove('light', 'dark');
                html.classList.add('light');
                html.setAttribute('data-theme', `light-${getModeSuffix()}`);
                setIsDarkMode(false);
            }
        }
    };

    const handleModeChange = (mode: ModeOptions) => {
        SetItem(THEME_MODE_STORE_KEY, mode, { isNonVolatile: true });
        setMode(mode);
    };

    const value = useMemo(
        () => ({
            mode,
            isDarkMode,
            setMode: handleModeChange,
        }),
        [mode, isDarkMode]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
