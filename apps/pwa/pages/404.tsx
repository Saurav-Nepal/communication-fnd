import { Navigation } from '@finnoto/core';
import { Button, Icon } from '@finnoto/design-system';

import { ArrowLeftSvgIcon, NotFoundSvgIcon } from 'assets';

export default function Custom404() {
    return (
        <div className='items-center justify-center h-screen col-flex gap-12'>
            <Icon
                source={NotFoundSvgIcon}
                size={180}
                isSvg
                className='text-primary'
            />
            <Button
                appearance='primary'
                className='rounded-full'
                onClick={() => Navigation.back()}
                size='sm'
            >
                <Icon source={ArrowLeftSvgIcon} size={20} isSvg />
                <span className='font-normal'>Go Back</span>
            </Button>
        </div>
    );
}
