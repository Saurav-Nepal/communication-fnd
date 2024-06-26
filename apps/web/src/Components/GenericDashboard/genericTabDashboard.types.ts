import { GenericDashboardProps } from './genericDashboard.types';

export interface GenericTabDashboardProps {
    tabItems: {
        tabName: string;
        tabKey: string;
        tabVisible?: boolean;
        dashboardProps: GenericDashboardProps;
    }[];
    defaultActiveTab?: string;
    queryKey?: string;
    disableNav?: boolean;
    isFilterClearInTabChange?: boolean;
}
