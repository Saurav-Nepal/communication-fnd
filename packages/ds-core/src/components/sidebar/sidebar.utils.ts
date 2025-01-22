import { SidebarSubmenuFooterType } from './sidebar.types';

export const isLocationMatch = (target: string, value: string) =>
    value === target;

export const isCustomFooter = (
    footer: SidebarSubmenuFooterType
): footer is { renderFooter: React.ReactNode } => {
    return 'renderFooter' in footer && footer.renderFooter !== undefined;
};
