import { cn } from '../../../Utils/common.ui.utils';
import { LabelInterface } from './input.types';

export const Label = ({
    label,
    error,
    verified,
    name,
    required,
    className,
    rightComponent,
    value,
    id,
}: LabelInterface) => {
    if (!label) return <></>;
    return (
        <label
            className={cn(
                'label top-label gap-2 whitespace-nowrap',
                {
                    'text-error': error,
                    'input-verified': verified && !error && !!value,
                },
                className
            )}
            htmlFor={id || name}
        >
            <span>
                {label} {required && <span className='text-error'>*</span>}
            </span>
            {rightComponent}
        </label>
    );
};
