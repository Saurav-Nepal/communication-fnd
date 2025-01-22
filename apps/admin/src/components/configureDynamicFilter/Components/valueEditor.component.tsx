import React, { useMemo } from 'react';
import { useValueEditor, ValueEditorProps } from 'react-querybuilder';

import { getObjectFromArrayByValue } from '@slabs/ds-utils';

import { formElements } from '@/components/formElements/formElements.component';

import { OperatorList } from '../operator.constant';
import { useQueryBuilderValueEditor } from '../useQueryBuilderValueEditor.hook';

const ValueEditor = (props: ValueEditorProps) => {
    const { inputType, fieldData, disabled, operator } = props;
    const { valueAsArray, multiValueHandler } = useQueryBuilderValueEditor({
        ...props,
    });

    const inputCount = useMemo(
        () =>
            getObjectFromArrayByValue(
                Array.from(OperatorList),
                'name',
                operator
            )?.inputs,
        [operator]
    );

    return (
        <>
            {Array.from(Array(inputCount).keys()).map((index) =>
                formElements({
                    key: index + '',
                    type: inputType ?? 'text',
                    value: valueAsArray[index] || '',
                    inputClassName: 'q-builder-input',
                    dict: fieldData.dict,
                    // size: 'sm',
                    style: { minWidth: '120px' },
                    isFilter: true,
                    disabled,
                    onChange: (value) => multiValueHandler(value, index),
                })
            )}
        </>
    );
};

export default ValueEditor;
