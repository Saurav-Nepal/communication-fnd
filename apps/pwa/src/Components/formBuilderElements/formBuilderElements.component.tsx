import { Controller } from 'react-hook-form';

import {
    FormBuilderElementProps,
    GetDateValue,
    IsArray,
    IsFunction,
    IsUndefinedOrNull,
} from '@finnoto/core';
import {
    formElements,
    ListSelectInput,
    MobileMaskedDatePickerInput,
    NestedListSelectInput,
} from '@finnoto/design-system';

import { MobileMultipleFileUpload } from '@Components/MobileUploader/mobileMultipleFile.upload.component';

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
 * @author Rumesh Udash
 */
const formBuilderElements = ({
    key,
    control,
    ...props
}: FormBuilderElementProps) => {
    return (
        <Controller
            key={key}
            name={key}
            control={control}
            render={({ field, fieldState }) => {
                if (['date', 'masked_date'].includes(props?.type)) {
                    return (
                        <MobileMaskedDatePickerInput
                            isRequired={props?.required}
                            {...field}
                            {...props}
                            value={GetDateValue(field?.value)}
                            {...{
                                onChange: (value) => {
                                    field.onChange(value);
                                    props.onChange(value);
                                },
                                onBlur: (e) => {
                                    field.onBlur();
                                    if (IsFunction(props.onBlur))
                                        props.onBlur(e);
                                },
                                error: fieldState.error?.message,
                            }}
                        />
                    );
                }
                if (['reference_select'].includes(props?.type)) {
                    return (
                        <ListSelectInput
                            {...field}
                            {...props}
                            value={field?.value}
                            isRequired={props?.required}
                            name={props?.name || field?.name || props?.label}
                            {...{
                                onSelect: (option) => {
                                    const value = IsUndefinedOrNull(
                                        option?.value
                                    )
                                        ? null
                                        : option?.value;
                                    field.onChange(value);

                                    props.onChange(value);
                                    if (IsFunction(props?.onOptionChange))
                                        props?.onOptionChange(option);
                                    if (IsFunction(props?.onOptionChangeOnly))
                                        props?.onOptionChangeOnly(option);
                                },
                                onBlur: (e) => {
                                    field.onBlur();
                                    if (IsFunction(props.onBlur))
                                        props.onBlur(e);
                                },
                                error: fieldState.error?.message,
                            }}
                            isAsync
                        />
                    );
                }
                if (['select'].includes(props?.type)) {
                    return (
                        <ListSelectInput
                            isRequired={props?.required}
                            {...field}
                            {...props}
                            name={props?.name || field?.name || props?.label}
                            {...{
                                onSelect: (option) => {
                                    const value = IsUndefinedOrNull(
                                        option?.value
                                    )
                                        ? null
                                        : option?.value;
                                    field.onChange(value);
                                    props.onChange(value);
                                    if (IsFunction(props?.onOptionChange))
                                        props?.onOptionChange(option);
                                    if (IsFunction(props?.onOptionChangeOnly))
                                        props?.onOptionChangeOnly(option);
                                },
                                onBlur: (e) => {
                                    field.onBlur();
                                    if (IsFunction(props.onBlur))
                                        props.onBlur(e);
                                },
                                error: fieldState.error?.message,
                            }}
                        />
                    );
                }
                if (['nested_ref_select'].includes(props?.type)) {
                    return (
                        <NestedListSelectInput
                            {...field}
                            {...props}
                            value={field?.value}
                            isRequired={props?.required}
                            name={props?.name || field?.name || props?.label}
                            key={key}
                            onSelect={(option) => {
                                field.onChange(option?.value || null);

                                if (props.isMulti && IsArray(option)) {
                                    props.onChange(
                                        option.flatMap(
                                            (opt: any) => opt.value
                                        ) || null
                                    );
                                    return;
                                }
                                props.onChange(option?.value || null);
                            }}
                            disabled={props.disabled}
                        />
                    );
                }
                if (
                    [
                        'small_multiple_file_upload',
                        'drag_drop_file_upload',
                    ].includes(props?.type)
                ) {
                    return (
                        <MobileMultipleFileUpload
                            {...field}
                            {...props}
                            onFileUpload={(data) => {
                                if (data?.length < 0) {
                                    field.onChange(null);
                                    return props.onChange(null);
                                }
                                field.onChange([...data]);
                                props.onChange([...data]);
                            }}
                            title={props?.label}
                            ellipse_length={10}
                            required={props.required}
                            error={fieldState.error?.message}
                        />
                    );
                }
                let element = formElements({
                    key,
                    ...field,
                    ...props,
                    name: props.name || field.name,
                    onChange: (value) => {
                        field.onChange(value);
                        props.onChange(value);
                    },
                    onBlur: (e) => {
                        field.onBlur();
                        if (IsFunction(props.onBlur)) props.onBlur(e);
                    },
                    error: fieldState.error?.message,
                });

                return element;
            }}
        />
    );
};
export default formBuilderElements;
