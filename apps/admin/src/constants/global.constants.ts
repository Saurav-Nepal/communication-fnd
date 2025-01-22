const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT_URL || '';

export const ROUTE_URL = ENDPOINT;
export const API_HOST = `${ROUTE_URL}api/admin/`;
export const RECORD_URL = `${ROUTE_URL}api/record/`;
export const DATA_URL = `${ROUTE_URL}api/data/`;

const GLOBAL = {
    ROUTE_URL,
    API_HOST,
    RECORD_URL,
    DATA_URL,
    ORGANIZATION: {
        name: process.env.NEXT_PUBLIC_ORGANIZATION_NAME ?? 'Admin',
        logo: process.env.NEXT_PUBLIC_LOGO_PATH,
        headerLogo: process.env.NEXT_PUBLIC_HEADER_LOGO_PATH,
    },
    DATE_TIME_FORMAT:
        process.env.NEXT_PUBLIC_DATE_TIME_FORMAT ?? 'yyyy-MM-dd HH:mm',
    API_DATE_TIME_FORMAT:
        process.env.NEXT_PUBLIC_API_DATE_TIME_FORMAT ?? 'yyyy-MM-dd HH:mm:ss',
    DISPLAY_DATE_TIME_FORMAT:
        process.env.NEXT_PUBLIC_DISPLAY_DATE_TIME_FORMAT ??
        'dd MMM yyyy, HH:mm',
    DISPLAY_DATE_FORMAT:
        process.env.NEXT_PUBLIC_DISPLAY_DATE_FORMAT ?? 'dd MMM yyyy',
    DATE_FORMAT: process.env.NEXT_PUBLIC_DATE_FORMAT ?? 'yyyy-MM-dd',
    PLATFORM_ID: process.env.NEXT_PUBLIC_PLATFORM_ID ?? 1,
    ALLOW_SET_BACKEND: process.env.NEXT_PUBLIC_ALLOW_SET_BACKEND === 'true',
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0',
};

const setRouteUrl = (url: string, org_name?: string) => {
    GLOBAL.ROUTE_URL = url;
    GLOBAL.API_HOST = `${GLOBAL.ROUTE_URL}api/admin/`;
    GLOBAL.RECORD_URL = `${GLOBAL.ROUTE_URL}api/record/`;
    GLOBAL.DATA_URL = `${GLOBAL.ROUTE_URL}api/data/`;
    GLOBAL.ORGANIZATION.name = org_name || GLOBAL.ORGANIZATION.name;
};

export { GLOBAL, setRouteUrl };
