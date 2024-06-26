import { useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { ModalBody, ModalContainer, Typography } from '../../../Components';
import { SelectBox } from '../../../Components/Inputs/SelectBox/selectBox.component';
import { TransformArrayToLabelValue } from '../../../Utils/common.ui.utils';
import {
    convertHSLObjectToString,
    getFonts,
    getHSLColor,
    themeColorList,
} from '../themeCustomizer.types';
import { ColorPicker } from './colorPicker.component';

export const ThemeCustomizerOptions = ({ theme, setTheme }: any) => {
    const [fonts, setFonts] = useState([]);

    const themeColors = useMemo(() => {
        const styles = getComputedStyle(document.documentElement);

        const themes = {};
        themeColorList.forEach((item) => {
            themes[item.key] =
                convertHSLObjectToString(theme[`--${item.key}`]) ||
                styles.getPropertyValue(`--${item.key}`);
        });

        return themes;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffectOnce(() => {
        getFonts().then((fonts) => {
            setFonts(fonts);
        });
    });

    return (
        <ModalContainer title='Theme Customizer'>
            <ModalBody className='flex-1 gap-1 pb-10'>
                <div className='items-center justify-between gap-4 row-flex'>
                    <Typography>Font Family:</Typography>
                    <div className='flex-1'>
                        <SelectBox
                            options={TransformArrayToLabelValue(fonts) as any}
                            menuPosition='absolute'
                            isSearchable
                            isClearable
                            onChange={(option) => {
                                setTheme({
                                    'font-family': option?.value
                                        ? `"${option?.value}"`
                                        : null,
                                });
                            }}
                        />
                    </div>
                </div>

                {themeColorList.map(({ title, key }) => {
                    if (!key) {
                        return (
                            <div
                                key={`color-${title}`}
                                className='items-center justify-between gap-4 mt-1 text-accent row-flex first:mt-0'
                            >
                                <Typography className='font-semibold'>
                                    {title}
                                </Typography>
                            </div>
                        );
                    }
                    return (
                        <div
                            key={`color-${key}-${title}`}
                            className='items-center justify-between gap-4 text-sm row-flex'
                        >
                            <Typography>{title}</Typography>
                            <ColorPicker
                                value={getHSLColor(themeColors[key])}
                                onChange={(_, color) =>
                                    setTheme({ [`--${key}`]: color.hsl })
                                }
                            />
                        </div>
                    );
                })}
            </ModalBody>
        </ModalContainer>
    );
};
