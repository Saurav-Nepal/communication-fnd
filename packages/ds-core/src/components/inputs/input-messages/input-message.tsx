import React, { useMemo } from 'react';

import { cn, isArray, isObject } from '@slabs/ds-utils';

import {
    InputErrorMessageInterface,
    InputMessageInterface,
} from '../../labels/label.types';

/**
 * Component to display an error message related to an input field.
 * This component can display multiple error messages if provided as an array.
 *
 * @param {InputErrorMessageInterface} props - The properties for the component.
 * @return {JSX.Element | null} The rendered component or null if no error.
 */
const InputErrorMessage = ({
    error, // The error message to display. Can be a string or an array of strings.
    warning, // The warning message to display.
    className, // Additional class names for styling.
}: InputErrorMessageInterface) => {
    // Render the error message if it exists.
    const renderError = useMemo(() => {
        if (!error) return null;

        if (isArray(error)) {
            // If the error is an array, map over it and render each message.
            return error.map((errorMessage) => (
                <span
                    key={`error-${errorMessage}`}
                    className={cn('py-1 text-error', className)}
                >
                    {errorMessage}
                </span>
            ));
        }

        if (isObject(error)) {
            // If the error is an object, map over its values and render each message.
            return Object.values(error).map((errorMessage) => (
                <span
                    key={`error-${errorMessage}`}
                    className={cn('py-1 text-error', className)}
                >
                    {errorMessage}
                </span>
            ));
        }

        // If the error is a string, render it as a single message.
        return (
            <span className={cn('py-1 text-error', className)}>{error}</span>
        );
    }, [className, error]);

    // If there is no error, render the warning message instead.
    if (!error && warning) {
        return (
            <span className={cn('py-1 text-warning', className)}>
                {warning}
            </span>
        );
    }

    // Return the rendered error message(s).
    return <>{renderError}</>;
};

/**
 * Component to display a message related to an input field.
 * This component can display a message, an error message, or a warning message.
 *
 * @param {InputMessageInterface} props - The properties for the component.
 * @return {JSX.Element} The rendered component.
 */
const InputMessage = ({
    // The message to display.
    message,
    // The component to display instead of the message.
    messageComponent,
    // The error message to display.
    error,
}: InputMessageInterface): JSX.Element => {
    // Render the message if it exists and there is no error.
    const renderMessage = useMemo(() => {
        if (!message) return null;
        return (
            <span className='py-1 text-secondary-foreground'>{message}</span>
        );
    }, [message]);

    // Render the error message if it exists.

    // Render the message component if it exists, otherwise render the message.
    const renderMessageComponent = useMemo(() => {
        if (!messageComponent) return null;
        return <div>{messageComponent}</div>;
    }, [messageComponent]);

    // Render the message if it exists and there is no error.
    if (message && !error) {
        return <>{renderMessage}</>;
    }

    // Render the message component if it exists, otherwise render the message.
    return <>{renderMessageComponent || renderMessage}</>;
};

export { InputErrorMessage, InputMessage };
