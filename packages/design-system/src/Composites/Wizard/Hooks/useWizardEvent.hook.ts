'use client';

import { StoreEvent } from '@finnoto/core';
import { useEffect } from 'react';

export const useWizardEvent = ({
    isSubmitting,
    handleSubmit,
    disableSubmit,
    formKey,
    dependencies = [],
}) => {

    useEffect(() => {

        if (!formKey) return;
        StoreEvent({
            eventName: formKey,
            data: {
                disableSubmit,
                handleSubmit,
                isSubmitting,
            },
        });
        return ()=>{

        }
    }, [
        isSubmitting,
        handleSubmit,
        disableSubmit,
        formKey,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ...dependencies,
    ]);
};
