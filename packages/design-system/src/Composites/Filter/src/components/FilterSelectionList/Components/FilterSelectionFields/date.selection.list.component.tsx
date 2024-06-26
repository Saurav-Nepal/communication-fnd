import { Debounce } from '@finnoto/core';

import ValueEditor from '../../../../../../QueryBuilder/Components/valueEditor.component';
import FieldSelectionFieldWrapper from '../fieldSelectionFieldWrapper.component';

export const DateSelectionList = (props: {
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
                    field='date'
                    fieldData={{ label: 'date', name: 'date' }}
                    operator={operator}
                    level={0}
                    path={[]}
                    inputType='date'
                    rule={{ field: 'date', operator, value }}
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
