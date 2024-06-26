import { SelectBoxProps } from '../SelectBox/selectBox.types';

export interface MultiInputProps
    extends Pick<
        SelectBoxProps,
        | 'label'
        | 'labelClassName'
        | 'placeholder'
        | 'size'
        | 'isRequired'
        | 'isDisabled'
        | 'value'
        | 'defaultValue'
        | 'noBorder'
        | 'hasPrefix'
        | 'error'
        | 'warning'
        | 'message'
        | 'messageComponent'
        | 'width'
        | 'mainClassName'
        | 'prefix'
    > {
    onChange?(option: any[]): void;
    validate?(value: any): string | true;
    displayInside?: boolean;
    disabled?: boolean;
}
