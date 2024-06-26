import { useEffect, useMemo } from 'react';
import { useAsyncFn } from 'react-use';
import ReactFlow, {
    Background,
    Controls,
    useEdgesState,
    useNodesInitialized,
    useNodesState,
    useReactFlow,
} from 'reactflow';

import { IsEmptyArray, ObjectDto } from '@finnoto/core';

import { HierachyViewerProps } from './hierarchyViewer.types';
import {
    buildHierarchy,
    getEdges,
    getHierarchyLayoutedElements,
    getNodes,
    useNodesMeasuredEffect,
} from './hierarchyViewer.utils';

export const HierarchyViewer = <TItemObject extends ObjectDto>({
    items,
    idKey,
    parentKey,
    nodeTypes,
}: HierachyViewerProps<TItemObject>) => {
    const reactflowInstance = useReactFlow();

    const hierarchy = useMemo(
        () => buildHierarchy<TItemObject>({ items, idKey, parentKey }),
        [idKey, items, parentKey]
    );

    const [nodes, setNodes, onNodesChange] = useNodesState([
        { id: 'init', position: { x: -100, y: -100 }, data: { label: '' } },
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [{ loading }, refetch] = useAsyncFn(async () => {
        if (IsEmptyArray(hierarchy)) return;
        const layout = getHierarchyLayoutedElements(
            getNodes(hierarchy),
            getEdges(hierarchy),
            reactflowInstance,
            { direction: 'TB' }
        );
        setNodes(layout.nodes);
        setEdges(layout.edges);

        window.requestAnimationFrame(() => {
            reactflowInstance.setViewport(
                { x: 20, y: 20, zoom: 0.8 },
                { duration: 500 }
            );
        });
    }, [hierarchy, reactflowInstance, setEdges, setNodes]);

    useNodesMeasuredEffect(refetch);

    // useEffect(() => {
    //     setNodes(getNodes(hierarchy));
    //     setEdges(getEdges(hierarchy));
    // }, [hierarchy, setEdges, setNodes]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                // hidden={loading}
                // onLoad={refetch}
                // onInit={refetch}
                onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                // onConnect={refetch}
                // fitView
                // fitViewOptions={fitViewOptions}
                onlyRenderVisibleElements
                proOptions={{
                    hideAttribution: true,
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};
