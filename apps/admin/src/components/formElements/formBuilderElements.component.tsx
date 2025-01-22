import { Controller } from 'react-hook-form';

import { isFunction } from '@slabs/ds-utils';

import { FormBuilderElementProps } from '@/types';

import { formElements } from './formElements.component';

/**
 * Returns a JSX element that renders a form element with the given properties and control
 *
 * @param {string} type - the type of input element to be returned. e.g text, select etc
 * @param {string} key - the unique identifier of the form control
 * @param {Control} control - The control object to use for the form element.
 * @param {string} value - the value of the form control
 * @param {boolean} required - a flag to indicate if the form control is required
 * @param {Array} options - an array of options for select type input elements
 * @param {boolean} multiple - a flag to indicate if select input element supports multiple options
 * @param {function} onChange - a callback function that is triggered when the value of the form control changes
 * @param {function} onAsyncBlur - a callback function that is triggered when an input element loses focus asynchronously
 * @param {object} props - any other property that may be required to render the form control element
 * @return {JSX.Element} a dynamic form control element based on the type property provided
 *
 */
export const formBuilderElements = ({
    key,
    control,
    ...props
}: FormBuilderElementProps) => {
    return (
        <Controller
            key={key}
            name={key}
            control={control}
            render={({ field, fieldState }) =>
                formElements({
                    key,
                    ...field,
                    ...props,
                    name: props.name || field.name,
                    onChange: (value) => {
                        field.onChange(value);
                        props.onChange(value);
                    },
                    onBlur: (e: any) => {
                        field.onBlur();
                        if (isFunction(props.onBlur)) props.onBlur(e);
                    },
                    error: fieldState.error?.message,
                })
            }
        />
    );
};
