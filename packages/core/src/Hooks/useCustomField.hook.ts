import { IsObject } from 'class-validator';
import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ChoiceListController } from '../backend/ap/business/controllers/choice.list.controller';
import { CustomFieldController } from '../backend/ap/business/controllers/custom.field.controller';
import { ObjectDto } from '../backend/Dtos';
import {
    API_DATE_FORMAT,
    currentDate,
    CUSTOM_FIELD_COLUMN_TYPE,
} from '../Constants';
import {
    Capitalize,
    FormatDisplayDate,
    GetDateValue,
    IsUndefinedOrNull,
    SortArrayObjectBy,
} from '../Utils/common.utils';
import { parseCurrentDate } from '../Utils/filter.utils';
import { FetchData } from './useFetchData.hook';

export const useCustomField = ({
    type_id,
    enabled = true,
}: {
    type_id?: number;
    enabled?: boolean;
}) => {
    const fetchCustomColumns = useCallback(async () => {
        // Check if the type_id is falsy, if so return an empty array
        if (!type_id) return [];

        // Call the FetchData function and await the response
        const { success, response } = await FetchData({
            className: CustomFieldController,
            method: 'list',
            classParams: {
                type_id,
                active: true,
            },
        });

        // If the request was successful
        if (success) {
            return filterAndSortColumnSchema(response?.records || []);
        }

        // If the request was not successful, return an empty array
        return [];
    }, [type_id]);

    const { data: custom_columns, isLoading } = useQuery({
        initialData: [],
        queryKey: ['custom_columns', type_id],
        enabled: enabled,
        queryFn: fetchCustomColumns,
    });

    const parseTypeValue = useCallback((column: ObjectDto, data: ObjectDto) => {
        const value = data[column?.identifier];

        if (IsUndefinedOrNull(value)) return '-';
        if (!column.column_type) return value;
        if (column.column_type_id === 1044) return value?.name;

        switch (column.column_type.toLowerCase()) {
            case 'date':
                return FormatDisplayDate(value);
            case 'datetime':
                return FormatDisplayDate(value, true);
            case 'boolean':
                return value ? 'Yes' : 'No';
            default:
                return value;
        }
    }, []);

    const sanitizeCustomFieldData = useCallback(
        (data: any) => {
            const newCustomFieldData: any = [];

            custom_columns.forEach((column) => {
                const value = parseTypeValue(column, data);

                if (IsUndefinedOrNull(value)) return;

                newCustomFieldData.push({
                    name: column?.name,
                    value,
                    id: column?.id,
                });
            });

            return newCustomFieldData;
        },
        [parseTypeValue, custom_columns]
    );

    const getCustomColumnSchema = useCallback(
        (data: any = {}, types: any = [], columns: any = custom_columns) => {
            let newSchema = {};

            const filterColumns = filterAndSortColumnSchema(columns);

            for (let column of filterColumns) {
                const {
                    column_type_id,
                    column_type,
                    choice_type_id,
                    is_mandatory,
                    name,
                } = column || {};

                let optionalSchema = {};
                if (column_type_id === 1044) {
                    optionalSchema = {
                        type: 'reference_select',
                        controller: ChoiceListController,
                        filterClassParams: { active: true },
                        methodParams: choice_type_id,
                        initMethodSearchParam: choice_type_id,
                        isRequired: is_mandatory,
                        initMethod: 'find',
                        method: 'find',
                    };
                }

                let numberSchema = {};
                if (column_type_id === CUSTOM_FIELD_COLUMN_TYPE.NUMBER) {
                    numberSchema = {
                        max: 9999999999, // added this since @number is only accepting 8 digits but requires 10 digits for phone number
                    };
                }

                let booleanSchema = {};
                if (column_type_id === CUSTOM_FIELD_COLUMN_TYPE.BOOLEAN) {
                    booleanSchema = {
                        isRequired: false,
                        required: false,
                    };
                }

                newSchema = {
                    ...newSchema,
                    [column?.identifier]: {
                        name: column?.identifier,
                        type: column_type.toLowerCase(),
                        required: column?.is_mandatory,
                        isRequired: column?.is_mandatory,
                        label: Capitalize(column?.name || ''),
                        placeholder: `Enter ${name}`,
                        ...optionalSchema,
                        ...numberSchema,
                        ...booleanSchema,
                    },
                };
            }
            return newSchema;
        },
        [custom_columns]
    );

    const getDateDefaultValue = useCallback((column: ObjectDto) => {
        if (!column?.default_value) return null;
        if (column?.default_value === currentDate)
            return parseCurrentDate(column?.default_value);

        return GetDateValue(column?.default_value);
    }, []);

    const getDefaultValues = useCallback(
        (columns: any) => {
            const filterColumns = (columns || custom_columns || [])?.filter(
                (column) => column?.active
            );
            if (!filterColumns?.length) return;
            let newCustomColumn = {};

            for (let column of filterColumns) {
                const {
                    column_type: col_type = '',
                    default_value,
                    identifier,
                } = column || {};

                const column_type = col_type.toLowerCase();
                switch (column_type) {
                    case 'date':
                        newCustomColumn[identifier] =
                            getDateDefaultValue(column);
                        break;
                    case 'datetime':
                        newCustomColumn[identifier] = new Date();
                        break;

                    case 'boolean':
                        newCustomColumn[identifier] = !IsUndefinedOrNull(
                            default_value
                        )
                            ? !!default_value
                            : undefined;
                        break;
                    default:
                        newCustomColumn[identifier] =
                            default_value || undefined;
                }
            }

            return newCustomColumn;
        },
        [custom_columns, getDateDefaultValue]
    );

    const filterAndSortColumnSchema = (columns: any[]) => {
        let filteredColumns = columns?.filter((column) => column?.active);
        return SortArrayObjectBy(filteredColumns, 'priority', 'asc') || [];
    };

    const sanitizedDateValues = useCallback(
        (data: ObjectDto, columns = custom_columns) => {
            let newData = { ...data };

            for (let column of columns) {
                const { column_type: col_type = '', identifier } = column || {};

                const column_type = col_type.toLowerCase();
                const value = newData[identifier];
                if (column_type === 'date' && !!value) {
                    newData[identifier] = GetDateValue(value, API_DATE_FORMAT);
                }
            }

            return newData;
        },
        [custom_columns]
    );
    const parseMaskedDateValues = useCallback(
        (data: ObjectDto, columns = custom_columns) => {
            let newData = { ...data };

            for (let column of columns) {
                const { column_type: col_type = '', identifier } = column || {};

                const column_type = col_type.toLowerCase();
                const value = newData[identifier];
                if (column_type === 'date' && !!value) {
                    newData[identifier] = GetDateValue(value);
                }
                if (column_type === 'choicelist') {
                    if (IsObject(value))
                        newData[identifier] = value?.id || value;
                }
            }
            return newData;
        },
        [custom_columns]
    );

    return {
        custom_columns,
        isLoading,
        sanitizeCustomFieldData,
        getCustomColumnSchema,
        getDefaultValues,
        fetchCustomColumns,
        sanitizedDateValues,
        parseMaskedDateValues,
    };
};
