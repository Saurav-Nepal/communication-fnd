import { BucketItem, getCardColorShades, getColorShades } from '@finnoto/core';

import { IconButton, InputField } from '../../../Components';

import { DeleteSvgIcon } from 'assets';

interface BucketInputProps {
    /**
     * Value of the bucket item.
     */
    value: BucketItem;

    /**
     * Maximum value of the input field.
     */
    maxValue?: number;

    /**
     * Suffix to be displayed after the input field.
     */
    suffix?: string;

    /**
     * Indicates whether the input field is disabled.
     */
    disabled?: boolean;

    /**
     * Indicates whether the bucket is the end bucket.
     */
    isEndBucket?: boolean;

    /**
     * Indicates whether the bucket is the start bucket.
     */
    isStartBucket?: boolean;

    /**
     * Callback function to be called when the input value changes.
     */
    onChange?: (value: BucketItem) => void;

    /**
     * Callback function to be called when the delete icon is clicked.
     */
    onDelete?: () => void;

    /**
     * Background color of the bucket.
     */
    color?: string;
}

/**
 * Renders a bucket input component with a grid layout. The component displays a label, an input field, and an icon button.
 */
export const BucketInput = ({
    value,
    maxValue,
    suffix,
    isStartBucket,
    isEndBucket,
    disabled,
    onChange,
    onDelete,
    color,
}: BucketInputProps) => {
    /**
     * Updates the end value of the bucket.
     *
     * @param {number} endValue - The new end value.
     */
    const handleChange = (endValue: number) => {
        onChange?.({
            ...value,
            end: endValue ?? undefined,
        });
    };

    /**
     * Validates the end value of the bucket.
     *
     * If the bucket's end value is not set or is less than the start value,
     * the end value is updated to the start value + 1.
     */
    const validateEndValue = () => {
        // If the end value is not set or is less than the start value
        if (!value.end || value.start > value.end) {
            handleChange(value.start + 1);
        }
    };

    return (
        <div className='grid grid-cols-2 gap-4 px-3 py-2 border rounded-lg border-polaris-border'>
            <div className='flex items-center gap-2 font-medium'>
                <div
                    className='w-6 h-6 rounded'
                    style={{
                        backgroundColor: color,
                    }}
                ></div>

                {value.key}
            </div>
            <div className='items-center gap-2 row-flex'>
                {/* If it is the end bucket, display "Greater than" text */}
                {isEndBucket && <span>Greater than</span>}

                {/* Display the start value of the bucket */}
                {!isStartBucket && (
                    <InputField
                        type='number'
                        groupClassName='min-w-0'
                        inputClassName='min-w-0 !w-[60px]'
                        /* If it is the end bucket, display the start value - 1 */
                        value={
                            isEndBucket
                                ? Math.max(value.start - 1, 0)
                                : value.start
                        }
                        size='sm'
                        disabled
                    />
                )}
                {/* If it is not the start and not the end bucket, display a dash */}
                {!isStartBucket && !isEndBucket ? '-' : null}
                {/* If it is the start bucket, display "Less than" text */}
                {isStartBucket ? 'Less than ' : null}

                {/* Display the end value of the bucket */}
                {!isEndBucket && (
                    <InputField
                        type='number'
                        groupClassName='min-w-0'
                        inputClassName='min-w-0 !w-[60px]'
                        /* If it is the start bucket, display the end value + 1 */
                        value={isStartBucket ? value.end + 1 : value.end}
                        max={maxValue}
                        maxDecimals={0}
                        size='sm'
                        /* Call the handleChange function when the value changes */
                        onChange={handleChange}
                        /* Call the validateEndValue function when the input field loses focus */
                        onBlur={validateEndValue}
                        disabled={disabled}
                    />
                )}

                {/* Display the suffix. eg: "Days" */}
                <span>{suffix}</span>

                {/* Display the delete button if the bucket is not disabled */}
                {!disabled && (
                    <IconButton
                        icon={DeleteSvgIcon}
                        onClick={() => onDelete?.()}
                        appearance='ghost'
                        className='text-error hover:bg-polaris-bg-surface-hover'
                    />
                )}
            </div>
        </div>
    );
};
