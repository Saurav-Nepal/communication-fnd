import { ReactNode } from 'react';

import {
    FormBuilderFormSchema,
    FormBuilderProps,
    FormSchemaValues,
    ObjectDto,
} from '@finnoto/core';

import { ModalProps } from '../../Components/Dialogs/Modal/modal.types';
import { SlidingPaneProps } from '../../Components/Dialogs/SlidingPane/slidingPane.types';

export class CommonModalFormUtilDto {
    initialValues?: FormBuilderProps['initValues'];
    initialValueId?: number;
    formBuilderProps?: FormBuilderProps;
    title: string | ReactNode;
}

export type ModalFormUtilDto = SlidingPaneInterface | ModalInterface;

interface SlidingPaneInterface extends CommonModalFormUtilDto {
    modal_type: 'slidingPanel';
    slidingPanelProps: SlidingPaneProps;
}
interface ModalInterface extends CommonModalFormUtilDto {
    modal_type: 'modal';
    modalProps: ModalProps;
}

export const hasAnyModalType = (
    props: ModalFormUtilDto
): props is ModalInterface => props.modal_type === 'modal';

export interface CommonFormProps
    extends ApiSchema,
        Pick<
            CommonModalFormUtilDto,
            'title' | 'initialValueId' | 'formBuilderProps'
        > {
    formSchema: FormSchemaValues;
    initialData?: CommonModalFormUtilDto['initialValues'];
    modalType: 'slidingPanel' | 'modal';
}

export interface ApiSchema {
    method: string;
    methodParams?: number | ObjectDto;
    classParams?: ObjectDto;
    controller: any;
    onSuccess?: (res: ObjectDto) => void;
    queryKeys?: any[];
    sanitizeInitialData?: (
        data: ObjectDto,
        formSchema: FormBuilderFormSchema
    ) => ObjectDto;
    sanitizeClassParamsData?: (values: ObjectDto) => ObjectDto;
}
