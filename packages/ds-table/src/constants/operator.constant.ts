export interface OperatorListType {
    operator: string;
    label: string;
    inputs: number;
}

export const OperatorList = [
    {
        name: '=',
        label: 'Equal',
        inputs: 1,
    },
    {
        name: '!=',
        label: 'Not Equal',
        inputs: 1,
    },
    {
        name: '>',
        label: 'Greater Than',
        inputs: 1,
    },
    {
        name: '>=',
        label: 'Greater Than or Equal',
        inputs: 1,
    },
    {
        name: '<',
        label: 'Less Than',
        inputs: 1,
    },
    {
        name: '<=',
        label: 'Less Than or Equal',
        inputs: 1,
    },
    {
        name: 'like',
        label: 'Like',
        inputs: 1,
    },
    {
        name: 'not like',
        label: 'Not Like',
        inputs: 1,
    },
    {
        name: 'null',
        label: 'Is Null',
        inputs: 0,
    },
    {
        name: 'notNull',
        label: 'Is Not Null',
        inputs: 0,
    },
    {
        name: 'between',
        label: 'Between',
        inputs: 2,
    },
    {
        name: 'notBetween',
        label: 'Not Between',
        inputs: 2,
    },
    {
        name: 'in',
        label: 'In',
        inputs: 1,
    },
    {
        name: 'notIn',
        label: 'Not In',
        inputs: 1,
    },
    {
        name: 'contains',
        label: 'Contains',
        inputs: 1,
    },
    {
        name: 'not contains',
        label: 'Not Contains',
        inputs: 1,
    },
    {
        name: 'matches',
        label: 'Matches',
        inputs: 1,
    },
    {
        name: 'not matches',
        label: 'Not Matches',
        inputs: 1,
    },
] as const;
export const QueryOperatorList = [
    {
        name: '=',
        label: 'Equal',
        inputs: 1,
    },
    {
        name: '!=',
        label: 'Not Equal',
        inputs: 1,
    },
    {
        name: '>',
        label: 'Greater Than',
        inputs: 1,
    },
    {
        name: '>=',
        label: 'Greater Than or Equal',
        inputs: 1,
    },
    {
        name: '<',
        label: 'Less Than',
        inputs: 1,
    },
    {
        name: '<=',
        label: 'Less Than or Equal',
        inputs: 1,
    },
    {
        name: 'like',
        label: 'Like',
        inputs: 1,
    },
    {
        name: 'not like',
        label: 'Not Like',
        inputs: 1,
    },
    {
        name: 'null',
        label: 'Is Null',
        inputs: 0,
    },
    {
        name: 'notNull',
        label: 'Is Not Null',
        inputs: 0,
    },
    {
        name: 'between',
        label: 'Between',
        inputs: 2,
    },
    {
        name: 'notBetween',
        label: 'Not Between',
        inputs: 2,
    },
    {
        name: 'in',
        label: 'Contains',
        inputs: 1,
    },
    {
        name: 'notIn',
        label: 'Not Contains',
        inputs: 1,
    },
] as const;

export const Operators = OperatorList.flatMap((operator) => operator.name);
