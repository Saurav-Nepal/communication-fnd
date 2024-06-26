import React, { useMemo } from 'react';

type windowsType = 'win' | 'mac' | 'lx' | 'an' | 'ios' | 'unknown';
export const useOperatingSystem = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    const data = useMemo(() => {
        let type: windowsType;
        if (userAgent.includes('win')) {
            type = 'win';
        } else if (userAgent.includes('mac')) {
            type = 'mac';
        } else if (userAgent.includes('linux')) {
            type = 'lx';
        } else if (userAgent.includes('android')) {
            type = 'an';
        } else if (userAgent.includes('ios')) {
            type = 'ios';
        } else {
            type = 'unknown';
        }
        return {
            type,
        };
    }, [userAgent]);

    return {
        ...data,
    };
};
