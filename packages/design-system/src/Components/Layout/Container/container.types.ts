import { ReactNode } from 'react';

/**
 * Props for the ContainerWrapper component.
 */
export interface ContainerWrapperProps {
    /** The content to be rendered inside the container. */
    children: ReactNode;

    /** Additional CSS class name(s) to be applied to the container. */
    className?: string;

    /** The title of the page. */
    pageTitle?: string;

    /** Determines whether the container should be rendered with or without an offset container. */
    offContainer?: boolean;
}
