import {
    CommentCreationPayload,
    FetchData,
    FormBuilderFormSchema,
    FormBuilderSubmitType,
    GenericListingType,
    LISTING_CONTROLLER_ROUTER,
    ObjectDto,
    toastBackendError,
} from '@finnoto/core';
import {
    FormBuilder,
    ModalBody,
    ModalContainer,
    Toast,
} from '@finnoto/design-system';

const AddNotesForm = ({
    type,
    type_id,
    callback = () => {},
    data = {},
    withVendorVisible,
}: {
    type: GenericListingType;
    type_id: any;
    callback: (_: CommentCreationPayload, isCreateAnother?: boolean) => void;
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

    const onSubmit: FormBuilderSubmitType = async (
        values: ObjectDto,
        { setError, isCreateAnother }
    ) => {
        const { success, response } = await FetchData({
            className,
            method: 'setComments',
            methodParams: type_id,
            classParams: values,
        });

        if (success) {
            callback(response, isCreateAnother);
            Toast.success({
                description: isEdit
                    ? 'Successfully Updated'
                    : 'Successfully Added',
            });
        } else {
            if (response?.columns) setError(response?.columns);
            else toastBackendError(response?.columns);
            return false;
        }
    };
    return (
        <ModalContainer title={isEdit ? 'Edit Notes' : 'Add Notes'}>
            <ModalBody className='flex-1'>
                <FormBuilder
                    className='relative flex-1'
                    formSchema={formSchema}
                    onSubmit={onSubmit}
                    initValues={{ ...data }}
                    withSaveAndNew={!isEdit}
                />
            </ModalBody>
        </ModalContainer>
    );
};

export default AddNotesForm;
