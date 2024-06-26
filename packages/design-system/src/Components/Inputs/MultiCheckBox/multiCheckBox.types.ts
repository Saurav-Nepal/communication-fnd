import { CheckBoxInterface } from '../CheckBox/checkBox.types';

export interface MultiCheckBoxOption extends CheckBoxInterface {
    value?: string | number;
    label?: string;
}
export interface MultiCheckBoxInterface {
    className?: string;
    checkBoxClassName?: string;
    options: MultiCheckBoxOption[];
    selected?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
}
