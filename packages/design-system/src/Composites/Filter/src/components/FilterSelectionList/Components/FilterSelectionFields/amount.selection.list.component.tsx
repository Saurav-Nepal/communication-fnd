import { Debounce } from '@finnoto/core';

import ValueEditor from '../../../../../../QueryBuilder/Components/valueEditor.component';
import FieldSelectionFieldWrapper from '../fieldSelectionFieldWrapper.component';

export const AmountSelectionList = (props: {
    value: any;
    onChange: any;
    selectedOperator?: string;
    operators?: any[];
}) => {
    const { value, onChange } = props;

    return (
        <FieldSelectionFieldWrapper {...props}>
            {({ operator }) => (
                <ValueEditor
                    field='amount'
                    fieldData={{ label: 'Amount', name: 'amount' }}
                    operator={operator}
                    level={0}
                    path={[]}
                    inputType='number'
                    rule={{ field: 'amount', operator, value }}
                    handleOnChange={(value) =>
                        Debounce(onChange, 500)(value, operator)
                    }
                    valueSource='value'
                    value={value}
                    schema={
                        {
                            fields: [],
                        } as any
                    }
                />
            )}
        </FieldSelectionFieldWrapper>
    );
};
