import { ColorPicker as ColorPickerComponent } from '../../../Components/Inputs/ColorPicker/color.picker.component';
import { ColorPickerProps } from '../../../Components/Inputs/ColorPicker/color.picker.types';

export const ColorPicker = (props: ColorPickerProps) => {
    return (
        <ColorPickerComponent {...props}>
            {(color) => (
                <div
                    className='border rounded shadow-md cursor-pointer'
                    style={{
                        height: '30px',
                        width: '30px',
                        background: color,
                    }}
                ></div>
            )}
        </ColorPickerComponent>
    );
};
