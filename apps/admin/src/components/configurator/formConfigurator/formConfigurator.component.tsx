import React from 'react';

import { Button } from '@slabs/ds-core';
import { Modal } from '@slabs/ds-dialog';

import { FormPreferenceEndPoint } from '@/constants/api.constants';
import { TableConfiguratorProps } from '@/types';

import { Configurator } from '../components/configurator.component';

interface FormConfigurator extends TableConfiguratorProps {
    className?: string;
}

export const FormConfigurator = ({ className, ...props }: FormConfigurator) => {
    return (
        <Button
            className={className}
            variant='ghost'
            size='sm'
            shape='square'
            onClick={() => {
                Modal.open({
                    headingTitle: 'Configure',
                    className: 'table-setting-modal',
                    component: () => (
                        <Configurator
                            {...props}
                            url={FormPreferenceEndPoint}
                            isFormConfigurator
                        />
                    ),
                });
            }}
        >
            <i className='fa fa-cogs' />
        </Button>
    );
};
