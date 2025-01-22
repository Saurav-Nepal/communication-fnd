import React, { useEffect, useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useSetState } from 'react-use';

import { Button, Input, Label, Switch } from '@slabs/ds-core';
import { cn, isValidString } from '@slabs/ds-utils';

const ConfiguratorColumn = ({
    column,
    columns,
    activeColumn,
    isFormConfigurator,
    onDelete = () => {},
    onSelect = () => {},
    onUpdate = () => {},
}: any) => {
    const [columnData, setColumnData] = useSetState(column);
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        setColumnData(column);
    }, [column]);

    const columnDisplayName = isValidString(column.columnTitle)
        ? column.columnTitle
        : columns[column.index]?.display_name;

    const isActive = useMemo(() => {
        if (!activeColumn) return false;

        if (column.split) return activeColumn.label === column.label;

        return (
            activeColumn.column === column.column &&
            activeColumn.object === column.object
        );
    }, [column, activeColumn]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(columnData);
        setExpand(false);
    };

    return (
        <div className='flex flex-col'>
            <div
                className={cn(
                    'column-label flex flex-row items-center gap-2 pr-2',
                    {
                        'bg-[#dff0d8] text-[#105d26]': isActive,
                    }
                )}
            >
                <div
                    className={cn('item-label py-2 px-4 flex-1', {
                        'hover:bg-muted': !isActive,
                        'py-4': column.split || column.separator,
                    })}
                    onClick={onSelect}
                    onDoubleClick={onDelete}
                >
                    {column.separator || column.split ? (
                        <span className='separator'>
                            ------{column.columnTitle || column.label}------
                        </span>
                    ) : (
                        <div>
                            <span>{columnDisplayName}</span>
                            <p className='text-xs item-name text-color-secondary'>
                                {column.index}
                            </p>
                        </div>
                    )}
                </div>

                <Button
                    variant='ghost'
                    size='sm'
                    shape='square'
                    onClick={onDelete}
                >
                    <i className='fa fa-trash' />
                </Button>
                {!column.split || column.separator ? (
                    <Button
                        className='column-toggle'
                        variant='ghost'
                        size='sm'
                        shape='square'
                        onClick={() => setExpand((expand) => !expand)}
                    >
                        <i
                            className={cn('fa fa-chevron-down swap-on', {
                                '!hidden': !expand,
                            })}
                        />
                        <i
                            className={cn('fa fa-chevron-right swap-off', {
                                '!hidden': expand,
                            })}
                        />
                    </Button>
                ) : null}
            </div>

            <AnimateHeight height={expand ? 'auto' : 0}>
                <form
                    className='flex flex-col gap-4 p-4 border-t bg-muted/50'
                    onSubmit={handleSubmit}
                >
                    <div className='form-control'>
                        <Label label='Column Header' name='columnTitle' />
                        <Input
                            placeholder='Enter Column Name'
                            value={columnData.columnTitle || ''}
                            onChange={(e) =>
                                setColumnData({ columnTitle: e.target.value })
                            }
                        />
                    </div>
                    {!isFormConfigurator && !column.separator && (
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex items-center gap-2 form-control'>
                                <Label label='Hyperlink' name='route' />
                                <Switch
                                    name='route'
                                    size='sm'
                                    checked={columnData.route}
                                    onChange={(checked) =>
                                        setColumnData({
                                            route: checked,
                                        })
                                    }
                                />
                            </div>
                            <div className='flex items-center gap-2 form-control'>
                                <Label label='Hide Column' name='hide_column' />
                                <Switch
                                    name='hide_column'
                                    size='sm'
                                    checked={columnData.hide}
                                    onChange={(checked) =>
                                        setColumnData({
                                            hide: checked,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className='flex flex-row justify-end'>
                        <Button type='submit' color='success'>
                            Save
                        </Button>
                    </div>
                </form>
            </AnimateHeight>
        </div>
    );
};

export default ConfiguratorColumn;
