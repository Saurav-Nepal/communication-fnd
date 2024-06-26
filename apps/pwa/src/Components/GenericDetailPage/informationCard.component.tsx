import { cn, Typography } from '@finnoto/design-system';
import {
    DataInformationObject,
    InformationCardProps,
    InformationDisplayProps,
    InformationHeadingProps,
} from '@finnoto/design-system/src/Components/Surfaces/Cards/informationCard.types';

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
}: InformationDisplayProps) => {
    return (
        <div className='gap-6 p-2 text-xs col-flex '>
            <Typography className='flex-1 text-sm text-base-secondary'>
                {label}
            </Typography>
            <Typography className='text-sm text-right text-base-primary'>
                {info || '-'}
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
            {data.map(({ label, info }, index) => {
                return (
                    <InformationDisplay key={index} label={label} info={info} />
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
const InformationCard = ({
    heading,
    data,
    customInformation,
    footer,
    containerClassName,
    titleClassName,
}: InformationCardProps) => {
    return (
        <div
            className={cn(
                'gap-2 p-2 rounded col-flex bg-base-100',

                containerClassName
            )}
        >
            {heading && (
                <InformationHeading
                    className={titleClassName}
                    title={heading}
                />
            )}
            {customInformation || <InformationMapping data={data} />}
            {footer}
        </div>
    );
};
export default InformationCard;
