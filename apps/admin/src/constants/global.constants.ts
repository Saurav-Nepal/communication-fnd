const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT_URL || '';

export const ROUTE_URL = ENDPOINT;
export const API_HOST = `${ROUTE_URL}api/`;
export const BUSINESS_API_HOST = `${ROUTE_URL}api/b/`;

const GLOBAL = {
    ROUTE_URL,
    API_HOST,
    ORGANIZATION: {
        name: process.env.NEXT_PUBLIC_ORGANIZATION_NAME ?? 'Slab Communication',
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
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0',
};

const setRouteUrl = (url: string, org_name?: string) => {
    GLOBAL.ROUTE_URL = url;
    GLOBAL.API_HOST = API_HOST;
    GLOBAL.ORGANIZATION.name = org_name || GLOBAL.ORGANIZATION.name;
};

export { GLOBAL, setRouteUrl };
