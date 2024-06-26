import { useMemo } from 'react';

import {
    IsEmptyArray,
    IsEmptyObject,
    ObjectDto,
    parseJSONString,
} from '@finnoto/core';

import { Card, CardBody } from '../../../../../../Components';
import { QueryBuilder } from '../../../../../QueryBuilder/queryBuilder.component';
import { useListFormFilterContext } from '../provider/list.form.filter.provider';

export const AdvanceFilter = ({
    definitionKey,
    definitionFilterColumns = [],
    hideGroupRules,
    defaultAdvanceFilter,
}: {
    definitionKey: string;
    definitionFilterColumns: ObjectDto[];
    hideGroupRules?: boolean;
    defaultAdvanceFilter?: ObjectDto;
}) => {
    const { filterQuery, setFilterQuery } = useListFormFilterContext();

    const handleOnQueryChange = (query: any) => {
        if (IsEmptyArray(query?.rules)) return setFilterQuery(null);

        setFilterQuery(JSON.stringify(query));
    };
    const query = useMemo(() => {
        const filterJson = parseJSONString(filterQuery);

        if (!filterJson || IsEmptyObject(filterJson)) {
            return {
                rules: [],
                combinator: 'and',
                not: false,
            };
        }

        return filterJson;
    }, [filterQuery]);

    return (
        <Card
            className='bg-base-100 advance-filter'
            titleClassName='border-b-0'
            noBorder
        >
            <CardBody className='p-2 pt-4 overflow-visible'>
                <QueryBuilder
                    columns={definitionFilterColumns}
                    query={query}
                    onChange={handleOnQueryChange}
                    hideGroupRules={hideGroupRules}
                    filterAdd
                />
            </CardBody>
        </Card>
    );
};
