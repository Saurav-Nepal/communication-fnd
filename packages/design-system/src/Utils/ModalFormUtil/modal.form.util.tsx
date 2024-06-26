import {
    Capitalize,
    FormBuilderFormSchema,
    FormSchemaValues,
    IsEmptyObject,
    IsObject,
    IsUndefinedOrNull,
    ObjectDto,
} from '@finnoto/core';

import { ModalProps } from '../../Components/Dialogs/Modal/modal.types';
import { SlidingPaneProps } from '../../Components/Dialogs/SlidingPane/slidingPane.types';
import { cn } from '../common.ui.utils';
import { Modal } from '../modal.utils';
import { SlidingPane } from '../slidingPane.utils';
import {
    ApiSchema,
    hasAnyModalType,
    ModalFormUtilDto,
} from './modal.formutil.dto';
import { ModalFormUtilComponent } from './ModalFormUtilComponent';
import { SlidingPanelFormUtilComponent } from './SlidingPanelFormUtilComponent';

/**
 *
 * @description A generic Form Builder Utility to create the simple forms
 *
 * @author Saurav Nepal
 */
export class ModalFormUtil {
    protected options: ModalFormUtilDto;

    protected formSchema: FormBuilderFormSchema;
    protected readonly apiSchema: ApiSchema;

    public ref: any;

    constructor(
        formSchema: FormBuilderFormSchema,
        apiSchema: ApiSchema,
        ref?: any
    ) {
        this.formSchema = formSchema;
        this.apiSchema = apiSchema;

        this.ref = ref;
    }

    public process(options: ModalFormUtilDto) {
        this.options = options;

        this.formatFormSchema();

        this.openModal();
        this.openSlidingPanel();
    }

    private openSlidingPanel() {
        if (hasAnyModalType(this.options)) return;

        const slidingPanelProps: SlidingPaneProps = {
            ...this.modalCommonProps('slidingPanelProps'),
            component: SlidingPanelFormUtilComponent,
        };

        SlidingPane.open(slidingPanelProps);
    }

    private openModal() {
        if (!hasAnyModalType(this.options)) return;

        const modalProps: ModalProps = {
            ...this.modalCommonProps('modalProps'),
            component: ModalFormUtilComponent,
        };

        Modal.open(modalProps);
    }

    private modalCommonProps(key: string) {
        return {
            ...this.options[key],
            props: {
                title: this.options.title,
                initialData: this.options.initialValues,
                initialValueId: this.options.initialValueId,
                formSchema: this.formSchema,
                formBuilderProps: this.options.formBuilderProps,
                modalType: this.options.modal_type,
                ...this.apiSchema,
            },
            ref: this.ref,
        };
    }

    private formatFormSchema() {
        let formattedSchema = new Object();

        Object.entries(this.formSchema).map(([key, values]) => {
            formattedSchema[key] = {
                name: key,
                label: Capitalize(this.getLabel(key)),
                placeholder: this.getPlaceholder(key, values),
                required: true,
                messageComponent: () => (
                    <div
                        className={cn('px-2 pt-2 text-xs text-base-secondary', {
                            hidden: !values?.infoText,
                        })}
                    >
                        {values?.infoText}
                    </div>
                ),
                ...this.getReferenceClassParams(values),
                ...values,
            };
        });

        this.formSchema = formattedSchema as FormSchemaValues;
    }

    private getLabel(key: string) {
        const name = key.split('_');
        if (key.endsWith('_id')) return name[0];
        return name.join(' ');
    }
    private menuPosition(modalType: string) {
        if (modalType === 'modal') return 'fixed';
        return 'absolute';
    }

    private getReferenceClassParams(values: ObjectDto) {
        if (values?.type !== 'reference_select') return {};

        return {
            menuPosition: this.menuPosition(this.options.modal_type),
            filterClassParams: {
                active: true,
            },
        };
    }

    private getPlaceholder(key: string, values: ObjectDto) {
        const name = key.split('_');

        if (values?.type === 'reference_select' || values?.type === 'select')
            return `Select ${name[0]}`;

        return `Enter ${name.join(' ')}`;
    }
    public static isEdit(data: ObjectDto) {
        if (!IsUndefinedOrNull(data) && data.id) return true;

        return false;
    }
}
