import { SortArrayObjectBy } from '@finnoto/core';
import {
    Button,
    Icon,
    ModalBody,
    ModalContainer,
    ModalFooter,
    SlidingPane,
} from '@finnoto/design-system';
import { ReactElement, useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useList } from 'react-use';

export interface PriorityChangerProps {
    items: ItemObj[];
    title?: string;
    renderItem: (item: ItemObj, index: number) => ReactElement;
    callback: (items: ItemObj[]) => void;
}

interface ItemObj {
    priority: number;
    [key: string]: any;
}

const getListStyle = (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? 'hsl(var(--b3) / .5)' : undefined,
});

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? 'hsl(var(--b2) / 1)' : undefined,
    // styles we need to apply on draggables
    ...draggableStyle,
    left: 15,
    zIndex: 999999,
});

const PriorityChanger = ({
    title = 'Change Priority',
    items,
    renderItem,
    callback,
}: PriorityChangerProps) => {
    const droppableId = 'priority-changer';

    const [list, { removeAt, insertAt }] = useList<ItemObj>(
        items ? SortArrayObjectBy(items, 'priority') : []
    );

    const changeSelectedColumnPos = useCallback(
        (index: number, newIndex: number) => {
            const tempCol = list[index];
            removeAt(index);
            insertAt(newIndex, tempCol);
        },
        [insertAt, removeAt, list]
    );

    const onDragEnd = (result) => {
        if (
            !result.destination ||
            result.destination.droppableId !== droppableId
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

    const handleSave = () => {
        callback(list.map((item, idx) => ({ ...item, priority: idx + 1 })));
    };

    return (
        <ModalContainer title={title}>
            <ModalBody className='flex-1 gap-4'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={droppableId}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='px-2 col-flex'
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {list.map((item, idx) => (
                                    <Draggable
                                        draggableId={idx + ''}
                                        index={idx}
                                        key={idx}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                className='items-start gap-2 py-3 row-flex'
                                                ref={provided.innerRef}
                                                key={
                                                    idx +
                                                    '_' +
                                                    item.uuid +
                                                    '_' +
                                                    item.priority
                                                }
                                                {...provided.draggableProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                <div className='!rounded-full flex flex-row items-center justify-center text-sm bg-accent text-accent-content h-6 w-6 mt-[2px]'>
                                                    {idx + 1}
                                                </div>
                                                <div
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Icon
                                                        iconClass='mt-[4px]'
                                                        source='drag_indicator'
                                                    />
                                                </div>
                                                <div className='items-center row-flex'>
                                                    {renderItem(item, idx)}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ModalBody>
            <ModalFooter className='py-4 justify'>
                <div className='flex-1 gap-4 row-flex'>
                    <Button
                        appearance='errorHover'
                        onClick={() => SlidingPane.close()}
                    >
                        Cancel
                    </Button>
                    <Button
                        appearance='primary'
                        className='flex-1'
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </ModalFooter>
        </ModalContainer>
    );
};

export default PriorityChanger;
