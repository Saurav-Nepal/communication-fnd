import React from 'react';

import { Button } from '@slabs/ds-core';

interface DynamicFilterProps {
    toggleAdvancedFilter: () => void;
}

const DynamicFilter = (props: DynamicFilterProps) => {
    const { toggleAdvancedFilter } = props;
    return (
        <div className='flex current-filter-view'>
            <Button
                variant='ghost'
                size='sm'
                onClick={() => toggleAdvancedFilter()}
            >
                Advanced
            </Button>
        </div>
    );
};

export default DynamicFilter;
