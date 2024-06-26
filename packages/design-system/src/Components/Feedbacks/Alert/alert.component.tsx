import React from 'react';

interface AlertProps {
    icon?: any;
    title?: string;
    description?: string;
    type?: 'success' | 'info' | 'warning' | 'error';
}

const Alert = () => {
    return <div>Alert</div>;
};

export default Alert;
