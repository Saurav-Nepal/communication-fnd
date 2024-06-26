import React from 'react';

import { Button, Icon } from '@finnoto/design-system';

import { ChevronDownOutlineSvgIcon } from 'assets';

const ArcActionDropdown = React.forwardRef((props, ref) => {
    return (
        <Button
            size='md'
            appearance='polaris-tertiary'
            title='Actions'
            {...props}
            ref={ref}
        >
            Actions <Icon source={ChevronDownOutlineSvgIcon} isSvg size={20} />
        </Button>
    );
});

export default ArcActionDropdown;
