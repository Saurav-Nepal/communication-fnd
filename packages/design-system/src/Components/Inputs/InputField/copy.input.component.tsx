import { useCallback } from 'react';
import { Toast } from '../../../Utils';
import { copyTextToClipboard } from '../../../Utils/component.utils';

const InputSizes = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
};

const ButtonSizes = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
};

export const CopyInput = ({
    value,
    label,
    size = 'md',
}: {
    value: any;
    label?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
    const handleCopy = useCallback(() => {
        copyTextToClipboard(value);
        Toast.success({ description: 'Succssfully copied to clipboard!' });
    }, [value]);

    return (
        <div className='form-control'>
            {label && (
                <label className='label label-text-alt text-base-primary'>
                    <span>{label}</span>
                </label>
            )}
            <div className='input-group'>
                <input
                    className={`input input-bordered w-full ${InputSizes[size]}`}
                    value={value}
                    onClick={(e: any) => e.target.select()}
                    readOnly
                />
                <button
                    className={`btn btn-ghost border-base-300 border-l-0 ${ButtonSizes[size]}`}
                    onClick={handleCopy}
                >
                    Copy
                </button>
            </div>
        </div>
    );
};
