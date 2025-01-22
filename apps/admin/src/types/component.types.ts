import { ReactNode } from 'react';
import { TypeOptions } from 'react-toastify';

import { ObjectDto } from './common.types';
import { FormTypes } from './formBuilder.types';

export type USER_TYPE = {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    isSuperAdmin?: boolean;
};

export type COLUMN_DATA_TYPE = {
    expanded?: boolean;
    columnTitle?: string;
    newName?: string;
    route?: boolean;
    hide?: boolean;
    label?: string;
    filter?: string;
    column?: any;
    object?: string;
    separator?: boolean;
    index?: string;
    display_name?: string;
    headingCollapsed?: boolean;
    heading?: string;
    position?: number;
    split?: boolean;
    column_name?: string;
    name?: string;
    parent?: string;
    path?: string;
};

export type FIELD_COLUMN_TYPE = {
    field?: string;
    type?: string;
    class?: string;
    placeholder?: string;
    sref?: string;
    id?: string;
    label?: string;
    fieldTemplate?: Function;
    path?: string;
};

/* Loader */
export interface LoaderProps {
    size?: number;
    thikness?: number;
    backColor?: string;
}
export interface PageLoaderProps {
    screenHeight?: boolean;
    className?: string;
}

/* Button */
export interface ButtonProps {
    id?: string;
    className?: string;
    size?: ButtonSizeType;
    appearance?: ButtonAppearanceType;
    shape?: ButtonShapeType;
    active?: boolean;
    outline?: boolean;
    dashed?: boolean;
    wide?: boolean;
    block?: boolean;
    disabled?: boolean;
    noAnimation?: boolean;
    loading?: boolean;
    progress?: boolean;
    addTimeout?: boolean;
    tabIndex?: number;
    type?: 'button' | 'reset' | 'submit';
    children?: React.ReactNode;
    onClick?: (...arg: any) => void;
    onTouchStart?: (...arg: any) => void;
    handleKeyDown?: (...args: any) => void;
    autoFocus?: boolean;
}
export type ButtonAppearanceType =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'
    | 'blockLink'
    | 'plain';
export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonShapeType = 'square' | 'circle';

/* Input Element */
export interface InputElementProps {
    key?: string;
    type?: FormTypes;
    required?: boolean;
    multiple?: boolean;
    onChange?: (value: any, ...arg: any) => void;
    onAsyncBlur?: (value: any, next: () => void) => void;
    [key: string]: any;
}

/* Toast */
export interface ToastParams {
    title?: string;
    description: string;
    type?: TypeOptions;
}

export type ToastFnType = (params: ToastParams) => void;

export interface ToastFns {
    addToast: (params?: ToastParams) => void;
    dismiss: VoidFunction;
    success: ToastFnType;
    error: ToastFnType;
    info: ToastFnType;
    warn: ToastFnType;
}

export type ToastContainerType = React.ForwardRefExoticComponent<
    React.RefAttributes<ToastFns>
>;

/* Admin Wrapper */
export interface AdminWrapperProps {
    children: ReactNode;
    isLoadingMenu?: boolean;
    isLoadingPreferences?: boolean;
    menus?: { modules: ModuleProps[]; pages: MenuSceneComponentProps[] };
    preferences?: PreferenceProps[];
    pageTitle?: string;
}

export interface ModuleProps {
    id: number;
    name: string;
    menus?: MenuProps[];
    display_order?: number;
    image?: string;
    visibility?: boolean;
    collapsed?: boolean;
}
export interface MenuProps {
    id: number;
    name: string;
    url: string;
    image?: string;
    visibility: boolean;
    page_id: number;
    includes?: string | null;
    component?: MenuSceneComponentProps;
}

export interface RegisteredPackage {
    name: string;
    modules?: ModuleProps[];
    menus?: CustomMenuProps[];
}

export interface CustomMenuProps extends MenuProps {
    module?: string;
}

export interface RegisterPackageMenu {
    name: string;
    url: string;
    visibility: boolean;
    scene_name?: string;
    includes?: string | null;
    module?: string;
}
export interface RegisterPackageModule {
    name: string;
    display_order?: number;
    image?: string;
}

export interface MenuSceneComponentProps {
    id: number | string;
    name: string;
    description?: string;
}
export interface SceneComponent {
    [key: string]: any;
}

export interface PreferenceProps {
    id: number;
    name: string;
    value: any;
}

export interface GENERIC_LISTING_PROPS {
    level?: boolean;
    menuDetail?: any;
    parentData?: ObjectDto;
    source?: string;
    genericData?: any;
    propageGenericDataToParent?: Function;
    index?: number;
    portlet?: any;
    pageBarClassName?: string;
    mode?: 'boxed' | 'fluid';
}

export interface GENERIC_DETAIL_PROPS {
    menuDetail?: any;
    CustomDetailPortlet?: any;
    mode?: 'boxed' | 'fluid';
}

export type ROW_TYPE = {
    booking?: {
        token?: string;
    };
    order?: {
        identifier?: string;
    };
    token?: string;
    id?: string;
    className?: string;
    isSelected?: boolean;
    height?: number;
};

export type GENERIC_DATA = {
    listing?: any;
    starter?: string;
    preDefinedmethods?: any;
    formPreference?: any;
    formPreferences?: any;
    url?: string;
    modelId?: number;
    model?: any;
    modelHash?: string;
    nextActions?: UI_ACTION_TYPE[];
    currentPage?: number;
    limit?: number;
};

export type UI_ACTION_TYPE = {
    as_record: number;
    active: number;
    as_context?: number;
};

export interface ModalProps {
    height?: number;
    props?: { [key: string]: unknown };
    backdrop?: boolean;
    containerStyle?: { [key: string]: number | string };
    wrapperStyle?: { [key: string]: number | string };
    whiteHeader?: boolean;
    isVisible?: boolean;
    fullScreen?: boolean;
    closable?: boolean;
    onClose?: Function;
    closeModal?: Function;
    closeIcon?: boolean;
    whiteIcon?: boolean;
    modalOffset?: { [key: string]: number | string }; // content position top bottom
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full' | 'auto';
    modalBody?: React.ReactNode;
    modalHeader?: React.ReactNode;
    modalFooter?: React.ReactNode;
    headerText?: string;
    className?: string;
}

export interface LAYOUT_TYPE {
    column_definition?: COLUMN_DATA_TYPE[];
    name?: string;
}

export interface TableConfiguratorProps {
    layout?: LAYOUT_TYPE;
    display_name?: string;
    columns?: COLUMN_DATA_TYPE[];
    showSplitFlag?: boolean;
    is_report?: boolean;
    userId?: number;
    menuId?: number;
    listName?: string;
    sourceId?: number;
    source?: string;
    url?: string;
    isFormConfigurator?: boolean;
    isDetailConfigurator?: boolean;
    onSubmit?: (layout: LAYOUT_TYPE) => void;
}

export interface FormCreatorProps {
    payload?: any;
    onDismiss?: () => void;
    direct?: boolean;
    disableActions?: boolean;
}

export interface ReferenceInputProps {
    name?: string;
    placeholder?: string;
    label?: string;
    value?: string | ObjectDto;
    required?: boolean;
    disabled?: boolean;
    isClearable?: boolean;
    multi?: boolean;
    dict?: any;
    size?: 'sm' | 'md';
    style?: React.CSSProperties;
    error?: string | null;
    onChange?: (option: any) => void;
    className?: string;
}
