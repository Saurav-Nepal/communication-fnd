import { BusinessType, GST_STATUS_TYPE } from '@finnoto/core';
import { Badge, cn } from '@finnoto/design-system';
import { useCallback, useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';

export const GstinCard = ({
    gstin_address = [],
    trade_name,
    pan_number,
    retail_type,
    className = '',
    defaultOpen,
    gstin,
    isExpandable = true,
    ...rest
}: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen || false);

    const fullBillingAddress = useMemo(() => {
        return Object.values(gstin_address).reduce((prev, next) => {
            return prev + '' + next;
        }, '');
    }, [gstin_address]);
    const { status_id, type_id } = rest || {};

    const Card = ({ label, content, id }: any) => {
        return (
            <div className='gap-1 col-flex'>
                <div className='text-xs capitalize text-base-secondary'>
                    {label}
                </div>
                <div className='text-xs font-medium '>
                    <span id={id}>{content}</span>
                </div>
            </div>
        );
    };
    const businessTypeValue = useMemo(() => {
        switch (type_id) {
            case BusinessType.PROPRIETORSHIP.value:
                return BusinessType.PROPRIETORSHIP.label;
            case BusinessType.PARTNERSHIP_FIRM.value:
                return BusinessType.PARTNERSHIP_FIRM.label;
            case BusinessType.LLP.value:
                return BusinessType.LLP.label;
            case BusinessType.PRIVATE_LIMITED.value:
                return BusinessType.PRIVATE_LIMITED.label;
            default:
                return '';
        }
    }, [type_id]);

    const renderStatus = useCallback(() => {
        switch (status_id) {
            case GST_STATUS_TYPE.ACTIVE:
                return (
                    <Badge
                        id='gstin_status'
                        label='Active'
                        size='sm'
                        appearance='success'
                    />
                );
            case GST_STATUS_TYPE.SUSPENDED:
                return (
                    <Badge
                        id='gstin_status'
                        label='Suspended'
                        size='sm'
                        appearance='warning'
                    />
                );
            case GST_STATUS_TYPE.CANCELLED:
                return (
                    <Badge
                        id='gstin_status'
                        label='Cancelled'
                        size='sm'
                        appearance='error'
                    />
                );
            default:
                return <></>;
        }
    }, [status_id]);

    return (
        <div
            className={cn(
                `px-4 border rounded cursor-pointer col-flex bg-base-200 border-base-300`,
                className
            )}
            onClick={() => {
                if (!isExpandable) return;
                setIsOpen((prev) => !prev);
            }}
        >
            <div
                className={cn(
                    'items-center justify-between pb-2  row-flex border-base-300',
                    {
                        'border-b border-dashed': isOpen,
                    }
                )}
            >
                <div className='col-flex gap-0.5  '>
                    <div
                        id='gstin_trade_name'
                        className='pt-4 text-sm font-medium capitalize text-base-primary'
                    >
                        {trade_name}
                    </div>
                    {gstin && (
                        <div
                            id='gstin_number'
                            className='text-xs text-base-secondary'
                        >
                            {gstin}
                        </div>
                    )}
                </div>
                {renderStatus()}
            </div>
            <AnimateHeight height={isOpen ? 'auto' : 0}>
                <div className='w-full gap-4 py-4 col-flex'>
                    {fullBillingAddress && (
                        <Card
                            id='gstin_address'
                            label='Address'
                            content={fullBillingAddress}
                        />
                    )}
                    <div className='gap-12 row-flex '>
                        {type_id && (
                            <Card
                                id='gstin_business_type'
                                label='Type'
                                content={businessTypeValue}
                            />
                        )}
                        {pan_number && (
                            <Card
                                id='gstin_pan'
                                label='Pan Number'
                                content={pan_number}
                            />
                        )}
                    </div>
                </div>
            </AnimateHeight>
        </div>
    );
};
export default GstinCard;
