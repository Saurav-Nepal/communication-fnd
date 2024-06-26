import { ReactNode, useMemo } from 'react';

import {
    IsEmptyArray,
    ParseToSelectBoxOption,
    useUncontrolled,
} from '@finnoto/core';

import { SelectBox } from '../../../../../../Components';

const FieldSelectionFieldWrapper = ({
    value,
    onChange,
    selectedOperator,
    operators,
    isDefinitionQueryFilter,
    children,
}: {
    value: any;
    onChange: any;
    selectedOperator?: string;
    operators?: any[];
    isDefinitionQueryFilter?: boolean;
    children: (options: { operator: string }) => ReactNode;
}) => {
    const [operator, handleOnOperatorChange] = useUncontrolled({
        defaultValue: selectedOperator,
        finalValue: operators?.[0]?.name ?? '=',
        onChange: (operator) => {
            onChange?.(value, operator);
        },
    });

    const operatorOptions = useMemo(() => {
        return ParseToSelectBoxOption(
            (operators || []).filter(
                (operator) => !['null', 'notNull'].includes(operator.name)
            ),
            'name'
        );
    }, [operators]);

    return (
        <div className='flex-1 gap-2 p-1 col-flex min-w-[220px]'>
            {!IsEmptyArray(operatorOptions) && isDefinitionQueryFilter && (
                <SelectBox
                    value={operator}
                    options={operatorOptions}
                    mainClassName='w-full max-w-[220px]'
                    size='sm'
                    menuPosition='absolute'
                    onChange={(option) => {
                        handleOnOperatorChange(option.value);
                    }}
                />
            )}
            {children({ operator })}
        </div>
    );
};

export default FieldSelectionFieldWrapper;
