import {
    EmptyFunction,
    FetchData,
    FormBuilderFormSchema,
    ObjectDto,
    toastBackendError,
} from '@finnoto/core';
import { MetaBusinessController } from '@finnoto/core/src/backend/meta/controllers/meta.business.controller';
import {
    FormBuilder,
    ModalBody,
    ModalContainer,
    Toast,
} from '@finnoto/design-system';

const ChangeOrgNameForm = ({ data = {}, callback = EmptyFunction }: any) => {
    const formSchema: FormBuilderFormSchema = {
        name: {
            label: 'Organization Name',
            name: 'name',
            placeholder: 'Enter organization name',
            required: true,
            type: 'text',
        },
    };
    const onSubmit = async (values: ObjectDto) => {
        const { success, response } = await FetchData({
            className: MetaBusinessController,
            method: 'setName',
            classParams: {
                ...values,
            },
        });

        if (success) {
            Toast.success({
                description: 'Successfully change',
            });
            callback(response);
        } else toastBackendError(response);
    };
    return (
        <ModalContainer title='Rename Organisation'>
            <ModalBody>
                <FormBuilder
                    {...{
                        onSubmit,
                        formSchema,
                        buttonLabel: 'Save',
                        buttonAppearance: 'primary',
                        initValues: { ...data },
                    }}
                />
            </ModalBody>
        </ModalContainer>
    );
};

export default ChangeOrgNameForm;
