import { endOfDay, startOfDay } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { Option, ValueEditorProps } from 'react-querybuilder';

import {
    APIDateFormat,
    BooleanEnum,
    DATA_TYPE,
    GetDateValue,
    GetObjectFromArray,
    IsUndefined,
    OperatorList,
    ParseToSelectBoxOption,
    useQueryBuilderValueEditor,
} from '@finnoto/core';

import { ReferenceMultiSelectFilter } from '../../../Components';
import { LateralDateInput } from '../../../Components/Inputs/LateralDateInput/lateralDateInput';
import { BooleanSelectFilter } from '../../../Components/Inputs/SelectBox/boolean.select.filter';
import { cn, IsBoolean } from '../../../Utils/common.ui.utils';
import { formElements } from '../../FormBuilder/formElements.component';

/**
 * Renders a value editor component based on the inputType and operator props.
 *
 * @param {object} props - The props object containing inputType, fieldData, disabled,
 * operator, handleOnChange, and any other additional props.
 * @return {JSX.Element} A JSX element representing the value editor component.
 *
 * @author Rumesh Udash
 */

const ValueEditor = (props: ValueEditorProps) => {
    const { inputType, fieldData, disabled, operator, handleOnChange, schema } =
        props;

    const getBooleanValue = useCallback((value) => {
        if (IsUndefined(value) || !value?.length) return undefined;
        return value[0];
    }, []);

    const parseValue = useMemo(() => {
        if (IsBoolean(props?.value)) {
            return props?.value ? BooleanEnum.TRUE : BooleanEnum.FALSE;
        }
        return props?.value;
    }, [props?.value]);

    const { valueAsArray, multiValueHandler } = useQueryBuilderValueEditor({
        ...props,
        value: parseValue,
        // skipHook: true,
    });

    const inputCount = useMemo(
        () =>
            GetObjectFromArray(Array.from(OperatorList), 'name', operator)
                ?.inputs,
        [operator]
    );

    const isMulti = [
        'contains',
        'notContains',
        'not contains',
        'in',
        'notIn',
    ].includes(operator);

    const lateralFields = useMemo(() => {
        return ((schema.fields as Option[]) ?? [])
            .filter(
                (field) =>
                    field.type === DATA_TYPE.DATE ||
                    field.type === DATA_TYPE.DATE_TIME
            )
            .map((field) => ({ ...field, value: field.name }));
    }, [schema.fields]);

    const getType = (type: string) => {
        if (type === DATA_TYPE.CURRENCY) {
            return DATA_TYPE.NUMBER;
        }
        if (type === DATA_TYPE.DATE_TIME) {
            return DATA_TYPE.DATE;
        }
        return type;
    };

    const getValue = useCallback(
        (value: any, index: number = 0) => {
            if (!value) return value;
            if ([DATA_TYPE.DATE_TIME].includes(inputType as any)) {
                if (['>', '<='].includes(operator)) {
                    return endOfDay(new Date(value));
                }
                return new Date(
                    index !== 0
                        ? endOfDay(new Date(value))
                        : startOfDay(new Date(value))
                ).toISOString();
            }
            if ([DATA_TYPE.DATE].includes(inputType as any)) {
                return APIDateFormat({ date: GetDateValue(value) });
            }
            if ([DATA_TYPE.BOOLEAN].includes(inputType as any)) {
                return value === BooleanEnum.TRUE;
            }
            return value;
        },
        [inputType, operator]
    );

    // useEffect(() => {
    //     if (![DATA_TYPE.DATE, DATA_TYPE.DATE_TIME].includes(inputType as any))
    //         return;
    //     if (inputCount > 1) return;

    //     handleOnChange(getValue(valueAsArray[0]));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [getValue, inputCount, operator]);

    if (inputType === DATA_TYPE.DATE_LATERAL) {
        return (
            <LateralDateInput
                key={inputType + '_' + fieldData.name}
                size='sm'
                value={valueAsArray}
                customLateralDates={lateralFields}
                onChange={handleOnChange}
            />
        );
    }

    if (['matches', 'not matches'].includes(operator)) {
        return formElements({
            key: inputType + '_' + fieldData.name,
            type: 'select',
            value: valueAsArray[0] || '',
            inputClassName: 'q-builder-input min-w-[150px]',
            className: 'min-w-[250px]',
            size: 'sm',
            isFilter: true,
            disabled,
            options: ParseToSelectBoxOption(schema.fields, 'name'),
            onChange: (value) => handleOnChange(value),
        });
    }

    return (
        <>
            {Array.from(Array(inputCount).keys()).map((index) => {
                const value =
                    inputCount > 1 ? valueAsArray[index] : valueAsArray;

                if (inputType === 'reference_select' && isMulti) {
                    return (
                        <ReferenceMultiSelectFilter
                            key={index + inputType + '_' + fieldData.name}
                            labelClassName={
                                'text-sm w-full max-w-[250px] rounded-l h-[32px] '
                            }
                            disabled={disabled}
                            value={value?.map(Number)}
                            onChangeFilter={handleOnChange}
                            selectedSuffix='Selected'
                            placeholder={`Select ${fieldData?.label} ...`}
                            controller_type={fieldData?.controller_type}
                            method={fieldData.method}
                            methodParams={fieldData.methodParams}
                            filterClassParams={{
                                active: true,
                                ...fieldData?.classParams,
                                type: 'multi_select', // for cache
                            }}
                            isCurrentUserShow={
                                fieldData?.attributes?.isCurrentUserShow
                            }
                            className={props?.className}
                        />
                    );
                }

                if (getType(inputType) === 'boolean') {
                    return (
                        <BooleanSelectFilter
                            value={getBooleanValue(value)}
                            key={index + inputType + '_' + fieldData.name}
                            onChange={(option) => {
                                return handleOnChange(getValue(option.value));
                            }}
                            menuPosition='absolute'
                            size='sm'
                        />
                    );
                }

                return formElements({
                    key: index + inputType + '_' + fieldData.name,
                    type: getType(inputType),
                    value: value !== undefined ? value : '',
                    mainClassName: cn('w-full max-w-[250px]', props?.className),
                    containerClassName: cn(
                        'w-full max-w-[250px]',
                        props?.className
                    ),
                    hideClear: true,

                    groupClassName: cn('w-full min-w-0', props?.className),
                    inputAddOnClassName: cn('w-full min-w-0', props?.className),
                    inputClassName: cn(
                        'q-builder-input w-full min-w-[150px]',
                        props?.className
                    ),
                    className: cn('w-full max-w-[250px]', props?.className),
                    controller: fieldData.controller,
                    method: fieldData.method,
                    methodParams: fieldData.methodParams,
                    filterClassParams: fieldData.classParams,
                    classParams: fieldData.classParams,
                    initMethod: fieldData.initMethod,
                    valueKey: fieldData.valueKey,
                    idsKey: fieldData.idsKey,
                    options: fieldData.options,
                    menuPosition: 'fixed',
                    size: 'sm',
                    minLength: 0,
                    isFilter: true,
                    isMulti,
                    disabled,
                    sublabelKey: fieldData?.sublabelKey,
                    placeholder: fieldData?.label,
                    onChange: (value) => {
                        if (inputCount > 1)
                            return multiValueHandler(
                                getValue(value, index),
                                index
                            );

                        if (
                            inputType === 'text' &&
                            fieldData?.name === 'identifier'
                        ) {
                            handleOnChange(getValue(value.toUpperCase()));
                        } else {
                            handleOnChange(getValue(value));
                        }
                    },
                    isCurrentUserShow: fieldData?.attributes?.isCurrentUserShow,
                });
            })}
        </>
    );
};

export default ValueEditor;
