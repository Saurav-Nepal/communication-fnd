import { ObjectDto } from '@finnoto/core';

import { GenericFilterListType } from '../list-filter-form';

export const parseDefinitionColumnTypes = (
    definitionType: string
): { type: GenericFilterListType | 'currency'; props?: ObjectDto } => {
    if (definitionType === 'boolean') return { type: 'boolean' };
    if (definitionType === 'select') return { type: 'select' };
    if (definitionType === 'reference_select') return { type: 'multi_select' };
    if (definitionType === 'date') return { type: 'date' };
    if (definitionType === 'date_time') return { type: 'date' };
    if (definitionType === 'currency') return { type: 'currency' };

    return definitionType as any;
};
