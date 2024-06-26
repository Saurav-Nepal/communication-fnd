import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../backend/Dtos';
import { IsObject } from '../../Utils/filter.utils';
import { Toast } from '../../Utils/toast.utils';
import { Functions } from '../../Utils/ui.utils';
import { useCustomQueryList } from '../useCustomQueryList.hook';
import { FetchData } from '../useFetchData.hook';

export const useDocumentList = ({
    className,
    id,
    type,
    method,
    defaultEnabled = true,
    methodParams,
    classParams,
}: {
    className: any;
    id: number;
    type?: string | any;
    method:
        | 'getComments'
        | 'getDocuments'
        | 'getFileUploads'
        | 'getAll'
        | 'getIssues'
        | 'getSources';
    defaultEnabled?: boolean;
    methodParams?: ObjectDto;
    classParams?: ObjectDto;
}) => {
    const {
        data = [],
        isLoading,
        isSuccess,
        refetch: refetchList,
        isInitialLoading,
    } = useCustomQueryList({
        controller: className,
        queryDefinition: 'note_document_list',
        disableNetwork: !defaultEnabled || !id,
        method: method,
        methodParams: methodParams ? { ...methodParams, id } : id,
        classParams,
    });

    const onRemove = async (dataId: any) => {
        let method = '';
        let methodParams: any = {
            id,
        };

        switch (type) {
            case 'notes':
                method = 'deleteComment';
                methodParams = {
                    id,
                    dataId,
                };
                break;
            case 'documents':
                method = 'deleteDocument';
                methodParams = {
                    id,
                    dataId,
                };
                break;
        }

        if (IsObject(dataId)) {
            methodParams = { ...methodParams, ...dataId };
        }
        const { success } = await FetchData({
            className,
            method,
            methodParams,
        });
        if (success) {
            Toast.success({
                description: 'Successfully deleted',
            });
            refetchList();
        }
    };

    const onUploadDocument = (data: any) => {
        Functions.openAddDocuments(
            type,
            id,
            () => {
                refetchList();
            },
            data,
            className
        );
    };

    const onCreate = async (data: ObjectDto | File[]) => {
        let method = '';

        switch (type) {
            case 'notes':
                method = 'setComments';
                break;
            case 'documents':
                onUploadDocument(data);
                return;
        }
        const { success } = await FetchData({
            className,
            method,
            methodParams: id,
            classParams: data,
        });
        if (success) {
            refetchList();
        }
    };

    return {
        data,
        loading: isLoading,
        isInitialLoading,
        success: isSuccess,
        refetchList,
        onRemove,
        onCreate,
    };
};
