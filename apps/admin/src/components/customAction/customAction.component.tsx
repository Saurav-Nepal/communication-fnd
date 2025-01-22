import { useMemo } from 'react';

import { Button, DropdownAction } from '@slabs/ds-core';
import { ActionItemType } from '@slabs/ds-core/lib/components/dropdown-action/drop-down-action.types';
import { capitalizeFirst, isEmptyArray } from '@slabs/ds-utils';

import { useCallFunction } from '@/hooks/useCallFunction.hook';
import { GENERIC_DATA } from '@/types';
import { EvalCondtionForNextActions } from '@/utils/assistGeneric.utils';
import { orderBy } from '@/utils/common.utils';

interface CustomActionProps {
    formUiActions?: boolean;
    genericData: GENERIC_DATA;
    listingRow?: object;
    history?: any;
    callback?: (input: {
        withoutIdentifier: boolean;
        exportVariable: boolean;
    }) => void;
    source?: string;
    menuDetail?: {
        restricted_query?: string;
    };
    parentData?: object;
    portlet?: object;
    placement?: 'as_record' | 'as_dropdown' | 'as_header';
    position?: string;
    selectedRows?: any;
    actions: any;
}

const CustomAction = ({
    formUiActions,
    actions,
    listingRow = [],
    genericData = { starter: undefined },
    placement = 'as_record',
    position,
    menuDetail,
    source,
    portlet,
    parentData,
    callback,
}: CustomActionProps) => {
    const { callFunction } = useCallFunction({
        listingRow,
        genericData,
        menuDetail,
        parentData,
        source,
        portlet,
        callback,
    });

    const sortedActions = useMemo(() => {
        const newActions = actions.map((action) => {
            const filterScript = action.filter_condition
                ? action.filter_condition.script
                : null;

            const isDisabled = !EvalCondtionForNextActions(
                filterScript,
                listingRow,
                genericData.starter
            );

            // showing active action when active value will be true
            action.disabled = isDisabled;
            return action;
        });
        return orderBy<any>(newActions, 'display_order', 'asc');
    }, [actions]);

    const onlyActiveActions = useMemo(
        () =>
            sortedActions.filter((action) => action.active && !action.disabled),
        [sortedActions]
    );

    const sanitizedActions: ActionItemType[] = useMemo(() => {
        const actions: ActionItemType[] = sortedActions.map((action) => {
            return {
                key: action.id,
                name: capitalizeFirst(action.name?.split('Generic')?.[0]),
                action: (e) => callFunction({ action }, e),
            };
        });

        return actions;
    }, [sortedActions]);

    if (placement == 'as_dropdown') {
        return (
            <div className='flex justify-center custom-actions'>
                {!isEmptyArray(onlyActiveActions) && (
                    <DropdownAction
                        actions={sanitizedActions}
                        align='center'
                        className='min-w-[100px]'
                    >
                        <Button
                            shape='default'
                            size='xs'
                            className='px-3 text-base'
                            variant='ghost'
                        >
                            <i className='fa fa-ellipsis-v'></i>
                        </Button>
                    </DropdownAction>
                )}
            </div>
        );
    }

    return (
        <div className='flex gap-2 items-center'>
            {sortedActions.map((action, index) => {
                if (!action) return null;
                if (!action[placement]) return null;

                if (placement === 'as_record' && position != 'header') {
                    return (
                        <Button
                            key={index + '' + action.name}
                            variant='plain'
                            size='xs'
                            className='text-base'
                            disabled={action.disabled}
                            onClick={(e) => callFunction({ action }, e)}
                        >
                            <i className={`fa ${action.image}`} />
                        </Button>
                    );
                }

                if (!action.disabled) {
                    return (
                        <Button
                            key={index + '' + action.name}
                            variant='ghost'
                            size='sm'
                            className='text-base'
                            disabled={action.disabled}
                            onClick={(e) => callFunction({ action }, e)}
                        >
                            <i className={`fa ${action.image}`} />
                        </Button>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default CustomAction;
