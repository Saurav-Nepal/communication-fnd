import { useMemo } from 'react';

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
    other_document_type_id,
    data = {},
    defaultClassName,
}: {
    type: GenericListingType;
    type_id: number;
    callback: (_: DocumentUploadResponsePayload) => void;
    other_document_type_id?: number;
    data?: any;
    defaultClassName?: any;
}) => {
    const className = LISTING_CONTROLLER_ROUTER[type];

    const anotherDocumentSchema = useMemo(() => {
        if (other_document_type_id) {
            return {
                identifier: {
                    name: 'identifier',
                    label: 'Name',
                    palceholder: 'Enter identifier',
                    uppercase: true,
                    type: 'text',
                },
            };
        }
        return {};
    }, [other_document_type_id]);
    const anotherTypeId = useMemo(() => {
        return {}; // for another type of document add
    }, []);

    const formSchema: FormBuilderFormSchema = {
        files: {
            type: 'small_multiple_file_upload',
            multiple: true,
            required: true,
            btnSize: 'sm',
            label: 'Select and upload file',
        },
        comments: {
            type: 'textarea',
            placeholder: 'Document Message',
            label: 'Comment',
        },
        ...anotherDocumentSchema,
    };

    const { handleSubmit } = useAddDocument({
        className: defaultClassName || className,
        type_id: type_id,
        callback: callback,
        restParams: {
            ...anotherTypeId,
        },
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
