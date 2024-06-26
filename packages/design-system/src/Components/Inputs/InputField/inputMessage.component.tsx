import { useMemo } from 'react';

import { IsArray, IsObject } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import {
    InputErrorMessageInterface,
    InputMessageInterface,
} from './input.types';

export const InputMessage = ({
    message,
    messageComponent,
    error,
}: InputMessageInterface) => {
    return (
        <>
            {message && !error && (
                <span className='py-1 label label-text-alt text-base-secondary'>
                    {message}
                </span>
            )}
            {messageComponent ? <div>{messageComponent}</div> : null}
        </>
    );
};

export const InputErrorMessage = ({
    error,
    warning,
    className,
}: InputErrorMessageInterface) => {
    const renderError = useMemo(() => {
        if (!error) return null;
        if (IsArray(error)) {
            return error.map((error) => (
                <span
                    key={`error-${error}`}
                    className={cn(
                        'py-1 label label-text-alt text-error',
                        className
                    )}
                >
                    {error}
                </span>
            ));
        }
        if (IsObject(error)) {
            return Object.values(error).map((error) => (
                <span
                    key={`error-${error}`}
                    className={cn(
                        'py-1 label label-text-alt text-error',
                        className
                    )}
                >
                    {error}
                </span>
            ));
        }
        return (
            <span
                className={cn(
                    'py-1 label label-text-alt text-error',
                    className
                )}
            >
                {error}
            </span>
        );
    }, [className, error]);

    if (!error && warning) {
        return (
            <span
                className={cn(
                    'py-1 label label-text-alt text-warning',
                    className
                )}
            >
                {warning}
            </span>
        );
    }

    return <>{renderError}</>;
};
