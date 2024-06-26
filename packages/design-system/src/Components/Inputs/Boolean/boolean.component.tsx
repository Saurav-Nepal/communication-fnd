import { SelectBox } from '../SelectBox/selectBox.component';
import { SelectBoxProps } from '../SelectBox/selectBox.types';

interface BooleanInputProps
    extends Pick<
        SelectBoxProps,
        | 'size'
        | 'menuPosition'
        | 'menuPlacement'
        | 'autoFocus'
        | 'error'
        | 'warning'
        | 'message'
        | 'messageComponent'
    > {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
    positiveLabel?: string;
    negativeLabel?: string;
}

export const BooleanInput = ({
    onChange,
    positiveLabel,
    negativeLabel,
    ...props
}: BooleanInputProps) => {
    return (
        <SelectBox
            options={[
                {
                    label: positiveLabel ?? 'Yes',
                    value: true,
                },
                {
                    label: negativeLabel ?? 'No',
                    value: false,
                },
            ]}
            menuPosition='absolute'
            {...props}
            onChange={(option) => onChange?.(option.value)}
        />
    );
};
