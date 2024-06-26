import { ObjectDto } from '../backend/Dtos';
import { FormatDisplayDate, IsUndefinedOrNull } from './common.utils';

export const parseCustomFieldTypeValue = (
    column: ObjectDto,
    data: ObjectDto
) => {
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
};

export const sanitizeCustomFieldData = (data: any, customFields: any[]) => {
    const newCustomFieldData: any = [];

    customFields?.forEach((column) => {
        if (!column.active) return;
        const value = parseCustomFieldTypeValue(column, data);

        if (IsUndefinedOrNull(value)) return;

        newCustomFieldData.push({
            name: column?.name,
            value,
            id: column?.id,
        });
    });

    return newCustomFieldData;
};
