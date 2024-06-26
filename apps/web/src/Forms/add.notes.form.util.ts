import { ApiSchema, ModalFormUtil } from '@finnoto/design-system';

const addNotesFormUtil = (
    id: number,
    { controller, data }: { controller: any; data?: any }
) => {
    const isEdit = ModalFormUtil.isEdit(data);

    const formSchema = {
        comments: {
            type: 'text',
            label: 'Note',
            placeholder: 'Enter Notes',
        },
    };

    const apiSchema: ApiSchema = {
        controller: controller,
        method: 'setComments',
        methodParams: id,
        onSuccess: () => {},
        queryKeys: ['note', +id],
    };

    return new ModalFormUtil(formSchema, apiSchema).process({
        modal_type: 'slidingPanel',
        title: `${isEdit ? 'Edit' : 'Add'} Notes`,
        slidingPanelProps: {},
        formBuilderProps: {
            withSaveAndNew: !isEdit ? true : false,
        },
        initialValues: data,
    });
};

export default addNotesFormUtil;
