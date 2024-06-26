import { InvoiceStatusEnum } from './arcPrefrence.constant';

export const PRIMARY_SHADES = [
    '#004C6D',
    '#255E7E',
    '#3D708F',
    '#5383A1',
    '#6996B3',
    '#7FAAC6',
    '#94BED9',
    '#ABD2EC',
    '#C1E7FF',
];

export const MIX_SHADES = [
    '#003F5C',
    '#2F4B7C',
    '#665191',
    '#A05195',
    '#D45087',
    '#F95D6A',
    '#FF7C43',
    '#FFA600',
];

export const GREEN_RED_SHADES = [
    '#00876C',
    '#439981',
    '#6AAA96',
    '#8CBCAC',
    '#AECDC2',
    '#CFDFD9',
    '#F1F1F1',
    '#F1D4D4',
    '#F0B8B8',
    '#EC9C9D',
    '#E67F83',
    '#DE6069',
];

export const INVOICE_STATUS_COLORS_MAP = {
    Open: {
        bg: '#94BED9',
        text: '#004C6D',
        color: 'text-[#94BED9]',
        status_id: InvoiceStatusEnum.Open,
    },
    'Partially Paid': {
        bg: '#AECDC2',
        text: '#00876C',
        color: 'text-[#AECDC2]',
        status_id: InvoiceStatusEnum.PartiallyPaid,
    },
    'Fully Paid': {
        bg: '#00876C',
        text: '#FFFFFF',
        color: 'text-[#00876C]',
        status_id: InvoiceStatusEnum.FullyPaid,
    },
    Disputed: {
        bg: '#FFD6A4',
        text: '#B3851A',
        color: 'text-[#FFD6A4]',
        status_id: InvoiceStatusEnum.Disputed,
    },
    Overdue: {
        bg: '#E67F83',
        text: '#FFFFFF',
        color: 'text-[#E67F83]',
        status_id: InvoiceStatusEnum.Overdue,
    },
    'Bad Debt': {
        bg: '#D43D51',
        text: '#FFFFFF',
        color: 'text-[#D43D51]',
        status_id: InvoiceStatusEnum.BadDebt,
    },
};

export const INVOICE_PAYMENT_OVERVIEW_COLORS = {
    Balance: '#FFADAF',
    Paid: '#387b57',
    'Credit Note': '#4C94FF',
    'Bad Debt': '#E51C00',
    Disputed: '#B3851A',
};

export const PAUSED_STATUS_COLOR = {
    bg: '#ffd6a4',
    text: '#956f00',
    color: 'text-[#ffd6a4]',
};

export const RED_SHADES = [
    '#fbecee',
    '#f6d8dc',
    '#f2c5cb',
    '#eeb1b9',
    '#ea9ea8',
    '#e58b97',
    '#e17785',
    '#dd6474',
    '#d85062',
    '#d43d51',
];

export const DUAL_STATUS_COLORS = {
    active: {
        bg: '#AECDC2',
        text: '#00876C',
        color: 'text-[#AECDC2]',
    },
    inactive: {
        bg: '#F0B8B8',
        text: '#D43D51',
        color: 'text-[#F0B8B8]',
    },
};

export const GREEN_SHADES = [
    '#E6F3F0',
    '#CCE7E2',
    '#B3DBD3',
    '#99CFC4',
    '#80C3B6',
    '#66B7A7',
    '#4DAB98',
    '#339F89',
    '#1A937B',
    '#00876C',
];

export const INVOICE_STATUS_TEXT_COLORS = Object.values(
    INVOICE_STATUS_COLORS_MAP
).map((val) => val.text);

export const INVOICE_STATUS_BG_COLORS = Object.values(
    INVOICE_STATUS_COLORS_MAP
).map((val) => val.bg);

export type UserGroupColorType = {
    [key: string]: {
        background: string;
        avatar: string;
    };
};

export const USER_GROUP_COLORS: UserGroupColorType = {
    employees: {
        background: 'bg-polaris-bg-surface-info',
        avatar: 'bg-polaris-text-info-on-bg-fill bg-polaris-bg-fill-info',
    },
    contacts: {
        background: 'bg-polaris-bg-surface-warning',
        avatar: 'bg-polaris-text-warning-on-bg-fill bg-polaris-bg-fill-warning',
    },
    emails: {
        background: 'bg-polaris-bg-surface-critical',
        avatar: 'bg-polaris-text-critical-on-bg-fill bg-polaris-bg-fill-critical',
    },
    users: {
        background: 'bg-polaris-bg-surface-success',
        avatar: 'bg-polaris-text-success-on-bg-fill bg-polaris-bg-fill-success',
    },
};

export type WorkflowUserGroupColorType = {
    background: string;
    avatar: string;
};

export const WORKFLOW_USERS_GROUP_COLORS: WorkflowUserGroupColorType[] = [
    {
        background: 'bg-polaris-bg-surface-brand',
        avatar: 'bg-polaris-text-brand-on-bg-fill bg-polaris-bg-fill-brand',
    },
    {
        background: 'bg-polaris-bg-surface-magic',
        avatar: 'bg-polaris-text-magic-on-bg-fill bg-polaris-bg-fill-magic',
    },
    {
        background: 'bg-polaris-bg-surface-caution',
        avatar: 'bg-polaris-text-caution-on-bg-fill bg-polaris-bg-fill-caution',
    },
    {
        background: 'bg-polaris-bg-surface-secondary',
        avatar: 'bg-polaris-text-secondary-on-bg-fill bg-polaris-bg-fill-secondary',
    },
    {
        background: 'bg-polaris-bg-surface-tertiary',
        avatar: 'bg-polaris-text-tertiary-on-bg-fill bg-polaris-bg-fill-tertiary',
    },
];
