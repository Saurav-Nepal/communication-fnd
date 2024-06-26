import { ColorResult } from 'react-color';

import { PopoverProps } from '../../Surfaces/Popover/popover.types';

export interface ColorPickerProps
    extends Pick<
        PopoverProps,
        'align' | 'side' | 'offsetX' | 'offsetY' | 'autoWidth'
    > {
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
}
