import { SelectBoxOption } from '../SelectBox/selectBox.types';

export interface LateralDateInputProps {
    value?: any[];
    size?: 'sm' | 'md' | 'lg';
    customLateralDates?: SelectBoxOption[];
    onChange?: (value: any[]) => void;
}
