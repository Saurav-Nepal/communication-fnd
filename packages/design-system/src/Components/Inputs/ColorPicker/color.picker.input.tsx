import { InputField } from '../InputField/input.component';
import { InputFieldProps } from '../InputField/input.types';
import { ColorPicker } from './color.picker.component';
import { ColorPickerProps } from './color.picker.types';

interface ColorPickerInputProps
    extends Omit<ColorPickerProps, 'children'>,
        Omit<InputFieldProps, 'type' | 'value' | 'defaultValue' | 'onChange'> {}

export const ColorPickerInput = ({
    value,
    defaultValue,
    onChange,
    withAlpha,
    align = 'start',
    side,
    offsetX,
    offsetY,
    ...rest
}: ColorPickerInputProps) => {
    return (
        <ColorPicker
            {...{
                value,
                defaultValue,
                onChange,
                align,
                side,
                offsetX,
                offsetY,
                withAlpha,
            }}
        >
            {(value, setValue) => (
                <InputField
                    value={value}
                    onChange={setValue}
                    addonStart={
                        <div
                            className='border rounded shadow-md cursor-pointer'
                            style={{
                                height: '20px',
                                width: '20px',
                                background: value,
                            }}
                        ></div>
                    }
                    {...rest}
                />
            )}
        </ColorPicker>
    );
};
