import { FormBuilderFormSchema, FormBuilderSubmitType } from '@finnoto/core';
import {
    FormBuilder,
    ModalBody,
    ModalBottomButton,
    ModalContainer,
} from '@finnoto/design-system';

const AddDocumentsFormLocal = ({
    callback = () => {},
    data = {},
}: {
    callback: (files?: any) => void;
    data?: any;
}) => {
    const formSchema: FormBuilderFormSchema = {
        files: {
            type: 'drag_drop_file_upload',
            multiple: true,
            required: true,
            btnSize: 'sm',
        },
        comments: {
            type: 'textarea',
            placeholder: 'Document Message',
            name: 'message',
        },
    };

    const handleSubmit: FormBuilderSubmitType = async (values) => {
        const { files: fileValues } = values;

        const files = [];
        for (const file of fileValues) {
            const { serverUrl: document_url, attributes } = file;

            files.push({
                comments: values.comments,
                document_url: document_url || file?.document_url,
                attributes,
            });
        }

        callback(files);
    };

    return (
        <ModalContainer title='Upload Documents'>
            <ModalBody className='flex-1'>
                <FormBuilder
                    formSchema={formSchema}
                    onSubmit={handleSubmit}
                    className='relative flex-1'
                    initValues={{ ...data }}
                >
                    {({ handleSubmit, isSubmitting, disableSubmit }) => {
                        return (
                            <ModalBottomButton
                                {...{
                                    handleSubmit,
                                    isSubmitting,
                                    disableSubmit,
                                }}
                            />
                        );
                    }}
                </FormBuilder>
            </ModalBody>
        </ModalContainer>
    );
};

export default AddDocumentsFormLocal;
