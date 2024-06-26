import {
    Ellipsis,
    EmptyFunction,
    FormatDisplayDate,
    GetFileDetails,
    GetObjectFromArray,
    IsEmptyArray,
    ObjectDto,
    useUserHook,
} from '@finnoto/core';
import {
    Avatar,
    Icon,
    IconButton,
    NoDataFound,
} from '@finnoto/design-system/src/Components';
import { handleDocumentIcon } from '@finnoto/design-system/src/Composites/Uploader/uploader.utils';
import {
    BigNoDocumentSvgIcon,
    DeleteSvgIcon,
    FileDownloadSvgIcon,
    MobileSvgIcon,
    MoreIcon,
    SmallMailSvgIcon,
} from 'assets';
import { useCallback, useMemo } from 'react';
import InvoiceNoteList from './invoiceNoteList.component';

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
    onDeleteDocument?: (item: number) => void;
    isDelete?: boolean;
}

const ContactDocListing = ({
    componentKey,
    data,
    rowActions = [],
    hideheader = true,
    addNotes,

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
                    <ListingCardDocuments
                        key={index}
                        data={data}
                        addDocument={(files) => {
                            // addDocument([]); @Todo add document handle
                        }}
                        onHandleDelete={onDeleteDocument}
                        type='document'
                        user={user}
                        isDelete={isDelete}
                    />
                );
            return <></>;
        },
        [componentKey, isDelete, onDeleteDocument, user]
    );

    if (componentKey === 'notes')
        return (
            <div className='h-full p-2 overflow-hidden bg-base-100'>
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
            <div className='flex-1 h-full overflow-y-auto rounded bg-base-100'>
                {IsEmptyArray(data) ? (
                    <div className='flex items-center justify-center h-full rounded bg-base-100'>
                        <NoDataFound
                            icon={BigNoDocumentSvgIcon}
                            title='There is no document here !'
                            description='The document you are looking for is not uploaded.'
                            // button={{
                            //     name: 'Add Document',
                            //     onClick: (files) => {
                            //         // addDocument(files); @todo add document
                            //     },
                            // }}
                        />
                    </div>
                ) : (
                    <div className='gap-2 col-flex'>
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

const ListingCardDocuments = ({
    data,
    onHandleDelete = EmptyFunction,
    user,
    isDelete,
}: any) => {
    const name = GetFileDetails(data.document_url || '').name;

    const handleDownload = (data: any) => {
        const link = data.document_url;
        window.location = link;
    };
    const isDeleteOptionShow = useMemo(() => {
        if (!isDelete) return false;
        let activeFile: any = data;

        if (activeFile?.created_by === user?.id) return true;
        return !activeFile?.attributes?.no_edit;
    }, [data, isDelete, user?.id]);

    return (
        <div className='flex gap-4 px-4 py-3 rounded bg-base-200 hover:shadow onHover-show'>
            <div>
                <Icon
                    source={handleDocumentIcon(name)}
                    isSvg
                    size={24}
                    iconColor='text-base-tertiary'
                    className='mt-1'
                />
            </div>
            <div className='flex-1 gap-1 col-flex'>
                <h5 className='text-sm'>
                    {data?.attributes?.comments ||
                        data?.comments ||
                        'No comments Added'}
                </h5>
                <div className='flex items-center gap-2 text-xs text-base-secondary'>
                    <span> {Ellipsis({ text: name })}</span>
                    <span className='block w-1 h-1 rounded-full bg-base-300'></span>

                    <span>
                        Added At :{' '}
                        {FormatDisplayDate(data.created_at || new Date(), true)}
                    </span>
                </div>
            </div>
            <div className='opacity-0 onHover-showChild'>
                <div className='flex items-center gap-1'>
                    <IconButton
                        icon={FileDownloadSvgIcon}
                        size='xs'
                        appearance='ghost'
                        className={
                            'text-base-tertiary hover:bg-primary hover:text-white transition-all'
                        }
                        shape='square'
                        onClick={() => handleDownload(data)}
                    />
                    {isDeleteOptionShow && (
                        <IconButton
                            icon={DeleteSvgIcon}
                            size='xs'
                            appearance='ghost'
                            className={
                                'text-error hover:bg-error hover:text-white transition-all'
                            }
                            shape='square'
                            onClick={onHandleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactDocListing;
