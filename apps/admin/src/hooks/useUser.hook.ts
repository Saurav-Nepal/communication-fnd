import { useEffect, useState } from 'react';

import { LOGGED_USER } from '@/constants/state.constants';
import { USER_TYPE } from '@/types';
import { SubscribeToEvent, UnsubscribeEvent } from '@/utils/stateManager.utils';

const useUser = () => {
    const [user, setUser] = useState<USER_TYPE>();

    useEffect(() => {
        SubscribeToEvent({
            eventName: LOGGED_USER,
            callback: setUser,
        });

        return () => {
            UnsubscribeEvent({
                eventName: LOGGED_USER,
                callback: setUser,
            });
        };
    });

    return { user };
};

export default useUser;
