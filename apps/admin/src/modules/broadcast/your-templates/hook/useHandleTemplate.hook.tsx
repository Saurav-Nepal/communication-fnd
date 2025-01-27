import { useRef } from 'react';
import { messages } from 'react-querybuilder';

import { isUndefinedOrNull } from '@slabs/ds-utils';

import { useQuery } from '@tanstack/react-query';

import { CommunicationTemplateEndPoint } from '../../../../constants/api.constants';
import { BUSINESS_API_HOST } from '../../../../constants/global.constants';
import { WHATSAPP_TEMPLATE_LIST_ROUTE } from '../../../../constants/routeName.constants';
import { Get, Post } from '../../../../services';
import { FormBuilderSubmitType } from '../../../../types';
import { toastBackendError } from '../../../../utils/common.utils';
import { Navigation } from '../../../../utils/navigation.utils';
import { ConvertRawApiDataIntoFormSuitable } from '../components/YourTemplateEditor.component';

export const useHandleTemplate = (id: number) => {
    const ref = useRef<any>(null);

    const onSubmit: FormBuilderSubmitType = async (
        value: any,
        { setError }
    ) => {
        const { success, response } = await Post({
            urlPrefix: BUSINESS_API_HOST,
            url: CommunicationTemplateEndPoint,
            data: {
                ...value,
            },
        });
        if (!success) return toastBackendError(response, setError);
        return Navigation.navigate({ url: WHATSAPP_TEMPLATE_LIST_ROUTE });
    };

    const {
        data: defaultData,
        isLoading,
        isFetched = true,
    } = useQuery({
        queryKey: ['template_detail', id],
        queryFn: async () => {
            const { response, success } = await await Get({
                urlPrefix: BUSINESS_API_HOST,
                url: `${CommunicationTemplateEndPoint}/${id}`,
            });
            if (success) return ConvertRawApiDataIntoFormSuitable(response);
            Promise.reject(messages);
        },
        enabled: !isUndefinedOrNull(id),
    });

    return { ref, onSubmit, isLoading, defaultData, isFetched };
};
