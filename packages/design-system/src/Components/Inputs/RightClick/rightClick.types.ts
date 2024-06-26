import { ObjectDto } from '@finnoto/core';
import { ReactElement } from 'react';

export interface RightClickProps {
    children: ReactElement;
    id?: string;
    className?: string;
    renderTag?: React.ElementType;
    rowOptions: RightClickRowOptionProps[];
    disabled?: boolean;
    [x: string]: any;
}

export interface RightClickRowOptionProps {
    name: string;
    icon?: any;
    disabled?: boolean | ((...arg: any) => boolean);
    visible?: boolean | ((data: any) => boolean);
    className?: string;
    onClick?: (data: any, e: any) => void;
    actions?: RightClickRowOptionProps[];
    getCustomQuery?: (data: ObjectDto) => {
        field: string;
        value: string | number | boolean;
    };
}
