import {
    ContactPersonCreationPayload,
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

const AddContactPersonForm = ({
    type,
    type_id,
    callback = () => {},
    data = {},
}: {
    type: GenericListingType;
    type_id: number;
    callback: (
        _: ContactPersonCreationPayload,
        isCreateAnother?: boolean
    ) => void;
    data?: ObjectDto;
}) => {
    const className = LISTING_CONTROLLER_ROUTER[type];

    const isEdit = !!data?.id;

    const formSchema: FormBuilderFormSchema = {
        name: {
            type: 'text',
            label: 'Full Name',
            name: 'name',
            required: true,
            autoFocus: true,
            placeholder: 'Enter full name',
        },
        mobile: {
            type: 'tel',
            label: 'Mobile No.',
            name: 'mobile',
            placeholder: 'Enter mobile number',
        },
        email: {
            type: 'email',
            label: 'Email Address',
            name: 'email',
            placeholder: 'Enter email',
        },
    };

    const handleSubmit: FormBuilderSubmitType = async (
        values: ObjectDto,
        { setError, isCreateAnother }
    ) => {
        const { success, response } = await FetchData({
            className,
            method: 'createContactPerson',
            methodParams: type_id,
            classParams: values,
        });

        if (success) {
            callback(response, isCreateAnother);
            Toast.success({
                description: 'Successfully saved',
            });
        } else {
            if (response?.columns) setError(response?.columns);
            else toastBackendError(response);
            return;
        }
    };

    return (
        <ModalContainer
            title={isEdit ? 'Edit Contact Person' : 'Add Contact Person'}
        >
            <ModalBody>
                <FormBuilder
                    className='relative flex-1'
                    formSchema={formSchema}
                    onSubmit={handleSubmit}
                    initValues={data}
                    withSaveAndNew={!isEdit}
                />
            </ModalBody>
        </ModalContainer>
    );
};

export default AddContactPersonForm;
