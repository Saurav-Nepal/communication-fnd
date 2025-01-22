import { OperatorList } from './operator.constant';

export const DATA_TYPE = {
    STRING: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    DATE_TIME: 'datetime',
    OPTION: 'option',
    REFERENCE: 'reference',
    SELECT: 'select',
} as const;

export type OperatorType = (typeof OperatorList)[number]['name'];

export type DataTypeType = (typeof DATA_TYPE)[keyof typeof DATA_TYPE];
type DataOperatorsType = { [key in DataTypeType]?: OperatorType[] };

export const DATA_OPERATORS: DataOperatorsType = {
    [DATA_TYPE.STRING]: [
        '=',
        '!=',
        'contains',
        'doesNotContain',
        // 'in',
        // 'not in',
        'not null',
        'null',
    ],
    [DATA_TYPE.BOOLEAN]: ['=', '!=', 'not null', 'null'],
    [DATA_TYPE.NUMBER]: [
        '=',
        '!=',
        '<',
        '>',
        '<=',
        '>=',
        'between',
        'not between',
        // 'in',
        // 'not in',
        'null',
        'not null',
    ],
    [DATA_TYPE.DATE]: [
        '=',
        '!=',
        '<',
        '>',
        '<=',
        '>=',
        'between',
        'not between',
        // 'in',
        // 'not in',
        'null',
        'not null',
    ],
    [DATA_TYPE.DATE_TIME]: [
        '=',
        '!=',
        '<',
        '>',
        '<=',
        '>=',
        'between',
        'not between',
        // 'in',
        // 'not in',
        'null',
        'not null',
    ],
    [DATA_TYPE.OPTION]: ['=', '!='],
    [DATA_TYPE.REFERENCE]: ['=', '!='],
    [DATA_TYPE.SELECT]: ['=', '!='],
};
