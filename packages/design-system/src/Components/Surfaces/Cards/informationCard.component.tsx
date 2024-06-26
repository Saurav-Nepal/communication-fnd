import { IsUndefinedOrNull, useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Typography } from '../../Data-display/Typography/typography.component';
import {
    DataInformationObject,
    InformationCardProps,
    InformationDisplayProps,
    InformationHeadingProps,
} from './informationCard.types';

/**
 * Renders the heading section of the information card.
 */
const InformationHeading = ({ title, className }: InformationHeadingProps) => {
    return (
        <div className={cn('p-2 border-b border-dashed', className)}>
            <Typography variant='h2' type='subHeading'>
                {title}
            </Typography>
        </div>
    );
};

/**
 * Renders a single information display item within the card.
 */
export const InformationDisplay = ({
    label,
    info,
    infoClassName,
}: InformationDisplayProps) => {
    return (
        <div className='flex gap-6 px-2 py-1 rounded-lg hover:bg-base-200'>
            <Typography className='flex-1'>{label}</Typography>
            <Typography className={cn('font-medium', infoClassName)}>
                {!IsUndefinedOrNull(info) ? info : '-'}
            </Typography>
        </div>
    );
};

/**
 * Renders the mapping of data objects to information display items.
 *
 * @component
 */
const InformationMapping = ({ data }: { data: DataInformationObject[] }) => {
    return (
        <div className='text-sm col-flex'>
            {data.map(({ label, info, visible, ...rest }, index) => {
                if (visible === false) return;
                return (
                    <InformationDisplay
                        key={index}
                        label={label}
                        info={info}
                        {...rest}
                    />
                );
            })}
        </div>
    );
};

/**
 * @author Saurav-Nepal
 *
 * @description Renders an information card component.
 *
 * @example
 * // Example usage of InformationCard
 * <InformationCard heading="Card Heading" data={informationData} shadow={true} />
 */
export const InformationCard = ({
    heading,
    data,
    customInformation,
    footer,
    containerClassName,
    headingClassName,
}: InformationCardProps) => {
    const { isArc } = useApp();

    return (
        <div
            className={cn(
                'gap-2 p-2 rounded col-flex bg-base-100 border border-base-300',
                {
                    'border-polaris-border rounded-lg': isArc,
                },
                containerClassName
            )}
        >
            {heading && (
                <InformationHeading
                    title={heading}
                    className={headingClassName}
                />
            )}
            {customInformation || <InformationMapping data={data} />}
            {footer}
        </div>
    );
};
