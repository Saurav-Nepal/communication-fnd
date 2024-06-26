import { useContext } from 'react';
import { AppContext } from '../Providers/app.provider';

export const useApp = () => {
    const app = useContext(AppContext);
    return app;
};
