import { ObjectDto } from '@finnoto/core';
import { ReactNode } from 'react';
import { ReferenceSelectBoxProps } from './referenceSelectBox.types';

export interface NestedRefSelectBoxProps
    extends Omit<ReferenceSelectBoxProps, 'prefixItem' | 'isMulti'> {
    childMethod?: string;
    parentMethod?: string;
}
