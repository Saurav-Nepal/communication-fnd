import { forwardRef } from 'react';

import { cn } from '../../../../Utils/common.ui.utils';
import { Button } from '../../../Inputs/Button/button.component';
import { ButtonProps } from '../../../Inputs/Button/button.types';

export const AddFilterButton = forwardRef(
    ({ className, ...props }: ButtonProps, ref) => {
        return (
            <Button
                appearance='ghost'
                size='xs'
                className={cn(
                    'border-dashed hover:bg-base-200 border-base-tertiary hover:border-solid font-normal',
                    className
                )}
                {...props}
                ref={ref}
            >
                Add Filter +
            </Button>
        );
    }
);
