import { InputProps } from '../inputs/input/input.types';
import {
    GenericSelectBoxProps,
    SelectBoxOptionType,
    SelectBoxValueType,
    SuffixPrefixOptionType,
} from '../select-box/select-box.types';

export interface MultiSelectBoxProps
    extends Omit<
        GenericSelectBoxProps<SelectBoxValueType[]>,
        'onOptionChange'
    > {
    onOptionChange?: (option?: SelectBoxOptionType[]) => void;
    displayLimit?: number;
    suffix?: SuffixPrefixOptionType;
    variants?: {
        variant?: InputProps['variant'];
        color?: InputProps['color'];
        size?: InputProps['size'];
        radius?: InputProps['radius'];
    };
}
