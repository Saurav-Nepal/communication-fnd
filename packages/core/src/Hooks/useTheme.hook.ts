import { useContext } from 'react';
import { ThemeContext } from '../Providers/theme.provider';

export const useTheme = () => {
    const themes = useContext(ThemeContext);
    return themes;
};
