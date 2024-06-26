/**
 *
 * documentation link
 * https://www.npmjs.com/package/state-manager-utility
 *
 * Statemanagement utils
 * used to broadcast events and capture them
 *
 * Broadcase event
 * StoreEvent({ eventName: 'test', data: { hey: 1 } });
 *
 * Listen for event
 * SubscribeToEvent({ eventName: 'test', callback: listen });
 */

let SubscribeToEvent: (options: {
    eventName: string;
    callback: (data: any) => void;
}) => void;
let UnsubscribeEvent: (options: {
    eventName: string;
    callback: (data: any) => void;
}) => void;
let StoreEvent: (options: {
    eventName: string;
    data?: any;
    isTemp?: boolean;
    dontTransmit?: boolean;
    isMemoryStore?: boolean;
}) => void;

function InitializeStateManager({ ...props }) {
    SubscribeToEvent = props.SubscribeToEvent;
    UnsubscribeEvent = props.UnsubscribeEvent;
    StoreEvent = props.StoreEvent;
}

export {
    InitializeStateManager,
    SubscribeToEvent,
    UnsubscribeEvent,
    StoreEvent,
};
