import { useMemo } from 'react';

import { FetchData, IsEmptyObject } from '@finnoto/core';
import { CommunicationTemplateController } from '@finnoto/core/src/backend/communication/controller/commuinication.templates.controller';
import { Loading, Modal, PageLoader } from '@finnoto/design-system';

import { useQuery } from '@tanstack/react-query';

import { ConvertRawApiDataIntoFormSuitable } from './YourTemplateEditor.component';
import { YourTemplatesPreview } from './YourTemplatesPriview.component';

export const AsyncTemplateViewer = ({
    id,
    sample_contents,
}: {
    id: number;
    sample_contents?: any;
}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['template_detail', id],
        queryFn: async () => {
            const { response, success } = await FetchData({
                className: CommunicationTemplateController,
                method: 'show',
                methodParams: id,
            });

            if (success) return response; // Ensure to return the response for further use
            return Promise.reject();
        },
    });

    const defaultData = useMemo(() => {
        if (IsEmptyObject(data)) return {} as any;
        return ConvertRawApiDataIntoFormSuitable(data);
    }, [data]);

    return isLoading ? (
        <Loading size='xl' />
    ) : (
        <YourTemplatesPreview
            sampleContent={sample_contents || defaultData.sample_contents}
            footer={defaultData?.footer}
            body={defaultData?.body}
            configuration={defaultData?.button_configurations}
            title={{
                type: defaultData?.title?.type || 'text',
                value: defaultData?.title?.value || '',
            }}
        />
    );
};

export const openTemplateViewer = (
    id: number,
    options?: { sample_contents?: any }
) => {
    Modal.open({
        component: AsyncTemplateViewer,
        modalSize: 'auto',
        props: { id, sample_contents: options?.sample_contents },
        containerStyle: { zIndex: 999999 },
    });
};
