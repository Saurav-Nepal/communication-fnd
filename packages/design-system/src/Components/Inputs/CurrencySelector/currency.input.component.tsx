import { InputField } from '../InputField/input.component';
import { InputFieldProps } from '../InputField/input.types';
import CurrencySelector from './currencySelector.component';

type valueProps = {
    currency_id?: number;
    amount?: number;
};
export interface CurrencyInputProps
    extends Omit<InputFieldProps, 'onChange' | 'value'> {
    onChange?: (value: valueProps) => void;
    value: valueProps;
}
export const CurrencyInput = ({
    onChange,
    value: valueProps = {},
    ...rest
}: CurrencyInputProps) => {
    return (
        <InputField
            addonStart={
                <CurrencySelector
                    value={
                        valueProps?.currency_id
                            ? String(valueProps.currency_id)
                            : ''
                    }
                    onSelect={(option) => {
                        onChange({
                            ...valueProps,
                            currency_id: Number(option?.value),
                        });
                    }}
                />
            }
            placeholder={'Enter Amount'}
            onChange={(value) => {
                onChange({
                    ...valueProps,
                    amount: value,
                });
            }}
            value={valueProps?.amount || 0}
            {...rest}
        />
    );
};
