import {
    forwardRef,
    Fragment,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import AnimateHeight from 'react-animate-height';

import {
    AccessNestedObject,
    EmptyFunction,
    FileData,
    GetObjectFromArray,
    IsFunction,
    ObjectDto,
    sanitizeUiAction,
    useFetchParams,
    useGenericDetail,
} from '@finnoto/core';
import {
    Avatar,
    BasicListFilterButton,
    ChangeStatusModal,
    cn,
    FloatingButton,
} from '@finnoto/design-system';

import AppHeader from '@Components/AppHeader/appHeader.component';
import {
    BusinessIconImage,
    EmployeeIconImage,
    VendorIconImage,
} from '@Components/BusinessImage/businessImage.component';
import ContactPersonCardList from '@Components/CommonDocumentList/contactPersonCardList.component';
import InvoiceNoteList from '@Components/CommonDocumentList/invoiceNoteList.component';
import DocumentView from '@Components/DocumentViewer/documentView.component';
import GenericCard from '@Components/GenericCardListing/Components/genericCard.component';
import PwaBreadCrumbs from '@Components/PwaBreadCrumbs/PwaBreadCumbs.component';
import {
    openAddDocuments,
    openAddIntegrationContactPerson,
    openAddNotes,
    openDetailDataNotFound,
} from '@Utils/functions.utils';

import { DetailPageInterface } from './generic.detail.page.expense.types';

const GenericDetailPageExpense = forwardRef(
    (
        {
            subDetailInfo,
            api,
            tabItems,
            actions = [],
            onInitRetrieveDetail = EmptyFunction,
            menu = {},
            onEdit,
            custom_column_id,
            custom_field_key = 'custom_field_data',
            disableCommon,
            breadcrumb,
            status_action,
            edit_key,
            listingRoute,
            name,
            disableBreadCrumb,
            commonActionRoleIdentifiers,
        }: DetailPageInterface,
        ref: any
    ) => {
        const { id, tab } = useFetchParams();
        const {
            detail,
            loading,
            documentData,
            noteData,
            fetchDetail,

            contactPersonData,
            handleStatus,
        } = useGenericDetail(+id, {
            api,
            onInitRetrieveDetail,
            custom_column_id,
            disableCommon,
            custom_field_key,
            commonActionRoleIdentifiers,
        });
        const openAddNoteForm = useCallback(
            (data?: ObjectDto) => {
                openAddNotes(data, noteData?.fetchNotes, {
                    type: api?.type,
                    type_id: Number(id),
                });
            },
            [api?.type, id, noteData?.fetchNotes]
        );
        const openAddDocumentForm = useCallback(
            (data?: ObjectDto) => {
                openAddDocuments(
                    api?.type as any,
                    Number(id),
                    documentData.fetchDocuments,
                    data
                );
            },
            [api?.type, documentData.fetchDocuments, id]
        );

        const openAddContactPerson = useCallback(
            (data?: ObjectDto) => {
                openAddIntegrationContactPerson(
                    data,
                    contactPersonData.fetchContactPersons,
                    {
                        type: api?.type,
                        type_id: Number(id),
                    }
                );
            },
            [api?.type, contactPersonData.fetchContactPersons, id]
        );

        useImperativeHandle(
            ref,
            () => ({
                fetchDetail,
            }),
            [fetchDetail]
        );
        const noteRowActions = useMemo(() => {
            if (!noteData?.isEditable) return [];
            return [
                {
                    type: 'delete',
                    action: (id) => {
                        noteData?.onDeleteNote(id);
                    },
                },
                {
                    type: 'edit',
                    action: (data) => openAddNoteForm(data),
                },
            ];
        }, [noteData, openAddNoteForm]);

        const handleStatusChange = useCallback(
            ({ id, method, isActive }) => {
                return ChangeStatusModal({
                    onConfirmPress: () => {
                        handleStatus(id, isActive, method);
                    },
                    item: detail,
                });
            },
            [detail, handleStatus]
        );

        const common_actions = useMemo(() => {
            const actions: any = [];
            actions.push({
                name: 'Add Contact Person',
                key: 'generic_add_contact_persons',
                visible:
                    contactPersonData?.isEditable &&
                    !contactPersonData.isDisableCommonContactPerson,
                action: () => openAddContactPerson(),
            });
            actions.push({
                name: 'Add Notes',
                key: 'generic_note_add',
                visible:
                    contactPersonData?.isEditable &&
                    !contactPersonData.isDisableCommonContactPerson,

                action: openAddNoteForm,
            });

            actions.push({
                name: 'Add Documents',
                key: 'generic_document_add',
                visible:
                    documentData?.isEditable &&
                    !documentData?.isDisableCommonDocument,
                action: () => openAddDocumentForm(),
            });
            if (status_action) {
                const {
                    activateId = 'id',
                    status_key = 'active',
                    key,
                    method = 'activate',
                    activeLabel = 'Activate',
                    deactiveLabel = 'Deactivate',
                    visible,
                } = status_action;
                const active = AccessNestedObject(detail, status_key);
                const activeId = AccessNestedObject(detail, activateId);
                actions.push({
                    name: active ? deactiveLabel : activeLabel,
                    key,
                    action: () =>
                        handleStatusChange({
                            id: activeId,
                            method: method,

                            isActive: !active,
                        }),
                    isCancel: active,
                    className:
                        !active &&
                        'text-success focus:bg-success focus:text-success-content ',
                    not_change_name: true,
                    visible,
                });
            }
            return actions;
        }, [
            contactPersonData.isDisableCommonContactPerson,
            contactPersonData?.isEditable,
            detail,
            documentData?.isDisableCommonDocument,
            documentData?.isEditable,
            handleStatusChange,
            openAddContactPerson,
            openAddDocumentForm,
            openAddNoteForm,
            status_action,
        ]);
        const editAction = useMemo(() => {
            if (!IsFunction(onEdit)) return [];
            return [
                {
                    name: 'Edit',
                    action: () => onEdit(detail, fetchDetail),
                    key: edit_key,
                },
            ];
        }, [detail, edit_key, fetchDetail, onEdit]);

        const roleFilterActions = useMemo(
            () =>
                sanitizeUiAction(
                    [...editAction, ...actions, ...common_actions],
                    menu
                ),
            [actions, common_actions, editAction, menu]
        );
        const commonTabItems = useMemo(
            () => [
                {
                    title: 'Documents',
                    key: 'generic_document_add',
                    component: (
                        <DocumentViewComponent
                            files={documentData.documents}
                            onDelete={documentData.onDeleteDocument}
                            onAddDocument={documentData?.onAddDocument}
                        />
                    ),

                    visible: !documentData?.isDisableCommonDocument,
                },
                {
                    title: 'Contact Persons',
                    key: 'generic_add_contact_persons',
                    component: (
                        <ContactPersonCardList
                            {...contactPersonData}
                            onAddContactPerson={openAddContactPerson}
                        />
                    ),
                    visible: !contactPersonData?.isDisableCommonContactPerson,
                },

                {
                    title: 'Notes',
                    key: 'generic_note_add',
                    component: (
                        <InvoiceNoteList
                            data={noteData.notes}
                            onClickToDelete={(id: number) => {
                                GetObjectFromArray(
                                    noteRowActions,
                                    'type',
                                    'delete'
                                )?.action(id);
                            }}
                            onClickToEdit={(data) => {
                                GetObjectFromArray(
                                    noteRowActions,
                                    'type',
                                    'edit'
                                )?.action(data);
                            }}
                            hideheader
                            addNotes={() => {
                                openAddNotes({}, noteData.fetchNotes, {
                                    type: api.type,
                                    type_id: +id,
                                });
                            }}
                        />
                    ),

                    visible: !noteData?.isDisableCommonNote,
                },
            ],
            [
                api.type,
                contactPersonData,
                documentData.documents,
                documentData?.isDisableCommonDocument,
                documentData?.onAddDocument,
                documentData.onDeleteDocument,
                id,
                noteData.fetchNotes,
                noteData?.isDisableCommonNote,
                noteData.notes,
                noteRowActions,
                openAddContactPerson,
            ]
        );
        const totalTabItems = useMemo(() => {
            return [...(tabItems || []), ...commonTabItems];
        }, [commonTabItems, tabItems]);
        // const tabKeyValue = useMemo(() => {
        //     return tab || (totalTabItems[0] as any)?.key;
        // }, [tab, totalTabItems]);
        const filterActions: any[] = useMemo(() => {
            const result = roleFilterActions.map((action: ObjectDto) => {
                return {
                    ...action,
                    visible: action?.visible !== false,
                    // action?.visible !== false &&
                    // action?.key !== tabKeyValue,
                };
            });

            return result;
        }, [roleFilterActions]);

        // const renderShortAction = useCallback(
        //     (key: string) => {
        //         const renderData = GetObjectFromArray(
        //             roleFilterActions,
        //             'key',
        //             key
        //         );

        //         if (
        //             IsEmptyObject(renderData) ||
        //             renderData?.visible === false
        //         ) {
        //             return <></>;
        //         }
        //         return (
        //             <div className='p-2 '>
        //                 <Button
        //                     className='w-full font-normal border-dashed bg-base-100'
        //                     outline
        //                 >
        //                     <Icon source={AddSvgIcon} isSvg />
        //                     {renderData.name}
        //                 </Button>
        //             </div>
        //         );
        //     },
        //     [roleFilterActions]
        // );

        useEffect(() => {
            if (loading || detail?.id) return;
            openDetailDataNotFound();
        }, [detail?.id, loading]);

        const sanitizeTabs = useCallback(() => {
            return totalTabItems.map((tab: any) => {
                if (tab?.noDataFound) {
                    // filter out nodata onclick action on the basis of role
                    const tabKey = tab?.key;
                    const action = GetObjectFromArray(
                        roleFilterActions,
                        'key',
                        tabKey
                    );
                    if (!action?.visible) {
                        return {
                            ...tab,
                            noDataFound: {
                                ...(tab?.noDataFound || {}),
                                button: {
                                    ...(tab?.noDataFound || {}),
                                    name: action?.name,
                                    onClick: false,
                                },
                            },
                        };
                    }
                }
                return tab;
            });
        }, [roleFilterActions, totalTabItems]);

        const activeTab = useMemo(() => {
            return (
                GetObjectFromArray(totalTabItems, 'key', tab) ||
                totalTabItems[0]
            );
        }, [totalTabItems, tab]);

        const renderActiveComponent = useCallback(() => {
            const tabs = sanitizeTabs();
            if (!tab) return tabs[0]?.component;
            return activeTab?.component;
        }, [activeTab?.component, sanitizeTabs, tab]);

        const routes = useMemo(() => {
            const finalRoute = [];

            finalRoute.push({
                ...(breadcrumb?.listing || {}),
                name: breadcrumb?.listing.name,
                link: breadcrumb?.listing.link || '#',
            });

            finalRoute.push({
                name: IsFunction(name) ? name(detail) : name,
                link: activeTab?.key ? window.location.pathname : null,
            });

            finalRoute.push({
                name: activeTab?.key
                    ? activeTab?.title || sanitizeTabs()[0].title
                    : null,
            });
            return finalRoute;
        }, [
            activeTab?.key,
            activeTab?.title,
            breadcrumb?.listing,
            detail,
            name,
            sanitizeTabs,
        ]);

        if (!detail?.id) {
            return <></>;
        }

        return (
            <div className='flex-1 col-flex  mb-4 pb-[var(--bottom-nav-height)]'>
                <AppHeader
                    title={name}
                    withBack
                    rightComponent={
                        <BasicListFilterButton filters={sanitizeTabs()} />
                    }
                />
                {!disableBreadCrumb && <PwaBreadCrumbs routes={routes} />}

                <div className='py-3'>
                    <DetailInformation
                        {...{
                            detail,
                            items: [
                                ...(subDetailInfo?.heading
                                    ? [subDetailInfo?.heading]
                                    : []),
                                ...(subDetailInfo?.items || []),
                            ],
                        }}
                    />
                    {renderActiveComponent()}
                    <FloatingButton
                        actions={filterActions.filter((action) => {
                            if (
                                detail?.attributes?.no_edit &&
                                action?.key !== 'generic_note_add'
                            )
                                return;
                            return action;
                        })}
                    />
                    {/* <DetailInformation
                    {...{ detail, subDetailInfo, custom_field_data }}
                /> */}
                    {/* <div className='flex-1 gap-4 col-flex'>
                    <AnimatedTabs
                        containerClassName='flex-1 gap-2 '
                        tabListClassName='shadow-sm rounded-none sticky top-[56px] '
                        contentContainerClass={
                            'shadow-none mt-1 rounded-none bg-transparent p-0 flex-1'
                        }
                        tabs={sanitizeTabActions()}
                        // middleSeparator={renderShortAction(tabKeyValue)} // it is for add action on the basis of current tab
                    />
                </div> */}
                </div>
            </div>
        );
    }
);

const DetailInformation = ({ items, detail }) => {
    const [expand, setExpand] = useState<boolean>(false);
    const renderTitle = useCallback(
        (item: ObjectDto) => {
            if (IsFunction(item?.titleKey)) return item?.titleKey(detail);
            return AccessNestedObject(detail, item?.titleKey);
        },
        [detail]
    );
    const renderSubTitle = useCallback(
        (item: ObjectDto) => {
            if (IsFunction(item?.subTitleKey)) return item?.subTitleKey(detail);
            return AccessNestedObject(detail, item?.subTitleKey);
        },
        [detail]
    );
    const renderInfo = useCallback(
        (info: ObjectDto) => {
            const value = IsFunction(info?.renderValue)
                ? info?.renderValue(detail)
                : AccessNestedObject(detail, info?.key);
            return (
                <div className='col-flex'>
                    <div className='text-xs text-base-secondary'>
                        {info?.name}
                    </div>
                    <div className='text-sm'>{value}</div>
                </div>
            );
        },
        [detail]
    );

    const renderBottom = useCallback(
        (item: ObjectDto) => {
            if (!item?.items?.length) return undefined;
            return (
                <div className='gap-4 row-flex'>
                    {item?.items.map((info: ObjectDto) => (
                        <Fragment key={item?.key}>{renderInfo(info)}</Fragment>
                    ))}
                </div>
            );
        },
        [renderInfo]
    );
    const renderExtraComponent = useCallback(
        (item: ObjectDto) => {
            if (IsFunction(item?.renderExtraInfo))
                return (
                    <AnimateHeight height={expand ? 'auto' : 0}>
                        <div className='relative'>
                            {item?.renderExtraInfo(detail)}

                            <div
                                className={cn(
                                    'absolute w-14 h-1 rounded transition-all ease-in-out delay-300 duration-300 bg-base-300 bottom-0 left-1/2 -translate-x-1/2',
                                    {
                                        ['visible']: expand,
                                        ['invisible']: !expand,
                                    }
                                )}
                            ></div>
                        </div>
                    </AnimateHeight>
                );
            return null;
        },
        [detail, expand]
    );
    const renderHeadingIcon = useCallback(
        (item: ObjectDto) => {
            const icon = item?.icon;
            const type = item?.type;

            if (IsFunction(icon?.renderIcon)) return icon?.renderIcon(detail);

            switch (type) {
                case 'vendor':
                case 'vendor_account':
                    return (
                        <VendorIconImage
                            {...{ size: icon?.size, isSvg: icon?.isSvg }}
                        />
                    );
                case 'employee':
                    if (detail?.user?.image_url) {
                        return (
                            <Avatar
                                source={detail?.user?.image_url}
                                alt={detail?.user?.name}
                                size='sm'
                            />
                        );
                    }
                    return (
                        <EmployeeIconImage
                            {...{ size: icon?.size, isSvg: icon?.isSvg }}
                        />
                    );
                case 'business':
                    return (
                        <BusinessIconImage
                            {...{ size: icon?.size, isSvg: icon?.isSvg }}
                        />
                    );

                default:
                    return (
                        <Avatar
                            imageWrapperClassName='p-2 border'
                            shape='rounded'
                            size='sm'
                            alt={AccessNestedObject(detail, 'item.titleKey')}
                        />
                    );
            }
        },
        [detail]
    );
    return (
        <div data-title='detail_information' className='gap-4 px-4 col-flex'>
            {items.map((item) => {
                if (IsFunction(item?.renderCard))
                    return item?.renderCard(detail);
                return (
                    <GenericCard
                        className='gap-0 rounded-lg'
                        key={item?.key}
                        CustomCardIcon={renderHeadingIcon(item)}
                        title={renderTitle(item)}
                        subtitle={renderSubTitle(item)}
                        bottomComponent={renderBottom(item)}
                        mainComponent={renderExtraComponent(item)}
                        onClick={() => {
                            item?.renderExtraInfo && setExpand(!expand);
                        }}
                        extraClassName='pt-0'
                        extraComponent={
                            item?.renderExtraInfo &&
                            !expand && (
                                <div className='relative'>
                                    <div
                                        className={cn(
                                            'absolute w-14 h-1 transition-all ease-in-out delay-150 rounded bg-base-300 -bottom-[5px] left-1/2 -translate-x-1/2'
                                        )}
                                    ></div>
                                </div>
                            )
                        }
                    />
                );
            })}
        </div>
    );
};
export const DocumentViewComponent = ({
    files = [],
    onDelete = EmptyFunction,
    onAddDocument = EmptyFunction,
}: {
    files: any;
    onDelete: (id: number) => void;
    onAddDocument: ({ files }: { files: FileData[] }) => void;
}) => {
    return (
        <DocumentView
            files={files}
            onDelete={onDelete}
            onAddDocument={onAddDocument}
        />
    );
};
export default GenericDetailPageExpense;
