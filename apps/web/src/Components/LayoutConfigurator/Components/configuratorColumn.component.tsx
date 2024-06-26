import {
    GetObjectFromArray,
    IndexOfObjectInArray,
    IsValidString,
} from '@finnoto/core';
import { Button, InputField, cn } from '@finnoto/design-system';
import { ChevronDown, ChevronRight, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useSetState } from 'react-use';

const ConfiguratorColumn = ({
    column,
    columns,
    activeColumn,
    onDelete = () => {},
    onSelect = () => {},
    onUpdate = () => {},
}: any) => {
    const [columnData, setColumnData] = useSetState(column);
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        setColumnData(column);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column]);

    const columnDefinition = GetObjectFromArray(
        columns,
        'identifier',
        column.identifier
    );
    const columnDisplayName = IsValidString(column.display_name)
        ? column.display_name
        : columnDefinition?.name;

    const isActive = useMemo(() => {
        if (!activeColumn) return false;

        return activeColumn.identifier === column.identifier;
    }, [column, activeColumn]);

    const isDeleteEnabled = useMemo(() => {
        const index = IndexOfObjectInArray(
            columns,
            'identifier',
            column.identifier
        );
        return index !== 0;
    }, [column.identifier, columns]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(columnData);
        setExpand(false);
    };

    return (
        <div className='col-flex'>
            <div
                className={cn('column-label row-flex items-center gap-2 pr-2', {
                    'bg-primary/10 text-primary': isActive,
                })}
            >
                <div
                    className={cn('text-sm py-2 px-4 flex-1', {
                        'hover:bg-base-200': !isActive,
                        'py-4': column.split || column.separator,
                    })}
                    onClick={onSelect}
                    onDoubleClick={isDeleteEnabled ? onDelete : null}
                >
                    <span>{columnDisplayName}</span>
                    {IsValidString(column.display_name) && (
                        <p className='text-xs item-name text-base-secondary'>
                            {columnDefinition.name}
                        </p>
                    )}
                </div>

                {isDeleteEnabled && (
                    <Button
                        appearance='plain'
                        className='hover:text-error'
                        size='sm'
                        shape='square'
                        onClick={onDelete}
                    >
                        <Trash size={16} />
                    </Button>
                )}
                <Button
                    className={cn('column-toggle swap', {
                        'swap-active': expand,
                    })}
                    appearance='plain'
                    size='sm'
                    shape='square'
                    onClick={() => setExpand((expand) => !expand)}
                >
                    <ChevronDown size={18} className='swap-on' />
                    <ChevronRight size={18} className='swap-off' />
                </Button>
            </div>

            <AnimateHeight height={expand ? 'auto' : 0}>
                <form
                    className='gap-4 p-2 border-t col-flex bg-base-200/50'
                    onSubmit={handleSubmit}
                >
                    <div className='form-control'>
                        <InputField
                            label='Column Header'
                            placeholder='Enter Column Name'
                            value={columnData.display_name || ''}
                            onChange={(value) =>
                                setColumnData({ display_name: value })
                            }
                        />
                    </div>
                    <div className='justify-end row-flex'>
                        <Button type='submit' appearance='success' size='sm'>
                            Save
                        </Button>
                    </div>
                </form>
            </AnimateHeight>
        </div>
    );
};

export default ConfiguratorColumn;
