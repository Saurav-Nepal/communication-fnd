import { ReactNode } from 'react';

export interface RouteProps {
    path: string;
    element: ReactNode;
    children?: RouteProps[];
}

export interface RouterProps {
    routes: RouteProps[];
    pathname: string;
    pageNotFound: ReactNode;
}
