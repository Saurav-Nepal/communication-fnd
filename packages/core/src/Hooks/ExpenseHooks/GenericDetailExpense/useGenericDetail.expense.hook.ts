import { useCallback, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../../backend/Dtos';
import { LISTING_CONTROLLER_ROUTER } from '../../../Constants';
import { GenericListingType } from '../../../Types';
import { AccessManager } from '../../../Utils/accessManager.utils';
import {
    AccessNestedObject,
    EmptyFunction,
    IsEmptyObject,
} from '../../../Utils/common.utils';
import { Toast } from '../../../Utils/toast.utils';
import { useContactPersons, useDocumentList } from '../../CommonComponentHooks';
import { useCustomField } from '../../useCustomField.hook';
import { FetchData } from '../../useFetchData.hook';

export interface ApiInterface {
    type: GenericListingType;
    method?: string;
}
export type commonActionRoleIdentifiersProps = {
    note?: string;
    document?: string;
    contact_person?: string;
};
export const useGenericDetail = (
    id: number,
    props: {
        api: ApiInterface;
        onInitRetrieveDetail?: (data: ObjectDto) => void;
        custom_column_id?: number;
        disableCommon?: {
            note?: boolean;
            document?: boolean;
            contact_person?: boolean;
        };
        custom_field_key?: string;
        commonActionRoleIdentifiers?: commonActionRoleIdentifiersProps;
    }
) => {
    const {
        api,
        onInitRetrieveDetail = EmptyFunction,
        custom_column_id,
        disableCommon,
        custom_field_key,
        commonActionRoleIdentifiers,
    } = props || {};
    const { type, method = 'show' } = api || {};
    const className = LISTING_CONTROLLER_ROUTER[type];
    const {
        note: isDisableCommonNote,
        document: isDisableCommonDocument,
        contact_person: isDisableCommonContactPerson = true,
    } = disableCommon || {};

    const { sanitizeCustomFieldData, isLoading: customFieldLoading } =
        useCustomField({
            type_id: custom_column_id,
        });
    const fetchDetail = useCallback(async () => {
        if (!id) return;
        const { response, success } = await FetchData({
            className,
            method,
            methodParams: id,
        });
        if (response?.id) onInitRetrieveDetail(response);
        if (success) return response;
        return {};
    }, [className, id, method, onInitRetrieveDetail]);
    const {
        data: detail,
        isLoading,
        refetch: refetchDetail,
    } = useQuery({
        queryKey: ['generic detail', type, id],
        queryFn: fetchDetail,
    });
    const contactPersonData = useContactPersons({
        sourceId: Number(id),
        type,
        disableNetwork: !detail?.id || isDisableCommonContactPerson,
    });

    const { noteEditable, documentEditable, contactPersonEditable } =
        useMemo(() => {
            return {
                noteEditable: commonActionRoleIdentifiers?.note
                    ? AccessManager.hasRoleIdentifier(
                          commonActionRoleIdentifiers?.note
                      )
                    : true,
                documentEditable: commonActionRoleIdentifiers?.document
                    ? AccessManager.hasRoleIdentifier(
                          commonActionRoleIdentifiers?.document
                      )
                    : true,
                contactPersonEditable:
                    commonActionRoleIdentifiers?.contact_person
                        ? AccessManager.hasRoleIdentifier(
                              commonActionRoleIdentifiers?.contact_person
                          )
                        : true,
            };
        }, [
            commonActionRoleIdentifiers?.contact_person,
            commonActionRoleIdentifiers?.document,
            commonActionRoleIdentifiers?.note,
        ]);

    const {
        data: notes,
        refetchList: fetchNotes,
        onRemove: onDeleteNote,
        isInitialLoading: noteLoading,
        onCreate: onAddNote,
    } = useDocumentList({
        id: +id,
        className,
        method: 'getComments',
        type: 'notes',
        defaultEnabled: !!detail?.id && !isDisableCommonNote,
    });
    const {
        data: documents,
        refetchList: fetchDocuments,
        onRemove: onDeleteDocument,
        onCreate: onAddDocument,
        isInitialLoading: documentLoading,
    } = useDocumentList({
        id: +id,
        className,
        method: 'getDocuments',
        type: 'documents',
        defaultEnabled: !!detail?.id && !isDisableCommonDocument,
    });

    const custom_field_data = useMemo(() => {
        const custom_field_data =
            AccessNestedObject(detail, custom_field_key) || {};
        if (customFieldLoading || IsEmptyObject(custom_field_data)) return [];

        return sanitizeCustomFieldData(custom_field_data);
    }, [customFieldLoading, custom_field_key, detail, sanitizeCustomFieldData]);

    const handleStatus = async (
        id: number,
        isActivate = true,
        fn_method = 'activate',
        callback = EmptyFunction
    ) => {
        const { success } = await FetchData({
            className,
            methodParams: id,
            method: isActivate ? `${fn_method}` : `de${fn_method}`,
        });

        if (success) {
            Toast.success({ description: 'Status Changed' });
            refetchDetail();
            callback();
        }
    };

    return {
        detail: detail as ObjectDto,
        loading: isLoading,
        fetchDetail: refetchDetail,
        custom_field_data,
        handleStatus,
        noteData: {
            notes,
            fetchNotes,
            onDeleteNote,
            loading: noteLoading,
            onAddNote,
            isDisableCommonNote,
            isEditable: noteEditable,
        },
        documentData: {
            fetchDocuments,
            documents,
            onDeleteDocument,
            onAddDocument,
            loading: documentLoading,
            isDisableCommonDocument,
            isEditable: documentEditable,
        },
        contactPersonData: {
            ...contactPersonData,
            loading: contactPersonData.isLoading,
            fetchContactPersons: contactPersonData.refetchList,
            isDisableCommonContactPerson,
            isEditable: contactPersonEditable,
        },
    };
};
