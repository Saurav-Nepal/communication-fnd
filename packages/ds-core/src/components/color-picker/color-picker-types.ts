import { HSLColor, RGBColor } from 'react-color';

export interface ColorResult {
    hex: string;
    hsl: HSLColor;
    rgb: RGBColor;
}
export interface ColorPickerProps {
    className?: string;
    onChange?: (color: string, colorResult: ColorResult) => void;
    value?: string;
    defaultValue?: string;
    withAlpha?: boolean;
    children?:
        | React.ReactNode
        | ((
              color: string,
              setColor: (color: string) => void
          ) => React.ReactNode);
    align?: 'start' | 'center' | 'end';
    side?: 'bottom' | 'left' | 'right' | 'top';
    offsetX?: number;
    offsetY?: number;
    disabled?: boolean;
}
