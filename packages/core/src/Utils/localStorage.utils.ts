/**
 * Storage utils
 * intra sessions data storage facility
 *
 * Expects storage apis to be fetched at the time of package initialisation
 *
 *
 * Apis Exposed are -
 *
 * SetItem - stores data to the native local storage(localstorage for web and async storage for the react-native)
 * usage - SetItem(key, payload, { isNonVolatile = false, span, timestamp = new Date().getTime() })
 * key(required) - is string value against which payloads are stored
 * payload(required) - data to be stored
 * {
 *    isNonVolatile(optional) - data being stored under nonVolatile would be kept always, otherwise they are kept for the user session and afterwards removed
 *    span(optional) - span is the time duration(minutes), after which data will be staled and removed from the storage
 *    timestamp(optional) - timestamp value after which span counting starts for data validation
 * }
 *
 *
 * GetItem
 * usage- GetItem(key, nonVolatile = false)
 *
 *
 * RemoveItem
 * usage- RemoveItem({ key, clearVolatileStorage = true, clearNonVolatileStorage = false })
 * Removes all the item under volatile or nonVolatile storage based on the params
 */

let GetItem = (key: string, nonVolatile: boolean = false): any => {
    //empty getitem storage
};
let GetItemAsync = (key: string, nonVolatile: boolean = false): any => {
    //empty getitemasync
};
let SetItem = (
    key: string,
    payload: any,
    {
        isNonVolatile = false,
        span,
        timestamp = new Date().getTime(),
    }: { isNonVolatile?: boolean; span?: number; timestamp?: number } = {}
) => {
    //empty setitem
};
let RemoveItem = (key: any) => {
    //empty removeitem
};

function InitializeStorageUtility({ ...props }) {
    GetItem = props.GetItem;
    GetItemAsync = props.GetItemAsync;
    SetItem = props.SetItem;
    RemoveItem = props.RemoveItem;
}

export { InitializeStorageUtility, GetItem, GetItemAsync, SetItem, RemoveItem };
