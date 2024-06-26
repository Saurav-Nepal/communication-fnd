'use client';

import { formatJoiErrorMessages, getJoiValidationOptions } from '@finnoto/core';
import Joi from 'joi';
import { MultiInput } from './multi.input.component';
import { MultiInputProps } from './multi.input.types';

interface MultiEmailInputProps extends Omit<MultiInputProps, 'validate'> {}

/**
 * Returns a component that renders multiple email input fields and validates
 * the input according to Joi's email validation rules.
 *
 * @param {MultiEmailInputProps} props - the props that are passed to the component
 * @return {JSX.Element} - a React component that renders multiple email input fields
 *
 * @author @rumeshudash
 */
export const MultiEmailInput = (props: MultiEmailInputProps) => {
    const validateEmail = (value: string) => {
        const { error } = Joi.string()
            .email({ tlds: { allow: false } })
            .label('Email')
            .validate(value, getJoiValidationOptions());

        if (!error) return true;

        const errorMessages = formatJoiErrorMessages(error);
        return errorMessages[0];
    };

    return <MultiInput {...props} validate={validateEmail} />;
};
