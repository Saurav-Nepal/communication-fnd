import { NodeTypes } from 'reactflow';

import { ObjectDto } from '@finnoto/core';

export interface HierachyViewerProps<TItemObject = ObjectDto>
    extends BuildHierachyOptions<TItemObject> {
    nodeTypes?: NodeTypes;
}

export interface BuildHierachyOptions<TItemObject extends ObjectDto> {
    items: TItemObject[];
    idKey?: keyof TItemObject;
    parentKey?: keyof TItemObject;
}
export interface HierachyReturn<TItemObject> {
    id: number;
    data: TItemObject;
    children: HierachyReturn<TItemObject>[];
}
