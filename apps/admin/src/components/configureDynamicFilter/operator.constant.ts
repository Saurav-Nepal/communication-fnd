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
        name: 'contains',
        label: 'Like',
        inputs: 1,
    },
    {
        name: 'doesNotContain',
        label: 'Not Like',
        inputs: 1,
    },
    {
        name: 'null',
        label: 'Is Null',
        inputs: 0,
    },
    {
        name: 'not null',
        label: 'Is Not Null',
        inputs: 0,
    },
    {
        name: 'between',
        label: 'Between',
        inputs: 2,
    },
    {
        name: 'not between',
        label: 'Not Between',
        inputs: 2,
    },
    // {
    //     name: 'ilike',
    //     label: 'ILike',
    //     inputs: 1,
    // },
    // {
    //     name: 'in',
    //     label: 'In',
    //     inputs: -1,
    // },
    // {
    //     name: 'not in',
    //     label: 'Not In',
    //     inputs: -1,
    // },
] as const;

export const Operators = OperatorList.flatMap((operator) => operator.name);
