import {
    formatAmountForMatrix,
    IsEmptyObject,
    IsFunction,
    MetrixItemType,
} from '@finnoto/core';
import { Icon } from '@finnoto/design-system';

import { ArrowRightSvgIcon } from 'assets';

interface SummaryCardProps {
    header: {
        icon: () => void | any;
        onClickToArrow?: () => void;
        title: string;
        subTitle?: string;
        iconClass?: string;
    };
    details: {
        className?: string;
        data: DetailsDto[];
    };
}
interface DetailsDto {
    title?: {
        name: string;
        className?: string;
    };
    subDetails: subDetailsProps[];
}
interface subDetailsProps {
    title: string;
    data: number;
    icon: any;
    type: MetrixItemType;
    iconClass?: string;
}

const SummaryCard = ({ header, details }: SummaryCardProps) => {
    return (
        <div
            onClick={header?.onClickToArrow}
            className='justify-between h-full gap-6 p-4 transition-all border rounded-lg cursor-pointer col-flex border-polaris-border bg-polaris-bg-surface'
        >
            <div className='flex items-center gap-4'>
                <div>
                    <Icon
                        source={header?.icon}
                        size={45}
                        isSvg
                        iconColor={''}
                        iconClass={`bg-primary rounded p-2 text-primary-content ${header?.iconClass}`}
                    />
                </div>
                <div className='flex-1'>
                    <p className='text-base font-semibold text-color-primary'>
                        {header?.title}
                    </p>
                    <span className='text-sm text-color-secondary'>
                        {' '}
                        {header?.subTitle}
                    </span>
                </div>
                {IsFunction(header?.onClickToArrow) && (
                    <div>
                        <Icon
                            iconColor={''}
                            isSvg
                            source={ArrowRightSvgIcon}
                            size={24}
                        />
                    </div>
                )}
            </div>
            <div className={`grid grid-cols-2 gap-6 ${details?.className}`}>
                {details?.data?.map((value: any, index: number) => {
                    return <DetailedCard key={index} {...value} />;
                })}
            </div>
        </div>
    );
};

const DetailedCard = ({ title, subDetails }: DetailsDto) => {
    return (
        <div className='gap-2 col-flex'>
            {!IsEmptyObject(title) && (
                <p className={`  ${title?.className}`}>{title?.name}</p>
            )}
            <div
                className={`grid  gap-6 ${
                    subDetails.length > 1 ? 'grid-cols-2' : ''
                }`}
            >
                {subDetails?.map((value: any, index: number) => {
                    return <SubDetailCard key={index} {...value} />;
                })}
            </div>
        </div>
    );
};

const SubDetailCard = ({
    title,
    data,
    icon,
    type,
    iconClass,
}: subDetailsProps) => {
    return (
        <div className='flex items-start gap-3 p-3 py-4 rounded bg-base-200'>
            <Icon
                iconColor={''}
                isSvg
                source={icon}
                size={22}
                iconClass={iconClass}
            />
            <div className='mt-1'>
                <p className='text-base font-medium leading-3 text-color-primary'>
                    {formatAmountForMatrix(data, type)}
                </p>
                <span className='text-xs text-color-primary'>{title}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
