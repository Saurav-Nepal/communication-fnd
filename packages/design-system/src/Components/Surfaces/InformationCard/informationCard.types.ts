import { ReactNode } from 'react';

import { ObjectDto } from '@finnoto/core';

/**
 * Props for the InformationHeading component.
 */
export interface InformationHeadingProps {
    title: string | ReactNode;
    className?: string;
}

/**
 * Props for the InformationCard component.
 */
export interface InformationCardProps {
    heading?: string | ReactNode;
    customHeading?: ReactNode;
    data?: DataInformationObject[];
    shadow?: boolean;
    customInformation?: ReactNode;
    footer?: ReactNode | any;
    containerClassName?: string;
    headingClassName?: string;
    firstItemType?: 'gray' | 'white';
    labelClassName?: string;
    infoClassName?: string;
    dataTitle?: ObjectDto;
}

/**
 * Represents a data information object used in the InformationCard component.
 */
export interface DataInformationObject {
    label?: string | ReactNode;
    info: string | ReactNode;
    visible?: boolean;
    infoClassName?: string;
    infoClassNameList?: string;
    labelClassName?: string;
    labelClassNameList?: string;
    wrapperClassName?: string;
    noBackground?: boolean;
    firstItemType?: InformationCardType;
    type?: InformationCardType | 'transparent';
}

type InformationCardType = 'gray' | 'white';
