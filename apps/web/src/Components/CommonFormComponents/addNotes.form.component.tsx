import {
    CommentCreationPayload,
    FormBuilderFormSchema,
    GenericListingType,
    LISTING_CONTROLLER_ROUTER,
    ObjectDto,
} from '@finnoto/core';
import { ApiSchema, ModalFormUtil } from '@finnoto/design-system';

const AddNotesForm = ({
    type,
    type_id,
    callback = () => {},
    data = {},
    withVendorVisible,
}: {
    type: GenericListingType;
    type_id: any;
    callback: (_: CommentCreationPayload) => void;
    data?: ObjectDto;
    withVendorVisible?: boolean;
}) => {
    const className = {
        ...LISTING_CONTROLLER_ROUTER,
    }[type];
    const isEdit = !!data?.id;

    const formSchema: FormBuilderFormSchema = {
        comments: {
            type: 'textarea',
            label: 'Notes',
            name: 'comments',
            required: true,
            placeholder: 'Enter Notes',
            enableCount: true,
        },
    };

    if (withVendorVisible) {
        formSchema['is_vendor_visible'] = {
            type: 'boolean',
            label: 'Visible to client',
        };
    }

    const apiSchema: ApiSchema = {
        controller: className,
        method: 'setComments',
        methodParams: type_id,
        onSuccess: (response) => {
            callback(response as CommentCreationPayload);
        },
    };
    return new ModalFormUtil(formSchema, apiSchema).process({
        modal_type: 'slidingPanel',
        title: `${isEdit ? 'Edit' : 'Add'} Notes`,
        slidingPanelProps: {
            shouldWarnFormUpdate: true,
        },
        formBuilderProps: {
            layout: 'one-column',
            withSaveAndNew: true,
        },
        initialValues: data,
    });
};

export default AddNotesForm;
