import React from 'react';

import { ObjectDto } from '@finnoto/core';
import { ArcCard, Badge } from '@finnoto/design-system';

import { PdfSvgIcon } from 'assets';

interface ArcGenericCardGridProps {
    detail: ObjectDto;
}

const ArcGenericCardList = (props: ArcGenericCardGridProps) => {
    return (
        <ArcCard className='bg-base-100' detail={props.detail}>
            <ArcCard.Heading withBottomBorder>
                <ArcCard.Icon
                    source={PdfSvgIcon}
                    leftBorderColor='border-primary'
                    background='bg-base-200'
                    className='min-w-[36px]'
                />
                <ArcCard.HeadingContent
                    {...{
                        titleKey: 'name',
                        subtitleKey: 'email',
                    }}
                />
                <ArcCard.HeadingRightComponent>
                    {(detail) => (
                        <Badge
                            appearance={detail?.is_active ? 'success' : 'error'}
                            label={detail?.is_active ? 'Active' : 'Inactive'}
                        />
                    )}
                </ArcCard.HeadingRightComponent>
            </ArcCard.Heading>
            <ArcCard.Content>
                <ArcCard.ContentDescription>
                    {(detail) => detail?.description}
                </ArcCard.ContentDescription>
            </ArcCard.Content>
        </ArcCard>
    );
};

export default ArcGenericCardList;
