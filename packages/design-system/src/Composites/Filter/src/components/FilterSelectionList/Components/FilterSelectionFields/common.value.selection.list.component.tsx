import { Debounce } from '@finnoto/core';

import ValueEditor from '../../../../../../QueryBuilder/Components/valueEditor.component';
import FieldSelectionFieldWrapper from '../fieldSelectionFieldWrapper.component';

export const CommonValueSelectionList = (props: {
    value: any;
    onChange: any;
    selectedOperator?: string;
    field?: string;
    type?: string;
    operators?: any[];
    definition?: any;
    isDefinitionQueryFilter?: boolean;
}) => {
    const { value, onChange, definition } = props;

    return (
        <FieldSelectionFieldWrapper {...props}>
            {({ operator }) => (
                <ValueEditor
                    field={definition?.name ?? props.field}
                    fieldData={{
                        label: definition?.label ?? props.field,
                        name: definition?.name ?? props.field,
                    }}
                    operator={operator}
                    level={0}
                    path={[]}
                    inputType={definition?.inputType ?? props.type}
                    rule={{
                        field: definition?.name ?? props.field,
                        operator,
                        value,
                    }}
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
