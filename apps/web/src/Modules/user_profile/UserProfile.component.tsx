import { useCallback, useMemo, useRef, useState } from 'react';

import {
    FetchData,
    HOME_ROUTE,
    IsEmptyArray,
    ObjectDto,
    PRODUCT_IDENTIFIER,
    RefetchGenericListing,
    TitleRoutePayload,
    useApp,
    useFetchParams,
    useGetUserRoles,
    useQuery,
    useUserHook,
} from '@finnoto/core';
import { MetaUserController } from '@finnoto/core/src/backend/meta/controllers/meta.user.controller';
import {
    AnimatedTabs,
    ApiSchema,
    Avatar,
    Badge,
    Breadcrumbs,
    ConfirmUtil,
    Container,
    GetObjectFromArray,
    Icon,
    IconButton,
    InformationCardUpdated,
    IsEmptyObject,
    Modal,
    ModalFormUtil,
    SlidingPane,
    Table,
    TableProps,
    Toast,
} from '@finnoto/design-system';
import { TAB_ITEM } from '@finnoto/design-system/src/Components/Navigation/Tabs/commonTab.types';

import DropdownActionButton from '@Components/DropdownButton/dropdown.action.button';
import { openImageCropper } from '@Utils/functions.utils';

import UserRolesList from './Components/userRolesList.component';
import ChangePasswordForm from './Forms/changePassword.form';

import {
    AddSvgIcon,
    DeleteSvgIcon,
    EmployeeSvgIcon,
    OrganizationSvgIcon,
    TickMarkSvgIcon,
    UnVerifiedSvgIcon,
} from 'assets';

const UserProfile = () => {
    const { expenseType, product_id } = useApp();

    const isReco = useMemo(
        () => product_id === PRODUCT_IDENTIFIER.RECO,
        [product_id]
    );

    const bankRef = useRef<any>(null);
    const { user } = useUserHook();

    const isVendorPortal = useMemo(
        () => expenseType === 'vendor',
        [expenseType]
    );

    const isHideDelegation = useMemo(() => {
        if ([PRODUCT_IDENTIFIER.VENDOR].includes(product_id as number))
            return true;
        return false;
    }, [product_id]);

    const { userRolesList } = useGetUserRoles();

    const { tabs, tab = 'active_organization' } = useFetchParams();

    const openChangePassword = () => {
        SlidingPane.open({
            component: ChangePasswordForm,
            props: {
                callback: () => {
                    SlidingPane.close();
                },
            },
        });
    };

    const breadCrumbs: Array<TitleRoutePayload> = [
        { name: 'Home', link: HOME_ROUTE, className: 'text-base-tertiary' },
        { name: 'My Profile' },
    ];

    const actions = useMemo(
        () => [
            {
                name: 'Change Password',
                key: 'change_password',
                action: openChangePassword,
            },
        ],
        []
    );

    const handleProfileImage = (files) => {
        openImageCropper(files[0]?.serverUrl, { rotatable: true }, (file) => {
            const attributes = {
                size: file?.size,
                type: file?.type,
                name: file?.name,
            };
            // handleSubmitUserProfileImage({
            //     document_url: file?.serverUrl,
            //     attributes,
            // });
        });
    };
    const tab_items: TAB_ITEM[] = useMemo(
        () => [
            {
                title: 'Active Organization',
                key: 'active_organization',
                component: <ActiveBusinessComponent />,
            },

            {
                title: 'Roles',
                key: 'role_details',
                component: <UserRolesList roleData={userRolesList} />,
                visible: userRolesList?.length > 0,
            },
        ],
        [userRolesList]
    );

    const handleRemoveProfile = () => {
        ConfirmUtil({
            message: 'Do you want to remove the profile picture?',
            onConfirmPress: () => {
                // handleRemoveProfileImage();
            },
            confirmAppearance: 'error',
            icon: DeleteSvgIcon,
            iconAppearance: 'error',
        });
    };
    const handleShowButton = useCallback(
        (key: string) => {
            const renderData = GetObjectFromArray(actions, 'key', key);

            if (IsEmptyObject(renderData)) {
                return <></>;
            }
            return (
                <IconButton
                    icon={AddSvgIcon}
                    outline
                    onClick={renderData?.action}
                    name={renderData?.name}
                />
            );
        },
        [actions]
    );

    const openUserProfileImage = useCallback(() => {
        Modal.open({
            component: ProfileImageViewer,
            modalSize: 'full',
            className: 'bg-black/60',
            closeClassName: 'text-white',
            props: {
                // imageUrl,
            },
        });
    }, []);

    return (
        <Container className='gap-4 py-5 overflow-hidden col-flex h-content-screen'>
            <div className='flex items-center justify-between gap-4'>
                <Breadcrumbs title='My Profile' route={breadCrumbs} />
                <div className='items-center gap-4 row-flex'>
                    {handleShowButton(tabs || null)}
                    <DropdownActionButton actions={actions} size='md' />
                </div>
            </div>
            <div className='flex items-center flex-1 gap-3 overflow-hidden'>
                <div
                    className='col-flex gap-y-3 md:w-5/12 h-full lg:w-4/12 xl:w-[30%] self-start'
                    data-title='detail_information'
                >
                    <div className='border rounded border-base-300 bg-base-100 col-flex'>
                        <div className='items-center gap-4 p-4 pb-2 col-flex'>
                            <div className='relative'>
                                {/* {imageUrl ? (
                                    <div
                                        onClick={openUserProfileImage}
                                        className='cursor-pointer'
                                    >
                                        <Avatar
                                            imageWrapperClassName='p-2 border !flex items-center justify-center cursor-pointer'
                                            alt={businessData?.name || 'F'}
                                            shape='rounded'
                                            size='lg'
                                            source={imageUrl}
                                            unOptimizeImage={true}
                                        />
                                    </div>
                                ) : ( */}
                                <div className='flex items-center justify-center w-16 h-16 border rounded employee-text-color'>
                                    <Icon
                                        source={EmployeeSvgIcon}
                                        isSvg
                                        size={32}
                                    />
                                </div>
                                {/* )} */}
                                {/* <div>
                                    {imageUrl ? (
                                        <div
                                            id='my-profile-delete-button'
                                            className='h-8 w-8  rounded-full overflow-hidden  p-[2px] bg-base-100 absolute -top-2 -right-2 cursor-pointer'
                                        >
                                            <Icon
                                                source={DeleteSvgIcon}
                                                isSvg
                                                size={20}
                                                className='p-1 transition-all rounded-full text-base-primary centralize bg-base-300 hover:bg-error hover:text-white'
                                                onClick={handleRemoveProfile}
                                            />
                                        </div>
                                    ) : (
                                        <CommonFileUploader
                                            is_multiple={false}
                                            maxFiles={1}
                                            accept={{
                                                'image/jpeg': [],
                                                'image/png': [],
                                            }}
                                            onFileUpload={(files) =>
                                                handleProfileImage(files)
                                            }
                                        >
                                            {({ uploading }) => {
                                                return (
                                                    <div
                                                        className={cn(
                                                            'h-8  w-8  rounded-full overflow-hidden p-[2px] bg-base-100 absolute -top-2 -right-2 cursor-pointer',
                                                            {
                                                                'cursor-not-allowed':
                                                                    uploading,
                                                            }
                                                        )}
                                                    >
                                                        <Icon
                                                            source={AddSvgIcon}
                                                            isSvg
                                                            size={20}
                                                            className='p-1 transition-all rounded-full text-base-primary centralize bg-base-300 hover:bg-success hover:text-white'
                                                        />
                                                    </div>
                                                );
                                            }}
                                        </CommonFileUploader>
                                    )}
                                </div> */}
                            </div>

                            <div className='items-center col-flex'>
                                {/* {businessData?.name && (
                                    <h2
                                        id='has-username'
                                        className='text-base font-medium text-base-primary'
                                    >
                                        {businessData?.name}
                                    </h2>
                                )} */}

                                <p
                                    data-title='user_role'
                                    className='text-sm text-base-secondary'
                                >
                                    Admin
                                </p>
                            </div>
                            <div className='w-full border-b border-dashed border-base-300'></div>
                        </div>
                        <InformationCardUpdated
                            firstItemType='gray'
                            containerClassName='pb-0 shadow-none border-0'
                            data={[
                                {
                                    label: 'Roles',
                                    info: (
                                        <div className='flex flex-wrap justify-end gap-2'>
                                            {!IsEmptyArray(userRolesList) &&
                                                userRolesList?.map((value) => (
                                                    <Badge
                                                        key={value?.id}
                                                        label={
                                                            value?.role_group
                                                                ?.name
                                                        }
                                                        appearance='base'
                                                        size='md'
                                                    />
                                                ))}
                                        </div>
                                    ),
                                    visible: !IsEmptyArray(userRolesList),
                                    infoClassName: 'w-[80%]',
                                    labelClassName: 'w-[20%]',
                                },
                                // {
                                //     label: 'Email',
                                //     info: businessData?.email,
                                //     infoClassName: 'break-long-word w-[80%]',
                                //     labelClassName: 'w-[20%]',
                                // },
                                // {
                                //     label: 'Mobile',
                                //     info: (
                                //         <div className='flex justify-end gap-2'>
                                //             {businessData?.mobile ? (
                                //                 <>
                                //                     <div data-title='mobile_edit'>
                                //                         <PenLine
                                //                             size={16}
                                //                             onClick={() =>
                                //                                 openProfileMobileVerify(
                                //                                     {
                                //                                         mobile: businessData?.mobile,
                                //                                         callback:
                                //                                             () =>
                                //                                                 fetchProfileBusiness(),
                                //                                     }
                                //                                 )
                                //                             }
                                //                             className='cursor-pointer link'
                                //                         />
                                //                     </div>
                                //                     {businessData?.mobile}
                                //                 </>
                                //             ) : (
                                //                 <span
                                //                     className='link link-hover'
                                //                     onClick={() =>
                                //                         openProfileMobileVerify(
                                //                             {
                                //                                 callback: () =>
                                //                                     fetchProfileBusiness(),
                                //                             }
                                //                         )
                                //                     }
                                //                 >
                                //                     +Add Mobile Number
                                //                 </span>
                                //             )}
                                //         </div>
                                //     ),
                                // },
                            ]}
                        />
                    </div>
                </div>

                <AnimatedTabs
                    tabs={tab_items}
                    containerClassName='h-full w-full overflow-x-auto'
                    contentContainerClass='p-0 overflow-x-auto'
                    active={tab}
                />
            </div>
        </Container>
    );
};

const PendingBusinessComponent = ({
    invitations,
    handleAcceptUser,
    handleRejectUser,
    userRoles,
}: any) => {
    const [showRole, setShowRole] = useState<any>([]);

    const insertShowRole = useCallback(
        (id: number) => {
            if (showRole.includes(id)) return;
            setShowRole((prev) => [...prev, id]);
        },
        [showRole]
    );
    const BadgeRole = useCallback(
        ({ role_ids, roles }: any) => {
            return (
                <div className='flex-wrap items-center gap-2 row-flex '>
                    {IsEmptyArray(roles) ? (
                        <>
                            {role_ids?.map((role_id) => {
                                const role = GetObjectFromArray(
                                    userRoles,
                                    'id',
                                    role_id
                                );
                                if (!role?.name) return null;

                                return (
                                    <Badge
                                        appearance='secondary'
                                        key={role?.id}
                                        label={role?.name}
                                        size='sm'
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {roles?.map((role, key) => {
                                return (
                                    <Badge
                                        appearance='secondary'
                                        key={key}
                                        label={role}
                                        size='sm'
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
            );
        },
        [userRoles]
    );

    const ShowRoles = useCallback(
        ({ item }: any) => {
            const role_ids = item?.role;
            const roles = item?.roles;

            if (showRole.includes(item.id))
                return <BadgeRole {...{ role_ids, roles }} />;

            const suffix = role_ids > 1 ? `Roles` : 'Role';
            return (
                <div
                    className='table-link'
                    onClick={() => insertShowRole(item?.id)}
                >
                    {role_ids?.length} {suffix}
                </div>
            );
        },
        [BadgeRole, insertShowRole, showRole]
    );

    const pending_invitation_props: TableProps = {
        column: [
            {
                key: 'business_name',
                name: 'Business Name',
                renderValue: (item: ObjectDto) => {
                    return (
                        <div className='items-center gap-2 row-flex'>
                            <Avatar
                                // source={user?.image_url}
                                alt={item?.name || 'F'}
                                shape='circle'
                                size='xs'
                                source={item?.image || ''}
                                imageWrapperClassName='!h-[30px] !w-[30px] rounded-full'
                            />
                            <span>{item?.name}</span>
                        </div>
                    );
                },
            },

            {
                key: 'role',
                name: 'Roles',
                renderValue: (item) => <ShowRoles {...{ item }} />,
            },
            {
                name: 'Added At',
                key: 'created_at',
                type: 'date_time',
            },
        ],
        data: invitations,
        rowAction: {
            menuActions: [
                {
                    name: 'Accept',
                    action: (item: ObjectDto) => handleAcceptUser(item?.id),
                    type: 'inner',
                },
                {
                    name: 'Reject',
                    action: (item: ObjectDto) => handleRejectUser(item?.id),
                    type: 'inner',
                    isCancel: true,
                },
            ],
        },
    };
    return <Table {...pending_invitation_props} rowNumbering={false} />;
};

const ActiveBusinessComponent = () => {
    const fetchAllBusinesses = async () => {
        const { response, success } = await FetchData({
            className: MetaUserController,
            method: 'getLoggedUserDetails',
        });
        if (success) return response;
        return [];
    };

    const { data } = useQuery({
        queryFn: fetchAllBusinesses,
        queryKey: ['active_businesses'],
    });

    const activeBusinesses = useMemo(() => data?.businesses || [], [data]);

    const activeBusinessesProps: TableProps = {
        column: [
            {
                key: 'name',
                name: 'Organization Name',
                renderValue: (item: ObjectDto) => {
                    return (
                        <div className='items-center gap-3 row-flex'>
                            <div className='flex items-center justify-center rounded h-8 w-8 bg-[#3F1C6C33] text-[#624686]'>
                                <Icon
                                    source={OrganizationSvgIcon}
                                    isSvg
                                    size={20}
                                />
                            </div>

                            <span>{item?.name}</span>
                        </div>
                    );
                },
            },

            {
                name: 'Product',
                key: 'product_name',
            },
            {
                name: 'Added At',
                key: 'created_at',
                type: 'date_time',
            },
        ],
        data: activeBusinesses,
        // rowAction: {
        //     menuActions: [
        //         {
        //             name: 'Accept',
        //             action: () => {},
        //             type: 'inner',
        //         },
        //         {
        //             name: 'Delete',
        //             action: () => {},
        //             type: 'inner',
        //             isCancel: true,
        //         },
        //     ],
        // },
    };

    return <Table {...activeBusinessesProps} rowNumbering={false} />;
};

export const hasVerified = (verified: boolean, className?: string) => {
    if (!verified) {
        return (
            <Icon
                source={UnVerifiedSvgIcon}
                isSvg
                iconColor='text-error'
                size={22}
            />
        );
    }
    return (
        <Icon
            source={TickMarkSvgIcon}
            isSvg
            iconColor='text-success'
            size={22}
        />
    );
};

export default UserProfile;

const ProfileImageViewer = ({ imageUrl }: any) => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <img src={imageUrl} alt='Profile' className='object-contain' />
        </div>
    );
};

const RenameUserNameForm = ({
    data,
    callback,
}: {
    data?: ObjectDto;
    callback?: Function;
}) => {
    const formSchema = {
        name: {
            type: 'text',
            name: 'name',
            required: true,
            label: 'Name',
            placeholder: 'Enter  name',
        },
    };

    const apiSchema: ApiSchema = {
        controller: MetaUserController,
        method: 'UpdateUserName',
        onSuccess: () => {
            callback && callback();
            RefetchGenericListing();
            Toast.success({ description: 'Name successfully updated!' });
        },
    };

    return new ModalFormUtil(formSchema, apiSchema).process({
        modal_type: 'slidingPanel',
        title: `Rename User`,
        slidingPanelProps: {
            size: 'sm',
        },
        formBuilderProps: {
            layout: 'two-column',
        },
        initialValues: {
            name: data?.name,
        },
    });
};
