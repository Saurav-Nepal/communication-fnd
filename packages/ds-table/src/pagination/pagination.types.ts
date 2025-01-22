import { ObjectDto } from '@slabs/ds-utils';

// Defines a type for the pagination configuration
export type PaginationType = {
    limit?: number; // The maximum number of items per page
    page?: number; // The current page number
    total?: number; // The total number of items
};

// Defines the interface for the PaginationProps object
export interface PaginationProps {
    pagination?: PaginationType; // Optional pagination configuration
    onPaginationChange?: (_: ObjectDto) => void; // Optional callback function triggered when pagination changes
    containerClass?: string; // Optional CSS class for the pagination container
    showEntries?: boolean; // Optional flag indicating whether to display the number of entries
    totalRecords?: number; // Optional total number of records
    onlyShowPrevNext?: boolean;
    buttonHideIcon?: boolean;
    selectedCount?: number;
}
