import { ReactNode } from 'react';

/**
 * Props for the InformationHeading component.
 */
export interface InformationHeadingProps {
    title: string | ReactNode;
    className?: string;
}

/**
 * Props for the InformationDisplay component.
 */
export interface InformationDisplayProps {
    label: string | ReactNode;
    info: string | ReactNode;
    infoClassName?: string;
}

/**
 * Props for the InformationCard component.
 */
export interface InformationCardProps {
    heading?: string | ReactNode;
    headingClassName?: string;
    data: DataInformationObject[];
    customInformation?: ReactNode;
    footer?: ReactNode | any;
    titleClassName?: string;
    containerClassName?: string;
}

/**
 * Represents a data information object used in the InformationCard component.
 */
export interface DataInformationObject {
    label: string | ReactNode;
    info: string | ReactNode;
    visible?: boolean;
}
