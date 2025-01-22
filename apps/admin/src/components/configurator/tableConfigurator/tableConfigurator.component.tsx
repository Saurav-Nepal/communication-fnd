import React from 'react';

import { Button } from '@slabs/ds-core';
import { Modal } from '@slabs/ds-dialog';

import { TableConfiguratorProps } from '@/types';

import { Configurator } from '../components/configurator.component';

interface TableConfigurator extends TableConfiguratorProps {
    className?: string;
}

export const TableConfigurator = ({
    className,
    ...props
}: TableConfigurator) => {
    return (
        <Button
            className={className}
            variant='ghost'
            onClick={() => {
                Modal.open({
                    headingTitle: 'Configure',
                    className: 'table-setting-modal',
                    component: () => <Configurator {...props} />,
                });
            }}
            size='sm'
        >
            <i className='fa fa-bars' />
        </Button>
    );
};
