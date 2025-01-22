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
    callback: (...args: any) => void;
    extraParams?: any;
    objParams?: any;
    isMemoryStore?: boolean;
}) => void = () => {};

let UnsubscribeEvent: (options: {
    eventName: string;
    callback: (...args: any) => void;
    objParams?: any;
    isMemoryStore?: boolean;
}) => void = () => {};

let StoreEvent: (options: {
    eventName: string;
    data?: any;
    objParams?: any;
    isMemoryStore?: boolean;
    isTemp?: boolean;
    dontTransmit?: boolean;
}) => void = () => {};

let DeleteEvent: (options: {
    eventName: string;
    isMemoryStore?: boolean;
}) => void = () => {};

let IsEventAvailable: (options: {
    eventName: string;
    isMemoryStore?: boolean;
    objParams?: any;
}) => void = () => {};

function InitializeStateManager(props: any) {
    if (!props) return;

    SubscribeToEvent = props.SubscribeToEvent;
    UnsubscribeEvent = props.UnsubscribeEvent;
    StoreEvent = props.StoreEvent;
    DeleteEvent = props.DeleteEvent;
    IsEventAvailable = props.IsEventAvailable;
}

export {
    InitializeStateManager,
    SubscribeToEvent,
    UnsubscribeEvent,
    StoreEvent,
    DeleteEvent,
};
