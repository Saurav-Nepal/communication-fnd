import { ObjectDto } from '../../backend/Dtos';
import { FormBuilderSubmitType } from '../../Types';
import { FetchData } from '../useFetchData.hook';

export const useAddDocument = ({
    className,
    type_id,
    callback = () => {},
    restParams = {},
}: {
    className: any;
    type_id: number;
    callback?: (_: any) => void;
    restParams?: ObjectDto;
}) => {
    const handleSubmit: FormBuilderSubmitType = async (values) => {
        const { files: fileValues } = values;

        const files = [];
        for (const file of fileValues) {
            const {
                serverUrl: document_url,

                attributes,
                ...rest
            } = file || {};

            files.push({
                comments: values.comments,
                document_url: document_url || file?.document_url,
                attributes: attributes,
                ...rest,
            });
        }

        const { success } = await FetchData({
            className,
            method: 'createDocument',
            methodParams: type_id,
            classParams: { files, ...restParams },
        });

        if (success) {
            callback({ document_url: fileValues[0]?.serverUrl });
        }
    };
    return {
        handleSubmit,
    };
};
