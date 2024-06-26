import { AccessManager } from '@finnoto/core';
import {
    Button,
    Modal,
    ModalBody,
    ModalContainer,
    ModalFooter,
} from '@finnoto/design-system';
import { ArrowDown, ArrowUp, Plus } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ConfiguratorColumn from './Components/configuratorColumn.component';
import { useLayoutConfigurator } from './useLayoutConfigurator.hook';

/*  Here defining two style for drag and drop feature */
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? '#eee' : 'white',
    // styles we need to apply on draggables
    ...draggableStyle,
    left: '0 !important',
});

const LayoutConfigurator = ({
    title,
    definitions,
    preferences,
    saveLayout,
}) => {
    const selectedColumnDroppableId = 'selected-columns';

    const {
        finalColumnList,
        selectedColumns,
        activeColumn,
        changeSelectedColumnPos,
        addSelectedColumn,
        removeSelectedColumnAt,
        setActiveColumn,
        updateSelectedColumnAt,
        moveActiveColumn,
    } = useLayoutConfigurator({ definitions, preferences });

    const onDragEnd = (result) => {
        if (
            !result.destination ||
            result.destination.droppableId !== selectedColumnDroppableId
        )
            return;

        if (result.destination.index === result.source.index) {
            return;
        }

        let destinationIndex = result.destination.index;
        if (destinationIndex === 0) {
            destinationIndex = 1;
        }

        changeSelectedColumnPos(result.source?.index, destinationIndex);
    };

    return (
        <ModalContainer
            title={title || 'Configure'}
            titleClassName='bg-base-100'
            className='flex-1 h-auto'
        >
            <ModalBody className='flex-row justify-between gap-4 bg-base-200/60 min-h-[300px]'>
                <ColumnsContainer
                    header={`All Columns (${finalColumnList.length})`}
                >
                    <div className='col-flex'>
                        {finalColumnList.map((column, idx) => (
                            <div
                                className='items-center justify-between gap-4 border-b cursor-pointer select-none row-flex hover:bg-base-200'
                                key={column.identifier + idx}
                            >
                                <div
                                    className='flex-1 p-2 text-sm'
                                    onDoubleClick={() =>
                                        addSelectedColumn(column)
                                    }
                                >
                                    {column.name}
                                </div>
                                <Button
                                    className='mr-1'
                                    appearance='plain'
                                    size='sm'
                                    shape='square'
                                    onClick={() => addSelectedColumn(column)}
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ColumnsContainer>
                <div className='gap-4 col-flex'>
                    <Button
                        className='bg-base-300/40 w-[85px]'
                        appearance='plain'
                        size='sm'
                        onClick={() => moveActiveColumn('up')}
                    >
                        <ArrowUp size={18} />
                    </Button>
                    <Button
                        className='bg-base-300/40 w-[85px]'
                        appearance='plain'
                        size='sm'
                        onClick={() => moveActiveColumn('down')}
                    >
                        <ArrowDown size={18} />
                    </Button>
                </div>
                <ColumnsContainer
                    header={`Selected Columns (${selectedColumns.length})`}
                >
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={selectedColumnDroppableId}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className='col-flex'
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                >
                                    <div className='col-flex'>
                                        {selectedColumns.map(
                                            (column, index) => {
                                                return (
                                                    <Draggable
                                                        draggableId={index + ''}
                                                        index={index}
                                                        key={index}
                                                        isDragDisabled={
                                                            index === 0
                                                        }
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <div
                                                                className='border-b column last:border-b-0'
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                            >
                                                                <ConfiguratorColumn
                                                                    key={
                                                                        column.identifier +
                                                                        index
                                                                    }
                                                                    onDelete={() =>
                                                                        removeSelectedColumnAt(
                                                                            index
                                                                        )
                                                                    }
                                                                    onSelect={() => {
                                                                        if (
                                                                            index ===
                                                                            0
                                                                        )
                                                                            return;
                                                                        setActiveColumn(
                                                                            column
                                                                        );
                                                                    }}
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
                                                                        columns:
                                                                            definitions,
                                                                        activeColumn,
                                                                        index,
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
            <ModalFooter className='sm:justify-between'>
                {AccessManager.hasRoleIdentifier('ua_listing_overrider') ? (
                    <Button
                        appearance='error'
                        onClick={() => saveLayout(selectedColumns, true)}
                        size='sm'
                    >
                        Apply for all
                    </Button>
                ) : (
                    <div></div>
                )}
                <div className='gap-2 row-flex'>
                    <Button
                        appearance='errorHover'
                        onClick={() => Modal.close()}
                        size='sm'
                    >
                        Cancel
                    </Button>
                    <Button
                        defaultMinWidth
                        onClick={() => saveLayout(selectedColumns)}
                        size='sm'
                    >
                        Apply
                    </Button>
                </div>
            </ModalFooter>
        </ModalContainer>
    );
};

const ColumnsContainer = ({
    header = null,
    headerInput = null,
    children,
}: any) => {
    return (
        <div className='overflow-y-auto border rounded-none card bg-base-100 basis-2/5'>
            {header ? (
                <div className='items-center justify-between gap-4 px-4 py-3 border-b row-flex bg-info/5'>
                    <h6 className='text-xs text-base-secondary'>{header}</h6>
                    {headerInput}
                </div>
            ) : null}

            {children}
        </div>
    );
};

export default LayoutConfigurator;
