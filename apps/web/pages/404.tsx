import { Navigation } from '@finnoto/core';
import { Button, Icon } from '@finnoto/design-system';

import { ArrowLeftSvgIcon, NotFoundSvgIcon } from 'assets';

export default function Custom404() {
    return (
        <div className='items-center justify-center h-screen gap-12 col-flex'>
            <Icon
                source={NotFoundSvgIcon}
                size={300}
                isSvg
                className='text-primary'
            />
            <Button
                appearance='primary'
                className='rounded-full'
                onClick={() => Navigation.back()}
            >
                <Icon source={ArrowLeftSvgIcon} size={28} isSvg />
                <span className='text-lg font-normal'>Go Back</span>
            </Button>
        </div>
    );
}
