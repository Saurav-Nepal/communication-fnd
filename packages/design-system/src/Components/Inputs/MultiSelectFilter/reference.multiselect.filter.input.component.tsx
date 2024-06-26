import { cn } from '../../../Utils/common.ui.utils';
import { FormControl } from '../InputField/formControl.component';
import {
    InputErrorMessage,
    InputMessage,
} from '../InputField/inputMessage.component';
import { Label } from '../InputField/label.component';
import { ReferenceMultiSelectInterface } from './multiSelectFilter.types';
import { ReferenceMultiSelectFilter } from './referenceMultiSelectFilter.component';

interface ReferenceMultiSelectFilterInputProps
    extends ReferenceMultiSelectInterface {
    required?: boolean;
    label?: string;
    className?: string;
    containerClassName?: string;
    error?: string;
    [key: string]: any;
}
export const ReferenceMultiSelectFilterInput = ({
    className,
    value,
    containerClassName,
    label,
    error,
    id,
    name,
    required,
    warning,
    message,
    messageComponent,
    ...props
}: ReferenceMultiSelectFilterInputProps) => {
    return (
        <FormControl
            {...{
                className: cn(className, {
                    'valid-input': value?.length > 0,
                    containerClassName,
                }),
            }}
        >
            <Label
                {...{
                    label,
                    error,

                    name: name || label?.toString(),
                    required,
                    id,
                }}
                className='text-xs'
            />
            <ReferenceMultiSelectFilter
                onChangeFilter={(val) => props?.onChange(val)}
                value={value}
                {...props}
            />
            <InputErrorMessage {...{ error, warning }} />
            <InputMessage {...{ message, messageComponent, error }} />
        </FormControl>
    );
};
