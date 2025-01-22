import { AsyncSelect, Label } from '@slabs/ds-core';
import { cn } from '@slabs/ds-utils';

import { useReferenceInput } from '@/hooks/useReferenceInput.hook';
import { ReferenceInputProps } from '@/types';

const ReferenceInput = ({
    isClearable = true,
    placeholder,
    label,
    onChange,
    required,
    error,
    className,
    ...props
}: ReferenceInputProps) => {
    const { value, fields, getOptions } = useReferenceInput(props);

    return (
        <>
            <Label label={label} name={props.name} required={required} />
            <AsyncSelect
                id={props.name}
                value={props.value as any}
                cacheOptions={true}
                loadOptions={getOptions}
                className={cn('flex flex-1 w-full min-w-[200px]', className)}
                // labelKey={fields[0]}
                // secondLabelKey={fields[1]}
                placeholder={placeholder}
                onChange={onChange}
                defaultOptions={value ? [value] : []}
                isClearable={isClearable}
                labelClassName='whitespace-nowrap overflow-hidden text-ellipsis w-40'
            />
            {!!error && (
                <Label className='text-xs' label={error} error={error} />
            )}
        </>
    );
};

export default ReferenceInput;
