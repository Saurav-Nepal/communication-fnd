import { ReactNode } from 'react';

/**
 * @description Hovercard props
 */
export interface HoverCardProps {
    children: ReactNode; // The content that triggers the hover card
    content: ReactNode; // The content to be displayed in the hover card
    openDelay?: number; // The delay before opening the hover card, in milliseconds
    closeDelay?: number; // The delay before closing the hover card, in milliseconds
    cardSize?: keyof typeof hoverCardSizes; // The size of the hover card: fit, sm, md, lg, xl
    position?: 'top' | 'right' | 'bottom' | 'left'; // The position of the hover card: top, right, bottom, left
    align?: 'start' | 'center' | 'end'; // The alignment of the hover card: start, center, end
    offSet?: number; // The offset distance of the hover card from its trigger element
    contentClassName?: string; // Additional CSS class name for the content of the hover card
    defaultOpen?: boolean; // Indicates if the hover card should be open by default
    disabled?: boolean;
    // onOpenChange?: (open: boolean) => void; // Event handler for when the open state of the hover card changes
}

/**
 *
 * Hover Card Sizes
 */
export const hoverCardSizes = {
    fit: 'w-fit', // Size of the hover card fits its content
    sm: 'w-40', // Small size of the hover card
    md: 'w-64', // Medium size of the hover card
    lg: 'w-80', // Large size of the hover card
    xl: 'w-96', // Extra-large size of the hover card
};
