import { forwardRef, RefObject } from 'react';
import Slider from 'react-slick';
import { SwipperProps } from './swipper.types';

/**
 * Slider Component
 *
 * This is the slider component that can be used to create a slider in the app.
 *
 * @param {object} props - Component props
 * @param {React.RefObject} ref - Ref forwarded to the Slider component
 * @returns {JSX.Element} - Slider component with children and settings
 *
 *
 * @author Saurav Nepal
 */
export const Swipper = forwardRef(
    ({ children, className, settings }: SwipperProps, ref: RefObject<any>) => {
        return (
            <Slider ref={ref} {...settings} className={className}>
                {children as any}
            </Slider>
        );
    }
);
