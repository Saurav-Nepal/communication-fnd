import { useMemo } from 'react';

import {
    BankCardHorizontal,
    cn,
    Collapse,
    FormatDisplayDateStyled,
    InformationCardUpdated,
} from '@finnoto/design-system';

/**
 *
 * @param bankDetails - Bank details object
 * @param badge - Badge to be displayed on the bank card - Active status badge or Verified status badge
 *
 * @description - This component is used to display bank details in a collapsible card
 */

const CollapsibleBankCard = ({
    bankDetails,
    badge,
    customInformation,
    firstItemType = 'white',
    defaultExpand = false,
    collapseDisabled = false,
    heading,
    titleClassName,
    wrapperClassName,
    withBorder = true,
    size = 'xs',
    source_type = 'self_bank',
    defaultSourceId,
}: {
    bankDetails: any;
    badge?: 'active' | 'verified' | 'none';
    size?: 'xs' | 'md';
    customInformation?: any;
    firstItemType?: 'white' | 'gray';
    defaultExpand?: boolean;
    collapseDisabled?: boolean;
    heading?: React.ReactNode;
    titleClassName?: string;
    wrapperClassName?: string;
    withBorder?: boolean;
    source_type?: any;
    defaultSourceId?: number;
}) => {
    const {
        active,
        attributes,
        account_number,
        ifsc_code,
        name,
        created_at,
        documents,
        creator,
        id,
        source_id,
    } = bankDetails || {};

    const documentsCount = useMemo(() => {
        return documents?.length || attributes?.documents_count;
    }, [attributes?.documents_count, documents?.length]);

    return (
        <div className={cn('bg-base-100 rounded col-flex', wrapperClassName)}>
            {heading}
            <Collapse
                title={
                    <div className={cn('p-4', titleClassName)}>
                        <BankCardHorizontal
                            acc_no={account_number}
                            ifsc={ifsc_code ?? attributes.swift_code}
                            name={name}
                            size={size}
                            verified={attributes?.verified}
                            active={active}
                            text='secondary'
                            badge={badge}
                        />
                    </div>
                }
                hideCollapseIcon
                defaultExpand={defaultExpand}
                collapseDisabled={collapseDisabled}
                headerClassName={collapseDisabled ? 'cursor-default' : ''}
            >
                <div className='flex col-flex'>
                    {withBorder ? (
                        <span className='pt-2 mx-4 border-t border-dashed border-base-300'></span>
                    ) : null}
                    <InformationCardUpdated
                        firstItemType={firstItemType}
                        containerClassName='pb-0 shadow-none'
                        labelClassName='w-1/3'
                        infoClassName='w-2/3'
                        data={
                            customInformation || [
                                {
                                    label: 'Name at Bank',
                                    info: attributes?.verified_data?.nameAtBank,
                                    visible:
                                        !!attributes?.verified_data?.nameAtBank,
                                },
                                {
                                    label: 'Branch',
                                    info: attributes?.branch,
                                    visible: !!attributes?.branch,
                                },
                                {
                                    label: 'Address',
                                    info: attributes?.address,
                                    visible: !!attributes?.address,
                                },
                                {
                                    label: 'Added at',
                                    info: FormatDisplayDateStyled({
                                        value: created_at,
                                    }),
                                    visible: !!created_at,
                                },
                                {
                                    label: 'Added by',
                                    info: creator?.name,
                                    visible: !!creator?.name,
                                },
                            ]
                        }
                    />
                </div>
            </Collapse>
        </div>
    );
};

export { CollapsibleBankCard };
