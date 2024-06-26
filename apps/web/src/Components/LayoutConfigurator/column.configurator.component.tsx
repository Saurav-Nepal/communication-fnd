import { PenLine } from 'lucide-react';
import React, {
    CSSProperties,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    DragDropContext,
    Draggable,
    DraggableChildrenFn,
    Droppable,
} from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { useToggle, useUpdateEffect } from 'react-use';

import {
    GetObjectFromArray,
    IndexOfObjectInArray,
    IsValidString,
    useApp,
} from '@finnoto/core';
import {
    Button,
    CheckBox,
    cn,
    Icon,
    IconButton,
    InputField,
    Popover,
    TableColumn,
} from '@finnoto/design-system';

import { useColumnConfigurator } from './useColumnConfiguration.hook';

import { ColumnListSvgIcon, EditPenSvgIcon } from 'assets';

interface ColumnConfiguratorProps {
    className?: string;
    configurationClass?: string;
    definitions: any;
    preferences: (TableColumn & {
        macro?: string;
    })[];
    defaultLayout: any;
    saveLayout?: (
        layout: (TableColumn & {
            macro?: string;
        })[],
        is_global?: boolean
    ) => Promise<void>;
}

const ColumnConfigurator = ({
    className,
    saveLayout = () => null,
    defaultLayout,
    configurationClass,
    ...rest
}: ColumnConfiguratorProps) => {
    const [changedLayouts, setChangedLayouts] = useState(null);

    const { isArc } = useApp();

    const handleLayoutUpdate = useCallback(() => {
        const selectedColumns = changedLayouts.filter(
            (column) => column.selected
        );

        saveLayout(
            selectedColumns.map((column) => ({
                identifier: column.identifier,
                name: column.name,
                display_name: column.display_name,
            }))
        );
        setChangedLayouts(null);
    }, [changedLayouts, saveLayout]);

    const handleLayoutReset = () => {
        saveLayout(defaultLayout);
    };

    return (
        <Popover
            element={
                <ColumnConfiguratorColumns
                    {...rest}
                    setChangedLayouts={setChangedLayouts}
                    onLayoutReset={handleLayoutReset}
                />
            }
            align='end'
            className={cn(
                `border-0 rounded shadow-modal z-50`,
                configurationClass
            )}
            onVisibleChange={(state) => {
                if (state || !changedLayouts) return;
                handleLayoutUpdate();
            }}
        >
            <IconButton
                name='Configure Table'
                className={cn(className)}
                shape='square'
                outline
                size='sm'
                appearance={isArc ? 'polaris-white' : 'primary'}
                icon={ColumnListSvgIcon}
            />
        </Popover>
    );
};

const ColumnConfiguratorColumns = ({
    definitions,
    preferences,
    setChangedLayouts,
    onLayoutReset,
    ...props
}: Omit<
    ColumnConfiguratorProps,
    'className' | 'saveLayout' | 'defaultLayout'
> & {
    setChangedLayouts: React.Dispatch<any>;
    onLayoutReset: Function;
}) => {
    const selectedColumnDroppableId = 'selected-columns';

    const renderDraggable = useDraggableInPortal();

    const {
        columns,
        filteredColumns,
        setSearchText,
        changeSelectedColumnPos,
        updateColumn,
    } = useColumnConfigurator({
        definitions,
        preferences,
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'hsl(var(--b1) / 1)' : 'inherit',
    });

    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: CSSProperties
    ): CSSProperties => {
        return {
            userSelect: 'none',
            background: isDragging
                ? 'hsl(var(--b2) / 1)'
                : 'hsl(var(--b1) / 1)',
            ...draggableStyle,
        };
    };

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

    useUpdateEffect(() => {
        setChangedLayouts(columns);
    }, [columns]);

    return (
        <div className='p-2 pt-4 col-flex' {...props}>
            <div className='pb-2'>
                <InputField
                    type='search'
                    placeholder='Search column name'
                    addonStart={<Icon source='search' />}
                    onChange={setSearchText}
                />
            </div>
            <div className='col-flex max-h-[350px] overflow-y-auto relative small-scrollbar-sidebar'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={selectedColumnDroppableId}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='col-flex'
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                <div className='col-flex'>
                                    {filteredColumns.map((column, index) => {
                                        return (
                                            <Draggable
                                                draggableId={index + ''}
                                                index={index}
                                                key={index}
                                                isDragDisabled={index === 0}
                                            >
                                                {renderDraggable(
                                                    (provided, snapshot) => (
                                                        <div
                                                            className='flex items-center gap-2 column '
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            key={index}
                                                            {...provided.draggableProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                        >
                                                            <div
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Icon
                                                                    source='drag_indicator'
                                                                    className={cn(
                                                                        {
                                                                            'text-primary':
                                                                                snapshot.isDragging,
                                                                            'text-base-tertiary':
                                                                                index ===
                                                                                0,
                                                                        }
                                                                    )}
                                                                />
                                                            </div>
                                                            <ConfiguratorColumn
                                                                key={
                                                                    column.identifier +
                                                                    index
                                                                }
                                                                onUpdate={(
                                                                    column
                                                                ) =>
                                                                    updateColumn(
                                                                        column.identifier,
                                                                        column
                                                                    )
                                                                }
                                                                {...{
                                                                    column,
                                                                    columns:
                                                                        definitions,
                                                                    index,
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className='items-center justify-center row-flex'>
                <a
                    className='p-2 text-sm link link-hover'
                    href='#'
                    onClick={() => onLayoutReset()}
                >
                    Reset
                </a>
            </div>
        </div>
    );
};

const ConfiguratorColumn = ({ column, columns, onUpdate = () => {} }: any) => {
    const [editName, toggleEditName] = useToggle(false);

    const columnDefinition = GetObjectFromArray(
        columns,
        'identifier',
        column.identifier
    );

    const columnDisplayName = IsValidString(column.display_name)
        ? column.display_name
        : columnDefinition?.name;

    const isDeleteEnabled = useMemo(() => {
        const index = IndexOfObjectInArray(
            columns,
            'identifier',
            column.identifier
        );

        return index !== 0;
    }, [column.identifier, columns]);

    const isStatusColumnDisable = useMemo(
        () => column?.identifier === 'active' && column?.selected,
        [column?.identifier, column?.selected]
    );

    return (
        <div
            className={cn(
                'column-label row-flex flex-1 items-center gap-2 pr-2'
            )}
        >
            <div>
                <CheckBox
                    appearance='primary'
                    checked={column.selected}
                    disabled={!isDeleteEnabled || isStatusColumnDisable}
                    onChange={(checked) => {
                        onUpdate({ ...column, selected: checked });
                    }}
                />
            </div>

            {!editName ? (
                <div
                    className={cn(
                        'row-flex justify-between items-center text-sm py-2 px-2 flex-1 hover:bg-base-200 group/column'
                    )}
                    onDoubleClick={() => {
                        if (column.selected) toggleEditName(true);
                    }}
                >
                    <span>{columnDisplayName}</span>
                    {column.selected && (
                        <IconButton
                            icon={EditPenSvgIcon}
                            iconSize={16}
                            appearance='base'
                            size='sm'
                            shape='square'
                            className='invisible p-1 bg-transparent hover:bg-base-300 hover:text-primary group-hover/column:visible'
                            onClick={() => toggleEditName(true)}
                        />
                    )}
                </div>
            ) : (
                <div className='py-[4px]'>
                    <InputField
                        size='sm'
                        placeholder='Enter Name'
                        defaultValue={columnDisplayName}
                        inputClassName='!w-auto'
                        groupClassName='!min-w-[auto]'
                        onBlur={(value) => {
                            onUpdate({
                                ...column,
                                display_name: value,
                            });
                            toggleEditName();
                        }}
                        onEnter={(value) => {
                            onUpdate({
                                ...column,
                                display_name: value,
                            });
                            toggleEditName();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                e.stopPropagation();
                                toggleEditName();
                            }
                        }}
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default ColumnConfigurator;

const useDraggableInPortal = () => {
    const self = useRef<any>({}).current;

    useEffect(() => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.pointerEvents = 'none';
        div.style.top = '0';
        div.style.width = '100%';
        div.style.height = '100%';
        self.elt = div;
        document.body.appendChild(div);
        return () => {
            document.body.removeChild(div);
        };
    }, [self]);

    return (render: DraggableChildrenFn): DraggableChildrenFn =>
        (provided, ...args) => {
            const element = render(provided, ...args);
            if (
                (provided.draggableProps.style as CSSProperties).position ===
                'fixed'
            ) {
                return createPortal(element, self.elt);
            }
            return element;
        };
};
