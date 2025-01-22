import { createSafeContext } from '../../../utils';

type MainMenuValue = {
    menuElement: JSX.Element;
};

export const [MainMenuProvider, useMainMenu] = createSafeContext<MainMenuValue>(
    'Sidebar Main Menu component was not found in tree'
);
