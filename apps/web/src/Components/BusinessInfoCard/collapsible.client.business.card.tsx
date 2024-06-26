import { cn, Collapse, InformationCardUpdated } from '@finnoto/design-system';

import { BusinessIconImage } from '@Components/BusinessImage/businessImage.component';

const HorizontalInfo = ({ text = 'secondary', size = 'md', item }: any) => {
    return (
        <div className='flex rounded'>
            <div className='flex items-start justify-center mr-4 rounded-sm'>
                <span className='w-12 h-12'>
                    <BusinessIconImage />
                </span>
            </div>
            <div className='flex flex-col justify-center gap-y-1'>
                <p
                    className={cn('font-medium capitalize text-base-primary', {
                        'text-base': size === 'md',
                        'text-sm': size === 'xs',
                    })}
                >
                    {item?.name}
                </p>
                <div className='flex items-center'>
                    <span
                        className={cn(
                            'font-normal',
                            textVariants[text],
                            sizeVariants[size]
                        )}
                    >
                        {item?.gstin || 'Non GST Registered'}
                    </span>
                    <span className='w-[1px] bg-base-300 h-3 mx-3'></span>
                    <span
                        className={cn(
                            'font-normal',
                            textVariants[text],
                            sizeVariants[size]
                        )}
                    >
                        {item?.address?.attributes?.state}
                    </span>
                </div>
            </div>
        </div>
    );
};
const sizeVariants = {
    xs: 'text-xs',
    md: 'text-base',
};

const textVariants = {
    primary: 'text-base-primary',
    secondary: 'text-base-secondary',
};
const CollapsibleClientBusinessCard = ({ item }: any) => {
    return (
        <Collapse
            className='p-3 rounded bg-base-100'
            title={<HorizontalInfo item={item} size='xs' />}
        >
            <InformationCardUpdated
                firstItemType='gray'
                containerClassName='pb-0 shadow-none pt-2'
                data={[
                    {
                        label: <div>GSTIN</div>,
                        info: (
                            <span
                                onClick={() => {}}
                                className='link link-hover'
                            >
                                {item?.gstin}
                            </span>
                        ),
                        visible: !!item?.gstin,
                    },
                    // {
                    //     label: 'Pan Card',
                    //     info: item?.attributes?.pan_number,
                    // },
                    {
                        label: 'Business Type',
                        info: item?.type?.name,
                    },
                ]}
            />
        </Collapse>
    );
};

export default CollapsibleClientBusinessCard;
