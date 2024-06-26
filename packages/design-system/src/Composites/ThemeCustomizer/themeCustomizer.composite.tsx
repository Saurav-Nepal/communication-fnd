'use client';
import { IsProduction, ObjectDto } from '@finnoto/core';
import { useCallback } from 'react';
import { useSetState, useUpdateEffect } from 'react-use';
import { Button, Icon } from '../../Components';
import { SlidingPane } from '../../Utils';
import { IsObjectHaveKeys } from '../../Utils/common.ui.utils';
import { ThemeCustomizerOptions } from './Components/themeCustomizerOption.component';
import { convertHSLObjectToString } from './themeCustomizer.types';

export const ThemeCustomizer = () => {
    const [theme, setTheme] = useSetState({});

    useUpdateEffect(() => {
        handleThemeChange(theme);
    }, [theme]);

    const handleThemeChange = (theme: ObjectDto) => {
        if (!IsObjectHaveKeys(theme)) return;

        Object.keys(theme).forEach((key) => {
            if (!theme[key]) {
                document.documentElement.style.removeProperty(key);
                return;
            }

            document.documentElement.style.setProperty(
                key,
                typeof theme[key] === 'object'
                    ? convertHSLObjectToString(theme[key])
                    : theme[key]
            );
        });
    };

    const openThemeCustomizer = useCallback(() => {
        SlidingPane.open({
            component: ThemeCustomizerOptions,
            overlay: false,
            props: {
                theme,
                setTheme,
            },
        });
    }, [setTheme, theme]);

    if (IsProduction()) return null;

    return (
        <div>
            <Button
                className='fixed z-50 bottom-24 right-4'
                appearance='accent'
                shape='circle'
                size='md'
                onClick={openThemeCustomizer}
            >
                <Icon
                    className='duration-700 animate-spin'
                    source={'settings'}
                />
            </Button>
        </div>
    );
};
