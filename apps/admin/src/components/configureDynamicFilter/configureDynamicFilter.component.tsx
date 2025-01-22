import { useCallback, useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { QueryBuilder, RuleGroupType } from 'react-querybuilder';
import { useEffectOnce, useToggle } from 'react-use';

import { Button, SelectBox } from '@slabs/ds-core';
import { isValidString } from '@slabs/ds-utils';

import { TOGGLE_ADVANCED_FILTER } from '@/constants/state.constants';
import { useFetchParams } from '@/hooks/useFetchParams.hook';
import { ObjectDto } from '@/types';
import { getColumnType } from '@/utils/common.utils';
import { Navigation } from '@/utils/navigation.utils';
import { StoreEvent, SubscribeToEvent } from '@/utils/stateManager.utils';

import ActionButton from './Components/addRuleActionButton.component';
import CombinatorSelector from './Components/combinatorSelector.component';
import FieldSelector from './Components/fieldSelector.component';
import ValueEditor from './Components/valueEditor.component';
import { DATA_OPERATORS } from './dataType.constant';
import { OperatorList } from './operator.constant';

const ConfigureDynamicFilter = (props: {
    content: {
        dictionary: any[];
    };
    filters: {
        id: number;
    }[];
    is_report?: boolean;
}) => {
    const { content, filters } = props || {};
    const { dictionary } = content || {};
    const { jsonquery, order: queryOrder, sort: querySort } = useFetchParams();

    const [filterQuery, setFilterQuery] = useState<RuleGroupType>({
        combinator: 'and',
        rules: [{ field: null as any, operator: '=', value: '' }],
    });
    const [expand, toggleExpandFilter] = useToggle(false);
    const [order, setOrder] = useState<ObjectDto>();
    const [sort, setSort] = useState<string | undefined>();

    const sorts = ['desc', 'asc'];

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: TOGGLE_ADVANCED_FILTER,
            callback: listenToggleAdvancedFilter,
        });

        if (!jsonquery) return;
        try {
            setFilterQuery(JSON.parse(jsonquery));
        } catch {
            console.error("couldn't parse query");
        }
    });

    const listenToggleAdvancedFilter = ({ isAdvanceFilterExpand, single }) => {
        if (isAdvanceFilterExpand !== undefined) {
            toggleExpandFilter(isAdvanceFilterExpand);
        } else {
            toggleExpandFilter();
        }

        if (single) {
            setFilterQuery({
                combinator: 'and',
                rules: [{ field: single, operator: '=', value: '' }],
            });
        }
    };

    const closeForm = () => {
        StoreEvent({
            eventName: TOGGLE_ADVANCED_FILTER,
            data: { isAdvanceFilterExpand: false },
            isTemp: true,
        });
    };

    const getOperators = useCallback(
        (type?: string) =>
            OperatorList.filter((value) => {
                if (!type) return true;

                return DATA_OPERATORS[type]?.includes(value.name);
            }),
        [OperatorList]
    );

    const columns = useMemo(() => {
        const columns = {};

        dictionary.map((column) => {
            if (!columns[column.parent]) columns[column.parent] = [];

            columns[column.parent].push({
                label: column.display_name,
                value: `${column.parent}.${column.name}`,
                name: `${column.parent}.${column.name}`,
                type: getColumnType(column),
                inputType: getColumnType(column),
                dataType: getColumnType(column),
                operators: getOperators(getColumnType(column)),
                dict: column,
            });

            if (
                isValidString(queryOrder) &&
                queryOrder === `${column.parent}.${column.name}`
            ) {
                setOrder({
                    label: column.display_name,
                    value: `${column.parent}.${column.name}`,
                    name: `${column.parent}.${column.name}`,
                    type: getColumnType(column),
                    dict: column,
                });
            }
            if (isValidString(querySort)) {
                setSort(querySort);
            }
        });

        return Object.keys(columns).map((parent) => ({
            label: parent,
            options: columns[parent],
        }));
    }, [dictionary]);

    const handleSubmit = () => {
        const query: ObjectDto = {
            jsonquery: JSON.stringify(filterQuery),
        };
        if (isValidString(order?.value)) {
            query.order = order.value;
        }
        if (isValidString(sort)) {
            query.sort = sort;
        }
        Navigation.search(query);
    };

    return (
        <AnimateHeight height={expand ? 'auto' : 0}>
            <div className='m-2 overflow-hidden border rounded-sm configure-filter-container bg-muted'>
                <div className='generic-sub-header bg-[#eff3f5] dark:bg-card border-b shadow-inner shadow-white dark:shadow-white/10 flex justify-between leading-8 py-[2px] px-3'>
                    <div className='sub-heading'>Create Filter:</div>
                    <div className='closeBtn'>
                        <span
                            className='btn btn-sm btn-outline btn-square'
                            onClick={closeForm}
                        >
                            <i className='fa fa-times' />
                        </span>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-card'>
                        <QueryBuilder
                            operators={getOperators()}
                            fields={columns}
                            controlElements={{
                                fieldSelector: FieldSelector,
                                combinatorSelector: CombinatorSelector,
                                operatorSelector: CombinatorSelector,
                                valueEditor: ValueEditor,
                                addRuleAction: ActionButton,
                                addGroupAction: ActionButton,
                                removeRuleAction: ActionButton,
                                removeGroupAction: ActionButton,
                            }}
                            query={filterQuery}
                            onQueryChange={(q) => setFilterQuery(q)}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between bg-card'>
                    <div className='flex gap-4 px-2'>
                        <div className='flex items-center gap-2 order-content'>
                            <label>Order By</label>
                            <div className='min-w-44'>
                                <SelectBox
                                    onOptionChange={setOrder}
                                    value={order?.value}
                                    options={columns}
                                    placeholder='Order'
                                    size='sm'
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-2 sort-by-content'>
                            <label>Sort By</label>
                            <div>
                                <SelectBox
                                    onOptionChange={(data) => {
                                        setSort(
                                            (data?.value as any) ?? undefined
                                        );
                                    }}
                                    value={sort}
                                    options={sorts.map((sort) => ({
                                        label: sort,
                                        value: sort,
                                    }))}
                                    isSearchable={false}
                                    placeholder='Sort'
                                    size='sm'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='footer-actions'>
                        <div className='flex gap-2 p-2'>
                            <Button
                                variant='ghost'
                                size='md'
                                onClick={closeForm}
                            >
                                Close
                            </Button>
                            <Button
                                className='min-w-[120px]'
                                color='success'
                                size='md'
                                onClick={handleSubmit}
                            >
                                Go
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateHeight>
    );
};

export default ConfigureDynamicFilter;
