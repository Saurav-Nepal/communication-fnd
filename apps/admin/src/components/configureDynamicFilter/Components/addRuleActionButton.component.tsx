import React from 'react';
import { X } from 'lucide-react';
import { ActionWithRulesAndAddersProps } from 'react-querybuilder';

import { Button } from '@slabs/ds-core';

const ActionButton = ({
    title,
    label,
    disabled,
    handleOnClick,
}: ActionWithRulesAndAddersProps) => {
    const isRemove = title?.toLowerCase().includes('remove');
    return (
        <Button
            variant='outline'
            color={isRemove ? 'error' : 'info'}
            size='sm'
            disabled={disabled}
            onClick={(e) => handleOnClick(e)}
        >
            {isRemove ? 'Remove' : label}
        </Button>
    );
};

export default ActionButton;
