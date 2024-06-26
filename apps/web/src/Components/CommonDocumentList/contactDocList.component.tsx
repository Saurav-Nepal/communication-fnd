import { useCallback } from 'react';

import {
    EmptyFunction,
    GetObjectFromArray,
    IsEmptyArray,
    IsFunction,
    ObjectDto,
    useUserHook,
} from '@finnoto/core';
import {
    Avatar,
    Button,
    Icon,
    IconButton,
    ListingCardDocument,
    NoDataFound,
} from '@finnoto/design-system/src/Components';

import InvoiceNoteList from './invoiceNoteList.component';

import {
    BigNoDocumentSvgIcon,
    MobileSvgIcon,
    MoreIcon,
    SmallMailSvgIcon,
} from 'assets';

interface RowAction {
    name?: String;
    action: (data?: ObjectDto) => void;
    key?: string;
    icon?: string | (() => {});
    outerIcon?: boolean;
    type?: 'delete' | 'edit';
}
interface ContactDocListingProps {
    componentKey: 'contact' | 'documents' | 'notes';
    data?: any[];
    rowActions?: RowAction[];
    outerIcon?: boolean;
    hideheader?: boolean;
    icon?: string | (() => {});
    addNotes?: () => void;
    addDocument?: (files?: any) => void;
    onDeleteDocument?: (item: number, index?: number) => void;
    isDelete?: boolean;
}

const ContactDocListing = ({
    componentKey,
    data,
    rowActions = [],
    hideheader = true,
    addNotes,
    addDocument,
    onDeleteDocument = EmptyFunction,
    isDelete,
}: ContactDocListingProps) => {
    const { user } = useUserHook();
    const onClickToDelete = GetObjectFromArray(
        rowActions,
        'type',
        'delete'
    )?.action;

    const onClickToEdit = GetObjectFromArray(
        rowActions,
        'type',
        'edit'
    )?.action;

    // showing listing card according to the component

    const handelShowingListing = useCallback(
        (data, index) => {
            if (componentKey === 'contact')
                return <ListingCardContact key={index} data={data} />;
            if (componentKey === 'documents')
                return (
                    <div className='h-full gap-4 overflow-y-auto col-flex '>
                        <ListingCardDocument
                            key={index}
                            data={data}
                            addDocument={(files) => {
                                addDocument();
                            }}
                            onHandleDelete={() =>
                                onDeleteDocument(data?.id, index)
                            }
                            type='document'
                            user={user}
                            isDelete={isDelete}
                        />
                    </div>
                );
            return <></>;
        },
        [addDocument, componentKey, isDelete, onDeleteDocument, user]
    );

    if (componentKey === 'notes')
        return (
            <div className='h-full px-2'>
                <InvoiceNoteList
                    {...{
                        data,
                        onClickToDelete,
                        hideheader,
                        onClickToEdit,
                        addNotes,
                    }}
                />
            </div>
        );

    if (componentKey === 'documents')
        return (
            <div className='flex-1 h-full overflow-y-auto rounded scrollbar-none bg-base-100'>
                {IsEmptyArray(data) ? (
                    <div className='flex items-center justify-center h-full rounded bg-base-100'>
                        <NoDataFound
                            icon={BigNoDocumentSvgIcon}
                            title='No records found for documents'
                            button={{
                                onClick: addDocument,
                                name: 'Documents',
                            }}
                        />
                    </div>
                ) : (
                    <div className='gap-2 pt-2 col-flex'>
                        {data?.map((item, index) =>
                            handelShowingListing(item, index)
                        )}
                    </div>
                )}
            </div>
        );
    return (
        <div className='flex-1 overflow-y-auto rounded bg-base-100'>
            {IsEmptyArray(data) ? (
                <div className='flex items-center justify-center h-full'>
                    <NoDataFound />
                </div>
            ) : (
                <>
                    {data?.map((item, index) =>
                        handelShowingListing(item, index)
                    )}
                </>
            )}
        </div>
    );
};

const ListingCardContact = ({ data }: any) => {
    return (
        <div className='p-4 border-b last:border-b-0'>
            <div className='flex items-center gap-2 '>
                <Avatar alt={data?.name} size='sm' shape='circle' />
                <div className='flex-1'>
                    <h4 className='text-sm font-semibold text-base-secondary'>
                        {data?.name}
                    </h4>
                    <div className='flex items-center gap-4 mt-1'>
                        <div className='flex items-center gap-1'>
                            <Icon source={SmallMailSvgIcon} size={15} isSvg />
                            <span className='text-xs text-base-secondary'>
                                {data.email}
                            </span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Icon source={MobileSvgIcon} size={15} isSvg />
                            <span className='text-xs text-base-secondary'>
                                Phone: {data.mobile}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <IconButton
                        icon={MoreIcon}
                        size={'sm'}
                        appearance='ghost'
                        shape='square'
                        className='hover:bg-primary/10'
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactDocListing;
