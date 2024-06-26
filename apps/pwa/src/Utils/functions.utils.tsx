import dynamic from 'next/dynamic';

import {
    Authentication,
    BankAccountPayload,
    CommentCreationPayload,
    ContactPersonCreationPayload,
    DocumentUploadResponsePayload,
    EmptyFunction,
    fetchBusinesses,
    FetchData,
    FINOPS_EMPLOYEE_ADVANCE_DETAIL,
    FINOPS_EXPENSE_DETAILS_ROUTE,
    GenericListingType,
    LISTING_CONTROLLER_ROUTER,
    LOGIN_ROUTE,
    Navigation,
    ObjectDto,
    ProcessUploadData,
    SOURCEHASH,
    UserBusiness,
} from '@finnoto/core';
import {
    ConfirmUtil,
    Icon,
    ImageCropper,
    ImageViewer,
    Modal,
    NoDataFound,
    PageLoader,
    Toast,
} from '@finnoto/design-system';

import ChangeOrgNameForm from '@Components/ChangeOrgName/changeOrgName.form';
import AddContactPersonForm from '@Components/CommonFormComponents/addContactPerson.form.component';
import AddDocumentsForm from '@Components/CommonFormComponents/addDocument.form.component';
import AddDocumentsFormLocal from '@Components/CommonFormComponents/addDocumentsLocal.form.component';
import AddNotesForm from '@Components/CommonFormComponents/addNotesForm.component';
import SavedFilters from '@Components/GenericDocumentListing/savedfilters/saved.filter.components';
import BusinessInvitation from '@Modules/AuthPage/Components/businessInvitation.component';
import BusinessOnboarding from '@Modules/AuthPage/Components/businessOnboarding.component';
import BusinessSelector from '@Modules/AuthPage/Components/businessSelector.component';
import NewProductSelector from '@Modules/AuthPage/Components/newProductSelector.component';

import { PercentageSquareSvgIcon } from 'assets';

export const toastLoading = Toast.loading;

/**
 * Logs out the user by calling the Authentication.logout() function and navigates to
 * the login page by calling the Navigation.navigate() function with the LOGIN_ROUTE URL.
 *
 * @returns {void} There is no return value from this function.
 */
export const logout = async () => {
    await Authentication.logout();
    Navigation.navigate({ url: LOGIN_ROUTE });
};

/**
 * Opens the onboarding modal and allows the user to enter business information.
 *
 * @param {function} callback - optional callback function to execute after submitting the form
 * @param {ObjectDto} data - optional pre-filled data to display in the form
 */
export const openOnboarding = (
    callback: (business: ObjectDto) => void = () => {},
    data?: ObjectDto
) => {
    Modal.open({
        modalSize: 'auto',
        component: BusinessOnboarding,
        containerStyle: {
            borderRadius: 4,
        },
        props: {
            data,
            callback: (business: ObjectDto) => {
                Modal.close();
                callback(business);
            },
        },
    });
};

/**
 * Opens a business selector modal to choose a business from a list of businesses and calls the provided callback
 * with the selected business.
 *
 * @param {ObjectDto[]} businesses - An array of ObjectDto representing the list of businesses to choose from.
 * @param {(business: ObjectDto) => Promise<void>} [callback=async () => {}] - A callback function that takes a
 * selected business as input and returns a Promise that resolves when the modal is closed.
 */
export const openBusinessSelector = (
    businesses: ObjectDto[],
    callback: (business: ObjectDto) => Promise<void> = async () => {}
) => {
    Modal.open({
        component: BusinessSelector,
        modalSize: 'full',
        props: {
            businesses,
            callback: async (business: ObjectDto) => {
                await callback(business);
                Modal.close();
            },
        },
    });
};

/**
 * Opens a product selector modal window.
 *
 * @param {ObjectDto[]} products - An array of product objects.
 * @param {(product: ObjectDto) => Promise<void>} [callback=async () => {}] - A callback function that is called after a product is selected.
 * @return {void}
 */
export const openProductSelector = (
    products: ObjectDto[],
    callback: (product: ObjectDto) => Promise<void> = async () => {}
) => {
    Modal.open({
        component: NewProductSelector,
        modalSize: 'full',
        props: {
            products,
            callback: async (product: ObjectDto) => {
                await callback(product);
                Modal.close();
            },
        },
    });
};

/**
 * Opens the Business Invitation Modal.
 *
 * @param {ObjectDto[]} invitations - An array of business invitations.
 * @param {(business: ObjectDto) => Promise<void>} [callback=async () => {}] - A callback function that gets called when a business is selected.
 */
export const openBusinessInvitation = (
    invitations: ObjectDto[],
    callback: (business: ObjectDto) => Promise<void> = async () => {}
) => {
    Modal.open({
        component: BusinessInvitation,
        modalSize: 'xl',
        props: {
            invitations,
            callback: async (business: ObjectDto) => {
                await callback(business);
                Modal.close();
            },
        },
    });
};

/**
 * Lazy load page component.
 *
 * @param fn `function` import function.
 * @param ssr `boolean` enable server side rendering.
 * @returns any
 */
export const loadDynamicPage = (
    fn: () => any,
    ssr: boolean = false,
    progress: boolean = true,
    options?: {
        isComponent?: boolean;
    }
): any => {
    return dynamic<any>(fn, {
        loading: progress
            ? () => (
                  <PageLoader
                      className={
                          options?.isComponent === true ? 'h-[300px]' : ''
                      }
                      screenHeight={options?.isComponent !== true}
                  />
              )
            : () => <span></span>,
        ssr: ssr,
    }) as any;
};

export const openAddBankAccount = (
    callback = (_: BankAccountPayload) => {},
    data?: BankAccountPayload
) => {
    //empty function
};

export const openBusinessBankDetail = ({
    business_id,
    type,
    id,
}: {
    business_id: number;
    type: 'vendor' | 'business' | 'employee' | 'business_vendor';
    id: number;
}) => {
    //empty function
};

export const openUserBankDetail = ({ id }: { id: number }) => {};

/**
 * Generate Random number.
 *
 * @param digits `number` Number of digits
 * @returns number
 */
export const generateRandomNumber = (digits: number = 16): number => {
    const min = Math.ceil(Math.pow(10, digits - 1));
    const max = Math.ceil(Math.pow(10, digits) - 1);

    return Math.floor(Math.random() * (max - min)) + min;
};

export const openImageCropper = (
    file_url: string,
    options: Partial<Omit<any, 'file' | 'onClose' | 'callback'>>,
    callback = (_: ObjectDto) => {}
) => {
    Modal.open({
        component: ImageCropper,
        modalSize: 'sm',
        props: {
            file: file_url,
            ...options,
            onClose: () => {
                Modal.close();
            },
            callback: async (data) => {
                const { hide = () => {} } = Toast.loading({
                    description: 'Saving...',
                });
                const file = await fetch(data)
                    .then((res) => res.blob())
                    .then((blob) => {
                        return new File(
                            [blob],
                            String(generateRandomNumber(8)) + '.png',
                            {
                                type: 'image/png',
                            }
                        );
                    });

                const uploadedImages = await ProcessUploadData({
                    images: [file],
                    resolve: true,
                    uploadFile: true,
                });

                hide();

                if (uploadedImages.length > 0) {
                    callback(uploadedImages[0]);
                    Modal.close();
                }
            },
        },
    });
};
export const openSavedFilters = (
    definitionKey: string,
    options?: {
        callback?: () => Promise<any>;
        refetchPreferences?: () => Promise<any>;
    }
) => {
    const { callback, refetchPreferences } = options || {};
    Modal.open({
        component: SavedFilters,
        modalSize: 'md',
        props: {
            definitionKey,
            callback,
            refetchPreferences,
        },
    });
};

export const openAddUserGroup = (
    data: ObjectDto = {},
    callback: any = EmptyFunction
) => {};

export const addMemebers = (group_id, callback, { members }) => {};

export const openAddExpenseHead = (
    data: ObjectDto = {},
    callback = (data?: any) => {}
) => {
    //empty function
};

export const openAddChoiceType = (
    data: ObjectDto = {},
    callback = (data?: any) => {}
) => {
    //empty function
};

export const openAddDocumentPreferences = (
    data: ObjectDto,
    callback = (data?: any) => {}
) => {
    //empty function
};
export const openPaymentModeForm = (
    data: ObjectDto,
    callback = (_?: any) => {}
) => {
    //empty function
};
export const openChangeOrganizationName = ({
    callback = EmptyFunction,
    data,
}: any) => {
    Modal.open({
        component: ChangeOrgNameForm,
        containerStyle: {
            height: '100%',
        },
        props: {
            callback: (response) => {
                Modal.close();
                const tempBusiness = UserBusiness.getCurrentBusiness();

                UserBusiness.setCurrentBusiness({
                    ...tempBusiness,
                    name: response?.name,
                });
                fetchBusinesses();
                callback(response);
            },
            data,
        },
    });
};

export const onUpdateNotificationPreference = (
    data?: ObjectDto,
    callback?: () => void
) => {
    //empty function
};

export const openAddAdvanceCategory = (
    data?: ObjectDto,
    callback?: () => void
) => {
    //empty function
};

export const openAddCustomField = (
    data: ObjectDto = {},
    callback: () => void,
    props: {
        title: string;
        type_id?: number;
    }
) => {
    //empty function
};

export const openAddNotes = (
    data: any = {},
    callback: () => void = EmptyFunction,
    options: {
        type: GenericListingType;
        type_id: any;
        withVendorVisible?: boolean;
    }
) => {
    Modal.open({
        component: AddNotesForm,
        modalSize: 'full',
        props: {
            data,
            callback: (_: CommentCreationPayload, isCreateAnother) => {
                callback();
                !isCreateAnother && Modal.close();
            },
            ...options,
        },
    });
};

export const openAddBankApprover = (
    data?: ObjectDto,
    callback: (data?: any, isCreateAnother?: boolean) => void = EmptyFunction
) => {};

export const openAddDocumentLocal = (
    callback = (_: DocumentUploadResponsePayload) => {},
    data?: any
) => {
    Modal.open({
        component: AddDocumentsFormLocal,
        modalSize: 'full',
        props: {
            callback: (data: DocumentUploadResponsePayload) => {
                callback(data);
                Modal.close();
            },
            data,
        },
    });
};

export const openAddDocuments = (
    type: GenericListingType,
    type_id: number,
    callback = (_: any) => {},
    data?: any,
    defaultClassName?: any
) => {
    Modal.open({
        component: AddDocumentsForm,
        modalSize: 'full',
        props: {
            type,
            type_id,
            callback: (data: DocumentUploadResponsePayload) => {
                callback(data);
                Modal.close();
            },
            data,
            defaultClassName,
        },
    });
};

export const openConfirmTaxChanges = ({
    formData,
    handleFormData,
    onManual,
}) => {
    //empty function
};

export const openFinopsInvitedUser = ({
    data,
    callback = () => {},
    enableRefetch,
    defaultSelectedEmployee,
}: {
    data?: any;
    enableRefetch?: boolean;
    callback: () => void;
    defaultSelectedEmployee?: any;
}) => {
    //empty function
};
export const openImageViewer = (
    images: any[],
    options?: {
        initialImage?: number;
        title?: string;
        onClickToDelete?: (data?: any) => void;
        addedAt?: string;
        addedBy?: string;
        popUpOff?: boolean;
    }
) => {
    const {
        initialImage: initialImage,
        title,
        onClickToDelete,
        addedBy,
        addedAt,
        popUpOff,
    } = options || {};

    Modal.open({
        modalSize: 'full',
        className: 'bg-black/60',
        closeClassName: 'text-white',
        component: ImageViewer,
        props: {
            images,
            initialImage,
            title,
            addedBy,
            addedAt,
            onClickToDelete,
            popUpOff,
            pdfClassName: 'items-start',
        },
    });
};

export const openAddIntegrationContactPerson = (
    data: any = {},
    callback: () => void = EmptyFunction,
    options: {
        type: GenericListingType;
        type_id: number;
    }
) => {
    Modal.open({
        component: AddContactPersonForm,
        containerStyle: {
            height: '100%',
        },
        props: {
            callback: (
                _: ContactPersonCreationPayload,
                isCreateAnother?: boolean
            ) => {
                !isCreateAnother && Modal.close();
                callback();
            },
            data,
            ...options,
        },
    });
};

export const openDetailDataNotFound = () => {
    Modal.open({
        component: NoDataFound,
        closeIcon: false,
        props: {
            title: 'No Data found',
            description: (
                <div
                    className='link link-hover'
                    onClick={() => {
                        Navigation.back();
                        Modal.close();
                    }}
                >
                    Go to previous{' '}
                </div>
            ),
        },
    });
};
export const openBankDefaultSetConfirmModal = (
    callback: (isCancel?: boolean) => void = EmptyFunction
) => {
    return ConfirmUtil({
        title: 'Set as default',
        message: 'You are making this your default bank account',
        confirmText: 'Yes',
        cancelText: 'No',
        confirmAppearance: 'success',
        isReverseAction: true,
        onConfirmPress: () => {
            callback();
        },
        onCancelPress: () => {
            Modal.close();
            callback(true);
        },
    });
};
export const getPercentageIcon = (is_percentage?: boolean) => {
    if (!is_percentage) return <></>;
    return <Icon source={PercentageSquareSvgIcon} isSvg />;
};

export const getOtherDocumentMessage = (is_other_document: boolean) => {
    if (!is_other_document) return <></>;
    return (
        <div className='pl-2 mt-2 text-sm text-base-secondary'>
            If you want support for other documents please write to us at:
            <a href='mailto:query@finnoto.com' className='link link-hover'>
                query@finnoto.com
            </a>
        </div>
    );
};

export const getDetailUrlUsingSourceType = (
    sourceType: string,
    sourceId: number
) => {
    let url = '';
    switch (sourceType) {
        case SOURCEHASH.expense:
            url = `${FINOPS_EXPENSE_DETAILS_ROUTE}/${sourceId}`;
            break;
        case SOURCEHASH.employeeAdvance:
            url = `${FINOPS_EMPLOYEE_ADVANCE_DETAIL}/${sourceId}`;
            break;
        case SOURCEHASH.purchaseOrder:
            // url = `${FINOPS_PURCHASE_ORDER_DETAIL_ROUTE}/${sourceId}`;  // need to remove after details page add
            break;
        case SOURCEHASH.purchaseRequest:
            // url = `${FINOPS_PURCHASE_REQUEST_DETAIL_ROUTE}/${sourceId}`; // need to remove after details page add
            break;
        case SOURCEHASH.purchaseQuote:
        // url = `${FINOPS_PURCHASE_QUOTE_DETAIL_ROUTE}/${sourceId}`; // need to remove after details page add
        default:
            url = '';
            break;
    }
    return url;
};
