import { useCallback, useEffect, useState } from 'react';

import { ObjectDto } from '../backend/Dtos';
import { CURRENT_BUSINESS } from '../Constants';
import { user } from '../Models';
import { IsBusinessOwner } from '../Utils/function.utils';
import {
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../Utils/stateManager.utils';

export const useCurrentBusiness = () => {
    const [currentBusiness, setCurrentBusiness] = useState<ObjectDto>({});

    useEffect(() => {
        SubscribeToEvent({
            eventName: CURRENT_BUSINESS,
            callback: setBusiness,
        });
        return () =>
            UnsubscribeEvent({
                eventName: CURRENT_BUSINESS,
                callback: setBusiness,
            });
    }, []);

    const setBusiness = async (data: any) => {
        const { user_id } = (await user.getIdObject()) || {};
        if (!user_id) return setCurrentBusiness({});

        setCurrentBusiness(data);
    };

    const isBusinessOwner = useCallback(
        (data: { owner_type?: string; owner_id?: number } = {}) => {
            return IsBusinessOwner(data, currentBusiness);
        },
        [currentBusiness]
    );

    return { currentBusiness, isBusinessOwner };
};
