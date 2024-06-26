import {
    FormBuilderFormSchema,
    GenericListingType,
    LISTING_CONTROLLER_ROUTER,
    ObjectDto,
    RefetchGenericListing,
} from '@finnoto/core';
import { ApiSchema, ModalFormUtil, Toast } from '@finnoto/design-system';

const AddContactPersonForm = ({
    options,
    data = {},
}: {
    options: {
        type: GenericListingType;
        type_id: number;
    };
    data?: ObjectDto;
}) => {
    const className = LISTING_CONTROLLER_ROUTER[options?.type];

    const isEdit = ModalFormUtil.isEdit(data);

    const formSchema: FormBuilderFormSchema = {
        name: {
            type: 'text',
            label: 'Full Name',
            name: 'name',
            autoFocus: true,
            placeholder: 'Enter full name',
        },
        mobile: {
            type: 'tel',
            label: 'Mobile No.',
            name: 'mobile',
            placeholder: 'Enter mobile number',
            required: false,
        },
        email: {
            type: 'email',
            label: 'Email Address',
            name: 'email',
            placeholder: 'Enter email',
            required: false,
        },
    };

    const apiSchema: ApiSchema = {
        controller: className,
        method: 'createContactPerson',
        methodParams: options?.type_id,

        onSuccess: () => {
            RefetchGenericListing();
            Toast.success({
                description: 'Successfully saved',
            });
        },
    };
    return new ModalFormUtil(formSchema, apiSchema).process({
        modal_type: 'slidingPanel',
        title: `${isEdit ? 'Edit' : 'Add'} Contact Person`,
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

export default AddContactPersonForm;
