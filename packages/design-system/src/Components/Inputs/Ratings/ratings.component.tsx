import { Star } from 'lucide-react';
import React, { useState } from 'react';

import { EmptyFunction } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Typography } from '../../Data-display/Typography/typography.component';
import { FormControl } from '../InputField/formControl.component';
import { inputContainerVariants } from '../InputField/input.types';
import { InputErrorMessage } from '../InputField/inputMessage.component';
import { Label } from '../InputField/label.component';

interface RatingsProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    label?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    containerClassName?: string;
    error?: string;
    name?: string;
    required?: boolean;
    labelClassName?: string;
    disabled?: boolean;
}

interface RatingStarProps {
    value: number;
    index: number;
    setValue: (value: number) => void;
    hoveredValue: number;
    setHoveredValue: (value: number) => void;
    onChange: (value: number) => void;
    disabled?: boolean;
}

const Ratings = React.forwardRef(
    (
        {
            onChange,
            className,
            label,
            size = 'md',
            value: val,
            containerClassName,
            error,
            labelClassName,
            name,
            required,
            disabled,
        }: RatingsProps,
        ref: any
    ) => {
        const [value, setValue] = useState(val || 0);
        const [hoveredValue, setHoveredValue] = useState(val || 0);

        const containerClass = cn(
            inputContainerVariants({
                containerSize: size,
                disabled: disabled,
            }),
            containerClassName
        );

        return (
            <FormControl {...{ containerClass }}>
                <Label
                    {...{
                        label,
                        error,
                        name,
                        required,
                    }}
                    className={labelClassName}
                />
                <div className={cn('flex w-fit gap-2', className)}>
                    <div className='flex'>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <RatingStar
                                key={item}
                                value={value}
                                index={item}
                                setValue={setValue}
                                hoveredValue={hoveredValue}
                                setHoveredValue={setHoveredValue}
                                onChange={onChange}
                                disabled={disabled}
                            />
                        ))}
                    </div>
                    <Typography type='info'>{hoveredValue} out of 5</Typography>
                </div>
                <InputErrorMessage {...{ error }} />
            </FormControl>
        );
    }
);

export default Ratings;

const RatingStar = (props: RatingStarProps) => {
    const {
        hoveredValue,
        index,
        setHoveredValue,
        setValue,
        value,
        onChange,
        disabled,
    } = props;

    const handleHover = () => {
        setHoveredValue(index);
    };

    const handleLeave = () => {
        setHoveredValue(value);
    };

    const handleClick = () => {
        setValue(index);
        onChange(index);
    };

    return (
        <div
            onMouseOver={!disabled ? handleHover : EmptyFunction}
            onMouseLeave={!disabled ? handleLeave : EmptyFunction}
            onClick={!disabled ? handleClick : EmptyFunction}
            className={cn('cursor-pointer', {
                'cursor-not-allowed': disabled,
            })}
        >
            <Star
                size={20}
                className={cn('text-base-secondary transition-all', {
                    'text-warning': index <= hoveredValue,
                })}
                fill={index <= hoveredValue ? 'hsl(var(--wa))' : 'transparent'}
            />
        </div>
    );
};
