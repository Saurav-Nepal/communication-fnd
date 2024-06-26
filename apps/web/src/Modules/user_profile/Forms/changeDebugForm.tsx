import { useMemo } from 'react';

import {
    FormBuilderSubmitType,
    GetItem,
    ObjectDto,
    SetItem,
    UserBusiness,
} from '@finnoto/core';
import {
    FormBuilder,
    Modal,
    ModalBody,
    ModalContainer,
} from '@finnoto/design-system';

const ChangeDebugForm = () => {
    const BUSINESS_API_HISTORY = 'BUSINESS_API_URL_HISTORY';

    const getBusinessApiUrlList = () => {
        const apiList = new Set([
            UserBusiness.getBusinessAPIUrl(),
            'https://debug.finnoto.dev',
        ]);
        const storeList = GetItem(BUSINESS_API_HISTORY, true) || [];
        storeList.forEach((item) => apiList.add(item));

        return Array.from(apiList);
    };

    const onSubmit: FormBuilderSubmitType = async (values: ObjectDto) => {
        if (values.isMeta) {
            SetItem('META_BUSINESS_API_URL', values?.end_point, {
                isNonVolatile: true,
            });
            Modal.close();
            window.location.reload();
            return;
        }
        const businessApiUrls = new Set([...getBusinessApiUrlList()]);
        businessApiUrls.add(values?.end_point);

        SetItem(BUSINESS_API_HISTORY, Array.from(businessApiUrls), {
            isNonVolatile: true,
        });
        UserBusiness.setBusinessAPIURLToLocalStorage(values?.end_point);
        Modal.close();
        window.location.reload();
    };

    const businessApiList = useMemo(
        () =>
            getBusinessApiUrlList().map((url) => ({ value: url, label: url })),
        []
    );

    const formSchema = {
        end_point: {
            type: 'autofill_select',
            label: 'Debug End Point',
            placeholder: 'Enter Debug End Point',
            options: businessApiList,
            required: true,
        },
        isMeta: {
            type: 'boolean',
            label: 'On Meta',
        },
    };
    return (
        <ModalContainer title='Change End Point'>
            <ModalBody>
                <FormBuilder
                    onSubmit={onSubmit}
                    {...{ formSchema }}
                    initValues={{
                        end_point: UserBusiness.getBusinessAPIUrl(),
                    }}
                />
            </ModalBody>
        </ModalContainer>
    );
};
export const openDebugForm = () => {
    Modal.open({
        component: ChangeDebugForm,
    });
};

export default ChangeDebugForm;
