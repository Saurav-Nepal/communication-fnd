let GetSessionItem: (key: string) => any = () => null;
let SetSessionItem: (key: string, value: unknown) => void = () => {
    //empty function
};
let RemoveSessionItem: (key: string) => void = () => {
    //empty function
};

function InitializeSessionStorageUtility({ ...props }) {
    GetSessionItem = (key) => {
        const value = props.GetItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    SetSessionItem = (key, value) => props.SetItem(key, JSON.stringify(value));
    RemoveSessionItem = props.RemoveItem;
}

export {
    InitializeSessionStorageUtility,
    GetSessionItem,
    SetSessionItem,
    RemoveSessionItem,
};
