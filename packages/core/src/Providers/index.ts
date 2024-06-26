export * from './app.provider';
export * from './auth.provider';
export * from './theme.provider';
export * from './public.auth.provider';

export const withPublicPage = (Component: React.FC) => {
    Component.defaultProps = { isPublic: true };
    return Component;
};
