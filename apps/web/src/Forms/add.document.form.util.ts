import { ApiSchema, ModalFormUtil } from '@finnoto/design-system';

const addDocumentFormUtil = (
    id: number,
    { controller, data }: { controller: any; data?: any }
) => {
    const isEdit = ModalFormUtil.isEdit(data);

    const formSchema = {
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
            name: 'comment',
            label: 'Comment',
        },
    };

    const apiSchema: ApiSchema = {
        controller: controller,
        method: 'createDocument',
        methodParams: id,
        queryKeys: ['document', +id],
        sanitizeClassParamsData: (data) => {
            return {
                files: data?.files.map((val) => ({
                    ...val,
                    comments: data?.comments,
                })),
            };
        },
    };

    return new ModalFormUtil(formSchema, apiSchema).process({
        modal_type: 'slidingPanel',
        title: `${isEdit ? 'Edit' : 'Add'} Document`,
        slidingPanelProps: {},

        initialValues: data,
    });
};

export default addDocumentFormUtil;
