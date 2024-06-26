import { ReactNode } from 'react';

import { ObjectDto } from '@finnoto/core';

import { RightClickRowOptionProps } from '../../Inputs/RightClick/rightClick.types';
import { PaginationProps } from '../../Navigation/Pagination/pagination.interface';
import { NoDataFoundProps } from '../NoDataFound/noDataFound.types';
import { linkTargetTypes } from '../Typography/typography.types';

// Define types for table functions
type TableFunction<T> = (item: any) => T;
type TableFunctionRenderValue<T> = (
    item: any,
    column: TableColumn,
    rowIndex: number,
    colIndex: number
) => T;

// Define props for the table component
export interface TableProps {
    data: any[]; // Array of data for the table
    column: TableColumn[]; // Array of column configurations
    preferences?: TablePreferencesProps; // Preferences for table appearance and behavior
    pagination?: TablePaginationProps; // Pagination configuration
    sorting?: {
        sorting?: SortingType | null;
        onSortingChange?: (item: SortingType) => void;
    };
    rowAction?: TableRowActionProps; // Row action configuration
    rowNumbering?: boolean; // Whether to display row numbering
    loading?: boolean; // loading state
    select?: {
        type?: 'check' | 'actions' | 'radio';
        initialSelectAll?: boolean;
        display?: boolean; // Whether to display select checkboxes
        disabled?: boolean | ((item: any) => boolean); // Whether to disable select checkboxes
        handleSelectedData?: (item: any) => void; // Callback function for handling selected data
        disableSelectAll?: boolean;
        onEdit?: (item: any) => void;
        onDelete?: (item: any) => void;
        defaultSelectedList?: ObjectDto[];
    };
    handleStatus?: statusFunctionType;
    noDataFound?: NoDataFoundProps;
    contextActions?: RightClickRowOptionProps[];
    openSnModal?: any;
    showToltip?: boolean;
    isHideSummary?: boolean;
    footer?: {
        className?: string;
        leftComponent?: ReactNode;
        data?: {
            key: string;
            className?: string;
            renderValue: () => React.ReactNode;
        }[];
        customFooter?: ReactNode;
        separateCustomFooterRow?: boolean;
    };
    customHeader?: ReactNode;
    showHover?: boolean;
    rowClassName?: (item: ObjectDto) => string;
    selectedList?: ObjectDto[];
}

export type statusFunctionType = (
    id?: number,
    active?: boolean,
    method?: any,
    callback?: () => void
) => void;

// Define props for row actions
export interface TableRowActionProps {
    display?: boolean; // Whether to display row actions
    menuActions?: TablemenuActionProps[] | TablemenuActionFunctionProps; // Array of menu action configurations
}

// Define props for menu actions
export interface TablemenuActionProps {
    action: (_: any) => void; // Action function for the menu action
    icon?: any; // Icon for the menu action
    iconSize?: number; // Size of the icon
    isSvg?: boolean; // Whether the icon is an SVG
    color?: string; // Color of the menu action
    iconColor?: string; // Color of the icon
    size?: any; // Size of the menu action
    visible?: boolean | ((item: ObjectDto) => boolean) | any; // Visibility condition for the menu action
    isCancel?: boolean | ((item: ObjectDto) => boolean) | any; // Visibility condition for the menu action
    isSuccess?: boolean | ((item: ObjectDto) => boolean) | any; // Visibility condition for the menu action
    renderIcon?: (item: ObjectDto) => Function; // Function for rendering custom icon
    name?: string | ((data: ObjectDto) => string); // Name of the menu action
    tooltipName?: string | ((item: ObjectDto) => string | ReactNode); // Name for tooltip of the menu action
    type?: 'outer' | 'inner'; // Type of the menu action
    key?: string; // Icon for the menu action
    renderValue?: (item: ObjectDto) => ReactNode;
}

export type TablemenuActionFunctionProps = (
    item: ObjectDto
) => TablemenuActionProps[];

// Define props for pagination
export interface TablePaginationProps extends PaginationProps {
    display?: boolean; // Whether to display pagination
}

// Define props for preferences
export interface TablePreferencesProps {
    appreance?: keyof typeof TableAppearanceTypes; // Appearance type of the table
    size?: keyof typeof TableSizesTypes; // Size type of the table
    roundedCorners?: boolean; // Whether to have rounded corners
    bordered?: boolean; // Whether to have borders
    fullHeight?: boolean; // Whether the table should take full height
    stickyHeader?: boolean; // Whether the table header should be sticky
    stickyRowAction?: boolean; // Whether the row actions should be sticky
}

// Define props for a table column
export interface TableColumn {
    name: string; // Column name
    key: string; // Column key (unique identifier)
    type?: TableColumnType; // Column type (number, currency, date, etc.)
    url?: string | TableFunction<string>; // URL or URL-generating function for the column
    secondaryUrl?: string | TableFunction<string>; // Secondary URL or URL-generating function for the column
    visible?: boolean; // Whether the column is visible
    sortable?: boolean; // Whether the column is sortable
    ellipse?: number | boolean; // Number of characters to display or whether to use ellipsis
    className?: string | TableFunction<string>; // CSS class or class-generating function for the column
    renderValue?: TableFunctionRenderValue<ReactNode>; // Function for rendering the column value
    action?: (item: any) => void; // Ading action in column
    enableDbSort?: boolean; // Whether to enable sorting by the column in the database
    doubleConfirmation?: boolean;
    method?: string;
    dynamicStatus?: (
        status?: boolean,
        item?: ObjectDto
    ) => 'activate' | 'activate_badge';
    statusBadgeSize?: 'xs' | 'sm' | 'md' | 'lg' | 'normal' | 'polaris-normal';
    activateId?: string;
    disableRightClick?: boolean; // this will allow to disableRight click in the field
    disableAggregation?: boolean; // this will allow to disable aggregation in the field
    attributes?: ObjectDto;
    headerClassName?: string;
    getRightClickCustomQuery?: () => {
        value: string;
        field: string;
    };
    target?: linkTargetTypes;
    truncateClass?: string;
    hex?: {
        bg: string;
        text: string;
    };
}

export interface SortingType {
    column: string;
    order: 'asc' | 'desc';
}

// Define available table appearance types
export const TableAppearanceTypes = {
    primary: 'appearance-primary',
    secondary: 'appearance-secondary',
    neutral: 'appearance-neutral',
    lightGray: 'appearance-lightgray',
    info: 'appearance-info',
    warning: 'appearance-warning',
    error: 'appearance-error',
};

// Define available table size types
export const TableSizesTypes = {
    xs: 'size-xs',
    sm: 'size-sm',
    md: 'size-md',
    lg: 'size-lg',
};

// Define available column types
export type TableColumnType =
    | 'text'
    | 'reference_select'
    | 'number'
    | 'currency'
    | 'date'
    | 'date_time'
    | 'currency'
    | 'boolean'
    | 'activate'
    | 'activate_badge'
    | 'currency_acc'
    | 'dualistic'
    | 'date_lateral';
