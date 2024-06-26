import { ReactNode } from 'react';
import { Settings } from 'react-slick';

/**
 * Swipper Props Setting
 *
 * This interface extends the `Settings` interface from `react-slick`
 * to define the settings for the Swipper component.
 */
export interface SwipperPropsSetting extends Settings {}

/**
 * Swipper Props
 *
 * This interface defines the props for the Swipper component.
 *
 * @property {ReactNode} children - The children elements to be rendered inside the Swipper component.
 * @property {string} [className] - Optional CSS class name for the Swipper component.
 * @property {SwipperPropsSetting} settings - The settings for the Swipper component, extending the SwipperPropsSetting interface.
 */
export interface SwipperProps {
    children: ReactNode;
    className?: string;
    settings: SwipperPropsSetting;
}
