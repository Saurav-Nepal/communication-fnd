import LogTerminal, {
    LogItem,
} from '@Components/LogTerminal/logTerminal.component';
import {
    GLOBAL_ACTIVITY_LOG,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '@finnoto/core';
import { useState } from 'react';
import { ColorMode } from 'react-terminal-ui';
import { useEffectOnce } from 'react-use';

const ActivityLog = ({ room }: { room?: string }) => {
    const [logItems, setLogItems] = useState<LogItem[]>([
        { type: 'message', message: 'Waiting for logs...', time: new Date() },
    ]);

    const handleLogData = (data: LogItem[]) => {
        const newLog = (data || []).filter(
            (log) => !room || log.filter === room
        );

        if (newLog.length > 0) {
            setLogItems(newLog);
        }
    };

    useEffectOnce(() => {
        SubscribeToEvent({
            eventName: GLOBAL_ACTIVITY_LOG,
            callback: handleLogData,
        });
        return () => {
            UnsubscribeEvent({
                eventName: GLOBAL_ACTIVITY_LOG,
                callback: handleLogData,
            });
        };
    });

    return (
        <div className='w-screen'>
            <LogTerminal items={logItems} theme={ColorMode.Dark} startBottom />
        </div>
    );
};

export default ActivityLog;
