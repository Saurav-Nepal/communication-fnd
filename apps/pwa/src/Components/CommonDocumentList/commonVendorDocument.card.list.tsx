import { title } from 'process';
import { useCallback, useMemo } from 'react';

import {
    AccessManager,
    FormatDisplayDate,
    GetDateValue,
    GetObjectFromArray,
    IsEmptyObject,
    IsUndefined,
    IsUndefinedOrNull,
    ObjectDto,
    useLookupOfType,
} from '@finnoto/core';

import GenericCardListing, {
    GenericCardListingProps,
} from '@Components/GenericCardListing/genericCardListing';
import { openImageViewer } from '@Utils/functions.utils';

const CommonVendorDocumentCardList = (props: any) => {
    const {
        documentTypes,
        documents,
        className,
        fetchDocuments,
        id,
        editable = true,
        type,
    } = props || {};
    const [types] = useLookupOfType(109);

    const isEditDocument = useCallback((document) => {
        return (
            document?.identifier ||
            !!document?.expiry_date ||
            !IsEmptyObject(document?.custom_field_data) ||
            document?.documents?.length
        );
    }, []);

    const isVisibleRowAction = useMemo(() => {
        if (type == 'business')
            return AccessManager.hasRoleIdentifier('ua_business_manager');
        if (['business_vendor', 'vendor'].includes(type))
            return AccessManager.hasRoleIdentifier('ua_vendor_manager');
        return true;
    }, [type]);

    const card_props: GenericCardListingProps = {
        data: documents,
        list: {
            titleKey: 'name',
            listClass: 'pt-3',
            titlePrefix: (vendor_document: ObjectDto) => {
                return (
                    <div className='capitalize'>
                        {vendor_document?.type?.name}
                    </div>
                );
            },
            rightComponent: (item: ObjectDto) => {
                if (!isVisibleRowAction) return <></>;
                return (
                    <div className='flex gap-3'>
                        {editable && (
                            <span className='text-sm text-info'>
                                {isEditDocument(item) ? 'Edit' : '+ Add'}
                            </span>
                        )}
                    </div>
                );
            },
            bottomListItems: [
                {
                    name: 'Document Number',
                    key: 'identifier',
                    visible: (item) => !IsUndefinedOrNull(item?.identifier),
                },
                {
                    name: 'Lower TDS',
                    key: 'custom_field_data',
                    visible: (item) => {
                        const document =
                            GetObjectFromArray(
                                documentTypes,
                                'id',
                                item?.type_id
                            ) || [];

                        const hasLowerTds = document?.columns?.columns?.map(
                            (column) => {
                                if (column?.name === 'Lower TDS Percentage') {
                                    return true;
                                }
                            }
                        );

                        return [hasLowerTds].includes(true);
                    },
                    renderValue: (vendor_document: ObjectDto) => {
                        const document =
                            GetObjectFromArray(
                                documentTypes,
                                'id',
                                vendor_document?.type_id
                            ) || [];

                        return (
                            <div className='text-xs text-right col-flex gap-x-4 gap-y-2'>
                                {document?.columns?.columns?.map((column) => {
                                    if (column?.name === 'expiry_date') return;
                                    const value = parseOtherDetailValue(
                                        column,
                                        vendor_document?.custom_field_data ||
                                            {},
                                        types
                                    );

                                    if (
                                        column?.identifier ===
                                        document?.identifier_column
                                    )
                                        return null;
                                    if (!value) return null;

                                    if (
                                        column?.name === 'Lower TDS Percentage'
                                    ) {
                                        return (
                                            <div
                                                className='justify-end w-full gap-2 row-flex'
                                                key={column?.id}
                                            >
                                                {value || '-'}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        );
                    },
                },
                {
                    name: 'Added At',
                    key: 'created_at',
                    type: 'date',
                    visible: (item) => item?.documents?.length > 0,
                },
                {
                    name: 'No of Document',
                    key: 'custom_doc',
                    visible: (item) => item?.documents?.length > 0,
                    renderValue: (item) => (
                        <span
                            className='table-link'
                            onClick={(e) => {
                                e.stopPropagation();
                                openImageViewer(item?.documents, { title });
                            }}
                        >
                            {item?.documents?.length} Documents
                        </span>
                    ),
                },
            ],
        },
    };
    return <GenericCardListing {...card_props} />;
};

const parseOtherDetailValue = (
    column: any,
    custom_field_data: any = {},
    types
) => {
    const value = custom_field_data[column?.identifier];

    if (IsUndefined(value)) return null;
    const type = GetObjectFromArray(types, 'id', column?.type_id)?.value || '';

    if (type.toLowerCase() === 'date') {
        return FormatDisplayDate(value, false);
    }

    if (column?.percentage) {
        if (value) {
            return `${value}%`;
        }
        return null;
    }
    return value;
};

export default CommonVendorDocumentCardList;
