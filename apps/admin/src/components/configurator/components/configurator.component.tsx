import React, { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Button, Input } from '@slabs/ds-core';
import { Modal, ModalBody, ModalFooter } from '@slabs/ds-dialog';
import { cn, isValidString } from '@slabs/ds-utils';

import Collapse from '@/components/collapse/collapse.component';
import { useTableConfiguration } from '@/hooks/useTableConfiguration.hook';
import { TableConfiguratorProps } from '@/types';

import ConfiguratorColumn from './configuratorColumn.component';

const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
    left: '0 !important',
});

export const Configurator = (props: TableConfiguratorProps) => {
    const selectedColumnDroppableId = 'selected-columns';
    const { columns, isFormConfigurator, isDetailConfigurator } = props;
    const {
        searchText,
        columnKeys,
        leftColumns,
        selectedColumns,
        formConfigurator,
        activeColumn,
        setSearchText,
        addSelectedColumn,
        removeSelectedColumnAt,
        updateSelectedColumnAt,
        changeSelectedColumnPos,
        applyChanges,
        setActiveColumn,
        moveActiveColumn,
        addSplit,
    } = useTableConfiguration(props);

    const onDragEnd = (result) => {
        if (
            !result.destination ||
            result.destination.droppableId !== selectedColumnDroppableId
        )
            return;

        if (result.destination.index === result.source.index) {
            return;
        }

        changeSelectedColumnPos(
            result.source?.index,
            result.destination?.index
        );
    };

    const withCollapse = useCallback(
        (key: string, columnKey: string, children: any) => {
            if (isFormConfigurator) return children;
            return (
                <Collapse
                    key={key}
                    className='border-b'
                    headerClassName='p-2 hover:bg-muted'
                    title={<div>{columnKey}</div>}
                    expand={isValidString(searchText) || undefined}
                >
                    <div className='p-2 border-t shadow-inner bg-muted'>
                        <div className='flex flex-col border shadow-sm bg-card'>
                            {children}
                        </div>
                    </div>
                </Collapse>
            );
        },
        [isFormConfigurator]
    );

    return (
        <>
            <ModalBody className='flex flex-row justify-between gap-4 overflow-y-hidden'>
                <ColumnsContainer
                    header={`All Columns (${1})`}
                    headerInput={
                        <Input
                            className='p-2 rounded-none w-[120px]'
                            size='sm'
                            placeholder='Search Columns'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    }
                >
                    <div className='flex flex-col'>
                        {columnKeys.map((columnKey, index) =>
                            withCollapse(
                                columnKey + index,
                                columnKey,
                                leftColumns[columnKey].map(
                                    (column: any, index: number) => (
                                        <div
                                            className='flex flex-row items-center justify-between gap-4 border-b cursor-pointer select-none hover:bg-muted'
                                            key={column.path + index}
                                        >
                                            <div
                                                className='flex-1 p-2 label'
                                                onDoubleClick={() =>
                                                    addSelectedColumn(column)
                                                }
                                            >
                                                {column.display_name}
                                            </div>

                                            <Button
                                                className='mr-1'
                                                variant='ghost'
                                                size='sm'
                                                shape='square'
                                                onClick={() =>
                                                    addSelectedColumn(column)
                                                }
                                            >
                                                <i
                                                    className='fa fa-external-link-square'
                                                    aria-hidden='true'
                                                />
                                            </Button>
                                        </div>
                                    )
                                )
                            )
                        )}
                    </div>
                </ColumnsContainer>
                <div className='flex flex-col gap-4'>
                    <Button
                        className='bg-muted w-[85px]'
                        variant='ghost'
                        onClick={() => moveActiveColumn('up')}
                    >
                        <i className='fa fa-arrow-up' />
                    </Button>
                    <Button
                        className='bg-muted w-[85px]'
                        variant='ghost'
                        onClick={() => moveActiveColumn('down')}
                    >
                        <i className='fa fa-arrow-down' />
                    </Button>

                    {isFormConfigurator && (
                        <Button
                            className='w-[85px]'
                            color='primary'
                            onClick={() => addSplit()}
                        >
                            Add Split
                        </Button>
                    )}

                    {isDetailConfigurator && (
                        <Button
                            color='primary'
                            className='split'
                            onClick={() => addSplit('v-split')}
                        >
                            V-Split
                        </Button>
                    )}
                    {isDetailConfigurator && (
                        <Button
                            color='primary'
                            className='split'
                            onClick={() => addSplit('h-split')}
                        >
                            H-Split
                        </Button>
                    )}
                </div>
                <ColumnsContainer
                    header={
                        !isFormConfigurator
                            ? `Selected Columns (${
                                  selectedColumns.length || 0
                              })`
                            : null
                    }
                >
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={selectedColumnDroppableId}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={cn('flex flex-col bg-secondary')}
                                >
                                    <div className='flex flex-col'>
                                        {selectedColumns.map(
                                            (column, index) => {
                                                return (
                                                    <Draggable
                                                        draggableId={index + ''}
                                                        index={index}
                                                        key={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <div
                                                                className={cn(
                                                                    'border-b column last:border-b-0',
                                                                    {
                                                                        'bg-card/80':
                                                                            snapshot.isDragging,
                                                                        'bg-card':
                                                                            !snapshot.isDragging,
                                                                    }
                                                                )}
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                            >
                                                                <ConfiguratorColumn
                                                                    key={
                                                                        column.index
                                                                    }
                                                                    onDelete={() =>
                                                                        removeSelectedColumnAt(
                                                                            index
                                                                        )
                                                                    }
                                                                    onSelect={() =>
                                                                        setActiveColumn(
                                                                            column
                                                                        )
                                                                    }
                                                                    onUpdate={(
                                                                        column
                                                                    ) =>
                                                                        updateSelectedColumnAt(
                                                                            index,
                                                                            column
                                                                        )
                                                                    }
                                                                    {...{
                                                                        column,
                                                                        columns,
                                                                        activeColumn,
                                                                        index,
                                                                        isFormConfigurator,
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            }
                                        )}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </ColumnsContainer>
            </ModalBody>

            <ModalFooter className='flex !justify-between border-t'>
                {formConfigurator && (
                    <Button
                        className='applyForAllButton'
                        color='error'
                        onClick={() => applyChanges(true)}
                    >
                        Apply For All
                    </Button>
                )}
                <div className='flex gap-2'>
                    <Button onClick={() => Modal.close()}>Cancel</Button>
                    <Button
                        type='submit'
                        color='primary'
                        onClick={() => applyChanges(false)}
                    >
                        Apply Changes
                    </Button>
                </div>
            </ModalFooter>
        </>
    );
};

const ColumnsContainer = ({
    header = null,
    headerInput = null,
    children,
}: any) => {
    return (
        <div className='overflow-y-auto border rounded-none card bg-card basis-2/5'>
            {header ? (
                <div className='flex flex-row items-center justify-between gap-4 px-4 py-3 border-b bg-primary/5'>
                    <h6 className='text-sm title text-foreground'>{header}</h6>
                    {headerInput}
                </div>
            ) : null}

            {children}
        </div>
    );
};
