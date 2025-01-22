import { DatePicker, Input, Label, Switch, Textarea } from '@slabs/ds-core';
import { cn } from '@slabs/ds-utils';

import { InputElementProps } from '@/types';

import JSONInput from '../inputs/jsonInput.component';
import ReferenceInput from '../inputs/referenceInput.component';
import { ScriptInput } from '../inputs/scriptInput.component';

const formElements = ({
    type = 'text',
    key,
    value,
    required,
    options,
    multiple,
    dateFormat,
    isFilter,
    onChange = () => {},
    onAsyncBlur,
    error,
    dict,
    payload,
    ...props
}: InputElementProps) => {
    switch (type) {
        case 'text':
        case 'number':
        case 'email':
        case 'url':
            return (
                <>
                    {props.label && (
                        <Label
                            label={props.label}
                            name={props.name}
                            required={required}
                        />
                    )}
                    <Input
                        key={key}
                        type={type}
                        value={value || ''}
                        hasError={!!error}
                        id={props.name}
                        // onAsyncBlur={onAsyncBlur}
                        {...{
                            required,
                            onChange: (e) => onChange(e.target.value),
                        }}
                        {...props}
                    />
                    {!!error && (
                        <Label
                            className='text-xs'
                            label={error}
                            error={error}
                        />
                    )}
                </>
            );

        case 'password':
            return (
                <>
                    {props.label && (
                        <Label
                            label={props.label}
                            name={key}
                            required={required}
                        />
                    )}
                    <Input
                        key={key}
                        id={props.name}
                        type='password'
                        value={value || ''}
                        {...{
                            required,
                            onChange: (e) => onChange(e.target.value),
                        }}
                        {...props}
                    />
                    {!!error && (
                        <Label
                            className='text-xs'
                            label={error}
                            error={error}
                        />
                    )}
                </>
            );

        case 'textarea':
            return (
                <>
                    {props.label && (
                        <Label
                            label={props.label}
                            name={key}
                            required={required}
                        />
                    )}
                    <Textarea
                        key={key}
                        id={props.name}
                        value={value || ''}
                        {...{
                            required,
                            onChange: (e) => onChange(e.target.value),
                        }}
                        {...props}
                    />
                    {!!error && (
                        <Label
                            className='text-xs'
                            label={error}
                            error={error}
                        />
                    )}
                </>
            );

        case 'boolean':
            return (
                <div className='flex flex-col'>
                    {props.label && (
                        <Label
                            label={props.label}
                            name={key}
                            required={required}
                        />
                    )}
                    <Switch
                        key={key}
                        checked={value}
                        className={cn('my-2', props.className)}
                        {...{ required, onChange }}
                        {...props}
                    />
                    {!!error && (
                        <Label
                            className='text-xs'
                            label={error}
                            error={error}
                        />
                    )}
                </div>
            );
        case 'reference':
            return (
                <ReferenceInput
                    key={key}
                    value={value}
                    error={error}
                    onChange={(value) => onChange(value)}
                    dict={dict}
                    {...{ required }}
                    {...props}
                />
            );
        case 'date':
            return (
                <div className='flex flex-col'>
                    {props.label && (
                        <Label
                            label={props.label}
                            name={key}
                            required={required}
                        />
                    )}
                    <DatePicker
                        key={key}
                        value={value}
                        onChange={(date) => onChange(date)}
                        {...{ required }}
                        {...props}
                    />
                    {!!error && (
                        <Label
                            className='text-xs'
                            label={error}
                            error={error}
                        />
                    )}
                </div>
            );
        case 'datetime':
            return (
                <div className='flex flex-col'>
                    {props.label && (
                        <Label
                            label={props.label}
                            name={key}
                            required={required}
                        />
                    )}
                    <DatePicker
                        key={key}
                        value={value}
                        onChange={(date) => onChange(date)}
                        {...{ required }}
                        {...props}
                        timePicker
                    />
                    {!!error && (
                        <Label
                            className='text-xs'
                            label={error}
                            error={error}
                        />
                    )}
                </div>
            );
        case 'script':
            return (
                <ScriptInput
                    key={key}
                    value={value}
                    payload={payload}
                    column={dict}
                    onSave={(value, ...args) => {
                        // const { payload, setSubmitting } = props;
                        // if (args.length && args[0].saveWhileTyping) {
                        //checking if args contain data or not. Proceed into 'if' only when saveWhileTyping has some value
                        // submitGenericForm({
                        //     payload,
                        //     newValues: { [column.name]: value },
                        //     setSubmitting,
                        // });
                        // }

                        onChange(value);
                    }}
                    {...props}
                />
            );
        case 'json':
            return (
                <JSONInput
                    key={key}
                    value={value}
                    payload={payload}
                    column={dict}
                    {...{ required, onChange }}
                    {...props}
                />
            );
        case 'hidden':
            return <></>;
        default:
            if (isFilter) return <></>;
            return (
                <div className='form-control'>
                    <label className='label label-text text-color-primary'>
                        {props.label}
                    </label>
                </div>
            );
    }
};

export { formElements };
