import { DocumentUploadController } from '../backend/common/controllers/document.upload.controller';
import { ObjectDto } from '../backend/Dtos';
import { Toast } from '../Utils/toast.utils';
import { useCustomQueryList } from './useCustomQueryList.hook';
import { FetchData } from './useFetchData.hook';

const useRecentDocuments = () => {
    const {
        data: recentDocuments,
        isLoading: isLoadingRecentDocuments,
        refetch,
    } = useCustomQueryList({
        controller: DocumentUploadController,
        method: 'list',
    });

    const removeRecentDocument = async (
        ids: number[],
        callback?: (response: ObjectDto) => void
    ) => {
        const { response, success } = await FetchData({
            className: DocumentUploadController,
            method: 'remove',
            classParams: {
                ids: ids,
            },
        });

        if (!success) {
            Toast.error({
                description: 'Document remove failed',
            });
        }

        if (success) {
            Toast.success({ description: 'Document removed successfully' });
            refetch();
            callback(response);
        }
    };

    return {
        isLoadingRecentDocuments,
        recentDocuments,
        removeRecentDocument,
    };
};

export default useRecentDocuments;
