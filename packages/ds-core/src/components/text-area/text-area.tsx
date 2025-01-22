import * as React from 'react';

import { cn } from '@slabs/ds-utils';

import { polymorphicFactory } from '../polymorphic-component/polymorphic-component';
import { TextAreaProps, textareaVariants } from './text-area.types';

const Textarea = polymorphicFactory<HTMLTextAreaElement, TextAreaProps>(
    (
        { className, color, radius, variant, shadow, children, ...props },
        ref
    ) => {
        return (
            <div className='flex-1 w-full'>
                <textarea
                    className={cn(
                        textareaVariants({ color, radius, variant, shadow }),
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </textarea>
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
