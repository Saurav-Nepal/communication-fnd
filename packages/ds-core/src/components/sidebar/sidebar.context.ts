import { createSafeContext } from '../../utils/create-safe-context/create-safe-context';
import { SidebarReturnType } from './sidebar.types';

export const [SidebarProvider, useSidebarContext] =
    createSafeContext<SidebarReturnType>(
        'Sidebar component was not found in tree'
    );
