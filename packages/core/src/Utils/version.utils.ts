import { GetItem, SetItem } from './localStorage.utils';

export function SetPlatformId(id) {
    SetItem('PLATFORM_ID', id);
}

export function GetPlatformId() {
    return GetItem('PLATFORM_ID');
}

export function SetVersion(version) {
    SetItem('APP_VERSION', version);
}

export function GetVersion() {
    return GetItem('APP_VERSION');
}
