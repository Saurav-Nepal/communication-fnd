import { DropdownMenuActionProps } from '../../Inputs/DropdownMenu/dropdownMenu.types';

/**
 * Props for the Breadcrumbs component.
 */
export interface BreadcrumbsProps {
    /**
     * An array of route data objects representing the breadcrumbs.
     */
    route: RouteDataObject[];

    /**
     * Additional CSS class name(s) to be applied to the breadcrumbs component.
     */
    className?: string;

    /**
     * The title of the breadcrumbs.
     */
    title?: string;

    /**
     * The title of the page.
     */
    pageTitle?: string;

    /**
     *  The Actions to be performed on the breadcrumbs.
     */

    actionComponent?: React.ReactNode | React.ReactNode[];

    /**
     * BreadCrumbs main div className
     */
    mainClassName?: string;

    /**
     * The Actions to be performed on the breadcrumbs.
     */

    actions?: DropdownMenuActionProps[];

    /**
     *  Right Component
     */
    rightComponent?: React.ReactNode;

    detailTitle?: React.ReactNode;
}

/**
 * Represents a single route in the breadcrumbs.
 */
export interface RouteDataObject {
    /**
     * The name of the route.
     */
    name: string;

    /**
     * The link associated with the route (optional).
     */
    link?: string;

    /**
     * Additional CSS class name(s) to be applied to the route.
     */
    className?: string;
}
