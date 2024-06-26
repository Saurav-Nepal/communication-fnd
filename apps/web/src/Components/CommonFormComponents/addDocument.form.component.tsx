import {
    DocumentUploadResponsePayload,
    FormBuilderFormSchema,
    GenericListingType,
    LISTING_CONTROLLER_ROUTER,
    useAddDocument,
} from '@finnoto/core';
import { FormBuilder, ModalBody, ModalContainer } from '@finnoto/design-system';

const AddDocumentsForm = ({
    type,
    type_id,
    callback = () => {},
    data = {},
    defaultClassName,
}: {
    type: GenericListingType;
    type_id: number;
    callback: (_: DocumentUploadResponsePayload) => void;
    data?: any;
    defaultClassName?: any;
}) => {
    const className = LISTING_CONTROLLER_ROUTER[type];

    const formSchema: FormBuilderFormSchema = {
        files: {
            type: 'small_multiple_file_upload',
            multiple: true,
            required: true,
            btnSize: 'sm',
            label: 'Files',
            name: 'files',
        },
        comments: {
            type: 'textarea',
            placeholder: 'Document Message',
            name: 'comment',
            label: 'Comment',
        },
    };

    const { handleSubmit } = useAddDocument({
        className: defaultClassName || className,
        type_id,
        callback,
    });

    return (
        <ModalContainer title='Upload Documents'>
            <ModalBody className='flex-1 pb-0'>
                <FormBuilder
                    formSchema={formSchema}
                    onSubmit={handleSubmit}
                    initValues={{ ...data }}
                />
            </ModalBody>
        </ModalContainer>
    );
};

export default AddDocumentsForm;
