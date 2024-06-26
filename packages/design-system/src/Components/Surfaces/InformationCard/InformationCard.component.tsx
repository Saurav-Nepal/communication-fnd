import { IsUndefinedOrNull } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import {
    DataInformationObject,
    InformationCardProps,
} from './informationCard.types';

/**
 * @description Renders a single information display row within the card.
 * @param label - Label to be displayed on the left side of the information card.
 * @param info - Information to be displayed on the right side of the information card.
 * @param wrapperClassName - Classname to be applied to the wrapper div.
 * @param labelClassName - Classname to be applied to the label div.
 * @param infoClassName - Classname to be applied to the info div (used when overriding class for single item)
 * @param infoClassNameList - List of classnames to be applied to the info div (used when applying class to whole list).
 * @param labelClassNameList - List of classnames to be applied to the label div.
 * @param firstItemType - Background type of the first item in the list. (gray/white)
 * @param noBackground - Whether to apply default background to the information card.
 * @returns - Returns a single information display row within the card.
 */

export const InformationDisplayUpdated = ({
    label,
    info,
    wrapperClassName,
    infoClassName,
    labelClassName,
    infoClassNameList,
    labelClassNameList,
    firstItemType = 'gray',
    noBackground = false,
    type,
}: DataInformationObject) => {
    return (
        <div
            className={cn(
                'justify-between w-full gap-4 text-sm text-base-primary row-flex py-2 px-4 ',
                wrapperClassName,
                {
                    'odd:bg-base-200/50 even:bg-base-100':
                        firstItemType === 'gray',
                    'odd:bg-base-100 even:bg-base-200/50':
                        firstItemType === 'white',
                    'odd:bg-base-100 even:bg-base-100': type === 'white',
                    'odd:bg-base-200/50 even:bg-base-200/50': type === 'gray',
                    'odd:bg-transparent even:bg-transparent':
                        type === 'transparent',
                },
                wrapperClassName
            )}
        >
            {label && (
                <div
                    className={cn(
                        'w-1/2 font-normal text-base-secondary text-sm',
                        labelClassNameList,
                        labelClassName
                    )}
                >
                    {label}
                </div>
            )}
            <div
                className={cn(
                    'w-1/2 font-normal text-base-primary text-sm',
                    {
                        'text-right': !IsUndefinedOrNull(label),
                    },
                    infoClassNameList,
                    infoClassName
                )}
            >
                {!IsUndefinedOrNull(info) ? info : '-'}
            </div>
        </div>
    );
};

/**
 * @description Renders the mapping of data objects to information display items.
 * @param data - Data to be displayed in the information card.
 * @param firstItemType - Background type of the first item in the list. (gray/white)
 * @param labelClassName - Classname to be applied to the label div.
 * @param infoClassName - Classname to be applied to the info div (used when overriding class for single item)
 * @returns - Returns the mapping of data objects to information display items.
 */

const InformationMapping = ({
    data,
    firstItemType,
    labelClassName,
    infoClassName,
}: {
    data: DataInformationObject[];
    firstItemType?: 'gray' | 'white';
    labelClassName?: string;
    infoClassName?: string;
}) => {
    return (
        <div className='text-sm col-flex'>
            {data.map(({ visible, label, info, ...rest }, index) => {
                if (visible === false) return;
                return (
                    <InformationDisplayUpdated
                        key={index}
                        label={label}
                        info={info}
                        firstItemType={firstItemType}
                        labelClassNameList={labelClassName}
                        infoClassNameList={infoClassName}
                        {...rest}
                    />
                );
            })}
        </div>
    );
};

/**
 * @description Renders a information card.
 * @param heading - Heading to be displayed on the information card.
 * @param customHeading - Custom heading to be displayed on the information card.
 * @param data - Data to be displayed in the information card.
 * @param shadow - Shadow to be applied to the information card.
 * @param customInformation - Custom information to be displayed on the information card.
 * @param footer - Footer to be displayed on the information card.
 * @param containerClassName - Classname to be applied to the container div.
 * @param headingClassName - Classname to be applied to the heading div.
 * @param firstItemType - Background type of the first item in the list. (gray/white)
 * @param labelClassName - Classname to be applied to the label div for the whole list.
 * @param infoClassName - Classname to be applied to the info div for the whole list.
 *
 * @returns - Returns the heading section of the information card.
 */

export const InformationCardUpdated = ({
    heading,
    customHeading,
    headingClassName,
    data,
    shadow,
    customInformation,
    footer,
    containerClassName,
    firstItemType,
    labelClassName,
    infoClassName,
    dataTitle,
}: InformationCardProps) => {
    return (
        <div
            {...dataTitle}
            className={cn(
                'rounded  bg-base-100 col-flex gap-y-2 pb-2 border border-base-300',

                containerClassName
            )}
        >
            {customHeading && <div className='px-4 pt-4'>{customHeading}</div>}
            {heading && (
                <p
                    className={cn(
                        'text-base-primary font-medium text-sm px-4 pt-4',
                        headingClassName
                    )}
                >
                    {heading}
                </p>
            )}
            <div className='col-flex'>
                {customInformation ? (
                    <div className='px-4'>{customInformation}</div>
                ) : (
                    <InformationMapping
                        data={data}
                        firstItemType={firstItemType}
                        labelClassName={labelClassName}
                        infoClassName={infoClassName}
                    />
                )}
            </div>
            {footer}
        </div>
    );
};
