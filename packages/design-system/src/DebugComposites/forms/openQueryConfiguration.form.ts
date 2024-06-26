import { FetchData, RefetchGenericListing } from '@finnoto/core';
import { BusinessReportController } from '@finnoto/core/src/backend/ap/business/controllers/business.report.controller';
import {
    ApiSchema,
    formatSqlQuery,
    ModalFormUtil,
} from '@finnoto/design-system';

export const editQueryConfiguration = async (
    slug: string,
    options?: { callback?: () => void }
) => {
    const { success, response } = await FetchData({
        className: BusinessReportController,
        method: 'getScriptDetail',
        methodParams: slug,
    });

    if (!success) return;

    const formSchema = {
        slug: {
            type: 'text',
            disabled: true,
        },
        query: {
            type: 'sql-editor',
        },
    };

    const apiSchema: ApiSchema = {
        controller: BusinessReportController,
        method: 'editScript',
        methodParams: response?.query?.id,
        onSuccess: () => {
            RefetchGenericListing();
            options?.callback?.();
        },
        sanitizeClassParamsData: (values) => {
            return {
                query: (values?.query?.trim() as string)
                    .replace(/(\r\n|\n|\r)/gm, ' ')
                    .replaceAll('  ', ' '),
            };
        },
    };

    return new ModalFormUtil(formSchema, apiSchema).process({
        modal_type: 'modal',
        title: 'Edit Query',
        initialValues: {
            query: formatSqlQuery(response?.query?.script),
            slug: response?.name,
        },
        modalProps: {
            modalSize: 'md',
        },
        formBuilderProps: {
            layout: 'one-column',
            withSaveAndNew: false,
        },
    });
};
