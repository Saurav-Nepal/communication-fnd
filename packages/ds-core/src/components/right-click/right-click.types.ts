import { ReactElement } from 'react';

import { ObjectDto } from '@slabs/ds-utils';

export interface RightClickProps {
    children: ReactElement;
    className?: string;
    actions: RightClickRowOptionProps[];
    disabled?: boolean;
}

export interface RightClickRowOptionProps {
    name: string;
    key: string;
    disabled?: boolean | ((data: ObjectDto) => boolean);
    visible?: boolean | ((data: ObjectDto) => boolean);
    className?: string;
    onClick?: (
        data?: ObjectDto,
        e?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
    subMenuActions?: RightClickRowOptionProps[];
    getCustomQuery?: (data: ObjectDto) => {
        field: string;
        value: string | number | boolean;
    };
}
