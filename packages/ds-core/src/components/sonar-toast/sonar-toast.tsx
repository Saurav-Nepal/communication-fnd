import React, { useCallback, useMemo } from 'react';
import Color from 'color';
import { Toaster as Sonner } from 'sonner';

import { useSafeSlabTheme } from '../../core/slab-provider/slab-theme-provider/slab-theme.context';
import { SlabTheme } from '../../core/slab-provider/theme.types';

type ToasterProps = Omit<React.ComponentProps<typeof Sonner>, 'theme'>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme } = useSafeSlabTheme() || {};

    const getLightColor = useCallback(
        (color: keyof SlabTheme['color']) => {
            const applyColor = theme?.color?.[color] ?? '0 0% 100%';
            const colorObj = new Color(`hsl(${applyColor})`);

            return {
                bg: colorObj.lightness(90).hex(),
                border: colorObj.lightness(80).hex(),
                text: colorObj.hex(),
                default: colorObj.hex(),
            };
        },
        [theme]
    );

    const lightColorVariables = useMemo(() => {
        const colors: (keyof SlabTheme['color'])[] = [
            'info',
            'error',
            'success',
            'warning',
        ];

        return colors.reduce(
            (acc, color) => {
                const lightColor = getLightColor(color);

                return {
                    ...acc,
                    [`--${color}-bg`]: lightColor.bg,
                    [`--${color}-border`]: lightColor.border,
                    [`--${color}-text`]: lightColor.text,
                };
            },
            {
                '--normal-bg': getLightColor('card').default,
                '--normal-border': getLightColor('inputColor').default,
                '--normal-text': getLightColor('cardForeground').default,
            }
        ) as React.CSSProperties;
    }, [getLightColor]);

    return <Sonner style={lightColorVariables} {...props} />;
};

export { Toaster };
